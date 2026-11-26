/**
 * Inhalte des Leitfadens „KI-Angebote“ (nur Deutsch).
 * Die Prompts und der Skill sind Vorlagen: Platzhalter in eckigen Klammern
 * müssen vom Leser ersetzt werden. Keine Rechtsberatung.
 *
 * Geprüft am 25.11.2026: docs.vexa.ai (MCP, Calendar Sync, README v0.12),
 * claudepluginhub.com (proposal-builder aus anthropics/knowledge-work-plugins),
 * code.claude.com (geplante Aufgaben in der Desktop-App).
 */

export const GUIDE_PATH = "/de/guides/ki-angebote";

export const GUIDE_META = {
  title: "Angebote mit Claude und Vexa schreiben lassen: Kostenloser Leitfaden | solvomind",
  description:
    "Schritt für Schritt: Vexa zeichnet Ihr Kundengespräch auf, Claude kennt Ihre Preise und Ihren Angebotsaufbau und legt nach dem Termin einen fertigen Entwurf in Ihren Ordner. Sie prüfen und senden.",
};

/** Vexa in der Cloud: Befehl aus der offiziellen Doku, Schlüssel als Platzhalter. */
export const INSTALL_VEXA_CLOUD = `claude mcp add --transport http vexa https://api.cloud.vexa.ai/mcp --header "Authorization: Bearer [IHR-VEXA-SCHLÜSSEL]" -s user`;

/** Vexa selbst betreiben: Server starten, dann denselben Befehl auf die eigene Adresse zeigen lassen. */
export const INSTALL_VEXA_SELF = `git clone https://github.com/Vexa-ai/vexa.git
cd vexa
make all

claude mcp add --transport http vexa http://localhost:18056/mcp --header "Authorization: Bearer [SCHLÜSSEL AUS make all]" -s user`;

/** Lokaler Angebotsordner als MCP-Server. */
export const INSTALL_FOLDER = `claude mcp add filesystem -s user -- npx -y @modelcontextprotocol/server-filesystem "[PFAD ZU IHREM ANGEBOTSORDNER]"`;

/** Kalender bei selbst betriebenem Vexa per API verbinden. */
export const CALENDAR_API = `curl -X POST "http://localhost:18056/user/calendars" \\
  -H "X-API-Key: [IHR-VEXA-SCHLÜSSEL]" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Kundentermine","ics_url":"[GEHEIME ICAL-ADRESSE]","auto_join":true,"bot_name":"Notizen [FIRMA]"}'`;

/** Offizieller Angebots-Skill von Anthropic, englisch, als Alternative. */
export const INSTALL_PROPOSAL_BUILDER = `/plugin marketplace add anthropics/knowledge-work-plugins
/plugin install small-business@knowledge-work-plugins`;

/** Eigener Angebots-Skill. Gehört nach ~/.claude/skills/angebot-erstellen/SKILL.md */
export const SKILL_TEMPLATE = `---
name: angebot-erstellen
description: Erstellt aus einem aufgezeichneten Kundengespräch (Vexa-Transkript) einen Angebotsentwurf nach meiner Vorlage und meiner Preisliste. Verwenden, wenn ein Verkaufs- oder Erstgespräch beendet ist oder nach einem Angebot gefragt wird.
---

# Angebot erstellen

## Quellen
- Gesprächsinhalt: Vexa, Werkzeug get_meeting_transcript. Nur das Gespräch lesen, um das es geht.
- Preise und Leistungen: [ORDNER]/Preisliste.[xlsx/pdf/md]
- Vorlage: [ORDNER]/Vorlage-Angebot.[docx/md]
- Beispiele: [ORDNER]/Beispiele/ – drei echte, gute Angebote von mir
- Bedingungen: [ORDNER]/Bedingungen.[pdf/md]

## Aufbau meiner Angebote
1. Anrede und ein Satz, der das Anliegen des Kunden in seinen Worten aufnimmt
2. Ausgangslage, so wie der Kunde sie im Gespräch geschildert hat
3. Leistungen als Positionen: Nr. | Leistung | Menge | Einheit | Einzelpreis | Gesamt
4. Ausdrücklich nicht enthalten
5. Zeitplan
6. Summe netto, [19 %] USt., Summe brutto
7. Gültigkeit [30 Tage], Zahlungsbedingungen [z. B. 50 % bei Auftrag, 50 % bei Abnahme]
8. Gruß mit [NAME, FIRMA]

## Regeln
- Preise nur aus der Preisliste oder aus vergleichbaren Beispielangeboten. Keinen Preis erfinden.
  Fehlt einer, setz [PREIS FEHLT] und nenn die Stelle in der Rückfrageliste.
- Rabatte nur, wenn ich sie im Gespräch selbst zugesagt habe.
- Was im Gespräch offen blieb (Menge, Termin, Umfang), nicht raten. Als Annahme
  ins Angebot schreiben und in der Rückfrageliste nennen.
- Ton: [Sie-Form, sachlich, kurze Sätze].
- Nichts versenden. Keine E-Mail an den Kunden, kein Entwurf im Postfach.

## Ablage
- Angebot: [ORDNER]/Entwürfe/[JJJJ-MM-TT]_[Kunde]_Angebot.[docx/md]
- Daneben: [JJJJ-MM-TT]_[Kunde]_Notiz.md mit einer Zusammenfassung des Gesprächs
  in fünf Sätzen, den verwendeten Preisen samt Quelle, allen Annahmen und den offenen Rückfragen.`;

