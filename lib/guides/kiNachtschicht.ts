/**
 * Inhalte des Leitfadens „KI-Nachtschicht“ (nur Deutsch).
 * Die Prompts sind Vorlagen: Platzhalter in eckigen Klammern müssen vom
 * Leser ersetzt werden.
 *
 * Geprüft am 25.11.2026: github.com/krishhgg/Insomnia (README, docs/install.md,
 * skills/install-insomnia, Version v0.2.0), code.claude.com (Remote Control,
 * geplante Aufgaben).
 */

export const GUIDE_PATH = "/de/guides/ki-nachtschicht";

export const GUIDE_META = {
  title: "Claude arbeiten lassen, während der Laptop zu ist: Kostenloser Leitfaden mit Insomnia | solvomind",
  description:
    "Schritt für Schritt: Mit der kostenlosen Mac-App Insomnia arbeitet Claude Code weiter, auch wenn der Deckel zu ist. Installation, zwei Prompts, ehrliche Grenzen bei Akku, Hitze und Browser.",
};

export const REPO_URL = "https://github.com/krishhgg/Insomnia";

/** Installation über Claude Code, nach der Anleitung des Entwicklers. */
export const PROMPT_INSTALL = `Installiere die neueste stabile Version von Insomnia nach der Anleitung unter
https://github.com/krishhgg/Insomnia/blob/main/skills/install-insomnia/SKILL.md

Wenn ein Schritt mein Administratorpasswort braucht, gib mir den genauen Befehl,
den ich selbst im Terminal ausführe, und warte, bis ich Bescheid gebe.
Erklär mir vorher in zwei Sätzen, was der Installer an meinem Mac ändert.`;

/** Nachtschicht starten: Claude hält den Mac selbst wach und lässt ihn danach schlafen. */
export const PROMPT_NIGHT = `Bevor du anfängst: Starte eine Insomnia-Sitzung über [3] Stunden mit
~/Applications/Insomnia.app/Contents/MacOS/Insomnia --session start [10800]
und prüf mit --session status, dass sie läuft.

Aufgabe: [IHRE AUFGABE, z. B. „Erstell mit dem Skill angebot-erstellen Entwürfe
für alle Kundengespräche dieser Woche“]

Regeln:
- Arbeite nur im Ordner [ORDNER].
- Sende nichts, lösche nichts, kaufe nichts.
- Brauchst du eine Entscheidung von mir, schreib sie in [ORDNER]/Rückfragen.md
  und mach mit dem nächsten Teil weiter, statt zu warten.
- Führ [ORDNER]/Protokoll.md: Uhrzeit, Schritt, Ergebnis.
- Reicht die Zeit nicht, verlängere einmal mit --session extend [1800]
  und vermerke es im Protokoll.

Wenn du fertig bist, beende die Sitzung mit --session end, damit der Mac schlafen kann.`;

/** Am Morgen: Ergebnis abholen. */
export const PROMPT_MORNING = `Lies [ORDNER]/Protokoll.md und [ORDNER]/Rückfragen.md.

Fass in fünf Sätzen zusammen, was erledigt ist, was nicht und warum.
Stell mir danach die Rückfragen, eine nach der anderen.
Ändere nichts, bevor ich geantwortet habe.`;

/** Vorbereitung vor dem ersten Lauf. */
export const PREP = [
  "Ein MacBook mit Apple-Chip (M1 oder neuer) und macOS 26 oder neuer. Für Windows und ältere Macs gibt es Insomnia nicht.",
  "Claude Code im Terminal oder in der Claude-Desktop-App, mit einem bezahlten Claude-Zugang.",
  "Das Administratorpasswort Ihres Macs. Die Installation braucht es einmal.",
  "Am besten ein Netzteil. Auf Akku läuft es auch, aber Insomnia schaltet unter 40 % in den Stromsparmodus und beendet die Sitzung bei 10 %. Das sind die Standardwerte.",
  "Eine Aufgabe, die lange dauert und ohne Ihre Antworten zwischendurch auskommt.",
];

