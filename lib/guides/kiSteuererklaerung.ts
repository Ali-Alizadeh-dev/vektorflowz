/**
 * Inhalte des Leitfadens „KI-Steuererklärung“ (nur Deutsch).
 * Die Prompts sind Vorlagen: Platzhalter in eckigen Klammern müssen vom
 * Leser ersetzt werden. Keine Steuer- oder Rechtsberatung.
 */

export const GUIDE_PATH = "/de/guides/ki-steuererklaerung";

export const GUIDE_META = {
  title: "Steuererklärung mit Claude und ELSTER: Kostenloser Leitfaden | solvomind",
  description:
    "Schritt für Schritt: Claude sammelt Belege aus Ordner, Postfach und Cloud, stellt die fehlenden Fragen und trägt die Werte in Mein ELSTER ein. Abgeschickt wird erst nach Ihrer Prüfung.",
};

/** Installation des Skills – zwei Wege, je nachdem, was einfacher ist. */
export const INSTALL_NPX = `npx claudepluginhub p/jawwadfirdousi-german-elster-tax-filing-german-elster-tax-filing`;

export const INSTALL_PLUGIN = `/plugin marketplace add jawwadfirdousi/agent-skills
/plugin install german-elster-tax-filing@agent-skills`;

/** Hauptprompt: sammelt, fragt nach, trägt ein – ohne abzusenden. */
export const PROMPT_FILING = `Nutze den Skill german-elster-tax-filing für meine Einkommensteuererklärung [JAHR].

1. Stell mir alle Fragen auf Deutsch, eine nach der anderen.
2. Durchsuche zuerst meinen verbundenen Ordner [ORDNERNAME]. Dort liegen meine
   Rechnungen, Belege und sonstigen Dokumente.
3. Suche zusätzlich über meine Konnektoren [z. B. Gmail, Google Drive, Dropbox, OneDrive]
   nach Rechnungen und Belegen aus [JAHR].
4. Frag mich nur nach dem, was du in meinen Unterlagen nicht findest.
5. Trag die Werte danach mit der Claude-Chrome-Erweiterung in Mein ELSTER ein.
   Sende nichts ab, bevor ich alles geprüft und freigegeben habe.`;

/** Gegenprobe: liest nur, verändert nichts. Vor dem Absenden. */
export const PROMPT_CHECK = `Du siehst meine Einkommensteuererklärung [JAHR] in Mein ELSTER. Ändere nichts und klick auf nichts, außer um zwischen den Seiten zu wechseln.

Geh jede ausgefüllte Anlage durch und erstell mir eine Tabelle:
Anlage | Zeile | eingetragener Wert | Beleg, aus dem der Wert stammt | Sicherheit (hoch/mittel/niedrig)

Danach drei Listen:
- Werte ohne Beleg oder nur aus meinen Antworten
- Werte, die du geschätzt oder gerundet hast
- Felder, die laut ELSTER-Prüfung noch Fehler oder Hinweise haben

Sende nichts ab.`;

/** Vorbereitung vor dem ersten Lauf. */
export const PREP = [
  "Ein bezahlter Claude-Zugang (Pro, Max, Team oder Enterprise). Mit dem kostenlosen Konto laufen weder Claude Code noch die Chrome-Erweiterung.",
  "Claude Code, entweder im Terminal oder in der Claude-Desktop-App. Dort wird der Skill installiert und der Ordner verbunden.",
  "Google Chrome mit der Erweiterung „Claude in Chrome“. Damit klickt sich Claude durch Mein ELSTER.",
  "Ein Konto bei Mein ELSTER mit Zertifikatsdatei und Passwort. Die Anmeldung machen Sie selbst, Claude bekommt Ihr Passwort nie.",
  "Ein Ordner auf dem Rechner, in dem alles liegt, was nicht im Postfach oder in der Cloud ist: Lohnsteuerbescheinigung, Spendenquittungen, Handwerkerrechnungen, Versicherungsnachweise.",
];

