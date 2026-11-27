'use strict';
const paths={
 grid:'<rect x="3" y="3" width="7" height="7" rx="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/>',
 book:'<path d="M12 6c-3-2-6-2.5-10-1v14c4-1.5 7-1 10 1 3-2 6-2.5 10-1V5c-4-1.5-7-1-10 1Zm0 0v14"/>',
 temple:'<path d="m2 8 10-5 10 5H2Zm2 3h16M5 19h14M3 22h18M6 13v4m4-4v4m4-4v4m4-4v4"/>',
 chart:'<path d="M3 20h18M6 16v-5m6 5V6m6 10V3"/>',gear:'<path d="m10 3 .6-1h2.8l.6 2 2 .9 2-.5 1.9 2.2-.7 2 .8 2 1.8 1v2.4l-1.9 1-.7 1.8.5 2-1.9 1.9-2-.5-1.9.8-.9 1.9h-2.6l-.8-2-2-.8-2 .5L3.7 18l.6-2-.8-1.9-1.7-.8v-2.6l1.8-.9.7-2-.5-1.9 2-1.8 2 .5 2-.9Z" transform="translate(1 0) scale(.93)"/><circle cx="12" cy="12" r="3"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 10h18"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
 play:'<path d="m7 4 13 8-13 8Z" fill="currentColor" stroke="none"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
 stack:'<path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5"/>',flame:'<path d="M12 2c1 5-4 6-3 11 2-1 4-3 4-5 5 3 7 7 5 11-2 4-10 5-13-1C2 12 9 9 12 2Z"/>',
 repeat:'<path d="M3 11a9 9 0 0 1 15.7-5.6L21 8m0-5v5h-5M21 13a9 9 0 0 1-15.7 5.6L3 16m0 5v-5h5"/>',
 check:'<path d="m4 12 5 5L20 6"/>',x:'<path d="m6 6 12 12m0-12L6 18"/>',plus:'<path d="M12 4v16M4 12h16"/>',cap:'<path d="m2 9 10-5 10 5-10 5-10-5Zm4 3v5q6 5 12 0v-5m4-3v7"/>',
 shield:'<path d="m12 2 8 3v7q0 6-8 10-8-4-8-10V5l8-3Z"/><path d="m8 12 3 3 5-6"/>',pencil:'<path d="m4 16 12-12 4 4L8 20l-5 1 1-5Zm10-10 4 4"/>'
};
const ic=n=>'<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths[n]+'</svg>';
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const main=document.querySelector('main'), modal=document.querySelector('dialog'), dlg=document.querySelector('#dialogcontent');
const storageKey='atrium.lernen.1';
const initial={lesson:9,scope:"mix",custom:[],cards:{},days:{},rounds:[],session:null};
let state;
try{state={...initial,...JSON.parse(localStorage.getItem(storageKey)||'{}')}}catch{state={...initial}}
if(!state.courseEdition){
  if(state.lesson===1)state.lesson=9;
  state.courseEdition=2;
  save();
}
function save(){try{localStorage.setItem(storageKey,JSON.stringify(state))}catch{document.querySelector('#notice').textContent='Dieser Browser kann den Lernstand gerade nicht speichern.'}}
const today=(offset=0)=>{let d=new Date();d.setDate(d.getDate()+offset);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')};
const longDate=()=>new Date().toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'});
const bank=()=>[...vocabulary,...state.custom,...grammar];
const available=()=>bank().filter(c=>c.lesson<=state.lesson);
const studyPool=()=>available().filter(c=>state.scope!=='current'||c.lesson===state.lesson);
const bandLabel=n=>n<=15?'Lektionen 1–15':'Lektionen 16–30';
const selectedLesson=()=>'<button class="lesson-picker" data-act="settings">'+ic('book')+'<span><small>Deine Unterrichtslektion</small><strong>L'+state.lesson+' · '+lessonTitles[state.lesson-1]+'</strong></span>'+ic('pencil')+'</button>';
const due=()=>studyPool().filter(c=>state.cards[c.id]?.due<=today());
const count=(n,one,many)=>n+' '+(n===1?one:many);
const mixed=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};
function streak(){let offset=state.days[today()]?0:-1,n=0;while(state.days[today(offset)]>0){n++;offset--}return n}
const pages=[['uebersicht','Übersicht','grid'],['vokabeln','Vokabeln','book'],['grammatik','Grammatik','temple'],['lernweg','Lernweg','cap'],['fortschritt','Fortschritt','chart']];
const getRoute=()=>decodeURI(location.hash.slice(1))||'uebersicht';
const go=page=>{if(getRoute()===page)render();else location.hash=page};
const cta=(name,act,icon='play')=>'<button class="btn" data-act="'+act+'">'+ic(icon)+name+'</button>';
const soft=(name,act,icon='')=>'<button class="soft" data-act="'+act+'">'+(icon?ic(icon):'')+name+'</button>';
function intro(title,sub,side=''){return '<section class="intro"><div><div class="eyebrow">ROMA A <i class="middot"></i> KLASSE 6</div><h1>'+title+'</h1><p>'+sub+'</p></div>'+side+'</section>'}
function week(){const day=(new Date().getDay()+6)%7;let labels=['Mo','Di','Mi','Do','Fr','Sa','So'];let n=Math.min(8,state.days[today()]||0);
return '<aside class="week"><div class="panel-title">'+ic('calendar')+'<h2>Deine Lernwoche</h2></div><div class="streak"><span class="flame">'+ic('flame')+'</span><div><strong>'+count(streak(),'Tag','Tage')+' in Folge</strong><small>'+((state.days[today()]||0)>0?'Heute schon gelernt':streak()?'Heute weiterlernen':'Heute beginnt deine Lernserie')+'</small></div></div><div class="days">'+labels.map((a,i)=>{let d=today(i-day),done=!!state.days[d];return '<div class="day '+(i===day?'today ':'')+(done?'done':'')+'" aria-label="'+a+(i===day?', heute':'')+(done?', gelernt':', offen')+'"><i>'+(done?ic('check'):'')+'</i>'+a+'</div>'}).join('')+'</div><div class="goal"><div class="goal-label"><span>Tagesziel</span><span>'+n+' / 8 Aufgaben</span></div><div class="track"><i style="width:'+n*12.5+'%"></i></div></div></aside>'}
function area(link,cls,icon,title,desc,foot){return '<a class="area '+cls+'" href="#'+link+'"><div class="tile">'+ic(icon)+'</div><h3>'+title+'</h3><p>'+desc+'</p><div class="card-foot">'+foot+'</div></a>'}
function overview(){let ongoing=state.session;const pool=studyPool();return intro('Dein Lernraum','Salve! Bereit für eine kleine Runde Latein?',selectedLesson())+'<div class="primary-grid"><section class="hero"><img class="art" src="assets/forum.webp" alt=""><div class="hero-content"><div class="eyebrow">'+ic('sun')+' Tägliches Training</div><h2>Deine Tagesrunde</h2><p>Frische deine Vokabeln auf und übe die Grammatik deiner Lektion.</p><div class="meta"><span>'+ic('clock')+' ca. 5 Min.</span><span>'+ic('stack')+' 8 Aufgaben</span></div>'+cta(ongoing?'Runde fortsetzen':'Training starten',ongoing?'resume':'daily')+'</div></section>'+week()+'</div>'+rewardOverview()+'<div class="section-heading"><h2>Deine Lernbereiche</h2></div><div class="areas">'+area('vokabeln','','book','Vokabeln','Übe lateinische Wörter und ihre Bedeutungen.',count(pool.filter(c=>c.kind==='v').length,'Vokabel','Vokabeln')+' im Lernset')+area('grammatik','blue','temple','Grammatik','Entdecke Formen, Endungen und Satzbau.',(state.scope==='current'?'Lektion '+state.lesson:count(state.lesson,'Lektion','Lektionen')+' freigeschaltet'))+area('wiederholen','purple','repeat','Wiederholen','Festige, was du schon einmal gelernt hast.',count(due().length,'Aufgabe','Aufgaben')+' fällig')+'</div><div class="statusline">'+ic('book')+' '+(state.scope==='current'?'Nur Lektion ':'Lernstoff bis Lektion ')+state.lesson+' <button class="textbtn" data-act="settings">Anpassen</button></div>'}
function vocab(){let words=studyPool().filter(c=>c.kind==='v').sort((a,b)=>b.lesson-a.lesson);return intro('Vokabeln','Grundwortschatz und eigene Wörter für deinen Lernstoff.',selectedLesson())+'<section class="sheet"><div class="row"><h2>Dein Wortschatz</h2><div class="actions">'+soft('Wort ergänzen','add','plus')+cta('Vokabeln üben','vtrain')+'</div></div><label class="field">Wort suchen<input class="filter" id="search" type="search" placeholder="Latein oder Deutsch"></label><div class="library" id="wordlist">'+wordList(words)+'</div></section>'}
function wordList(words){return words.map(w=>'<div class="entry"><div><small class="word-lesson">Lektion '+w.lesson+'</small><strong lang="la">'+esc(w.latin)+'</strong></div><span>'+esc(w.de)+'</span></div>').join('')||'<p>Kein passendes Wort gefunden.</p>'}
function gram(){return intro('Grammatik','Übe die Grammatik deiner Auswahl oder starte eine einzelne Lektion.',selectedLesson())+'<section class="sheet">'+chapterNote(state.lesson)+'</section><section class="sheet"><div class="row"><h2>Deine Lektionen</h2>'+cta('Grammatik üben','gtrain')+'</div><div class="library">'+lessons.slice(0,state.lesson).map((t,i)=>state.scope==='current'&&i+1!==state.lesson?'':'<button class="entry" data-act="lesson-'+(i+1)+'"><div><span>Lektion '+(i+1)+'</span><br><strong>'+lessonTitles[i]+'</strong><br><span>'+t+'</span></div>'+ic('play')+'</button>').reverse().join('')+'</div></section>'}
function review(){let items=due();return intro('Wiederholen','Hier findest du Wörter und Formen, die wieder an der Reihe sind.')+'<section class="sheet"><div class="row"><h2>'+count(items.length,'fällige Aufgabe','fällige Aufgaben')+'</h2>'+(items.length?cta('Wiederholung starten','review'):'')+'</div>'+(items.length?'<div class="library">'+items.map(c=>'<div class="entry"><strong>'+esc(c.latin||c.topic)+'</strong><span>'+(c.kind==='v'?'Vokabel':'Grammatik')+'</span></div>').join('')+'</div>':'<p class="empty">Alles aufgefrischt! Schwierige Aufgaben erscheinen hier direkt nach dem Üben. Richtig gelöste kommen mit etwas Abstand zurück.</p>'+cta('Tagesrunde starten','daily'))+'</section>'}
function progress(){let total=Object.values(state.days).reduce((a,b)=>a+b,0);return intro('Dein Fortschritt','Hier siehst du, wie viel du schon geübt hast.')+'<div class="stats">'+[[Object.keys(state.days).length,'Lerntage'],[total,'Beantwortete Aufgaben'],[state.rounds.length,'Abgeschlossene Runden']].map(([n,t])=>'<div class="stat"><strong>'+n+'</strong><small>'+t+'</small></div>').join('')+'</div><div class="section-heading"><h2>Deine letzten Runden</h2></div><section class="sheet">'+(state.rounds.length?state.rounds.slice(-10).reverse().map(r=>'<div class="history"><div><strong>'+esc(r.title)+'</strong><br><span class="muted">'+new Date(r.date+'T12:00:00').toLocaleDateString('de-DE')+'</span></div><span>'+r.score+' / '+r.n+' richtig</span></div>').join(''):'<p>Nach deiner ersten Runde siehst du hier dein Ergebnis.</p><div class="spaced">'+cta('Training starten','daily')+'</div>')+'</section><div class="statusline">'+ic('shield')+' Dein Fortschritt wird in diesem Browser gespeichert.</div>'}
function showDialog(body){dlg.innerHTML='<div class="dialog-body">'+body+'</div>';if(!modal.open)modal.showModal()}
function dialogTitle(t){return '<div class="row"><h2>'+t+'</h2><button class="close" data-act="close" aria-label="Schließen">'+ic('x')+'</button></div>'}
function lessonOptions(band,selected){
  return lessonTitles.map((t,i)=>(i<15?1:2)===band?'<option value="'+(i+1)+'" '+(selected===i+1?'selected':'')+'>L'+(i+1)+' · '+esc(t)+'</option>':'').join('');
}
function settings(){
  const n=state.lesson,b=n<=15?1:2;
  showDialog(dialogTitle('Deine Unterrichtslektion')+
    '<form id="prefs"><p>Wähle die Geschichte, bei der ihr in der Klasse seid.</p><label class="field">Lektionsbereich<select id="bookrange" class="filter select"><option value="1" '+(b===1?'selected':'')+'>ROMA A · Lektionen 1–15</option><option value="2" '+(b===2?'selected':'')+'>ROMA A · Lektionen 16–30</option></select></label>'+
    '<label class="field">Titel im Buch<select id="chapterpick" name="lesson" class="filter select">'+lessonOptions(b,n)+'</select></label><div class="chapter-topic"><small>Grammatik dieser Lektion</small><span id="chaptertopic">'+lessons[n-1]+'</span></div>'+
    '<label class="field">Lernstoff für deine Übungen<select name="scope" class="filter select"><option value="mix" '+(state.scope!=='current'?'selected':'')+'>Aktuelle Lektion mit Wiederholung</option><option value="current" '+(state.scope==='current'?'selected':'')+'>Nur die aktuelle Lektion</option></select></label>'+
    (state.session?'<p>Wenn du den Lernstoff wechselst, beginnt deine nächste Runde mit der neuen Auswahl. Beantwortete Aufgaben zählen weiter.</p>':'')+
    '<button class="btn">Lernstoff speichern</button><details class="source"><summary>Zum Lernstoff</summary><p>Eigene Übungen zu den Titeln und Grammatikthemen der 30 Lektionen. Der Wortschatz ist eine Auswahl für das Training, ergänzt um einzelne Übungswörter. Wörter aus dem Heft kannst du hinzufügen. <a href="https://www.ccbuchner.de/produkt/roma-a-textband-3028" target="_blank" rel="noopener">Arbeitspläne und Textlexika beim Verlag</a></p></details></form>');
}
document.addEventListener('change',e=>{
  if(e.target.id!=='bookrange'&&e.target.id!=='chapterpick')return;
  const pick=dlg.querySelector('#chapterpick');
  if(e.target.id==='bookrange'){
    const b=Number(e.target.value), selected=(state.lesson<=15?1:2)===b?state.lesson:b===1?1:16;
    pick.innerHTML=lessonOptions(b,selected);
  }
  dlg.querySelector('#chaptertopic').textContent=lessons[Number(pick.value)-1];
});
function addWord(){showDialog(dialogTitle('Eigene Vokabel')+'<form id="wordform"><p>Ergänze ein Wort aus deinem Buch oder Heft.</p><label class="field">Latein<input class="filter" name="latin" maxlength="90" required></label><label class="field">Deutsch<input class="filter" name="de" maxlength="140" required></label><label class="field">Lektion<select class="filter select" name="lesson">'+lessons.slice(0,state.lesson).map((t,i)=>'<option '+(i+1===state.lesson?'selected':'')+' value="'+(i+1)+'">'+(i+1)+'</option>').join('')+'</select></label><p class="form-error" role="alert" id="err"></p><button class="btn">Vokabel speichern</button></form>')}
function ordered(pool){return mixed(pool).sort((a,b)=>priority(a)-priority(b))}
function priority(c){let p=state.cards[c.id];if(!p)return 1;if(p.due<=today())return 0;return 2}
function makeQ(c,wordPool=studyPool()){if(c.kind==='g')return {id:c.id,label:'Grammatik · Lektion '+c.lesson,prompt:c.prompt,answer:c.correct,options:mixed([c.correct,...c.wrong]),why:c.why};
const reverse=Math.random()<.28,from=reverse?'de':'latin',to=reverse?'latin':'de';
const senses=w=>w.de.toLowerCase().split(',').map(s=>s.trim());
const distractors=[...new Set(mixed(wordPool.filter(w=>w.kind==='v'&&w[from]!==c[from]&&!senses(w).some(s=>senses(c).includes(s)))).map(w=>w[to]))].filter(x=>x!==c[to]).slice(0,2);
return {id:c.id,label:'Vokabeln · Lektion '+c.lesson,prompt:reverse?'Wie heißt „'+c.de+'“ auf Latein?':'Was bedeutet „'+c.latin+'“?',answer:c[to],options:mixed([c[to],...distractors]),why:c.latin+' bedeutet „'+c.de+'“.'}}
function begin(type){if(state.session){showDialog(dialogTitle('Runde fortsetzen?')+'<p>Du hast noch eine angefangene Runde. Bereits beantwortete Aufgaben zählen zu deinem Lernziel.</p><div class="actions">'+cta('Fortsetzen','resume')+soft('Neue Runde beginnen','replace-'+type)+'</div>');return}launch(type)}
function dailyFour(pool){
  if(state.scope==='current')return ordered(pool).slice(0,4);
  const focus=ordered(pool.filter(c=>c.lesson===state.lesson)).slice(0,2);
  const older=pool.filter(c=>c.lesson<state.lesson);
  const rest=ordered(older).slice(0,4-focus.length);
  const ids=new Set([...focus,...rest].map(c=>c.id));
  return [...focus,...rest,...ordered(pool.filter(c=>!ids.has(c.id)))].slice(0,4);
}
function launch(type){const pool=type==='review'?available():studyPool();let chosen,title;
let checkLesson;
if(type.startsWith('check-')){
  checkLesson=Number(type.slice(6));if(!Number.isInteger(checkLesson)||checkLesson<1||checkLesson>30)return;
  const chapter=bank().filter(c=>c.lesson===checkLesson);
  const words=ordered(chapter.filter(c=>c.kind==='v')).slice(0,4);
  const forms=ordered(chapter.filter(c=>c.kind==='g')).slice(0,4);
  chosen=words.flatMap((w,i)=>[w,forms[i]]);title='Lektionscheck · L'+checkLesson;
}
else if(type==='daily'){const v=dailyFour(pool.filter(w=>w.kind==='v')),g=dailyFour(pool.filter(w=>w.kind==='g'));chosen=v.flatMap((w,i)=>[w,g[i]]).filter(Boolean);title='Tagesrunde'}
else{let single=type.startsWith('lesson-');let cards=type==='review'?due():pool.filter(w=>single?w.kind==='g'&&w.lesson===Number(type.slice(7)):w.kind===(type==='vtrain'?'v':'g'));chosen=ordered(cards).slice(0,8);title=single?'Grammatik · Lektion '+type.slice(7):({review:'Wiederholung',vtrain:'Vokabeltraining',gtrain:'Grammatiktraining'})[type]}
if(!chosen.length){go('wiederholen');return}const wordPool=checkLesson?bank().filter(c=>c.lesson===checkLesson):studyPool();state.session={title,checkLesson,questions:chosen.map(c=>makeQ(c,wordPool)),index:0,answers:[]};save();go('training')}
function training(){let s=state.session;if(!s)return overview();let q=s.questions[s.index],selected=s.answers[s.index],answered=selected!==undefined;
return '<div class="question-box"><button class="back" data-act="pause">Runde pausieren</button><section class="sheet"><div class="row"><span class="eyebrow">'+esc(s.title)+'</span><span class="muted">Aufgabe '+(s.index+1)+' / '+s.questions.length+'</span></div><div class="track"><i style="width:'+100*s.index/s.questions.length+'%"></i></div><span class="smalltag">'+q.label+'</span><h1>'+esc(q.prompt)+'</h1><div class="choices">'+q.options.map((o,i)=>'<button class="choice '+(answered?(o===q.answer?'right':o===selected?'wrong':''):'')+'" data-act="answer-'+i+'" '+(answered?'disabled':'')+'>'+esc(o)+'</button>').join('')+'</div>'+(answered?'<div class="feedback" role="status"><strong>'+(selected===q.answer?'Richtig gelöst!':'Die richtige Antwort lautet „'+esc(q.answer)+'“.')+'</strong><p>'+esc(q.why)+'</p>'+rewardMilestone()+cta(s.index+1===s.questions.length?'Ergebnis ansehen':'Nächste Aufgabe','next','check')+'</div>':'')+'</section></div>'}
function answer(i){let s=state.session;if(!s||s.answers.length>s.index)return;let q=s.questions[s.index],a=q.options[i];if(a===undefined)return;s.answers.push(a);let old=state.cards[q.id]?.level||0;let level=a===q.answer?Math.min(old+1,5):0;state.cards[q.id]={level,due:today([0,1,3,7,14,30][level])};state.days[today()]=(state.days[today()]||0)+1;save();render(false);main.querySelector('[data-act="next"]')?.focus({preventScroll:true})}
function next(){let s=state.session;if(!s||s.answers.length!==s.index+1)return;if(s.index<s.questions.length-1){s.index++;save();render();return}recordRound(s);state.session=null;save();go('ergebnis')}
function result(){let r=state.rounds.at(-1);if(!r)return overview();return '<div class="question-box"><section class="sheet"><div class="eyebrow">'+ic('check')+' Runde abgeschlossen</div><h1 class="result-title">Bene factum! Gut gemacht.</h1><div class="result-score">'+r.score+' / '+r.n+'</div><p>Aufgaben richtig gelöst. '+(r.score<r.n?'Die schwierigen Aufgaben findest du unter „Wiederholen“.':'Diese Aufgaben kommen später zur Wiederholung zurück.')+'</p>'+checkResult(r)+rewardMilestone()+'<div class="actions spaced">'+cta('Zur Übersicht','home','grid')+(due().length?soft('Wiederholen','review'):'')+'</div></section></div>'}
function render(reset=true){let r=getRoute();document.querySelector('#nav').innerHTML=pages.map(([url,t,icon])=>'<a href="#'+url+'" '+(url===r?'class="active" aria-current="page"':'')+'>'+ic(icon)+t+'</a>').join('');main.innerHTML=({uebersicht:overview,vokabeln:vocab,grammatik:gram,fortschritt:progress,schatzkammer:collection,lernweg:passport,wiederholen:review,training,ergebnis:result}[r]||overview)();if(reset){window.scrollTo(0,0);main.focus({preventScroll:true})}}
document.querySelector('#settings').innerHTML=ic('gear');document.querySelector('#settings').onclick=settings;
document.addEventListener('click',e=>{let reward=e.target.closest('[data-prize]')?.dataset.prize;if(reward){handleReward(reward);return}let a=e.target.closest('[data-act]')?.dataset.act;if(!a)return;if(a==='close')modal.close();else if(a==='settings')settings();else if(a==='add')addWord();else if(a==='resume'){if(modal.open)modal.close();go('training')}else if(a==='pause'||a==='home')go('uebersicht');else if(a==='next')next();else if(a.startsWith('answer-'))answer(Number(a.slice(7)));else if(a.startsWith('replace-')){modal.close();launch(a.slice(8))}else begin(a)});
document.addEventListener('input',e=>{if(e.target.id==='search'){const term=e.target.value.trim().toLocaleLowerCase('de');document.querySelector('#wordlist').innerHTML=wordList(studyPool().filter(w=>w.kind==='v'&&(w.latin+' '+w.de).toLocaleLowerCase('de').includes(term)))}});
document.addEventListener('submit',e=>{e.preventDefault();let f=new FormData(e.target);if(e.target.id==='prefs'){const lesson=Number(f.get('lesson'));const scope=f.get('scope')==='current'?'current':'mix';if(lesson<1||lesson>lessonTitles.length)return;if(lesson!==state.lesson||scope!==state.scope)state.session=null;state.lesson=lesson;state.scope=scope}else if(e.target.id==='wordform'){const latin=f.get('latin').trim(),de=f.get('de').trim();if(!latin||!de){document.querySelector('#err').textContent='Bitte fülle beide Wörter aus.';return}if(bank().some(w=>w.latin?.toLowerCase()===latin.toLowerCase()&&w.de.toLowerCase()===de.toLowerCase())){document.querySelector('#err').textContent='Dieses Wortpaar ist schon vorhanden.';return}state.custom.push({id:'u'+crypto.randomUUID(),kind:'v',latin,de,lesson:Number(f.get('lesson'))})}else return;save();modal.close();render()});
modal.addEventListener('click',e=>{if(e.target===modal){const b=modal.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)modal.close()}});
upgradeMuseum();
window.addEventListener('hashchange',()=>{if(modal.open)modal.close();render()});window.addEventListener('pageshow',()=>render(false));render(false);
