import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Minus } from "lucide-react";
import { getDict } from "@/lib/i18n";
import Navbar from "@/components/site/Navbar";
import { Footer } from "@/components/site/Closing";
import CopyBlock from "@/components/guide/CopyBlock";
import GuideGate from "@/components/guide/GuideGate";
import { SITE } from "@/lib/site";
import { GUIDES_PATH } from "@/lib/guides";
import {
  CALENDAR_API,
  CHECKLIST,
  FLOW,
  FOLDER,
  GUIDE_META,
  GUIDE_PATH,
  INSTALL_FOLDER,
  INSTALL_PROPOSAL_BUILDER,
  INSTALL_VEXA_CLOUD,
  INSTALL_VEXA_SELF,
  MISTAKES,
  PREP,
  PROMPT_BUILD_SKILL,
  PROMPT_MANUAL,
  PROMPT_TASK,
  SKILL_TEMPLATE,
  SPLIT,
} from "@/lib/guides/kiAngebote";

export const metadata: Metadata = {
  title: GUIDE_META.title,
  description: GUIDE_META.description,
  alternates: { canonical: GUIDE_PATH, languages: { de: GUIDE_PATH } },
  openGraph: { title: GUIDE_META.title, description: GUIDE_META.description, locale: "de_DE", type: "article" },
};

const BOOKING = "/de#kontakt";

const H2 = "mt-14 border-b border-line pb-3 text-[24px] font-bold leading-tight tracking-[-0.025em]";
const H3 = "mt-10 text-[19px] font-bold leading-tight tracking-[-0.02em]";
const P = "mt-4 text-[16.5px] leading-[1.7] text-fg/80";
const CODE = "rounded-[6px] border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.88em] text-fg";
const NOTE = "mt-6 rounded-[14px] border border-[#F5A524]/30 bg-[#F5A524]/[0.06] px-4 py-3.5 text-[15px] leading-[1.6] text-fg/85";