/** Was beim Zuklappen passiert. */
export const LID: [string, string][] = [
  ["Der Mac bleibt wach.", "Bildschirm und Tastaturbeleuchtung gehen aus, Claude Code und alle Programme im Hintergrund laufen weiter. Der Timer zählt weiter herunter."],
  ["Störende Apps werden angehalten.", "Slack, WhatsApp und Discord werden eingefroren, bis Sie den Deckel öffnen. Die Liste können Sie in den Einstellungen ändern."],
  ["Ton aus, Stromsparmodus an.", "Beides wird beim Öffnen zurückgesetzt."],
  ["Auf Wunsch wird der Bildschirm gesperrt.", "Ab Werk ist das aus. Wer den Mac im Büro stehen lässt, schaltet es ein."],
  ["Am Ende schläft der Mac.", "Läuft die Zeit ab, beendet Insomnia die Sitzung und schickt den Mac schlafen. Ist der Akku zu leer oder wird es zu heiß, passiert das früher."],
];

/** Aufgaben, die sich für die Nacht eignen. */
export const TASKS = [
  "Angebotsentwürfe für alle Kundengespräche der Woche vorbereiten",
  "Belege eines Quartals sortieren, umbenennen und Lücken auflisten",
  "Ausschreibungen oder Förderprogramme recherchieren und vergleichen",
  "Eine Kundenliste bereinigen: doppelte Einträge, fehlende Angaben, alte Adressen",
  "Alle Seiten Ihrer Website auf veraltete Preise und Angaben prüfen",
];

/** Was realistisch klappt – und was nicht. */
export const SPLIT: { ai: string[]; human: string[] } = {
  ai: [
    "Lange Aufgaben ohne Pause abarbeiten",
    "Die Insomnia-Sitzung selbst starten, verlängern und beenden",
    "Ein Protokoll über jeden Schritt führen",
    "Rückfragen sammeln, statt die Nacht über zu warten",
    "Den Mac nach getaner Arbeit schlafen lassen",
  ],
  human: [
    "Die Aufgabe klar abgrenzen",
    "Die Rechte vorher freigeben",
    "Den Mac ans Netzteil und auf eine feste Unterlage stellen",
    "Das Ergebnis am Morgen prüfen",
    "Alles, was das Haus verlässt",
  ],
};

export const MISTAKES: [string, string][] = [
  ["Den Laptop in die Tasche stecken.", "Ein Mac, der arbeitet, wird warm. In der Tasche kann die Wärme nicht weg. Der Entwickler schreibt ausdrücklich: feste, gut belüftete Unterlage, keine geschlossene Tasche. Insomnia bremst bei Hitze und hört bei kritischer Temperatur auf, aber darauf sollten Sie sich nicht verlassen."],
  ["Die Rechteabfragen vergessen.", "Claude Code fragt vor vielen Schritten, ob es darf. Steht die Frage um 23 Uhr auf dem Bildschirm, wartet Claude bis zum Morgen. Geben Sie die Werkzeuge, die die Aufgabe braucht, vorher frei und lassen Sie die Aufgabe kurz bei offenem Deckel anlaufen."],
  ["Aufgaben im Browser über Nacht laufen lassen.", "Chrome und andere Browser bremsen Fenster, die nicht sichtbar sind, und mit zugeklapptem Deckel ist keines sichtbar. Aufgaben mit der Chrome-Erweiterung können deshalb stocken. Insomnia bietet an, den Browser ohne diese Bremse neu zu starten. Ist der Bildschirm gesperrt, warten Agenten, die den Bildschirm bedienen, ganz."],
  ["Ohne Netzteil starten.", "Auf Akku läuft der Mac im Stromsparmodus langsamer, und bei 10 % ist Schluss. Für eine Nacht gehört das Netzteil dazu."],
  ["Eine riesige Aufgabe ohne Zwischenstände.", "Bricht die Nacht nach der Hälfte ab, wollen Sie wissen, wo. Lassen Sie Claude in Teilen arbeiten, jedes Ergebnis sofort speichern und ein Protokoll führen. Dann ist auch eine halbe Nacht nicht verloren."],
];

export const CHECKLIST = [
  "MacBook mit Apple-Chip und macOS 26 oder neuer",
  "Insomnia über Claude Code installiert, Passwortschritt selbst im Terminal gemacht",
  "Ersten Start in den Systemeinstellungen unter „Datenschutz & Sicherheit“ erlaubt",
  "Einstellungen geprüft: Verhalten beim Zuklappen, Akku-Grenzen, Bildschirmsperre",
  "Testlauf mit 15 Minuten und zugeklapptem Deckel gemacht, Protokoll gelesen",
  "Werkzeuge für die Aufgabe in Claude Code vorab freigegeben",
  "Prompt mit Aufgabe, Ordner und Dauer angepasst",
  "Mac am Netzteil, auf einer festen, freien Unterlage",
  "Am Morgen Protokoll und Rückfragen gelesen, Ergebnis geprüft",
];