/** Claude schreibt den Skill selbst aus echten Angeboten. */
export const PROMPT_BUILD_SKILL = `Lies die Angebote in [ORDNER]/Beispiele, meine Preisliste [DATEI] und meine Bedingungen [DATEI].

Schreib daraus einen Skill unter ~/.claude/skills/angebot-erstellen/SKILL.md.
Halte dich an diese Gliederung: Quellen, Aufbau meiner Angebote, Regeln, Ablage.

- Den Aufbau übernimmst du aus meinen Beispielen, nicht aus allgemeinen Mustern.
- Bei den Regeln gilt: keine erfundenen Preise, keine Rabatte ohne meine Zusage,
  nichts versenden.
- Was du aus den Beispielen nicht sicher ableiten kannst, fragst du mich vorher,
  eine Frage nach der anderen.

Zeig mir den Skill, bevor du ihn speicherst.`;

/** Geplante Aufgabe in der Claude-Desktop-App, z. B. stündlich zu Geschäftszeiten. */
export const PROMPT_TASK = `Prüf mit Vexa (list_meetings), welche Gespräche seit dem letzten Lauf beendet wurden.

Für jedes beendete Gespräch:
1. Schau in [ORDNER]/Entwürfe, ob es dazu schon ein Angebot gibt. Wenn ja: überspringen.
2. Lies das Transkript (get_meeting_transcript). Ist es kein Verkaufs- oder Erstgespräch
   mit einem Kunden, überspring es.
3. Sonst: Erstell mit dem Skill angebot-erstellen einen Angebotsentwurf und leg ihn
   samt Notiz in [ORDNER]/Entwürfe ab.

Führ [ORDNER]/Protokoll.md: Datum, Gespräch, was du getan oder warum du es übersprungen hast.
Sende nichts ab und schreib niemandem.`;

/** Von Hand anstoßen, für einzelne Gespräche. */
export const PROMPT_MANUAL = `Nutze den Skill angebot-erstellen für mein Gespräch mit [KUNDE] von [DATUM, UHRZEIT].
Hol das Transkript aus Vexa. Wenn mehrere Gespräche passen, frag mich, welches gemeint ist.
Danach zeig mir die Rückfrageliste.`;

/** Vorbereitung vor dem ersten Lauf. */
export const PREP = [
  "Ein bezahlter Claude-Zugang (Pro, Max, Team oder Enterprise) und die Claude-Desktop-App. Darin laufen Claude Code und die geplanten Aufgaben.",
  "Ein Vexa-Konto in der Cloud oder ein eigener Vexa-Server. Vexa ist quelloffen (Apache-2.0) und selbst betrieben kostenlos. In der Cloud gibt es Startguthaben, danach kostet die Aufzeichnung laut Anbieter rund 0,30 US-Dollar pro Stunde.",
  "Ihre Kundentermine als Videotermin mit Link zu Google Meet, Microsoft Teams oder Zoom. Telefonate und Termine vor Ort erfasst Vexa nicht.",
  "Ein Angebotsordner, lokal oder in der Cloud, mit Preisliste, Angebotsvorlage, Bedingungen und zwei bis drei echten Angeboten als Beispiel.",
  "Eine Antwort darauf, wie Sie Kunden um Erlaubnis für die Aufzeichnung bitten. Dazu unten mehr.",
];

/** Der Ablauf in einem Satz je Schritt. */
export const FLOW = [
  ["Kalender.", "Vexa liest Ihren Kalender über eine geheime iCal-Adresse und sieht, wann ein Kundentermin mit Videolink ansteht."],
  ["Aufzeichnung.", "Zum Terminbeginn tritt ein Vexa-Teilnehmer dem Gespräch bei und schreibt live mit, getrennt nach Sprechern."],
  ["Auslöser.", "Eine geplante Aufgabe in der Claude-Desktop-App schaut regelmäßig nach, ob ein Gespräch beendet ist."],
  ["Angebot.", "Claude liest das Transkript, nimmt Preise und Aufbau aus Ihrem Ordner und Ihrem Angebots-Skill und schreibt einen Entwurf."],
  ["Freigabe.", "Der Entwurf liegt mit einer Notiz zu Annahmen und Rückfragen in Ihrem Ordner. Sie prüfen, ändern und senden selbst."],
] as const;