export default async function KiAngeboteGuide({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Den Leitfaden gibt es nur auf Deutsch: /en/guides/… liefert 404.
  if (locale !== "de") notFound();
  const t = getDict("de");

  return (
    <>
      <Navbar t={t.nav} locale="de" base="/de" />
      <main id="main" className="pb-24 pt-24 md:pt-28">
        <article className="mx-auto w-[min(100%-32px,720px)]">
          <a href={GUIDES_PATH} className="text-[14px] text-muted transition-colors hover:text-fg">← Alle Guides</a>

          {/* Titel */}
          <header className="relative mt-5 overflow-hidden rounded-[18px] border border-line bg-surface px-6 pb-8 pt-6 md:px-8">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_120%_at_0%_0%,rgba(164,230,58,0.16),transparent_60%),repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_26px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_26px)]"
            />
            <div className="relative flex justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              <span>Leitfaden</span>
              <span>Angebote</span>
            </div>
            <h1 className="relative mt-6 text-[clamp(1.9rem,1.2rem+2.4vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.035em]">
              Aus dem Kundengespräch <span className="text-accent">direkt ins Angebot.</span>
            </h1>
          </header>

          <p className="mt-6 text-[18px] leading-[1.6] text-muted">
            Vexa zeichnet Ihr Kundengespräch auf. Claude kennt Ihre Preise und den Aufbau Ihrer Angebote und legt nach dem Termin einen
            fertigen Entwurf in Ihren Ordner. Sie lesen ihn, ändern, was nötig ist, und senden ab.
          </p>
          <p className="mt-3 text-[13px] text-muted-2">Von Ali Alizadeh · 11 Min. Lesezeit</p>

          {/* CTA oben */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-line bg-surface px-5 py-4">
            <p className="max-w-[440px] text-[14.5px] leading-snug text-muted">
              <b className="text-fg">Lieber einmal gemeinsam einrichten?</b> Im kostenlosen Erstgespräch richten wir den Ablauf mit Ihnen ein und sagen Ihnen, wo er an Grenzen stößt.
            </p>
            <a href={BOOKING} className="btn btn-light btn-sm">Erstgespräch buchen</a>
          </div>

          {/* Was drin ist */}
          <div className="mt-4 rounded-[18px] border border-line bg-surface px-5 py-5">
            <span className="eyebrow !text-[11px] !text-muted-2">Was drin ist</span>
            <ul className="mt-3 space-y-2 text-[15px]">
              {[
                "Die Bausteine: Vexa, Angebotsordner, Kalender, Angebots-Skill, geplante Aufgabe",
                "Einrichtung Schritt für Schritt, in der Cloud oder auf eigenem Server",
                "Ein fertiger Angebots-Skill zum Anpassen und drei Prompts zum Kopieren",
                "Was Sie bei der Aufzeichnung von Kundengesprächen beachten müssen",
                "Der Weg zum Agenten, der ohne Ihren Rechner läuft",
              ].map((x) => (
                <li key={x} className="flex gap-2.5">
                  <span className="text-accent" aria-hidden>→</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>

          {/* Warum */}
          <h2 className={H2}>Warum das jetzt funktioniert</h2>
          <p className={P}>
            Das Gespräch mit dem Kunden ist selten das Problem. Das Problem kommt danach: Notizen entziffern, Preise nachschlagen, die alte
            Vorlage suchen, Positionen zusammenrechnen. Oft wird es ein Abend pro Angebot, und bis es rausgeht, sind drei Tage vergangen.
            In der Zeit hat der Kunde zwei andere Angebote auf dem Tisch.
          </p>
          <p className={P}>
            Die Teile dafür gibt es inzwischen einzeln, und sie lassen sich verbinden. Vexa ist ein quelloffenes Aufzeichnungswerkzeug, das
            Videogesprächen in Google Meet, Teams oder Zoom beitritt und mitschreibt. Über MCP, eine offene Schnittstelle für KI-Werkzeuge,
            kann Claude diese Mitschrift lesen. Über denselben Weg bekommt Claude Zugriff auf Ihren Angebotsordner mit Preisen und Vorlagen.
            Ein Skill, also eine schriftliche Arbeitsanweisung, sagt Claude, wie Ihre Angebote aufgebaut sind.
          </p>
          <p className={P}>
            Das Ergebnis ist ein Entwurf, kein versandfertiges Angebot. Sie sparen das Zusammensuchen und Abtippen. Die Prüfung, die Preise
            und die Entscheidung bleiben bei Ihnen.
          </p>

          <GuideGate guide="ki-angebote" title={GUIDE_META.title} description={GUIDE_META.description} url={`${SITE.url}${GUIDE_PATH}`} booking={BOOKING}>
            {/* Vorbereitung */}
            <h2 className={H2}>Was Sie vorher brauchen</h2>
            <ul className="mt-4 space-y-2.5">
              {PREP.map((x) => (
                <li key={x} className="flex gap-2.5 text-[16px] leading-[1.6] text-fg/85">
                  <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>

            {/* Ablauf */}
            <h2 className={H2}>So greift alles ineinander</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-[16px] leading-[1.65] text-fg/85 marker:text-muted-2">
              {FLOW.map(([h, p]) => (
                <li key={h}>
                  <b className="text-fg">{h}</b> {p}
                </li>
              ))}
            </ol>

            {/* Schritt 1 */}
            <h2 className={H2}>Einrichten, Schritt für Schritt</h2>
            <h3 className={H3}>1. Vexa mit Claude verbinden</h3>
            <p className={P}>
              Sie haben zwei Wege. <b className="text-fg">In der Cloud</b> melden Sie sich auf vexa.ai mit einem Google-Konto an und kopieren
              Ihren Schlüssel aus den Kontoeinstellungen. Laut Anbieter gibt es ein Startguthaben ohne Kreditkarte, das für einige Stunden
              Aufzeichnung reicht. <b className="text-fg">Auf eigenem Server</b> ist Vexa kostenlos, Sie brauchen aber Docker und jemanden, der
              den Server pflegt. Für die Umwandlung von Sprache in Text braucht der Server eine Grafikkarte, sonst nutzen Sie dafür den
              Cloud-Dienst von Vexa.
            </p>
            <p className={P}>
              Danach geben Sie den Befehl im Terminal ein. Den Schlüssel setzen Sie anstelle des Platzhalters ein. Der Zusatz{" "}
              <code className={CODE}>-s user</code> sorgt dafür, dass Vexa in jedem Ordner zur Verfügung steht.
            </p>
            <div className="mt-5 space-y-4">
              <CopyBlock label="Weg A · Vexa in der Cloud, im Terminal" text={INSTALL_VEXA_CLOUD} />
              <CopyBlock label="Weg B · Vexa auf eigenem Server, im Terminal" text={INSTALL_VEXA_SELF} />
            </div>
            <p className="mt-3 text-[14px] leading-[1.6] text-muted">
              Mit <code className={CODE}>claude mcp list</code> prüfen Sie, ob die Verbindung steht. Bei Weg B gibt <code className={CODE}>make all</code>{" "}
              den Schlüssel am Ende aus. Die Adresse gilt für die Standardinstallation mit Docker Compose.
            </p>

            {/* Schritt 2 */}
            <h3 className={H3}>2. Den Angebotsordner anlegen und verbinden</h3>
            <p className={P}>
              Claude kann nur Preise verwenden, die es findet. Legen Sie einen Ordner an, zum Beispiel „Angebote“, mit diesem Inhalt:
            </p>
            {FOLDER.map(([h, p]) => (
              <p key={h} className={P}>
                <b className="text-fg">{h}</b> {p}
              </p>
            ))}
            <p className={P}>
              Liegt der Ordner auf Ihrem Rechner, verbinden Sie ihn mit dem Befehl unten. Dafür muss Node.js installiert sein. Liegt er in
              Google Drive, OneDrive oder SharePoint, verbinden Sie den Dienst stattdessen in den Claude-Einstellungen unter „Konnektoren“.
              Welche Dienste es gibt, hängt von Ihrem Plan ab.
            </p>
            <div className="mt-5">
              <CopyBlock label="Lokaler Ordner · im Terminal" text={INSTALL_FOLDER} />
            </div>

            {/* Schritt 3 */}
            <h3 className={H3}>3. Den Kalender mit Vexa verbinden</h3>
            <p className={P}>
              Vexa braucht keinen Vollzugriff auf Ihren Kalender, nur die geheime iCal-Adresse. In Google Kalender finden Sie sie unter
              Einstellungen, Ihr Kalender, „Kalender integrieren“, Feld „Privatadresse im iCal-Format“. Nicht die öffentliche Adresse nehmen.
              In Outlook veröffentlichen Sie den Kalender mit allen Details und kopieren den ICS-Link.
            </p>
            <p className={P}>
              In der Cloud fügen Sie die Adresse im Vexa-Dashboard unter „Calendar“ ein und schalten den automatischen Beitritt ein. Auf eigenem
              Server geht es über einen Aufruf an die Vexa-Schnittstelle. Ab dann tritt Vexa jedem Termin mit Meet-, Teams- oder Zoom-Link etwa
              eine Minute vor Beginn bei.
            </p>
            <div className="mt-5">
              <CopyBlock label="Nur bei eigenem Server · im Terminal" text={CALENDAR_API} />
            </div>
            <p className={NOTE}>
              <b className="text-fg">Aufzeichnen nur mit Erlaubnis.</b> Vexa tritt dem Gespräch sichtbar als Teilnehmer bei. Das ersetzt keine
              Einwilligung. Schreiben Sie in die Einladung, dass das Gespräch für die Angebotserstellung aufgezeichnet wird, und fragen Sie zu Beginn
              noch einmal. Klären Sie, wo die Daten verarbeitet werden, und schließen Sie bei der Cloud-Variante einen Vertrag zur
              Auftragsverarbeitung ab. Wer sicher gehen will, betreibt Vexa selbst. Dieser Abschnitt ist keine Rechtsberatung.
            </p>

            {/* Schritt 4 */}
            <h3 className={H3}>4. Claude einen Angebots-Skill geben</h3>
            <p className={P}>
              Ein Skill ist eine Textdatei, in der steht, wie eine bestimmte Aufgabe erledigt wird. Claude liest ihn, sobald die Aufgabe ansteht.
              Für Angebote gibt es einen offiziellen Skill von Anthropic: <code className={CODE}>proposal-builder</code> aus dem Plugin „Small
              Business“. Er arbeitet nach demselben Grundsatz wie dieser Leitfaden, preist nur aus Ihrer Preisliste und lässt Lücken offen,
              statt sie zu erfinden. Er ist aber englisch und auf Zoom, Notion und Buchhaltungsprogramme ausgelegt, nicht auf Vexa.
            </p>
            <div className="mt-5">
              <CopyBlock label="Alternative · Offizieller Skill, in Claude Code" text={INSTALL_PROPOSAL_BUILDER} />
            </div>
            <p className={P}>
              Besser passt ein eigener Skill, der genau Ihren Aufbau kennt. Die Vorlage unten legen Sie als{" "}
              <code className={CODE}>~/.claude/skills/angebot-erstellen/SKILL.md</code> an.{" "}
              <b className="text-fg">Sie müssen sie auf Ihre Angebote anpassen:</b> Ordnerpfade, Gliederung, Steuersatz, Zahlungsbedingungen,
              Ton. Schneller geht es, wenn Claude den Skill aus Ihren echten Angeboten selbst schreibt. Dafür ist der zweite Prompt da.
            </p>
            <div className="mt-5 space-y-4">
              <CopyBlock label="Vorlage · Angebots-Skill (SKILL.md)" text={SKILL_TEMPLATE} />
              <CopyBlock label="Prompt · Claude schreibt den Skill aus Ihren Angeboten" text={PROMPT_BUILD_SKILL} />
            </div>
            <p className={P}>
              Testen Sie den Skill an einem Gespräch, zu dem Sie das Angebot schon geschrieben haben. Liegen beide Fassungen nebeneinander, sehen
              Sie schnell, welche Regel noch fehlt.
            </p>

            {/* Schritt 5 */}
            <h3 className={H3}>5. Claude nach jedem Termin loslegen lassen</h3>
            <p className={P}>
              Damit Sie nach dem Gespräch nichts anstoßen müssen, richten Sie in der Claude-Desktop-App eine geplante Aufgabe ein. Unter „Geplante
              Aufgaben“ legen Sie eine neue an, wählen Ihren Angebotsordner als Arbeitsordner und stellen sie auf „stündlich“. Die Aufgabe schaut
              bei Vexa nach beendeten Gesprächen und ruft für jedes Kundengespräch Ihren Skill auf.
            </p>
            <p className={P}>
              Wichtig ist der erste Lauf. Klicken Sie nach dem Anlegen auf „Jetzt ausführen“ und erlauben Sie die Vexa- und Ordner-Werkzeuge
              dauerhaft. Sonst fragt Claude bei jedem Lauf nach, und die Aufgabe bleibt stehen, bis Sie antworten.
            </p>
            <p className={P}>
              Eine Einschränkung: Die geplante Aufgabe läuft nur, solange die Desktop-App offen und der Rechner wach ist. Schläft der Rechner,
              holt die App den letzten verpassten Lauf nach dem Aufwachen nach. Wie es ohne diese Einschränkung geht, steht am Ende.
            </p>
            <div className="mt-5 space-y-4">
              <CopyBlock label="Prompt 1 · Geplante Aufgabe, stündlich" text={PROMPT_TASK} />
              <CopyBlock label="Prompt 2 · Einzelnes Gespräch, von Hand" text={PROMPT_MANUAL} />
            </div>
            <p className={P}>
              Beide Prompts sind Rohfassungen. Ersetzen Sie die Platzhalter in eckigen Klammern und passen Sie die Regeln an Ihr Geschäft an. Was
              Claude wiederholt falsch macht, schreiben Sie als Regel in den Skill, etwa „Anfahrt immer als eigene Position“ oder „Bei mehr als
              zehn Stunden Aufwand Tagessatz statt Stundensatz“. Für die Einrichtung sollten Sie, grob geschätzt, ein bis zwei Stunden einplanen,
              bei eigenem Server deutlich mehr.
            </p>

            {/* CTA Mitte */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-line bg-[linear-gradient(135deg,rgba(164,230,58,0.08),transparent_60%)] px-5 py-5">
              <p className="max-w-[440px] text-[14.5px] leading-snug text-muted">
                <b className="text-fg">Keine Lust auf Einrichten?</b> Wir verbinden Vexa, Ordner und Kalender mit Ihnen und schreiben den Angebots-Skill aus Ihren echten Angeboten.
              </p>
              <a href={BOOKING} className="btn btn-ghost btn-sm">
                Umsetzung anfragen <ArrowRight size={14} aria-hidden />
              </a>
            </div>

            {/* Aufteilung */}
            <h2 className={H2}>Was die KI übernimmt – und was nicht</h2>
            <p className={P}>
              Claude spart Ihnen den Abend nach dem Termin. Alles, was mit Geld, Zusagen und dem Verhältnis zum Kunden zu tun hat, bleibt bei Ihnen.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[18px] border border-line bg-surface p-5">
                <span className="eyebrow !text-[11px] !text-accent">Übernimmt die KI</span>
                <ul className="mt-3 space-y-2.5">
                  {SPLIT.ai.map((x) => (
                    <li key={x} className="flex gap-2.5 text-[15px] leading-[1.5] text-fg/85">
                      <Check size={16} className="mt-[3px] flex-none text-accent" aria-hidden />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[18px] border border-line bg-surface p-5">
                <span className="eyebrow !text-[11px] !text-muted-2">Bleibt beim Menschen</span>
                <ul className="mt-3 space-y-2.5">
                  {SPLIT.human.map((x) => (
                    <li key={x} className="flex gap-2.5 text-[15px] leading-[1.5] text-fg/85">
                      <Minus size={16} className="mt-[3px] flex-none text-muted-2" aria-hidden />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Fehler */}
            <h2 className={H2}>Typische Fehler</h2>
            {MISTAKES.map(([h, p]) => (
              <p key={h} className={P}>
                <b className="text-fg">{h}</b> {p}
              </p>
            ))}

            {/* Checkliste */}
            <h2 className={H2}>Checkliste</h2>
            <ul className="mt-4 space-y-2">
              {CHECKLIST.map((x) => (
                <li key={x}>
                  <label className="flex cursor-pointer items-center gap-3 text-[15.5px] text-fg/85">
                    <input type="checkbox" className="peer h-[17px] w-[17px] flex-none accent-[#a4e63a]" />
                    <span className="peer-checked:text-muted-2 peer-checked:line-through">{x}</span>
                  </label>
                </li>
              ))}
            </ul>

            {/* Autonom */}
            <h2 className={H2}>Und wenn es ganz allein laufen soll?</h2>
            <p className={P}>
              Der beschriebene Ablauf hängt an Ihrem Rechner. Ist er aus, wartet das Angebot. Für einen Betrieb mit mehreren Verkaufsgesprächen am
              Tag lohnt es sich, den Ablauf auf einen Server zu verlegen.
            </p>
            <p className={P}>
              Dann laufen Vexa und der Angebotsagent dauerhaft. Endet ein Gespräch, liegt der Entwurf wenige Minuten später im gemeinsamen Ordner,
              und Sie bekommen eine kurze Nachricht per Mail oder Teams: Kunde, Summe, drei offene Fragen. Mit einem Klick geben Sie frei, der Agent
              versendet das Angebot aus Ihrem Postfach und trägt es in Ihr CRM oder Ihre Angebotsliste ein. Mehrere Mitarbeiter können denselben
              Skill nutzen, damit Angebote einheitlich aussehen, egal wer das Gespräch geführt hat.
            </p>
            <p className={P}>
              Ein Agent ohne Zuschauer braucht festere Leitplanken: ein Protokoll über jeden Schritt, eine Freigabe vor jedem Versand, eine
              Obergrenze, ab der er nur Entwürfe schreibt, und eine klare Antwort darauf, wo Gesprächsaufzeichnungen liegen und wann sie gelöscht
              werden. Das ist kein Nachmittagsprojekt, aber auch kein Konzern-Thema. Wie lange die Umsetzung bei Ihnen dauert, lässt sich erst nach einem Gespräch sagen. Das hängt davon ab, welche Programme Sie nutzen, wo Ihre Daten liegen und wie viele Sonderfälle es gibt. Manche Abläufe stehen nach einer Woche, andere brauchen vier oder sechs Wochen.
            </p>
          </GuideGate>

          {/* CTA unten */}
          <div className="relative mt-10 overflow-hidden rounded-[18px] border border-line bg-surface px-6 py-10 text-center">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_90%_at_50%_0%,rgba(164,230,58,0.14),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-[clamp(1.6rem,1.1rem+1.6vw,2.1rem)] font-bold leading-[1.15] tracking-[-0.03em]">
                Soll Ihr Angebot nach dem Termin <span className="text-accent">schon bereitliegen?</span>
              </h2>
              <p className="mx-auto mt-3 max-w-[460px] text-[15.5px] leading-[1.6] text-muted">
                Im kostenlosen Erstgespräch schauen wir, wie Ihre Angebote heute entstehen, und sagen Ihnen ehrlich, was sich automatisieren lässt –
                und wo Ihr eigener Blick unverzichtbar bleibt.
              </p>
              <a href={BOOKING} className="btn btn-primary mt-6">{t.final.cta}</a>
              <p className="mt-4 text-[0.8rem] text-muted-2">{t.final.foot}</p>
            </div>
          </div>
        </article>
      </main>
      <Footer t={t.footer} locale="de" />
    </>
  );
}
