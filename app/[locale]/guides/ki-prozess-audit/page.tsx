import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getDict } from "@/lib/i18n";
import Navbar from "@/components/site/Navbar";
import { Footer } from "@/components/site/Closing";
import CopyBlock from "@/components/guide/CopyBlock";
import { Pill, PrivacyDot } from "@/components/guide/bits";
import { GUIDES_PATH } from "@/lib/guides";
import {
  AUDIT_AGENT_PROMPT,
  CHECKLIST,
  EXAMPLE_ROWS,
  GUIDE_META,
  GUIDE_PATH,
  MISTAKES,
  PROMPT_BRIEF,
  PROMPT_RANK,
} from "@/lib/guides/prozessAudit";

export const metadata: Metadata = {
  title: GUIDE_META.title,
  description: GUIDE_META.description,
  alternates: { canonical: GUIDE_PATH, languages: { de: GUIDE_PATH } },
  openGraph: { title: GUIDE_META.title, description: GUIDE_META.description, locale: "de_DE", type: "article" },
};

const BOOKING = "/de#kontakt";

const H2 = "mt-14 border-b border-line pb-3 text-[24px] font-bold leading-tight tracking-[-0.025em]";
const P = "mt-4 text-[16.5px] leading-[1.7] text-fg/80";

export default async function ProzessAuditGuide({ params }: { params: Promise<{ locale: string }> }) {
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
              <span>Audit</span>
            </div>
            <h1 className="relative mt-6 text-[clamp(1.9rem,1.2rem+2.4vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.035em]">
              Finden Sie die Abläufe, die sich <span className="text-accent">zuerst rechnen.</span>
            </h1>
          </header>

          <p className="mt-6 text-[18px] leading-[1.6] text-muted">
            Ein kostenloser Audit-Agent für Claude oder ChatGPT. In etwa 20 Minuten haben Sie eine geschätzte Rangliste Ihrer
            Automatisierungschancen und einen Steckbrief für die beste.
          </p>
          <p className="mt-3 text-[13px] text-muted-2">Von Ali Alizadeh · 6 Min. Lesezeit</p>

          {/* CTA oben */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-line bg-surface px-5 py-4">
            <p className="max-w-[440px] text-[14.5px] leading-snug text-muted">
              <b className="text-fg">Lieber direkt mit uns sprechen?</b> Im kostenlosen Erstgespräch schauen wir, welche Abläufe sich bei Ihnen lohnen.
            </p>
            <a href={BOOKING} className="btn btn-light btn-sm">Erstgespräch buchen</a>
          </div>

          {/* Was drin ist */}
          <div className="mt-4 rounded-[18px] border border-line bg-surface px-5 py-5">
            <span className="eyebrow !text-[11px] !text-muted-2">Was drin ist</span>
            <ul className="mt-3 space-y-2 text-[15px]">
              {[
                "Ein fertiger Audit-Agent zum Kopieren, eingerichtet in 5 Minuten",
                "Er befragt Sie zu Ihren Abläufen oder liest Ihre Unterlagen",
                "Eine geschätzte Rangliste: Was rechnet sich zuerst?",
                "Ein einseitiger Steckbrief für Ihre Nummer 1",
              ].map((x) => (
                <li key={x} className="flex gap-2.5">
                  <span className="text-accent" aria-hidden>→</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>

          {/* Warum */}
          <h2 className={H2}>Warum zuerst ein Audit?</h2>
          <p className={P}>
            Viele Unternehmen probieren hier einen Prompt und dort ein Tool aus und merken am Monatsende wenig davon. Meist fehlt der Überblick, wo im
            Alltag überhaupt Zeit verloren geht.
          </p>
          <p className={P}>
            Genau den liefert das Audit. Ein Agent fragt Sie nach Ihren wiederkehrenden Aufgaben, schätzt für jede Aufwand und Kosten und sortiert alles
            danach, was sich am schnellsten bezahlt macht.
          </p>

          {/* Einrichten */}
          <h2 className={H2}>So richten Sie den Agenten ein</h2>
          <p className={P}>Statt eines einzelnen Prompts legen Sie einmal ein Projekt an. Dann können Sie das Audit jederzeit wiederholen.</p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-[16px] leading-[1.6] text-fg/85 marker:text-muted-2">
            <li>In Claude oder ChatGPT ein neues Projekt anlegen, z. B. „KI-Prozess-Audit“.</li>
            <li>Die Projekt-Anweisungen öffnen.</li>
            <li>Den Agenten unten hineinkopieren und speichern.</li>
            <li>
              Neuen Chat starten und schreiben: <b className="text-fg">„Lass uns mit dem Audit starten.“</b>
            </li>
          </ol>
          <div className="mt-6">
            <CopyBlock label="Der Audit-Agent" text={AUDIT_AGENT_PROMPT} collapsible />
          </div>

          {/* Material */}
          <h2 className={H2}>Geben Sie ihm echtes Material</h2>
          <p className={P}>
            Der Agent kann Sie komplett interviewen. Genauer wird es, wenn er Unterlagen sieht: Gesprächsnotizen, Prozessbeschreibungen, eine Liste Ihrer
            Tools oder einfach eine Notiz, wer was macht. Entfernen Sie vorher Namen und Kontaktdaten von Kunden und Mitarbeitenden.
          </p>
          <p className={P}>
            Ein guter Kandidat passiert regelmäßig, hat einen klaren Auslöser und ein klares Ergebnis. Zum Beispiel: Eine Anfrage kommt per E-Mail, und
            jemand schreibt die Antwort.
          </p>

          {/* CTA Mitte */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-line bg-[linear-gradient(135deg,rgba(164,230,58,0.08),transparent_60%)] px-5 py-5">
            <p className="max-w-[440px] text-[14.5px] leading-snug text-muted">
              <b className="text-fg">Lieber nicht selbst machen?</b> Wir führen das Audit mit Ihrem Team durch und prüfen die Zahlen gemeinsam mit Ihnen.
            </p>
            <a href={BOOKING} className="btn btn-ghost btn-sm">
              Audit anfragen <ArrowRight size={14} aria-hidden />
            </a>
          </div>

          {/* Ergebnis */}
          <h2 className={H2}>Das bekommen Sie zurück</h2>
          <p className={P}>
            Nach der Bewertung liefert der Agent eine Tabelle wie diese. Das Beispiel ist erfunden: ein Dienstleister mit 15 Mitarbeitenden und 60 €
            Stundensatz.
          </p>
          <div className="mt-5 overflow-x-auto rounded-[14px] border border-line">
            <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
              <thead>
                <tr className="bg-surface text-[11px] uppercase tracking-[0.1em] text-muted-2">
                  {["Ablauf", "Ersparnis/Jahr", "Amortisation", "Datenschutz", "Empfehlung"].map((h) => (
                    <th key={h} scope="col" className="border-b border-line px-3.5 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EXAMPLE_ROWS.map((r) => (
                  <tr key={r.name} className="border-b border-line last:border-0">
                    <td className="px-3.5 py-3">{r.name}</td>
                    <td className="whitespace-nowrap px-3.5 py-3 tabular-nums">{r.savings}</td>
                    <td className="whitespace-nowrap px-3.5 py-3 font-semibold tabular-nums">{r.payback}</td>
                    <td className="px-3.5 py-3"><PrivacyDot p={r.privacy} /></td>
                    <td className="px-3.5 py-3"><Pill v={r.verdict} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 rounded-[14px] border border-[#F5A524]/30 bg-[#F5A524]/[0.06] px-4 py-3.5 text-[15px] leading-[1.6] text-fg/85">
            <b className="text-fg">Das sind Schätzungen.</b> Die KI rechnet mit Ihren Angaben und eigenen Annahmen und kann sich dabei irren. Prüfen Sie
            Häufigkeit, Dauer, Stundensatz und Umsetzungskosten selbst, bevor Sie etwas entscheiden. Der Agent markiert seine drei unsichersten Annahmen.
            Damit fangen Sie an.
          </p>

          <div className="mt-5 overflow-hidden rounded-[14px] border border-line text-[14.5px]">
            {(
              [
                ["go", "bis 3 Monate", "Hier fangen Sie an."],
                ["plan", "3 bis 12 Monate", "Nach den ersten Erfolgen."],
                ["park", "über 12 Monate", "Nur, wenn der Ablauf sehr nervt."],
              ] as const
            ).map(([v, range, what]) => (
              <div key={v} className="grid grid-cols-[110px_120px_1fr] items-center gap-3 border-b border-line px-3.5 py-2.5 last:border-0 max-sm:grid-cols-[100px_1fr]">
                <span><Pill v={v} /></span>
                <span className="text-muted max-sm:hidden">{range}</span>
                <span className="text-fg/85">{what}</span>
              </div>
            ))}
          </div>

          <p className={P}>
            Die Datenschutz-Spalte ist eine grobe Ampel: grün ohne personenbezogene Daten, gelb mit Kunden- oder Mitarbeiterdaten, rot bei besonders
            sensiblen Daten. Sie ersetzt keine Datenschutzberatung.
          </p>

          {/* Steckbrief */}
          <h2 className={H2}>Danach: der Steckbrief</h2>
          <p className={P}>
            Eine Rangliste ist noch keine Entscheidung. Deshalb schlägt der Agent danach einen 90-Tage-Plan vor und schreibt für Ihre Nummer 1 einen
            einseitigen Steckbrief: was automatisiert wird, was beim Menschen bleibt, welche Daten fließen, welche Risiken es gibt und was Sie vor einer
            Freigabe selbst prüfen sollten.
          </p>
          <p className={P}>Damit können Sie intern entscheiden oder vergleichbare Angebote einholen. Ein oder zwei Steckbriefe reichen für den Anfang.</p>

          {/* Ohne Projekt */}
          <h2 className={H2}>Kein Projekt? Zwei Prompts reichen</h2>
          <p className={P}>Es geht auch im normalen Chat. Schreiben Sie unter Prompt 1 Ihre Abläufe, eine Zeile pro Ablauf.</p>
          <div className="mt-5 space-y-4">
            <CopyBlock label="Prompt 1 · Abläufe bewerten" text={PROMPT_RANK} />
            <CopyBlock label="Prompt 2 · Steckbrief" text={PROMPT_BRIEF} />
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

          {/* CTA unten */}
          <div className="relative mt-16 overflow-hidden rounded-[18px] border border-line bg-surface px-6 py-10 text-center">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_90%_at_50%_0%,rgba(164,230,58,0.14),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-[clamp(1.6rem,1.1rem+1.6vw,2.1rem)] font-bold leading-[1.15] tracking-[-0.03em]">
                Wo bleiben bei Ihnen <span className="text-accent">Zeit und Geld</span> liegen?
              </h2>
              <p className="mx-auto mt-3 max-w-[460px] text-[15.5px] leading-[1.6] text-muted">
                Im kostenlosen Erstgespräch gehen wir Ihre Abläufe zusammen durch. Danach wissen Sie, womit Sie anfangen können.
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
