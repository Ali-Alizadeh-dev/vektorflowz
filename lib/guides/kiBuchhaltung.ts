/**
 * Inhalte des Leitfadens „KI-Buchhaltung“ (nur Deutsch).
 * Die Prompts sind Vorlagen: Platzhalter in eckigen Klammern müssen vom
 * Leser ersetzt werden. Keine Steuer- oder Rechtsberatung.
 */

export const GUIDE_PATH = "/de/guides/ki-buchhaltung";

export const GUIDE_META = {
  title: "KI-Buchhaltung mit Lexware oder DATEV: Kostenloser Leitfaden | solvomind",
  description:
    "Schritt für Schritt: Claude per Chrome-Extension auf Ihre Buchhaltung in Lexware oder DATEV loslassen – inklusive Beispiel-Prompt, Sicherheitsregeln und dem Weg zum Agenten, der nachts allein arbeitet.",
};

/** Read-only-Einstieg: zum Testen, bevor der Agent etwas anlegt. */
export const PROMPT_TEST = `Du siehst gerade meine Buchhaltung im Browser: [LEXWARE ODER DATEV], Mandant [NAME].

Dieser Durchgang ist ein Test. Du änderst nichts, legst nichts an und klickst auf keinen Speichern-Knopf. Du schaust nur.

Öffne die offenen Eingangsrechnungen aus [MONAT/JAHR] und beschreib mir:
- wie viele unbearbeitete Belege dort liegen
- welche Felder das System je Beleg erwartet
- wie die letzten zehn Buchungen aussehen und welche Konten dabei verwendet wurden
- woran du erkennen würdest, dass ein Beleg schon erfasst ist

Sag mir danach in drei Sätzen, was du an diesem Ablauf zuverlässig übernehmen könntest und wo du dir unsicher wärst.`;

/** Hauptprompt: Belege vorerfassen, Freigabe bleibt beim Menschen. */
export const PROMPT_BOOKING = `Du arbeitest in meinem Browser und übernimmst die Vorerfassung meiner laufenden Buchhaltung.

KONTEXT
- System: [LEXWARE ODER DATEV], im Tab geöffnet und angemeldet
- Mandant: [NAME] – arbeite ausschließlich hier
- Zeitraum: [MONAT/JAHR]
- Belege liegen: [ORDNER / POSTFACH / BELEGUPLOAD IM SYSTEM]
- Kontenrahmen: [SKR03 / SKR04 / ANDERER]

AUFTRAG
Geh die noch nicht zugeordneten Eingangsrechnungen im Zeitraum durch. Für jeden Beleg:
1. Lies aus: Rechnungsdatum, Rechnungsnummer, Lieferant, Netto, Steuersatz, Umsatzsteuer, Brutto, Währung.
2. Prüfe auf Dubletten (gleiche Rechnungsnummer beim gleichen Lieferanten). Wenn der Beleg schon erfasst ist: überspringen und notieren.
3. Schlag Buchungskonto und Steuerschlüssel vor. Orientier dich an früheren Buchungen desselben Lieferanten im System. Gibt es keine, sag das ausdrücklich.
4. Ordne, soweit erkennbar, die passende Zahlung aus den Bankumsätzen zu.
5. Leg die Buchung als Entwurf bzw. Vorerfassung an. Buche nichts endgültig, schreib nichts fest und gib nichts frei.

REGELN
- Erfinde keinen Wert. Was unleserlich oder unklar ist, kommt auf den Stapel „Rückfragen“ – dann machst du mit dem nächsten Beleg weiter.
- Leg mir vor, statt selbst zu entscheiden: Beträge über [GRENZE] €, Auslandsrechnungen, Reverse-Charge, innergemeinschaftliche Erwerbe, Anzahlungen, Gutschriften, Bewirtung, Geschenke und alles, was nach Privatentnahme aussieht.
- Fass keine bereits gebuchten oder festgeschriebenen Vorgänge an. Keine Stammdaten ändern, keine Lieferanten anlegen, ohne zu fragen.
- Verlass den Mandanten [NAME] nicht und öffne keine anderen Bereiche des Systems.
- Arbeite in Blöcken von zehn Belegen und halt nach jedem Block an.

AUSGABE nach jedem Block als Tabelle:
Datum | Lieferant | Rechnungsnr. | Brutto | Konto (Vorschlag) | Steuerschlüssel | Sicherheit (hoch/mittel/niedrig) | Status (Entwurf / Rückfrage / Dublette)
Darunter: jeder unsichere Beleg mit einem Satz, was genau fehlt.

Bevor du anfängst: Sag mir, welche Angaben dir für diesen Zeitraum noch fehlen. Dann starte mit Block 1.`;

