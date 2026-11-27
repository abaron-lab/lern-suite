# Lern-Suite

## Atrium · Latein lernen

Atrium begleitet beide Bände von **ROMA A** (Lektionen 1–30) mit selbst erstellten Übungen zu Wortschatz und Grammatik. In der Übersicht lässt sich die aktuelle Unterrichtslektion einstellen. Die Vorauswahl ist **Lektion 9 „Flucht aus Pompeji“**.

- Acht Aufgaben pro Tagesrunde, mit Wiederholungen und eigenen Vokabeln.
- Ein Lernweg mit einem Siegel pro Lektion und einer Urkunde zum Abschluss.
- Wagenrennen, fünf weitere Minispiele, 45 römische Fundstücke und eine Galerie für eigene Bodenmosaike.

### Starten

Die [Offline-Datei](offline/Atrium-Latein.html) herunterladen und im Browser öffnen. Sie enthält alle für die App benötigten Dateien.

Die [Webfassung](atrium/) ist eine statische App ohne Build-Schritt. Zum lokalen Start im Repository ausführen:

```sh
python3 -m http.server --directory atrium 8000
```

Dann [localhost:8000](http://localhost:8000) öffnen. Im Gastmodus speichert Atrium den Lernfortschritt lokal im Browser und pro App-Adresse.

### Grundlagen

Die Lektionstitel und Grammatikthemen folgen den [Arbeitsplänen des ROMA-A-Verlags](https://www.ccbuchner.de/produkt/roma-a-textband-3028). Die Vokabeln sind eine Auswahl für das Training. Die Schriftlizenzen stehen bei [DM Sans](atrium/assets/DM-Sans-OFL.txt) und [Baskervville](atrium/assets/Baskervville-OFL.txt).

### Lernkonten einrichten

Lernkonten sind optional. Mit einer bestätigten E-Mail-Adresse und einem Passwort lässt sich derselbe Lernstand in der Webfassung auf mehreren Geräten nutzen. Bei einem neuen Konto kann der vorhandene Gast-Lernstand übernommen werden. Haben zwei Geräte zeitgleich unterschiedliche Änderungen gespeichert, fragt Atrium, welcher Stand weitergeführt werden soll.

1. Ein Supabase-Projekt anlegen und die [SQL-Migration](supabase/migrations/20261127000000_atrium_progress.sql) ausführen. Die Datenbankregeln erlauben jedem angemeldeten Konto nur den Zugriff auf den eigenen Lernstand.
2. Unter **Authentication → Sign In / Providers → Email** E-Mail-Anmeldung und **Confirm email** aktivieren. Für Registrierungen außerhalb des Projektteams einen eigenen SMTP-Absender konfigurieren. Die Standardvorlagen für die E-Mail-Bestätigung und das Zurücksetzen des Passworts verwenden den Bestätigungslink.
3. In **Authentication → URL Configuration** die HTTPS-Adresse der bereitgestellten App als **Site URL** und den vollständigen App-Pfad als zulässige Weiterleitung hinterlegen. Beim lokalen Test zum Beispiel `http://localhost:8000/` zusätzlich freigeben.
4. In [`atrium/account-config.js`](atrium/account-config.js) die Projekt-URL und den **Publishable Key** eintragen. Der Webclient lädt dann die fest versionierte Supabase-Bibliothek über jsDelivr und prüft dabei ihre Prüfsumme. Die Webfassung anschließend bereitstellen.

Ohne diese Konfiguration bleibt Atrium im Gastmodus. Die separate Offline-HTML speichert den Lernstand lokal. Das Lernkonto benötigt weder einen Namen noch das Geburtsdatum oder die Schule. Die E-Mail-Bestätigung prüft den Zugriff auf das angegebene Postfach.
