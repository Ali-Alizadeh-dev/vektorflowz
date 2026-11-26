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
  CHECKLIST,
  GUIDE_META,
  GUIDE_PATH,
  INSTALL_NPX,
  INSTALL_PLUGIN,
  MISTAKES,
  PREP,
  PROMPT_CHECK,
  PROMPT_FILING,
  SOURCES,
  SPLIT,
} from "@/lib/guides/kiSteuererklaerung";

export const metadata: Metadata = {
  title: GUIDE_META.title,
  description: GUIDE_META.description,
  alternates: { canonical: GUIDE_PATH, languages: { de: GUIDE_PATH } },
  openGraph: { title: GUIDE_META.title, description: GUIDE_META.description, locale: "de_DE", type: "article" },
};

const BOOKING = "/de#kontakt";

const H2 = "mt-14 border-b border-line pb-3 text-[24px] font-bold leading-tight tracking-[-0.025em]";
const P = "mt-4 text-[16.5px] leading-[1.7] text-fg/80";
const CODE = "rounded-[6px] border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.88em] text-fg";

export default async function KiSteuererklaerungGuide({ params }: { params: Promise<{ locale: string }> }) {
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
              <span>Steuern</span>
            </div>
            <h1 className="relative mt-6 text-[clamp(1.9rem,1.2rem+2.4vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.035em]">
              Die Steuererklärung, <span className="text-accent">ohne Belege abzutippen.</span>
            </h1>
          </header>

          <p className="mt-6 text-[18px] leading-[1.6] text-muted">
            Claude sucht Ihre Belege im Postfach, in der Cloud und in einem Ordner auf Ihrem Rechner zusammen, fragt nur nach dem, was fehlt,
            und trägt die Werte in Mein ELSTER ein. Abgeschickt wird erst, wenn Sie alles geprüft haben.
          </p>
          <p className="mt-3 text-[13px] text-muted-2">Von Ali Alizadeh · 8 Min. Lesezeit</p>

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
                "Die vier Bausteine: Skill, Chrome-Erweiterung, Konnektoren, Belegordner",
                "Einrichtung Schritt für Schritt, in etwa 30 Minuten",
                "Der Prompt zum Kopieren und eine Gegenprobe vor dem Absenden",
                "Klare Grenzen: was die KI macht und wofür Sie weiter eine Steuerberatung brauchen",
                "Der Weg zum Agenten, der das ganze Jahr über Belege sammelt",
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
            Das Schwierige an der Steuererklärung ist für die meisten nicht das Formular. Es ist das Zusammensuchen: die Handwerkerrechnung
            im Postfach, die Spendenquittung im Briefkasten, der Laptop-Kauf in der Amazon-Mail, die Versicherung irgendwo in der Cloud.
            Danach kommt das Abtippen in Felder, deren Namen man einmal im Jahr sieht.
          </p>
          <p className={P}>
            Beides kann Claude inzwischen übernehmen. Ein Skill gibt die Fragen vor, die für die Einkommensteuer gestellt werden müssen, und
            ordnet die Antworten den Zeilen in ELSTER zu. Konnektoren und ein verbundener Ordner geben Claude Zugriff auf Ihre Belege. Die
            Chrome-Erweiterung lässt Claude in Mein ELSTER klicken und Felder ausfüllen, in Ihrer eigenen, angemeldeten Sitzung.
          </p>
          <p className={P}>
            Sie sparen dabei vor allem Suche und Tipparbeit. Die Verantwortung für die Angaben bleibt bei Ihnen. Dieser Leitfaden ersetzt
            keine Steuerberatung.
          </p>

          <GuideGate guide="ki-steuererklaerung" title={GUIDE_META.title} description={GUIDE_META.description} url={`${SITE.url}${GUIDE_PATH}`} booking={BOOKING}>
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

            {/* Belege */}
            <h2 className={H2}>Wo Claude Ihre Belege findet</h2>
            <p className={P}>
              Je mehr Claude selbst findet, desto weniger muss es Sie fragen. Es gibt drei Quellen, und am besten nutzen Sie alle drei.
            </p>
            {SOURCES.map(([h, p]) => (
              <p key={h} className={P}>
                <b className="text-fg">{h}</b> {p}
              </p>
            ))}

            {/* Einrichten */}
            <h2 className={H2}>Einrichten, Schritt für Schritt</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-[16px] leading-[1.65] text-fg/85 marker:text-muted-2">
              <li>
                <b className="text-fg">Claude Code installieren.</b> Über die Claude-Desktop-App oder im Terminal, Anleitung auf claude.com.
                Der Name klingt nach Programmieren. Hier ist es nur das Fenster, in dem Sie mit Claude schreiben und das auf Ordner auf Ihrem Rechner zugreifen darf.
              </li>
              <li>
                <b className="text-fg">Den Steuer-Skill installieren.</b> Der Skill <code className={CODE}>german-elster-tax-filing</code> enthält die
                Fragen für die Einkommensteuer ab 2024 und die Zuordnung zu den ELSTER-Formularen, von Hauptvordruck und Anlage N über
                Vorsorgeaufwand und Sonderausgaben bis zu KAP, V und S. Es gibt zwei Wege, siehe unten.
              </li>
              <li>
                <b className="text-fg">Chrome-Erweiterung installieren und verbinden.</b> Im Chrome Web Store nach „Claude in Chrome“ suchen, installieren,
                mit demselben Claude-Konto anmelden. In Claude Code verbinden Sie die Erweiterung mit dem Befehl <code className={CODE}>/chrome</code>.
              </li>
              <li>
                <b className="text-fg">Konnektoren verbinden.</b> In den Claude-Einstellungen unter „Konnektoren“ alle Dienste freigeben, in denen Rechnungen
                und Belege liegen: Postfach, Cloud-Speicher, gegebenenfalls Ihr Buchhaltungsprogramm.
              </li>
              <li>
                <b className="text-fg">Belegordner anlegen und Claude Code darin starten.</b> Alles, was nicht digital in Postfach oder Cloud liegt, scannen
                und in einen Ordner legen, zum Beispiel „Steuer 2025“. Claude Code in diesem Ordner öffnen, dann kann Claude alle Dateien darin lesen.
              </li>
              <li>
                <b className="text-fg">Selbst bei Mein ELSTER anmelden.</b> In Chrome mit Zertifikatsdatei und Passwort anmelden und die Erklärung für das
                richtige Jahr anlegen. Wenn die Erweiterung fragt, ob sie auf elster.de arbeiten darf, geben Sie genau diese Seite frei.
              </li>
              <li>
                <b className="text-fg">Prompt anpassen und abschicken.</b> Dann beantworten Sie die Rückfragen, eine nach der anderen.
              </li>
            </ol>

            <div className="mt-5 space-y-4">
              <CopyBlock label="Weg A · Über das Plugin-Verzeichnis, im Terminal" text={INSTALL_NPX} />
              <CopyBlock label="Weg B · Direkt in Claude Code" text={INSTALL_PLUGIN} />
            </div>
            <p className="mt-3 text-[14px] leading-[1.6] text-muted">
              Weg A braucht Node.js auf dem Rechner. Weg B tippen Sie direkt in das Eingabefeld von Claude Code, eine Zeile nach der anderen.
            </p>

            <p className="mt-6 rounded-[14px] border border-[#F5A524]/30 bg-[#F5A524]/[0.06] px-4 py-3.5 text-[15px] leading-[1.6] text-fg/85">
              <b className="text-fg">Wissen, was Sie installieren.</b> Der Skill ist ein frei verfügbares Projekt eines einzelnen Entwicklers, nicht von
              Anthropic und nicht vom Finanzamt. Er liefert nach eigener Aussage eine Schätzung, keine verbindliche Berechnung. Steuerdaten gehören
              zu den sensibelsten Daten, die Sie haben: Prüfen Sie in Ihren Claude-Einstellungen, ob Ihre Unterhaltungen zum Training verwendet
              werden dürfen, und schalten Sie das gegebenenfalls ab. Dieser Leitfaden ist keine Steuer- oder Rechtsberatung.
            </p>

            {/* Prompts */}
            <h2 className={H2}>Die Prompts</h2>
            <p className={P}>
              Der erste Prompt startet den ganzen Ablauf. Der zweite ist die Gegenprobe, bevor Sie absenden. Beide sind Rohfassungen –{" "}
              <b className="text-fg">Sie müssen sie auf Ihre Erklärung anpassen.</b> Ersetzen Sie die Platzhalter in eckigen Klammern durch Steuerjahr,
              Ordnernamen und die Konnektoren, die Sie tatsächlich verbunden haben. Was Claude wiederholt falsch macht, schreiben Sie als eigene
              Regel dazu, etwa „Arbeitsweg: 22 km einfach, 210 Tage im Büro“ oder „Ein Arbeitszimmer gibt es bei mir nicht“.
            </p>
            <div className="mt-5 space-y-4">
              <CopyBlock label="Prompt 1 · Steuererklärung vorbereiten und eintragen" text={PROMPT_FILING} />
              <CopyBlock label="Prompt 2 · Gegenprobe, verändert nichts" text={PROMPT_CHECK} />
            </div>
            <p className={P}>
              Rechnen Sie für den ersten Durchgang mit ein bis zwei Stunden, je nachdem, wie viele Rückfragen kommen. Das ist eine grobe Schätzung.
              Bleiben Sie in der Nähe: Claude hält an, wenn es eine Antwort braucht, und die ELSTER-Sitzung läuft nach einer Weile ohne Aktivität ab.
            </p>

            {/* CTA Mitte */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-line bg-[linear-gradient(135deg,rgba(164,230,58,0.08),transparent_60%)] px-5 py-5">
              <p className="max-w-[440px] text-[14.5px] leading-snug text-muted">
                <b className="text-fg">Keine Lust auf Einrichten?</b> Wir richten Skill, Erweiterung und Konnektoren mit Ihnen ein und gehen den ersten Durchgang gemeinsam durch.
              </p>
              <a href={BOOKING} className="btn btn-ghost btn-sm">
                Umsetzung anfragen <ArrowRight size={14} aria-hidden />
              </a>
            </div>

            {/* Aufteilung */}
            <h2 className={H2}>Was die KI übernimmt – und was nicht</h2>
            <p className={P}>
              Die Zeit geht beim Suchen und Abtippen verloren, nicht beim Entscheiden. Dort hilft Claude. Alles, was Ermessen braucht oder größere
              Beträge betrifft, bleibt bei Ihnen oder Ihrer Steuerberatung.
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
              Der beschriebene Ablauf passiert einmal im Jahr, an Ihrem Rechner, mit Ihnen daneben. Die meiste Arbeit steckt dabei im Suchen,
              und das lässt sich vorziehen. Statt im Mai alles zusammenzukratzen, kann ein Agent das ganze Jahr über mitlaufen.
            </p>
            <p className={P}>
              Dann wandert der Ablauf auf einen Server. Jede neue Rechnung im Postfach, jeder Beleg im Cloud-Ordner wird erkannt, ausgelesen,
              einer Kategorie zugeordnet und abgelegt. Einmal im Monat bekommen Sie eine kurze Übersicht: 14 neue Belege, 2 Rückfragen, Stand
              der absetzbaren Kosten bisher. Zum Jahresende liegt die Zuordnung zu den ELSTER-Zeilen fertig vor. Das Absenden bleibt bei Ihnen.
              Für Selbstständige lässt sich das mit der Belegsammlung für Buchhaltung und Kanzlei verbinden.
            </p>
            <p className={P}>
              Ein Agent ohne Zuschauer braucht festere Leitplanken: ein Protokoll über jeden Schritt, eine klare Grenze, ab der er stehen bleibt
              und fragt, einen Weg, ihn jederzeit anzuhalten, und eine saubere Antwort auf die Frage, wo Ihre Steuerdaten liegen. Das ist kein
              Nachmittagsprojekt, aber auch kein Konzern-Thema. Wie lange die Umsetzung bei Ihnen dauert, lässt sich erst nach einem Gespräch sagen. Das hängt davon ab, welche Programme Sie nutzen, wo Ihre Daten liegen und wie viele Sonderfälle es gibt. Manche Abläufe stehen nach einer Woche, andere brauchen vier oder sechs Wochen.
            </p>
          </GuideGate>

          {/* CTA unten */}
          <div className="relative mt-10 overflow-hidden rounded-[18px] border border-line bg-surface px-6 py-10 text-center">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_90%_at_50%_0%,rgba(164,230,58,0.14),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-[clamp(1.6rem,1.1rem+1.6vw,2.1rem)] font-bold leading-[1.15] tracking-[-0.03em]">
                Sollen Ihre Belege <span className="text-accent">sich selbst sammeln?</span>
              </h2>
              <p className="mx-auto mt-3 max-w-[460px] text-[15.5px] leading-[1.6] text-muted">
                Im kostenlosen Erstgespräch schauen wir, wo Ihre Belege heute landen, und sagen Ihnen ehrlich, was sich als Agent lohnt – und was
                Sie besser einmal im Jahr selbst machen.
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
