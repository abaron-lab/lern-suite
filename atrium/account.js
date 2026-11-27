'use strict';

(() => {
  const config = window.ATRIUM_ACCOUNT;
  if (!config?.url || !config.publishableKey || location.protocol === 'file:') return;

  const button = document.querySelector('#account');
  const pagePath = location.pathname.replace(/\/index\.html$/, '/');
  const redirect = new URL(pagePath, location.origin).href;
  const table = 'atrium_progress';
  let client;
  let account;
  let recovery = false;
  let ready = false;
  let serviceError = '';
  let formMode = 'login';
  const linkFailed = new URLSearchParams(location.hash.slice(1)).has('error_code');
  let linkMessage = linkFailed ? 'Der E-Mail-Link ist ungültig oder abgelaufen.' : '';

  button.hidden = false;
  button.addEventListener('click', () => showAccount());
  initialize();

  async function initialize() {
    try {
      await new Promise((resolve, reject) => {
        const sdk = document.createElement('script');
        sdk.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.119.2/dist/umd/supabase.js';
        sdk.integrity = 'sha384-A97u3Qnt9GZHURO9YJZRe7VQgGUeFzcv6I1oIGnUTxQrCxnpQMwR0/G8F2zt9abZ';
        sdk.crossOrigin = 'anonymous';
        sdk.referrerPolicy = 'no-referrer';
        sdk.onload = resolve;
        sdk.onerror = reject;
        document.head.append(sdk);
      });
      client = window.supabase.createClient(config.url, config.publishableKey, {
        auth: {storageKey: 'atrium.auth.1', flowType: 'implicit'},
      });
      client.auth.onAuthStateChange((event, session) => {
        // Supabase emits auth events while holding its session lock.
        setTimeout(() => {
          if (event === 'PASSWORD_RECOVERY') recovery = true;
          if (event === 'SIGNED_OUT') recovery = false;
          const becameReady = !ready;
          ready = true;
          const changedAccount = activate(session);
          if (event === 'INITIAL_SESSION' && linkFailed) {
            history.replaceState(null, '', redirect);
            render(false);
          }
          if (event === 'PASSWORD_RECOVERY' || (event === 'INITIAL_SESSION' && linkFailed) ||
              ((becameReady || changedAccount) && modal.open && dlg.querySelector('[data-account]'))) showAccount();
        }, 0);
      });
      window.addEventListener('online', () => synchronize(account, true));
      window.addEventListener('focus', () => synchronize(account, true));
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') synchronize(account, true);
      });
    } catch {
      ready = true;
      serviceError = 'Das Lernkonto konnte nicht geladen werden. Bitte lade die Seite erneut.';
      if (modal.open && dlg.querySelector('[data-account]')) showAccount();
    }
  }

  function activate(session) {
    const user = session?.user;
    if (account?.id === user?.id) return false;
    const accountDialog = Boolean(dlg.querySelector('[data-account]'));
    if (modal.open && !accountDialog) modal.close();
    if (!user) {
      account = null;
      persistAccountProgress = null;
      state = freshProgress(readProgress(storageKey));
    } else {
      formMode = 'login';
      const key = 'atrium.progress.1.' + user.id;
      const cache = readProgress(key);
      account = {
        id: user.id, email: user.email, key, version: cache?.version ?? null,
        dirty: Boolean(cache?.dirty), sequence: 0, busy: false, lookup: true,
        conflict: null, importOffered: false, message: '',
      };
      state = freshProgress(cache?.progress);
      persistAccountProgress = queueSave;
      synchronize(account, true);
    }
    if (getRoute() === 'training' && !state.session) go('uebersicht');
    render(false);
    return true;
  }

  function cacheProgress(a) {
    storeProgress(a.key, {progress: state, version: a.version, dirty: a.dirty});
  }

  function queueSave() {
    const a = account;
    a.dirty = true;
    a.sequence++;
    cacheProgress(a);
    queueMicrotask(() => synchronize(a));
  }

  async function readRemote(a) {
    const {data, error} = await client.from(table).select('version, progress')
      .eq('user_id', a.id).maybeSingle();
    if (error) throw error;
    return data;
  }

  function acceptRemote(a, row) {
    a.version = row?.version ?? null;
    a.dirty = false;
    a.conflict = null;
    state = freshProgress(row?.progress);
    cacheProgress(a);
    if (getRoute() === 'training' && !state.session) go('uebersicht');
    render(false);
  }

  async function writeRemote(a) {
    const values = {progress: state, version: (a.version ?? 0) + 1};
    const sequence = a.sequence;
    const request = a.version === null
      ? client.from(table).insert({...values, user_id: a.id})
      : client.from(table).update(values).eq('user_id', a.id).eq('version', a.version);
    const {data, error} = await request.select('version').maybeSingle();
    if (a !== account) return;
    if (!data || error) {
      if (error && error.code !== '23505') throw error;
      const remote = await readRemote(a);
      if (a !== account) return;
      a.conflict = {remote};
      return;
    }
    a.version = data.version;
    a.dirty = sequence !== a.sequence;
    cacheProgress(a);
  }

  async function synchronize(a, pull = false) {
    if (!a || a !== account || a.busy || a.conflict || recovery) return;
    a.busy = true;
    a.message = 'Lernstand wird abgeglichen …';
    updateStatus();
    let wrote = false;
    try {
      if (pull || a.lookup) {
        const remote = await readRemote(a);
        if (a !== account) return;
        const version = remote?.version ?? null;
        if (version !== a.version) {
          if (a.dirty) a.conflict = {remote};
          else acceptRemote(a, remote);
        }
        if (a.lookup && !remote && !a.dirty && hasGuestProgress()) {
          a.importOffered = true;
        }
        a.lookup = false;
      }
      if (a.dirty && !a.conflict) {
        await writeRemote(a);
        wrote = true;
      }
      if (a !== account) return;
      a.message = a.conflict ? 'Auf beiden Geräten wurde weitergelernt. Wähle den Lernstand, mit dem du fortfahren möchtest.'
        : a.version === null ? 'Dein Konto ist bereit.' : 'Lernstand abgeglichen.';
    } catch {
      if (a !== account) return;
      a.message = a.dirty
        ? 'Änderungen sind auf diesem Gerät gespeichert. Der Abgleich ist noch offen.'
        : 'Der Online-Lernstand ist gerade nicht erreichbar.';
    } finally {
      a.busy = false;
      if (a === account) {
        updateStatus();
        if (wrote && a.dirty && !a.conflict) queueMicrotask(() => synchronize(a));
        if (a.conflict || a.importOffered) {
          if (!modal.open || dlg.querySelector('[data-account]')) {
            a.importOffered = false;
            showAccount();
          }
        }
      }
    }
  }

  function hasGuestProgress() {
    const guest = readProgress(storageKey);
    return Boolean(guest && (Object.keys(guest.days ?? {}).length || guest.rounds?.length ||
      guest.custom?.length || guest.session || guest.lesson !== 9 || guest.scope !== 'mix'));
  }

  function updateStatus() {
    if (account) {
      button.title = account.message;
      button.textContent = account.conflict ? 'Lernkonto !' : 'Lernkonto';
    }
    const status = dlg.querySelector('[data-account-status]');
    if (status && account) status.textContent = account.message;
  }

  function authForm() {
    const modes = {
      login: ['Anmelden', 'current-password', 'Anmelden'],
      signup: ['Ein Lernkonto erstellen', 'new-password', 'Bestätigungslink anfordern'],
      reset: ['Passwort vergessen', '', 'Link anfordern'],
      recovery: ['Neues Passwort setzen', 'new-password', 'Passwort speichern'],
    };
    const [title, autocomplete, action] = modes[formMode];
    const email = formMode === 'recovery' ? ''
      : '<label class="field">E-Mail-Adresse<input class="filter" type="email" name="email" autocomplete="email" maxlength="254" required></label>';
    const password = !autocomplete ? ''
      : '<label class="field">Passwort<input class="filter" type="password" name="password" autocomplete="' +
          autocomplete + '" ' + (autocomplete === 'new-password' ? 'minlength="8" ' : '') + 'maxlength="72" required></label>';
    const hint = formMode === 'signup'
      ? '<p>Wenn du minderjährig bist, richte das Konto gemeinsam mit einem Elternteil ein. Ihr könnt dessen E-Mail-Adresse verwenden. Ein Bestätigungslink schaltet das Konto frei.</p>'
      : '<p>Mit einem Lernkonto kannst du deine Übungen auf einem zweiten Gerät fortsetzen.</p>';
    const modesNav = formMode === 'login'
      ? '<button type="button" class="soft" data-account-action="signup">Konto erstellen</button><button type="button" class="soft" data-account-action="reset">Passwort vergessen</button>'
      : formMode === 'recovery' ? '' : '<button type="button" class="soft" data-account-action="login">Zur Anmeldung</button>';
    return dialogTitle(title) + '<section data-account>' + hint + '<form id="account-form">' +
      email + password + '<div class="account-actions"><button class="btn">' + action + '</button>' +
      modesNav + '</div><p class="account-status" data-form-status role="status"></p></form></section>';
  }

  function showAccount() {
    if (recovery) formMode = 'recovery';
    if (!ready || serviceError) {
      showDialog(dialogTitle('Lernkonto') + '<p data-account role="status">' +
        (serviceError || 'Die Verbindung zum Lernkonto wird hergestellt …') + '</p>');
      return;
    }
    if (!account || recovery) {
      showDialog(authForm());
      dlg.querySelector('#account-form').addEventListener('submit', submitAuth);
      dlg.querySelector('[data-form-status]').textContent = linkMessage;
      linkMessage = '';
      return;
    }
    const action = (id, label) => '<button type="button" class="soft" data-account-action="' + id + '">' + label + '</button>';
    const controls = account.conflict
      ? action('keep-cloud', 'Stand aus dem Konto laden') + action('keep-device', 'Stand dieses Geräts ins Konto übernehmen')
      : action('sync', 'Jetzt abgleichen') +
        (!account.lookup && account.version === null && !account.dirty && hasGuestProgress()
          ? action('import', 'Lernstand von diesem Gerät übernehmen') : '') +
        action('logout', 'Abmelden');
    const conflictHint = account.conflict
      ? '<p class="account-hint">Abgeschlossene Runden: ' + state.rounds.length +
        ' auf diesem Gerät und ' + (account.conflict.remote?.progress.rounds?.length ?? 0) +
        ' im Konto. Der gewählte Stand ersetzt den anderen.</p>' : '';
    showDialog(dialogTitle('Dein Lernkonto') + '<section data-account><p>' + esc(account.email) +
      '</p><p class="account-status" data-account-status role="status"></p><div class="account-actions">' +
      controls + '</div>' + conflictHint + '</section>');
    updateStatus();
  }

  async function submitAuth(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const submit = form.querySelector('button[type="submit"], button:not([type])');
    const status = form.querySelector('[data-form-status]');
    const mode = formMode;
    const email = String(fields.get('email') ?? '').trim();
    const password = fields.get('password');

    submit.disabled = true;
    status.textContent = 'Bitte warte …';
    try {
      let result;
      if (mode === 'signup') result = await client.auth.signUp({email, password, options: {emailRedirectTo: redirect}});
      else if (mode === 'reset') result = await client.auth.resetPasswordForEmail(email, {redirectTo: redirect});
      else if (mode === 'recovery') result = await client.auth.updateUser({password});
      else result = await client.auth.signInWithPassword({email, password});
      if (result.error) throw result.error;

      if (mode === 'signup') {
        status.textContent = 'Schau in dein E-Mail-Postfach und bestätige die Adresse über den Link.';
        form.reset();
      } else if (mode === 'reset') {
        status.textContent = 'Wenn es zu dieser Adresse ein Konto gibt, erhältst du einen Link per E-Mail.';
        form.reset();
      } else if (mode === 'recovery') {
        recovery = false;
        formMode = 'login';
        showAccount();
        synchronize(account, true);
      }
    } catch (error) {
      status.textContent = error.code === 'email_not_confirmed' ? 'Bestätige zuerst deine E-Mail-Adresse.'
        : error.code === 'invalid_credentials' ? 'Prüfe deine E-Mail-Adresse und dein Passwort.'
        : error.code === 'weak_password' ? 'Wähle ein stärkeres Passwort.'
        : error.status === 429 ? 'Versuche es in ein paar Minuten erneut.'
        : 'Das hat gerade nicht geklappt. Versuche es erneut.';
    } finally {
      submit.disabled = false;
    }
  }

  dlg.addEventListener('click', async event => {
    const action = event.target.closest('[data-account-action]')?.dataset.accountAction;
    if (!action) return;
    if (['login', 'signup', 'reset'].includes(action)) {
      formMode = action;
      showAccount();
      return;
    }
    const a = account;
    if (!a) return;
    if (action === 'sync') {
      await synchronize(a, true);
      if (a === account && modal.open && dlg.querySelector('[data-account]')) showAccount();
    } else if (action === 'import' && !a.lookup && a.version === null && !a.dirty && hasGuestProgress()) {
      state = freshProgress(readProgress(storageKey));
      queueSave();
      render(false);
      showAccount();
    } else if (action === 'keep-cloud' && a.conflict) {
      acceptRemote(a, a.conflict.remote);
      a.message = 'Lernstand aus dem Konto geladen.';
      showAccount();
    } else if (action === 'keep-device' && a.conflict) {
      a.version = a.conflict.remote?.version ?? null;
      a.conflict = null;
      queueSave();
      showAccount();
    } else if (action === 'logout') {
      await synchronize(a);
      if (a !== account) return;
      if (a.dirty || a.busy || a.conflict) {
        if (!a.conflict) {
          a.message = 'Gleiche zuerst deinen Lernstand ab, damit deine letzten Änderungen erhalten bleiben.';
          updateStatus();
        }
        return;
      }
      const {error} = await client.auth.signOut({scope: 'local'});
      if (error) {
        a.message = 'Die Abmeldung ist gerade fehlgeschlagen.';
        updateStatus();
      } else {
        try {localStorage.removeItem(a.key)} catch {}
        button.title = '';
        button.textContent = 'Lernkonto';
        formMode = 'login';
      }
    }
  });
})();