/** Was realistisch klappt – und was nicht. */
export const SPLIT: { ai: string[]; human: string[] } = {
  ai: [
    "Belegdaten auslesen und ins Formular übertragen",
    "Kontierung nach dem Muster früherer Buchungen vorschlagen",
    "Dubletten und fehlende Belege finden",
    "Bankumsätze und Rechnungen einander zuordnen",
    "Offene Posten und Mahnkandidaten zusammenstellen",
    "Den Monat vor der Abgabe auf Lücken durchsehen",
  ],
  human: [
    "Die Freigabe: gebucht wird erst nach Ihrem Blick darauf",
    "Zweifelsfälle bei Umsatzsteuer, Reverse-Charge und Auslandsbelegen",
    "Abgrenzungen, Anlagevermögen, Privatentnahmen",
    "Alles, was Ermessen braucht – und der Abschluss sowieso",
  ],
};

/** Vorbereitung vor dem ersten Lauf. */
export const PREP = [
  "Ein bezahlter Claude-Zugang (Pro, Max, Team oder Enterprise) – mit dem kostenlosen Konto läuft die Erweiterung nicht.",
  "Google Chrome am Rechner. Andere Browser und Handys werden nicht unterstützt.",
  "Ein Testmandant oder ein abgeschlossener Monat zum Üben. Nicht im laufenden Jahresabschluss anfangen.",
  "Ein eigener Benutzer im Buchhaltungssystem mit eingeschränkten Rechten, nicht Ihr Admin-Zugang.",
  "Kurz mit der Steuerkanzlei sprechen: Wer prüft was, und was darf vorerfasst werden?",
];

export const MISTAKES: [string, string][] = [
  ["Sofort im Echtmandanten starten.", "Nehmen Sie einen Testmandanten oder einen längst abgegebenen Monat. Die ersten zehn Belege zeigen Ihnen, wo der Prompt noch ungenau ist."],
  ["Mit dem Admin-Zugang arbeiten.", "Ein eigener Benutzer mit Rechten nur für Vorerfassung begrenzt den Schaden, wenn etwas schiefgeht – und macht im Protokoll sichtbar, was die Automatisierung getan hat."],
  ["Die Freigabe wegrationalisieren.", "Der Zeitgewinn liegt im Tippen, nicht im Prüfen. Wer die Kontrolle streicht, spart zehn Minuten und sucht später zwei Stunden."],
  ["Alles auf einmal automatisieren.", "Fangen Sie mit Eingangsrechnungen an. Bank, Ausgangsrechnungen und Mahnwesen kommen danach, jeweils mit eigenem Prompt."],
  ["Den Prompt nicht nachschärfen.", "Jede Rückfrage des Agenten ist ein Hinweis auf eine fehlende Regel. Schreiben Sie sie in den Prompt, dann kommt sie nicht wieder."],
];

export const CHECKLIST = [
  "Erweiterung installiert und mit dem Claude-Konto angemeldet",
  "Eigener Benutzer im Buchhaltungssystem mit eingeschränkten Rechten angelegt",
  "Lexware bzw. DATEV im Tab geöffnet, angemeldet, Mandant ausgewählt",
  "Zugriff auf genau diese Seite erlaubt – und nur auf diese",
  "Testlauf mit dem Lese-Prompt gemacht",
  "Buchungs-Prompt auf Mandant, Kontenrahmen und Betragsgrenze angepasst",
  "Ersten Block von zehn Belegen geprüft, bevor der nächste startet",
  "Mit der Steuerkanzlei geklärt, wer die Vorerfassung freigibt",
];