/** Was in den Angebotsordner gehört. */
export const FOLDER = [
  ["Preisliste.", "Alle Leistungen mit Einheit und Preis. Eine Tabelle reicht. Je klarer die Bezeichnungen, desto seltener greift Claude daneben."],
  ["Vorlage.", "Ihr übliches Angebot als Word-Datei oder Text, mit allen festen Bausteinen: Kopf, Einleitung, Schlusstext."],
  ["Beispiele.", "Zwei bis drei echte Angebote, die Sie gut fanden. Daran lernt Claude Ton, Gliederung und wie Sie Positionen zusammenfassen."],
  ["Bedingungen.", "Zahlungsziel, Gültigkeit, Abschlagszahlungen, was grundsätzlich nicht enthalten ist."],
  ["Entwürfe.", "Ein leerer Unterordner. Hier legt Claude die fertigen Entwürfe ab."],
] as const;

/** Was realistisch klappt – und was nicht. */
export const SPLIT: { ai: string[]; human: string[] } = {
  ai: [
    "Dem Gespräch beitreten und mitschreiben",
    "Wünsche, Mengen und Termine aus dem Gespräch herausziehen",
    "Passende Positionen und Preise aus Ihrer Preisliste wählen",
    "Das Angebot in Ihrem Aufbau und Ton vorschreiben",
    "Annahmen und offene Fragen sauber auflisten",
    "Den Entwurf im richtigen Ordner ablegen",
  ],
  human: [
    "Die Erlaubnis zur Aufzeichnung einholen",
    "Preise, Rabatte und alles, was verhandelt wird",
    "Offene Punkte mit dem Kunden klären",
    "Den Entwurf prüfen, freigeben und absenden",
  ],
};

export const MISTAKES: [string, string][] = [
  ["Ohne Erlaubnis aufzeichnen.", "Das nicht öffentlich gesprochene Wort heimlich aufzunehmen ist in Deutschland strafbar, und die Aufzeichnung verarbeitet personenbezogene Daten. Kündigen Sie die Aufzeichnung in der Einladung an und fragen Sie zu Beginn noch einmal. Sagt jemand nein, nehmen Sie den Teilnehmer aus dem Gespräch. Das ist keine Rechtsberatung."],
  ["Den Teilnehmer in jeden Termin schicken.", "Vexa tritt jedem Kalendertermin mit Videolink bei, auch dem Teammeeting und dem Arztgespräch per Video. Verbinden Sie deshalb einen eigenen Kalender nur für Kundentermine, oder schalten Sie den automatischen Beitritt einzeln ab."],
  ["Eine alte Preisliste im Ordner lassen.", "Claude nimmt, was es findet. Liegen zwei Preislisten im Ordner, ist es Zufall, welche gilt. Eine aktuelle Liste, alte Stände in einen Archivordner."],
  ["Den Skill zu allgemein halten.", "„Schreib ein professionelles Angebot“ ergibt ein Angebot, das nicht nach Ihnen klingt, und Sie schreiben es neu. Je genauer Aufbau, Beispiele und Regeln, desto weniger ändern Sie danach."],
  ["Den Entwurf ungelesen weiterleiten.", "Claude kann sich verhören, eine Menge falsch zuordnen oder eine Position vergessen. Lesen Sie zuerst die Notiz mit Annahmen und Rückfragen, dann das Angebot."],
];

export const CHECKLIST = [
  "Claude-Desktop-App installiert und mit einem bezahlten Konto angemeldet",
  "Vexa-Konto angelegt oder eigenen Server gestartet, Schlüssel notiert",
  "Vexa per claude mcp add mit Claude verbunden",
  "Angebotsordner mit Preisliste, Vorlage, Bedingungen und Beispielen angelegt",
  "Ordner per MCP oder Konnektor mit Claude verbunden",
  "Eigener Kalender für Kundentermine mit Vexa verbunden",
  "Hinweis auf die Aufzeichnung in die Termineinladung aufgenommen",
  "Angebots-Skill erstellt und mit einem alten Gespräch getestet",
  "Geplante Aufgabe eingerichtet, einmal von Hand gestartet, Werkzeuge dauerhaft erlaubt",
  "Ersten echten Entwurf Zeile für Zeile gegen das Gespräch geprüft",
];
