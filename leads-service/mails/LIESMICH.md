# Mailtexte

Jede Datei hier ist eine Mail. Text einfach ändern, dann auf den Server bringen
(siehe ../README.md, „Update nach Code-Änderungen“).

| Datei | Wer bekommt sie | Wann |
|---|---|---|
| `bestaetigung.md` | der Lead | direkt nach dem Eintragen im Guide |
| `willkommen.md` | der Lead | direkt nach dem Klick auf „Bestätigen“ |

## So ist eine Datei aufgebaut

- Zeile 1 `Betreff: …` und Zeile 2 `Vorschau: …` (der graue Text neben dem Betreff im Posteingang)
- danach eine Leerzeile und der Text. **Leerzeile = neuer Absatz.**
- `- ` am Zeilenanfang = Aufzählungspunkt
- `[Knopftext](Link)` allein in einer Zeile = Button (der erste ist grün, weitere weiß)
- `[Text](Link)` mitten im Satz = normaler Link
- `---` trennt die kleine graue Fußzeile ab

## Platzhalter

| Platzhalter | wird ersetzt durch |
|---|---|
| `{Anrede}` | „Hallo Thomas,“ – oder „Hallo,“ ohne Vornamen |
| `{Vorname}` | Vorname (kann leer sein) |
| `{Guide-Titel}` | z. B. „KI-Buchhaltung“ |
| `{Guide-Link}` | Adresse des Guides |
| `{Bestätigungslink}` | Link zum Bestätigen (nur in bestaetigung.md sinnvoll) |
| `{Abmeldelink}` | Link zum Abmelden |
| `{Terminlink}` | Cal.com-Buchungsseite |
| `{Impressum}`, `{Datenschutz}` | Links zu den Seiten auf solvomind.de |
| `{Tage}` | nach wie vielen Tagen Unbestätigte gelöscht werden (30) |

Werbung (Angebote, „Termin buchen“) gehört nur in Mails **nach** der Bestätigung,
nicht in `bestaetigung.md`.