/** Wo die Belege üblicherweise liegen. */
export const SOURCES: [string, string][] = [
  ["Konnektoren.", "Gmail, Google Drive und weitere Dienste verbinden Sie einmalig in den Claude-Einstellungen unter „Konnektoren“. Welche Dienste es gibt, hängt von Ihrem Plan ab. Dort findet Claude Rechnungen, die per Mail kamen, und Unterlagen, die schon in der Cloud liegen."],
  ["Lokaler Ordner.", "Alles auf Papier oder verstreut auf dem Rechner: einscannen oder abfotografieren und in einen Ordner legen. Den Namen gibt es nicht vor – „Steuer 2025“ reicht. Claude Code starten Sie in genau diesem Ordner, dann kann es ihn lesen."],
  ["Mein ELSTER selbst.", "Viele Daten liegen dort schon: Lohnsteuerbescheinigung, Rentenbezüge, Kranken- und Pflegeversicherung. Über den Belegabruf kann ELSTER sie vorausfüllen. Claude soll diese Werte prüfen, nicht doppelt eintragen."],
];

/** Was realistisch klappt – und was nicht. */
export const SPLIT: { ai: string[]; human: string[] } = {
  ai: [
    "Belege aus Ordner, Postfach und Cloud zusammensuchen",
    "Beträge auslesen und nach Kategorie sortieren",
    "Nur das fragen, was in den Unterlagen fehlt",
    "Werte den Anlagen und Zeilen in ELSTER zuordnen",
    "Felder in Mein ELSTER ausfüllen",
    "Eine Gegenprobe mit Belegquelle je Wert liefern",
  ],
  human: [
    "Die Anmeldung bei ELSTER und der Klick auf „Absenden“",
    "Entscheidungen mit Ermessen: was absetzbar ist, wie aufgeteilt wird",
    "Gewerbe, Vermietung, Ausland und alles mit größeren Beträgen – besser mit Steuerberatung",
    "Die Verantwortung für die Angaben – die liegt immer bei Ihnen",
  ],
};

export const MISTAKES: [string, string][] = [
  ["Das Ergebnis für bare Münze nehmen.", "Der Skill liefert eine Schätzung und eine Zuordnung zu den Formularzeilen. Beides kann falsch sein, etwa wenn sich Zeilennummern im neuen Jahr geändert haben. Prüfen Sie jede Zeile gegen den Beleg."],
  ["Lücken stillschweigend füllen lassen.", "Fehlt ein Beleg, soll Claude nachfragen, nicht schätzen. Der Skill ist so gebaut, dass er fehlende Werte nicht als null annimmt. Schreiben Sie es trotzdem in den Prompt, wenn Sie eigene Regeln ergänzen."],
  ["Vorausgefüllte Daten doppelt eintragen.", "Lohnsteuerbescheinigung und Versicherungsbeiträge kommen oft schon über den Belegabruf. Wer sie zusätzlich von Hand einträgt, gibt sie doppelt an."],
  ["Den Ordner nicht aufräumen.", "Liegen Belege aus drei Jahren durcheinander, sucht Claude länger und greift eher daneben. Ein Ordner pro Steuerjahr, Dateinamen mit Datum und Absender, und die Treffer werden deutlich besser."],
  ["Komplexe Fälle allein machen.", "Für eine Arbeitnehmererklärung mit Werbungskosten und Spenden passt der Ablauf gut. Bei Gewerbe, Vermietung, Kapitalerträgen aus dem Ausland oder einem Firmenwagen gehört eine Steuerberaterin oder ein Steuerberater dazu."],
];

export const CHECKLIST = [
  "Claude Code installiert und mit einem bezahlten Konto angemeldet",
  "Skill german-elster-tax-filing installiert",
  "Chrome-Erweiterung installiert und mit Claude Code verbunden",
  "Postfach und Cloud-Speicher als Konnektoren verbunden",
  "Belegordner für das Steuerjahr angelegt und Claude Code darin gestartet",
  "Belegabruf in Mein ELSTER aktiviert",
  "Prompt mit Jahr, Ordnername und Konnektoren angepasst",
  "Selbst bei Mein ELSTER angemeldet, Erklärung für das richtige Jahr geöffnet",
  "Gegenprobe gemacht, jede Zeile gegen den Beleg geprüft",
  "Erst dann selbst auf „Absenden“ geklickt",
];
