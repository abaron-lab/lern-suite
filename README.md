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

Dann [localhost:8000](http://localhost:8000) öffnen. Atrium speichert den Lernfortschritt lokal im Browser. Jede Browser-Adresse hat ihren eigenen Lernstand.

### Grundlagen

Die Lektionstitel und Grammatikthemen folgen den [Arbeitsplänen des ROMA-A-Verlags](https://www.ccbuchner.de/produkt/roma-a-textband-3028). Die Vokabeln sind eine Auswahl für das Training. Die Schriftlizenzen stehen bei [DM Sans](atrium/assets/DM-Sans-OFL.txt) und [Baskervville](atrium/assets/Baskervville-OFL.txt).
