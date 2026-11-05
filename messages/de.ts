import { PRODUCT } from "@/lib/site";

/**
 * Alle Texte der Startseite (Deutsch). Die englische Fassung in en.ts hat
 * exakt dieselbe Struktur. „[1]“ in Antworten wird als Quellen-Marker
 * gerendert, {name} sind Platzhalter.
 *
 * Schritte in Demos: [toolId, Beschriftung, Zähler]
 */
export const de = {
  meta: {
    title: `solvomind | ${PRODUCT}: KI-Agenten für Ihr ganzes Unternehmen`,
    description:
      "Firmenwissen, Tools und Teams an einem Ort, mit einem eigenen KI-Agenten für jede Abteilung. Persönlich umgesetzt und DSGVO-konform. Jetzt kostenloses Erstgespräch buchen.",
    ogLocale: "de_DE",
  },

  nav: {
    links: [
      { href: "#plattform", label: "Plattform" },
      { href: "#ablauf", label: "So funktioniert's" },
      { href: "#agenten", label: "Agenten" },
      { href: "#integrationen", label: "Integrationen" },
    ],
    cta: "Erstgespräch buchen",
    menu: "Menü öffnen",
    close: "Menü schließen",
    language: "Sprache",
    skip: "Zum Inhalt springen",
  },

  depts: {
    sales: { name: "Vertrieb", agent: "Vertriebs-Agent", line: "Zielkunden · Ansprache · Nachfassen" },
    marketing: { name: "Marketing", agent: "Marketing-Agent", line: "Inhalte · Kampagnen · Reichweite" },
    service: { name: "Kundenservice", agent: "Service-Agent", line: "Anfragen · Tickets · Wissen" },
    operations: { name: "Betrieb", agent: "Betriebs-Agent", line: "Projekte · Termine · Abläufe" },
    finance: { name: "Finanzen", agent: "Finanz-Agent", line: "Rechnungen · Zahlungen · Liquidität" },
    admin: { name: "Verwaltung", agent: "Verwaltungs-Agent", line: "Dokumente · Verträge · Fristen" },
    people: { name: "Personal", agent: "Personal-Agent", line: "Bewerbungen · Onboarding · Urlaub" },
    insights: { name: "Analyse", agent: "Analyse-Agent", line: "Kennzahlen · Berichte · Markt" },
  },

  hero: {
    titleA: "Ein KI-Team für",
    titleB: "Ihr ganzes Unternehmen.",
    sub: `Mit ${PRODUCT} bündeln wir Ihr Firmenwissen, Ihre Tools und Ihre Teams an einem Ort. Jede Abteilung bekommt einen eigenen KI-Agenten, der seine Antworten mit Quellen belegt, DSGVO-konform arbeitet und zu Ihren Abläufen passt.`,
    cta: "Kostenloses Erstgespräch",
    cta2: "So funktioniert's",
    try: "Probieren:",
    placeholder: "Fragen Sie Ihr Unternehmen …",
    send: "Senden",
    searching: "Durchsucht {n} Quellen",
    meta: "{n} Quellen · 1,4 s",
    asked: "Sie fragten",
    statusAsking: "Fragt …",
    statusThinking: "Denkt nach …",
    statusAnswering: "Antwortet …",
    statusDone: "Beantwortet in 1,4 s",
    caption: "FIRMENWISSEN",
    demos: [
      {
        dept: "sales",
        q: "Welches Angebot haben wir der Müller GmbH geschickt?",
        tools: ["googledrive", "gmail", "hubspot"],
        a: "Am 12. September ging Angebot A-2041 über 18.400 € an die Müller GmbH [1]. Herr Kaya hat am 19. nachgefragt [2], der Deal steht in HubSpot auf „Verhandlung“ [3].",
        sources: [["googledrive", "Angebot A-2041.pdf"], ["gmail", "Re: Ihr Angebot"], ["hubspot", "Deal · Müller GmbH"]],
      },
      {
        dept: "service",
        q: "Welche Fragen kamen diese Woche am häufigsten?",
        tools: ["zendesk", "gmail", "notion"],
        a: "Am häufigsten ging es um Lieferzeiten (41 Anfragen) [1] und um Rechnungskopien (23) [2]. Für beides gibt es schon Antworten in Ihrer Wissensbasis [3].",
        sources: [["zendesk", "Tickets · KW 45"], ["gmail", "Service-Postfach"], ["notion", "FAQ intern"]],
      },
      {
        dept: "finance",
        q: "Welche Rechnungen sind seit über 30 Tagen offen?",
        tools: ["datev", "stripe", "gmail"],
        a: "Sechs Rechnungen sind über 30 Tage offen, zusammen 21.300 € [1]. Zwei Kunden haben schon eine Erinnerung erhalten [2]. Die übrigen Mahnungen sind vorbereitet und warten auf Ihre Freigabe.",
        sources: [["datev", "Offene Posten"], ["gmail", "Zahlungserinnerungen"]],
      },
      {
        dept: "marketing",
        q: "Welcher Beitrag hat letzten Monat die meisten Anfragen gebracht?",
        tools: ["googleanalytics", "linkedin", "mailchimp"],
        a: "Die Fallstudie zur Lagerautomatisierung brachte 38 von 112 Anfragen [1]. LinkedIn-Beiträge mit Kundenzitat wurden doppelt so oft geklickt [2], der Oktober-Newsletter brachte weitere 21 [3].",
        sources: [["googleanalytics", "Anfragen · Oktober"], ["linkedin", "Beitrags-Statistik"], ["mailchimp", "Newsletter Oktober"]],
      },
    ],
  },

  band: { label: "Arbeitet mit den Tools, die Sie schon nutzen" },

  how: {
    eyebrow: "So funktioniert's",
    title: "Verbinden. Analysieren. Arbeiten lassen.",
    connectLabel: "Mit einem Klick verbinden",
    connect: "Verbinden",
    connected: "Verbunden",
    auditLabel: "Prozess-Analyse",
    audited: "{n} von 8 analysiert",
    workLabel: "Agenten bei der Arbeit",
    status: { queued: "Wartet", working: "Läuft", done: "Fertig" },
    workRows: [
      { dept: "sales", job: "Erstansprache schreiben", result: "12 Entwürfe erstellt" },
      { dept: "finance", job: "Mahnungen vorbereiten", result: "6 Mahnungen bereit" },
      { dept: "service", job: "Tickets beantworten", result: "18 Antworten vorbereitet" },
    ],
    steps: [
      { title: "Tools verbinden", text: "Wir binden E-Mail, Dateien, CRM und Buchhaltung an. Ab dem ersten Tag wächst daraus Ihr gemeinsames Firmenwissen." },
      { title: "Prozesse analysieren", text: "Wir gehen gemeinsam Abteilung für Abteilung durch und finden die Aufgaben, bei denen KI am meisten Zeit spart." },
      { title: "Agenten arbeiten lassen", text: "Ihre Agenten übernehmen wiederkehrende Aufgaben. Wichtige Schritte geben weiterhin Sie frei." },
    ],
  },

  features: {
    eyebrow: `Was ${PRODUCT} kann`,
    title: "Kennt Ihr Unternehmen.\nErledigt die Arbeit.",
    answers: {
      title: "Antworten mit Quellen.",
      text: "Stellen Sie jede Frage zu Ihrem Unternehmen. Jede Antwort verweist auf die Datei, E-Mail oder den Datensatz, aus dem sie stammt.",
      q: "Welche Zahlungsziele haben wir mit Becker & Sohn vereinbart?",
      steps: [["googledrive", "Google Drive durchsucht", "14 Dateien"], ["gmail", "Verlängerung gelesen", "6 E-Mails"], ["datev", "Rechnungen in DATEV geprüft", "2 Belege"]],
      answered: "Aus 3 Quellen beantwortet",
      a: "30 Tage netto, 2 % Skonto bei Zahlung innerhalb von 10 Tagen [1]. Das gilt seit der Verlängerung im März [2], die letzten beiden Rechnungen kamen pünktlich [3].",
      sources: [["Rahmenvertrag v3.pdf", "Seite 4"], ["Re: Verlängerung", "12. März"], ["RE-2207, RE-2231", "DATEV"]],
      followup: "Rückfrage stellen …",
    },
    agents: {
      title: "Ein Agent für jede Abteilung.",
      text: "Acht Agenten, einer pro Abteilung. Jeder bringt die Skills für seine Aufgaben mit.",
      running: "Aktiv",
      skills: "Skills",
      counts: [18, 14, 16, 15, 17, 12, 10, 11],
    },
    models: {
      title: "Freie Modellwahl.",
      text: "Claude, GPT, Gemini oder Mistral: Sie wählen für jede Aufgabe das Modell, dem Sie vertrauen. Auf Wunsch läuft es in Europa oder auf Ihren eigenen Servern.",
      label: "Modell für diesen Skill",
      more: "+ weitere Modelle",
      runs: "Ausführungen diesen Monat",
      runsCount: "1.284",
    },
    spend: {
      title: "Volle Kostenkontrolle.",
      text: "Legen Sie ein Monatsbudget fest und sehen Sie jederzeit, was jede Abteilung verbraucht.",
      of: "von 600 € diesen Monat",
      pause: "Bei Limit pausieren",
    },
    skills: {
      title: "Skills auf einem Baum.",
      text: "Jede Aufgabe ist ein Skill. Wählen Sie ihn aus der Bibliothek oder beschreiben Sie ihn in eigenen Worten.",
      tag: "Vertrieb · Neuer Skill",
      name: "Nach jedem Termin nachfassen",
      rows: [["WENN", "Ein Kundentermin endet"], ["DANN", "Follow-up aus dem Protokoll entwerfen"], ["UND", "Zur Freigabe an Slack schicken"]],
    },
    dashboards: {
      title: "Dashboards, die live bleiben.",
      text: "Lassen Sie sich eine Übersicht Ihrer Zahlen erstellen und behalten Sie sie. Sie aktualisiert sich automatisch aus Ihren Tools.",
      live: "Live",
      k1: { label: "Offene Leistungen", note: "12 Rechnungen versandbereit" },
      k2: { label: "Zahlungseingang, 30 Tage", note: "aus DATEV und Stripe" },
    },
    private: {
      title: "Private Verbindungen.",
      text: "Verbinden Sie Ihr eigenes Postfach, Ihren Kalender oder Ihre Ablage. Was der Agent dort liest, sehen nur Sie.",
      connecting: "Verbinde …",
      only: "Nur Sie",
      team: "Ganzes Team",
      rows: [["gmail", "sam@ihrefirma.de", "only"], ["outlook", "Postfach und Kalender", "only"], ["onedrive", "Ihre Dateien", "only"], ["sharepoint", "Firmenseiten", "team"], ["teams", "Öffentliche Kanäle", "team"]],
    },
    mcp: {
      title: "Auch in Claude oder ChatGPT.",
      text: `Über MCP steht Ihr gesamtes Firmenwissen direkt in dem Assistenten bereit, den Sie ohnehin nutzen.`,
      connected: "Verbunden über MCP",
      q: "Was hat der Vertrieb diese Woche abgeschlossen?",
      searching: "Durchsucht Ihr Unternehmen",
      a: "Zwei Abschlüsse: Müller GmbH Phase 2 über 48.600 € und Studio Lumen über 12.400 €. Beide sind in HubSpot als gewonnen markiert.",
      chips: [["hubspot", "HubSpot · Gewonnen"], ["gmail", "Gmail · 2 Verläufe"]],
      reply: "Im Assistenten antworten",
    },
  },

  team: {
    eyebrow: "Agenten",
    title: "Lernen Sie Ihr Team kennen.",
    sub: "So sieht ein typisches Team aus: ein Agent pro Abteilung, das mit Ihrem Unternehmen wächst. Wählen Sie eine Abteilung und eine Aufgabe und schauen Sie zu.",
    startWith: "Starten mit",
    teamsOnTree: "Teams auf dem Baum",
    worksWith: "Arbeitet mit",
    used: "Genutzt",
    working: "Arbeitet …",
    done: "Fertig",
    message: "Nachricht an den {agent}",
    user: "SL",
    depts: {
      sales: {
        teams: [["Zielkunden", 4], ["Recherche", 5], ["Ansprache", 4], ["Nachfassen", 3]],
        tools: ["hubspot", "linkedin", "gmail", "googlesheets"],
        jobs: [
          { title: "Zielkundenliste erstellen", prompt: "Finde Handwerksbetriebe in Hamburg mit 20 bis 80 Mitarbeitenden.", steps: [["linkedin", "LinkedIn und Firmenregister durchsucht", "214 Firmen"], ["hubspot", "Mit Ihrem Idealkunden abgeglichen", "48 Treffer"]], a: "48 Betriebe passen zu Ihrem Idealkunden [1], bei 31 ist die Geschäftsführung namentlich bekannt [2].", result: "Zielkundenliste fertig", lines: ["48 Firmen, 31 mit Ansprechpartner", "In HubSpot gespeichert · Q4-Ziele"] },
          { title: "Persönliche Erstansprache schreiben", prompt: "Schreib Erstansprachen für die Q4-Zielkunden.", steps: [["hubspot", "Zielkunden aus HubSpot geladen", "48 Firmen"], ["googledocs", "In Ihrem Tonfall formuliert", "48 Entwürfe"]], a: "Jede Nachricht greift ein aktuelles Projekt der Firma auf [1] und folgt Ihrem Leitfaden für die Erstansprache [2].", result: "48 Entwürfe bereit", lines: ["Zur Prüfung in HubSpot-Sequenzen", "„Ihr Umbau am Hafen ist uns aufgefallen …“"] },
          { title: "Nachfass-Sequenzen starten", prompt: "Fasse bei allen nach, die seit 5 Tagen nicht geantwortet haben.", steps: [["gmail", "Offene Verläufe geprüft", "63 Verläufe"], ["hubspot", "Nachfass-Termine geplant", "19 Kontakte"]], a: "19 Kontakte bekommen eine zweite Nachricht [1]. Sobald jemand antwortet, stoppt die Sequenz automatisch [2].", result: "19 Nachfassungen geplant", lines: ["Versand Di bis Do, 9 bis 11 Uhr", "Stoppt bei jeder Antwort"] },
        ],
      },
      marketing: {
        teams: [["Inhalte", 5], ["Social Media", 4], ["Newsletter", 3], ["SEO", 2]],
        tools: ["linkedin", "mailchimp", "googleanalytics", "meta"],
        jobs: [
          { title: "Beiträge für die Woche planen", prompt: "Plane fünf LinkedIn-Beiträge zu unserer neuen Fallstudie.", steps: [["googledrive", "Fallstudie und Kundenzitate gelesen", "3 Dokumente"], ["linkedin", "Beste Posting-Zeiten ermittelt", "90 Tage"]], a: "Fünf Beiträge mit unterschiedlichem Einstieg sind entworfen [1], terminiert auf die Zeiten mit der höchsten Reichweite [2].", result: "5 Beiträge eingeplant", lines: ["Mo bis Fr, jeweils 8:30 Uhr", "Warten auf Ihre Freigabe"] },
          { title: "Newsletter entwerfen", prompt: "Entwirf den November-Newsletter aus den Neuigkeiten des Monats.", steps: [["notion", "Neuigkeiten aus Notion gesammelt", "7 Einträge"], ["mailchimp", "Vorlage und Liste vorbereitet", "1.240 Empfänger"]], a: "Der Newsletter hat drei Themen und einen klaren Aufruf zum Erstgespräch [1]. Betreffzeilen in zwei Varianten für den A/B-Test liegen bei [2].", result: "Newsletter-Entwurf fertig", lines: ["2 Betreffzeilen zum Testen", "Versand geplant: Di, 10 Uhr"] },
          { title: "Kampagnen auswerten", prompt: "Welche Kampagne hat im Oktober am meisten gebracht?", steps: [["googleanalytics", "Anfragen nach Quelle ausgewertet", "112 Anfragen"], ["meta", "Anzeigenkosten abgeglichen", "4 Kampagnen"]], a: "Die Fallstudien-Kampagne lag mit 9,80 € pro Anfrage vorn [1], die Image-Anzeigen kosteten fast das Dreifache [2].", result: "Bericht erstellt", lines: ["Empfehlung: Budget umschichten", "Als PDF in Drive abgelegt"] },
        ],
      },
      service: {
        teams: [["Anfragen", 5], ["Tickets", 4], ["Wissen", 3], ["Bewertungen", 2]],
        tools: ["zendesk", "gmail", "whatsapp", "notion"],
        jobs: [
          { title: "Neue Tickets beantworten", prompt: "Beantworte die neuen Tickets aus der Nacht.", steps: [["zendesk", "Neue Tickets gelesen", "23 Tickets"], ["notion", "Passende Antworten im Wissen gefunden", "18 Treffer"]], a: "18 Tickets haben eine fertige Antwort aus Ihrer Wissensbasis [1]. Fünf brauchen einen Menschen und sind dem Team zugewiesen [2].", result: "18 Antworten vorbereitet", lines: ["5 Tickets ans Team übergeben", "Ø Antwortzeit: 4 Minuten"] },
          { title: "Häufige Fragen ins Wissen übernehmen", prompt: "Welche Fragen fehlen noch in unserer FAQ?", steps: [["zendesk", "Tickets der letzten 30 Tage gruppiert", "412 Tickets"], ["notion", "Mit der FAQ abgeglichen", "26 Artikel"]], a: "Sieben häufige Fragen haben noch keinen Artikel [1]. Entwürfe dafür liegen in Notion zur Prüfung bereit [2].", result: "7 neue FAQ-Artikel", lines: ["Entwürfe in Notion", "Deckt 14 % der Tickets ab"] },
          { title: "Auf Bewertungen antworten", prompt: "Antworte auf die neuen Google-Bewertungen.", steps: [["gmail", "Neue Bewertungen erfasst", "9 Bewertungen"], ["notion", "Tonalität aus dem Leitfaden übernommen", "1 Leitfaden"]], a: "Für alle neun Bewertungen gibt es eine persönliche Antwort [1]. Die zwei kritischen sind markiert und gehen an Sie [2].", result: "9 Antworten entworfen", lines: ["2 kritische zur Prüfung", "7 freigabebereit"] },
        ],
      },
      operations: {
        teams: [["Projekte", 4], ["Termine", 4], ["Material", 3], ["Qualität", 4]],
        tools: ["asana", "googlecalendar", "slack", "googlesheets"],
        jobs: [
          { title: "Neues Projekt anlegen", prompt: "Lege das Projekt für die Müller GmbH an.", steps: [["asana", "Projektvorlage angewendet", "12 Aufgaben"], ["googlecalendar", "Auftakttermin gebucht", "Di, 10 Uhr"]], a: "Das Projekt steht mit allen Aufgaben und Zuständigkeiten [1]. Der Auftakttermin ist im Kalender aller Beteiligten [2].", result: "Projekt startklar", lines: ["12 Aufgaben verteilt", "Auftakt: Dienstag, 10 Uhr"] },
          { title: "Wöchentlichen Statusbericht senden", prompt: "Schick den Kunden ihren Wochenstatus.", steps: [["asana", "Fortschritt aller Projekte geprüft", "8 Projekte"], ["gmail", "Berichte formuliert", "8 E-Mails"]], a: "Jeder Kunde bekommt einen kurzen Bericht mit erledigten und nächsten Schritten [1]. Zwei Verzögerungen sind offen benannt [2].", result: "8 Berichte versandbereit", lines: ["2 Verzögerungen markiert", "Versand nach Ihrer Freigabe"] },
          { title: "Engpässe erkennen", prompt: "Wo hakt es diese Woche?", steps: [["asana", "Überfällige Aufgaben gesucht", "14 Aufgaben"], ["slack", "Rückfragen im Team gelesen", "3 Kanäle"]], a: "Drei Projekte warten auf Material [1], zwei auf Freigaben vom Kunden [2]. Die Verantwortlichen sind informiert.", result: "Engpass-Übersicht fertig", lines: ["5 Projekte betroffen", "In Slack geteilt"] },
        ],
      },
      finance: {
        teams: [["Zahlungseingang", 4], ["Berichte", 3], ["Buchhaltung", 4], ["Liquidität", 2]],
        tools: ["datev", "stripe", "gmail", "googlesheets"],
        jobs: [
          { title: "Offene Rechnungen anmahnen", prompt: "Mahne alle Rechnungen an, die über 30 Tage offen sind.", steps: [["datev", "Offene Posten in DATEV geprüft", "14 Rechnungen"], ["gmail", "Frühere Erinnerungen gelesen", "6 Verläufe"]], a: "Sechs Rechnungen sind über 30 Tage offen, zusammen 21.300 € [1]. Die Erinnerungen sind in Ihrem Ton formuliert und gehen von Ihrem Postfach aus [2].", result: "6 Mahnungen vorbereitet", lines: ["21.300 € offen", "Versand aus Ihrem Postfach"] },
          { title: "Marge pro Kunde berichten", prompt: "Wie hoch war die Marge pro Kunde im Oktober?", steps: [["datev", "Umsätze und Kosten zugeordnet", "38 Kunden"], ["googlesheets", "Stunden aus der Zeiterfassung geladen", "1.120 Std."]], a: "Die durchschnittliche Marge lag bei 34 % [1]. Drei Kunden liegen unter 15 %, vor allem wegen ungeplanter Zusatzstunden [2].", result: "Margen-Bericht fertig", lines: ["3 Kunden unter 15 %", "Als Tabelle in Drive"] },
          { title: "Monatsabschluss vorbereiten", prompt: "Bereite den Monatsabschluss für Oktober vor.", steps: [["stripe", "Zahlungen mit Konto abgeglichen", "412 Buchungen"], ["datev", "Belege zugeordnet", "389 Belege"]], a: "412 Buchungen sind abgeglichen [1]. Drei Belege fehlen noch, darunter eine Stripe-Auszahlung über 2.400 € [2].", result: "Abschluss vorbereitet", lines: ["3 Punkte zur Prüfung", "Bericht an die Steuerkanzlei"] },
        ],
      },
      admin: {
        teams: [["Dokumente", 4], ["Verträge", 3], ["Fristen", 3], ["Post", 2]],
        tools: ["googledrive", "docusign", "outlook", "notion"],
        jobs: [
          { title: "Eingangspost sortieren", prompt: "Sortiere die eingescannte Post von heute.", steps: [["googledrive", "Scans gelesen und erkannt", "27 Dokumente"], ["outlook", "An zuständige Personen verteilt", "6 Personen"]], a: "Alle 27 Dokumente sind erkannt und abgelegt [1]. Zwei Schreiben haben eine Frist und stehen oben auf Ihrer Liste [2].", result: "Post verteilt", lines: ["2 Fristen markiert", "Abgelegt nach Ihrem Ordnersystem"] },
          { title: "Vertragsfristen überwachen", prompt: "Welche Verträge laufen in den nächsten 90 Tagen aus?", steps: [["googledrive", "Verträge durchsucht", "64 Verträge"], ["notion", "Fristenliste aktualisiert", "5 Fristen"]], a: "Fünf Verträge laufen in den nächsten 90 Tagen aus [1], bei zweien endet die Kündigungsfrist schon in drei Wochen [2].", result: "Fristen-Übersicht fertig", lines: ["2 dringend", "Erinnerungen im Kalender"] },
          { title: "Angebot zur Unterschrift senden", prompt: "Schick das Angebot A-2041 zur Unterschrift.", steps: [["googledrive", "Finale Version gefunden", "Angebot A-2041"], ["docusign", "Signatur-Umschlag erstellt", "2 Unterzeichner"]], a: "Das Angebot ist zur digitalen Unterschrift unterwegs [1]. Sie bekommen Bescheid, sobald beide Seiten unterschrieben haben [2].", result: "Zur Unterschrift versendet", lines: ["2 Unterzeichner", "Erinnerung nach 3 Tagen"] },
        ],
      },
      people: {
        teams: [["Bewerbungen", 3], ["Onboarding", 3], ["Abwesenheiten", 2], ["Wissen", 2]],
        tools: ["personio", "gmail", "googlecalendar", "notion"],
        jobs: [
          { title: "Bewerbungen vorsortieren", prompt: "Sortiere die Bewerbungen für die Projektleitung vor.", steps: [["personio", "Bewerbungen gelesen", "37 Bewerbungen"], ["notion", "Mit dem Anforderungsprofil abgeglichen", "1 Profil"]], a: "Neun Bewerbungen erfüllen alle Muss-Kriterien [1]. Für jede gibt es eine kurze Zusammenfassung mit Stärken und offenen Fragen [2].", result: "9 Kandidaten vorgeschlagen", lines: ["Zusammenfassungen in Personio", "Entscheidung bleibt bei Ihnen"] },
          { title: "Onboarding vorbereiten", prompt: "Bereite das Onboarding für Lena ab dem 1. Dezember vor.", steps: [["notion", "Onboarding-Plan erstellt", "14 Schritte"], ["googlecalendar", "Einführungstermine gebucht", "5 Termine"]], a: "Lenas erste zwei Wochen sind geplant [1]. Zugänge sind beantragt und das Team ist informiert [2].", result: "Onboarding startklar", lines: ["5 Einführungstermine", "Zugänge beantragt"] },
          { title: "Fragen zum Urlaub beantworten", prompt: "Wie viele Urlaubstage hat das Team noch übrig?", steps: [["personio", "Urlaubskonten gelesen", "22 Personen"], ["googlecalendar", "Geplante Abwesenheiten geprüft", "Dezember"]], a: "Im Schnitt sind noch 6 Tage offen [1]. In der Woche vor Weihnachten sind schon 9 von 22 Personen abwesend [2].", result: "Übersicht erstellt", lines: ["Engpass KW 51", "Hinweis an die Teamleitung"] },
        ],
      },
      insights: {
        teams: [["Kennzahlen", 3], ["Berichte", 3], ["Markt", 3], ["Wettbewerb", 2]],
        tools: ["googleanalytics", "googlesheets", "hubspot", "postgresql"],
        jobs: [
          { title: "Wochenbericht für die Geschäftsführung", prompt: "Erstelle den Wochenbericht für die Geschäftsführung.", steps: [["hubspot", "Pipeline und Abschlüsse geladen", "42 Deals"], ["googlesheets", "Kennzahlen zusammengeführt", "4 Quellen"]], a: "Umsatz liegt 8 % über Plan [1], die Pipeline ist um 60.000 € gewachsen [2]. Auffällig: Die Antwortzeit im Service ist gestiegen [3].", result: "Wochenbericht fertig", lines: ["1 Seite, 6 Kennzahlen", "Per E-Mail um 8 Uhr"] },
          { title: "Wettbewerber beobachten", prompt: "Was haben unsere Wettbewerber diesen Monat verändert?", steps: [["googledocs", "Websites und Preislisten verglichen", "5 Anbieter"], ["linkedin", "Neuigkeiten gesammelt", "12 Meldungen"]], a: "Zwei Anbieter haben ihre Preise erhöht [1], einer bietet jetzt ein Paket für Handwerksbetriebe an [2].", result: "Wettbewerbs-Update fertig", lines: ["2 Preisänderungen", "1 neues Angebot"] },
          { title: "Abweichungen erklären", prompt: "Warum sind die Anfragen im Oktober gesunken?", steps: [["googleanalytics", "Besucher und Quellen verglichen", "2 Monate"], ["postgresql", "Anfragen aus der Datenbank geladen", "1.904 Einträge"]], a: "Der Rückgang kommt fast vollständig aus Google-Anzeigen, die am 9. Oktober pausiert wurden [1]. Organische Anfragen sind sogar gestiegen [2].", result: "Ursache gefunden", lines: ["Anzeigen pausiert seit 9.10.", "Organisch +12 %"] },
        ],
      },
    },
  },

  integrations: {
    eyebrow: "Integrationen",
    title: "Verbindet sich mit Ihren Tools.",
    sub: "Nach Einsatzbereich sortiert. Fehlt Ihr Tool, bauen wir die Anbindung.",
    all: "Alle",
    cats: {
      project: "Projekte", finance: "Finanzen", mail: "E-Mail", comms: "Kommunikation", crm: "CRM & Service",
      storage: "Ablage", docs: "Dokumente", scheduling: "Termine & Formulare", marketing: "Marketing & Shop", data: "Daten & Automatisierung",
    },
    prev: "Zurück",
    next: "Weiter",
    page: "Seite {n}",
    missingTitle: "Ihr Tool ist nicht dabei?",
    missingText: "Sagen Sie uns, welches Sie nutzen. Wir bauen die Anbindung.",
    missingCta: "Anbindung anfragen",
  },

  founder: {
    eyebrow: "Über uns",
    title: "Wer für Ihr Ergebnis verantwortlich ist.",
    name: "Ali Alizadeh",
    role: "Gründer",
    bio: [
      "Ali Alizadeh hat solvomind in Hamburg gegründet und begleitet jedes Projekt persönlich, von der ersten Analyse bis zum laufenden Betrieb.",
      "Sie haben damit einen Ansprechpartner, der Ihr Unternehmen kennt, die Lösung selbst entwickelt und auch danach erreichbar bleibt.",
    ],
    principles: {
      eyebrow: "Prinzipien",
      title: "Woran Sie uns messen können.",
      items: [
        ["Direkter Draht", "Sie sprechen immer mit der Person, die Ihr Projekt umsetzt. Per Telefon, E-Mail oder Video."],
        ["Auf Ihren Systemen", "Wir bauen auf den Tools auf, die Sie schon nutzen, statt alles neu aufzusetzen."],
        ["Ein Mensch gibt frei", "Die Automatisierung übernimmt die Routine. Wichtige Entscheidungen bestätigt immer jemand aus Ihrem Team."],
        ["Erfolg vorher festgelegt", "Vor Projektbeginn legen wir gemeinsam fest, woran wir den Erfolg messen."],
      ],
      cta: "Erstgespräch buchen",
    },
  },

  data: {
    eyebrow: "Ihre Daten",
    title: "Ihre Daten bleiben Ihre Daten.",
    items: [
      ["Kein Training mit Ihren Daten", "Ihre Inhalte werden nie zum Trainieren von KI-Modellen verwendet."],
      ["Privat pro Person", "Persönliche Verbindungen sieht nur die Person, der sie gehören."],
      ["DSGVO & EU-Verarbeitung", "Verarbeitung nach europäischen Datenschutzstandards, auf Wunsch in Ihrer eigenen Umgebung."],
      ["Ein Mensch gibt frei", "Wichtige Schritte bestätigt immer jemand aus Ihrem Team."],
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Häufige Fragen.",
    items: [
      [`Was ist ${PRODUCT}?`, `${PRODUCT} macht das Wissen Ihres Unternehmens für alle abfragbar. Es greift auf Dokumente, E-Mails, Ablage, Buchhaltung und CRM zu und belegt jede Antwort mit einer Quelle. Dazu kommt ein Team aus KI-Agenten, einer pro Abteilung, das wiederkehrende Aufgaben erledigt.`],
      ["Plattform oder individuelle Lösung: Was passt zu uns?", `Die ${PRODUCT}-Plattform passt, wenn Sie schnell starten wollen. Individuell bauen wir, wenn Sie eigene Agenten, besondere Anbindungen oder eine eigene Umgebung brauchen. Im Erstgespräch finden wir das gemeinsam heraus.`],
      ["Wie lange dauert die Umsetzung?", "Kleinere Automatisierungen stehen oft nach wenigen Tagen, größere Lösungen brauchen einige Wochen. Nach dem Erstgespräch erhalten Sie einen realistischen Zeitplan."],
      ["Funktioniert das mit unserer Software?", "In den meisten Fällen ja. Wir binden CRM, Kalender, Buchhaltung, Telefonanlagen und interne Datenbanken an. Fehlt eine Anbindung, bauen wir sie."],
      ["Brauchen wir technisches Vorwissen?", "Nein. Konzeption, Entwicklung und Einrichtung übernehmen wir. Sie kennen Ihre Abläufe, um den Rest kümmern wir uns."],
      ["Wie sicher sind unsere Daten?", "Wir arbeiten DSGVO-konform, verarbeiten Daten in Europa und sorgen dafür, dass jeder Zugriff nachvollziehbar bleibt. Ihre Daten werden nie zum Training von KI-Modellen verwendet."],
      ["Was kostet das?", "Das Erstgespräch ist kostenlos. Danach erhalten Sie für jeden Schritt ein festes Angebot, ohne Abo und ohne versteckte Kosten."],
    ],
    more: "Noch Fragen?",
    moreCta: "Schreiben Sie uns",
  },

  final: {
    title: `Bereit für Ihren eigenen ${PRODUCT}?`,
    sub: "Wir finden gemeinsam heraus, welche Aufgaben sich in Ihrem Unternehmen sinnvoll automatisieren lassen.",
    cta: "Kostenloses Erstgespräch",
    cta2: "Nachricht schreiben",
    foot: "Unverbindlich · 30 Minuten · Individuelle Empfehlungen",
  },

  contact: {
    eyebrow: "Termin",
    title: "Wählen Sie einen passenden Termin.",
    sub: "30 Minuten per Video, kostenlos und unverbindlich. Nach der Buchung erhalten Sie sofort eine Bestätigung mit dem Link zum Gespräch.",
    alt: "Kein passender Termin dabei? Schreiben Sie uns direkt:",
  },

  consent: {
    title: "Datenschutz-Einstellungen",
    text: "Diese Website nutzt kein Tracking und keine Werbe-Cookies. Unseren Terminkalender stellt Cal.com bereit. Er wird erst mit Ihrer Einwilligung geladen. Dabei kann Cal.com Cookies setzen und Daten wie Ihre IP-Adresse auch in die USA übertragen. Ihre Wahl können Sie jederzeit über „Cookie-Einstellungen“ im Footer ändern.",
    privacy: "Zur Datenschutzerklärung",
    necessary: "Nur notwendige",
    all: "Alle akzeptieren",
    calTitle: "Terminkalender laden",
    calText: "Der Kalender wird von Cal.com bereitgestellt. Wenn Sie ihn laden, werden Daten wie Ihre IP-Adresse an Cal.com übertragen, auch in die USA.",
    calLoad: "Kalender laden",
  },

  footer: {
    claim: "Firmenwissen und ein Team aus KI-Agenten. Persönlich umgesetzt und DSGVO-konform.",
    product: "Plattform",
    company: "Unternehmen",
    legal: "Rechtliches",
    follow: "Folgen",
    links: {
      how: "So funktioniert's", integrations: "Integrationen", agents: "Agenten",
      about: "Über uns", faq: "FAQ", contact: "Kontakt", imprint: "Impressum", privacy: "Datenschutz",
    },
    rights: "Alle Rechte vorbehalten.",
    made: "Gemacht in Hamburg.",
    cookies: "Cookie-Einstellungen",
  },

  legal: {
    back: "Zurück",
    badge: "Rechtliches",
    germanOnly: "",
  },
};
