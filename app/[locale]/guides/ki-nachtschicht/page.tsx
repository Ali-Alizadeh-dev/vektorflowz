import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Minus } from "lucide-react";
import { getDict } from "@/lib/i18n";
import Navbar from "@/components/site/Navbar";
import { Footer } from "@/components/site/Closing";
import CopyBlock from "@/components/guide/CopyBlock";
import GuideGate from "@/components/guide/GuideGate";
import { SITE } from "@/lib/site";
import { GUIDES_PATH, guideHref } from "@/lib/guides";
import {
  CHECKLIST,
  GUIDE_META,
  GUIDE_PATH,
  LID,
  MISTAKES,
  PREP,
  PROMPT_INSTALL,
  PROMPT_MORNING,
  PROMPT_NIGHT,
  REPO_URL,
  SPLIT,
  TASKS,
} from "@/lib/guides/kiNachtschicht";

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
const LINK = "text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent";

export default async function KiNachtschichtGuide({ params }: { params: Promise<{ locale: string }> }) {
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
              <span>Nachtschicht</span>
            </div>
            <h1 className="relative mt-6 text-[clamp(1.9rem,1.2rem+2.4vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.035em]">
              Claude arbeitet weiter, <span className="text-accent">auch wenn der Laptop zu ist.</span>
            </h1>
          </header>

          <p className="mt-6 text-[18px] leading-[1.6] text-muted">
            Mit der kostenlosen Mac-App Insomnia bleibt Ihr MacBook wach, solange Claude an einer Aufgabe sitzt, auch mit zugeklapptem Deckel.
            Sie starten am Abend, klappen zu und lesen am Morgen das Ergebnis.
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
                "Was Insomnia macht und was beim Zuklappen passiert",
                "Installation in etwa 15 Minuten, den Großteil erledigt Claude",
                "Zwei Prompts: Nachtschicht starten, Ergebnis am Morgen abholen",
                "Ehrliche Grenzen bei Akku, Hitze, Browser und Rückfragen",
                "Der Schritt zum Agenten, der gar keinen Laptop mehr braucht",
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
            Claude Code schafft inzwischen Aufgaben, die Stunden dauern: zwanzig Angebote vorbereiten, ein Quartal Belege sortieren, hundert
            Förderprogramme durchsehen. Das Problem ist nicht Claude, sondern der Laptop. Klappen Sie ihn zu, schläft er ein, und die Aufgabe
            bleibt mittendrin stehen. Also bleibt der Laptop offen auf dem Schreibtisch, und Sie bleiben in der Nähe.
          </p>
          <p className={P}>
            Insomnia löst genau das. Die App sitzt als kleines Auge in der Menüleiste. Sie geben eine Dauer ein, etwa drei Stunden, und so lange
            bleibt der Mac wach, auch mit zugeklapptem Deckel und auf Akku. Danach schläft er wieder ganz normal. Claude kann die Sitzung sogar
            selbst starten und beenden. Insomnia ist quelloffen (MIT-Lizenz), kostenlos und liegt auf GitHub.
          </p>
          <p className={P}>
            Sie gewinnen damit Zeit, in der Sie nicht am Rechner sitzen. Die Aufgabe muss trotzdem gut vorbereitet sein, denn nachts ist niemand
            da, der Rückfragen beantwortet.
          </p>

          <GuideGate guide="ki-nachtschicht" title={GUIDE_META.title} description={GUIDE_META.description} url={`${SITE.url}${GUIDE_PATH}`} booking={BOOKING}>
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

            {/* Zuklappen */}
            <h2 className={H2}>Was beim Zuklappen passiert</h2>
            <p className={P}>
              Ohne laufende Sitzung macht Insomnia nichts, der Mac schläft beim Zuklappen wie immer. Läuft eine Sitzung, passiert Folgendes:
            </p>
            {LID.map(([h, p]) => (
              <p key={h} className={P}>
                <b className="text-fg">{h}</b> {p}
              </p>
            ))}

            {/* Einrichten */}
            <h2 className={H2}>Einrichten, Schritt für Schritt</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-[16px] leading-[1.65] text-fg/85 marker:text-muted-2">
              <li>
                <b className="text-fg">Claude die Installation machen lassen.</b> Der Entwickler hat eine Anleitung geschrieben, der Claude Schritt für
                Schritt folgt: Mac prüfen, die neueste Version laden, die Echtheit der Datei prüfen. Kopieren Sie den ersten Prompt unten in Claude Code.
              </li>
              <li>
                <b className="text-fg">Den Passwortschritt selbst machen.</b> Für die Installation braucht es einmal Ihr Administratorpasswort. Claude gibt
                Ihnen dafür den genauen Befehl, Sie fügen ihn selbst im Terminal ein. Ihr Passwort bekommt Claude nicht.
              </li>
              <li>
                <b className="text-fg">Den ersten Start erlauben.</b> macOS blockiert die App beim ersten Öffnen, weil sie nicht von Apple geprüft ist.
                Unter Systemeinstellungen, „Datenschutz & Sicherheit“, erlauben Sie den Start. Danach erscheint das Auge in der Menüleiste.
              </li>
              <li>
                <b className="text-fg">Die Einstellungen durchgehen.</b> Rechtsklick auf das Auge, „Settings“. Prüfen Sie, welche Apps beim Zuklappen
                angehalten werden, ab welchem Akkustand Schluss ist und ob der Bildschirm gesperrt werden soll.
              </li>
              <li>
                <b className="text-fg">Einen Testlauf machen.</b> Auge anklicken, 15 Minuten eingeben, Enter, Deckel zu. Nach dem Öffnen liegt unter{" "}
                <code className={CODE}>~/Library/Logs/Insomnia/insomnia.log</code> ein Protokoll. Lassen Sie Claude es lesen und erklären.
              </li>
              <li>
                <b className="text-fg">Die Rechte in Claude Code vorab freigeben.</b> Mit <code className={CODE}>/permissions</code> legen Sie fest, welche
                Befehle und Werkzeuge Claude ohne Nachfrage nutzen darf. Lassen Sie die Aufgabe danach ein paar Minuten bei offenem Deckel laufen. Kommt
                noch eine Frage, beantworten Sie sie mit „immer erlauben“.
              </li>
              <li>
                <b className="text-fg">Starten und zuklappen.</b> Prompt anpassen, abschicken, Mac ans Netzteil, Deckel zu.
              </li>
            </ol>

            <div className="mt-5">
              <CopyBlock label="Prompt 1 · Insomnia installieren lassen, in Claude Code" text={PROMPT_INSTALL} />
            </div>
            <p className="mt-3 text-[14px] leading-[1.6] text-muted">
              Wer lieber selbst installiert, findet alle Befehle in der Anleitung unter{" "}
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className={LINK}>github.com/krishhgg/Insomnia</a>.
            </p>

            <p className="mt-6 rounded-[14px] border border-[#F5A524]/30 bg-[#F5A524]/[0.06] px-4 py-3.5 text-[15px] leading-[1.6] text-fg/85">
              <b className="text-fg">Wissen, was Sie installieren.</b> Insomnia ist ein frei verfügbares Projekt, nicht von Apple und nicht von
              Anthropic, und der Entwickler nennt es selbst experimentell. Der Installer legt eine Regel an, mit der Ihr Benutzerkonto vier
              Energiebefehle ohne Passwort ausführen darf. Das gilt für jedes Programm, das unter Ihrem Konto läuft, nicht nur für Insomnia. Der Mac
              bleibt in der Sitzung wach und braucht mehr Strom. Legen Sie ihn auf eine feste, freie Unterlage, nie in eine geschlossene Tasche.
            </p>

            {/* Prompts */}
            <h2 className={H2}>Die Prompts für die Nacht</h2>
            <p className={P}>
              Der zweite Prompt startet die Nachtschicht. Claude startet dabei selbst eine Insomnia-Sitzung, arbeitet, führt ein Protokoll und
              beendet die Sitzung am Ende, damit der Mac nicht unnötig wach bleibt. Der dritte holt am Morgen das Ergebnis ab. Beide sind
              Rohfassungen – <b className="text-fg">Sie müssen sie an Ihre Aufgabe anpassen.</b> Ersetzen Sie die Platzhalter in eckigen Klammern durch
              Aufgabe, Ordner und Dauer. Die Dauer steht im Befehl in Sekunden: drei Stunden sind 10800.
            </p>
            <div className="mt-5 space-y-4">
              <CopyBlock label="Prompt 2 · Nachtschicht starten" text={PROMPT_NIGHT} />
              <CopyBlock label="Prompt 3 · Am Morgen, verändert nichts" text={PROMPT_MORNING} />
            </div>
            <p className={P}>Gut für die Nacht eignen sich Aufgaben, die lang sind und wenig Rückfragen brauchen, zum Beispiel:</p>
            <ul className="mt-4 space-y-2.5">
              {TASKS.map((x) => (
                <li key={x} className="flex gap-2.5 text-[16px] leading-[1.6] text-fg/85">
                  <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
            <p className={P}>
              Für die Angebote passt das gut zu unserem Leitfaden{" "}
              <a href={guideHref("ki-angebote")} className={LINK}>KI-Angebote</a>. Wer zwischendurch nachsehen will, startet in Claude Code zusätzlich{" "}
              <code className={CODE}>/remote-control</code> und verfolgt die Sitzung in der Claude-App auf dem Handy. Der Verlauf liegt dabei auf den
              Servern von Anthropic, die Arbeit selbst bleibt auf Ihrem Mac.
            </p>

            {/* CTA Mitte */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-line bg-[linear-gradient(135deg,rgba(164,230,58,0.08),transparent_60%)] px-5 py-5">
              <p className="max-w-[440px] text-[14.5px] leading-snug text-muted">
                <b className="text-fg">Keine Lust auf Einrichten?</b> Wir installieren Insomnia mit Ihnen, legen die Rechte fest und bauen die erste Nachtschicht für Ihre Aufgabe.
              </p>
              <a href={BOOKING} className="btn btn-ghost btn-sm">
                Umsetzung anfragen <ArrowRight size={14} aria-hidden />
              </a>
            </div>

            {/* Aufteilung */}
            <h2 className={H2}>Was die KI übernimmt – und was nicht</h2>
            <p className={P}>
              Insomnia sorgt nur dafür, dass der Mac wach bleibt. Ob die Nacht etwas bringt, entscheidet die Vorbereitung.
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
              Insomnia ist eine gute Brücke, aber eine Brücke. Der Laptop bleibt die Maschine, auf der alles läuft. Ist der Akku leer, das WLAN weg
              oder der Mac im Rucksack, steht die Arbeit. Und es läuft nur, wenn jemand am Abend daran denkt.
            </p>
            <p className={P}>
              Der nächste Schritt ist ein Agent, der gar keinen Laptop braucht. Er läuft auf einem Server oder einem Rechner, der ohnehin im Büro an
              ist, startet zu festen Zeiten oder bei einem Ereignis von selbst und legt die Ergebnisse dort ab, wo Ihr Team sie findet. Am Morgen
              kommt eine kurze Nachricht: was erledigt ist, was auf Freigabe wartet. Ihre Unterlagen müssen dafür dort liegen, wo der Agent sie
              erreicht, also in einer Cloud oder auf dem Server, nicht nur auf Ihrem Laptop.
            </p>
            <p className={P}>
              Ein Agent ohne Zuschauer braucht festere Leitplanken: ein Protokoll über jeden Schritt, eine Freigabe vor allem, was nach außen geht,
              einen Weg, ihn jederzeit anzuhalten, und eine klare Antwort darauf, wo Ihre Daten liegen. Das ist kein Nachmittagsprojekt, aber auch
              kein Konzern-Thema. Wie lange die Umsetzung bei Ihnen dauert, lässt sich erst nach einem Gespräch sagen. Das hängt davon ab, welche Programme Sie nutzen, wo Ihre Daten liegen und wie viele Sonderfälle es gibt. Manche Abläufe stehen nach einer Woche, andere brauchen vier oder sechs Wochen.
            </p>
          </GuideGate>

          {/* CTA unten */}
          <div className="relative mt-10 overflow-hidden rounded-[18px] border border-line bg-surface px-6 py-10 text-center">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_90%_at_50%_0%,rgba(164,230,58,0.14),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-[clamp(1.6rem,1.1rem+1.6vw,2.1rem)] font-bold leading-[1.15] tracking-[-0.03em]">
                Soll die Arbeit erledigt sein, <span className="text-accent">bevor Sie im Büro sind?</span>
              </h2>
              <p className="mx-auto mt-3 max-w-[460px] text-[15.5px] leading-[1.6] text-muted">
                Im kostenlosen Erstgespräch schauen wir, welche Aufgaben bei Ihnen über Nacht laufen könnten, und sagen Ihnen ehrlich, wann der
                Laptop reicht und wann sich ein eigener Agent lohnt.
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
