# Quizgame

## Idee

Dieses Projekt ist ein einfaches Quizspiel. Der Spieler beantwortet mehrere Fragen und erhält für jede richtige Antwort einen Punkt. Am Ende wird der erreichte Punktestand angezeigt.

Die erste Version bleibt bewusst übersichtlich, damit später weitere Fragen, Kategorien, Schwierigkeitsstufen oder Spielmodi ergänzt werden können.

Über den Mond-Button kann zwischen hellem und dunklem Design gewechselt werden. Die Auswahl wird im Browser gespeichert.

## Struktur

- `index.html` enthält die Oberfläche des Spiels.
- `style.css` enthält das responsive Design.
- `script.js` enthält die Fragen und die Spiellogik.

## Starten

Die Datei `index.html` kann direkt im Browser geöffnet werden. Alternativ kann im Projektordner ein lokaler Server gestartet werden:

```bash
python3 -m http.server 4173
```

Danach ist das Spiel unter `http://localhost:4173` erreichbar.
