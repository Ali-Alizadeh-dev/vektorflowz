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
  MISTAKES,
  PREP,
  PROMPT_BOOKING,
  PROMPT_TEST,
  SPLIT,
} from "@/lib/guides/kiBuchhaltung";

export const metadata: Metadata = {
  title: GUIDE_META.title,
  description: GUIDE_META.description,
  alternates: { canonical: GUIDE_PATH, languages: { de: GUIDE_PATH } },
  openGraph: { title: GUIDE_META.title, description: GUIDE_META.description, locale: "de_DE", type: "article" },
};

const BOOKING = "/de#kontakt";

const H2 = "mt-14 border-b border-line pb-3 text-[24px] font-bold leading-tight tracking-[-0.025em]";
const P = "mt-4 text-[16.5px] leading-[1.7] text-fg/80";

export default async function KiBuchhaltungGuide({ params }: { params: Promise<{ locale: string }> }) {
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
              <span>Buchhaltung</span>
            </div>
            <h1 className="relative mt-6 text-[clamp(1.9rem,1.2rem+2.4vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.035em]">
              Belege buchen, <span className="text-accent">ohne selbst zu tippen.</span>
            </h1>
          </header>

          <p className="mt-6 text-[18px] leading-[1.6] text-muted">
            Eine Chrome-Erweiterung, Ihr bestehender Zugang zu Lexware oder DATEV, ein Prompt. Die KI arbeitet in Ihrem Browser
            wie ein neuer Kollege am Bildschirm – gebucht wird erst, wenn Sie es freigeben.
          </p>
          <p className="mt-3 text-[13px] text-muted-2">Von Ali Alizadeh · 7 Min. Lesezeit</p>

          {/* CTA oben */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-line bg-surface px-5 py-4">
            <p className="max-w-[440px] text-[14.5px] leading-snug text-muted">
              <b className="text-fg">Lieber einmal gemeinsam einrichten?</b> Im kostenlosen Erstgespräch schauen wir auf Ihre Buchhaltung und sagen Ihnen, was sich lohnt.
            </p>
            <a href={BOOKING} className="btn btn-light btn-sm">Erstgespräch buchen</a>
          </div>

          {/* Was drin ist */}
          <div className="mt-4 rounded-[18px] border border-line bg-surface px-5 py-5">
            <span className="eyebrow !text-[11px] !text-muted-2">Was drin ist</span>
            <ul className="mt-3 space-y-2 text-[15px]">
              {[
                "Einrichtung in etwa 15 Minuten, ohne Schnittstelle und ohne IT-Projekt",
                "Funktioniert mit Lexware, DATEV und allem, was im Browser läuft",
                "Ein Beispiel-Prompt zum Kopieren und Anpassen",
                "Klare Grenzen: was die KI macht und was bei Ihnen bleibt",
                "Der Weg zum Agenten, der nachts auch ohne Ihren Rechner arbeitet",
              ].map((x) => (
                <li key={x} className="flex gap-2.5">
                  <span className="text-accent" aria-hidden>→</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>

          {/* Warum Browser */}
          <h2 className={H2}>Warum über den Browser?</h2>
          <p className={P}>
            Buchhaltung automatisieren klingt nach Schnittstelle, API-Zugang und einem Projekt über mehrere Monate. Für die meisten
            kleinen und mittleren Unternehmen lohnt sich das nicht – und oft gibt die eigene Lizenz das gar nicht her.
          </p>
          <p className={P}>
            Der Umweg über den Browser spart genau das. Die KI sieht Ihre Buchhaltung so, wie Sie sie sehen: als Seite im Tab. Sie liest
            Belege, füllt Felder aus und klickt sich durch Listen. Deshalb ist es auch egal, ob Sie Lexware, DATEV oder etwas ganz anderes
            nutzen. Sie brauchen keine neue Software, sondern Ihren bestehenden Zugang.
          </p>
          <p className={P}>
            Der Preis dafür: Es läuft so lange, wie Ihr Rechner läuft und das Fenster offen ist. Wie Sie davon wegkommen, steht weiter unten.
          </p>

          <GuideGate guide="ki-buchhaltung" title={GUIDE_META.title} description={GUIDE_META.description} url={`${SITE.url}${GUIDE_PATH}`} booking={BOOKING}>
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

            {/* Einrichten */}
            <h2 className={H2}>Einrichten, Schritt für Schritt</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-[16px] leading-[1.65] text-fg/85 marker:text-muted-2">
              <li>
                <b className="text-fg">Erweiterung installieren.</b> Im Chrome Web Store nach „Claude in Chrome“ suchen und über „Hinzufügen“ installieren.
                Danach mit Ihrem Claude-Konto anmelden. Ein kostenloses Konto reicht nicht.
              </li>
              <li>
                <b className="text-fg">Erweiterung anpinnen.</b> Im Puzzle-Symbol oben rechts festpinnen, damit Sie das Seitenpanel jederzeit per Klick öffnen können.
              </li>
              <li>
                <b className="text-fg">Buchhaltung öffnen und angemeldet lassen.</b> Lexware oder DATEV in einem Tab öffnen, anmelden, den richtigen Mandanten wählen.
                Die KI meldet sich nicht selbst an und kennt Ihr Passwort nicht – sie nutzt die Sitzung, die bereits offen ist.
                Lassen Sie das Fenster offen, solange sie arbeitet.
              </li>
              <li>
                <b className="text-fg">Zugriff auf diese Seite erlauben.</b> Beim ersten Mal fragt die Erweiterung, ob sie auf der aktuellen Domain arbeiten darf.
                Geben Sie genau diese eine Seite frei, nicht pauschal alles.
              </li>
              <li>
                <b className="text-fg">Mit dem Lesen anfangen.</b> Erst der Prompt unten, der nichts verändert. Er zeigt Ihnen, ob die KI die Oberfläche versteht,
                bevor sie irgendwo klickt.
              </li>
              <li>
                <b className="text-fg">Dann der Buchungs-Prompt.</b> Platzhalter ersetzen, ersten Block von zehn Belegen prüfen, nachschärfen, weitermachen.
              </li>
            </ol>

            <p className="mt-6 rounded-[14px] border border-[#F5A524]/30 bg-[#F5A524]/[0.06] px-4 py-3.5 text-[15px] leading-[1.6] text-fg/85">
              <b className="text-fg">Starten Sie im Testmandanten.</b> Die KI klickt in Ihrem echten System. Nehmen Sie für die ersten Läufe einen Testmandanten
              oder einen längst abgegebenen Monat, arbeiten Sie mit einem Benutzer, der nur vorerfassen darf, und schauen Sie ihr dabei zu.
              Dieser Leitfaden ist keine Steuer- oder Rechtsberatung: Was festgeschrieben wird und wer freigibt, klären Sie mit Ihrer Kanzlei.
            </p>

            {/* Prompts */}
            <h2 className={H2}>Die Prompts</h2>
            <p className={P}>
              Zwei Vorlagen: Die erste liest nur, die zweite erfasst vor. Beide sind Rohfassungen – <b className="text-fg">Sie müssen sie auf Ihr
              Vorhaben anpassen.</b> Ersetzen Sie die Platzhalter in eckigen Klammern und schreiben Sie Ihre eigenen Regeln dazu: Ihr Kontenrahmen,
              Ihre Betragsgrenze, Ihre Sonderfälle. Ein Prompt, der nach dem dritten Lauf doppelt so lang ist wie am Anfang, ist ein gutes Zeichen.
            </p>
            <div className="mt-5 space-y-4">
              <CopyBlock label="Prompt 1 · Testlauf, verändert nichts" text={PROMPT_TEST} />
              <CopyBlock label="Prompt 2 · Belege vorerfassen" text={PROMPT_BOOKING} />
            </div>

            {/* CTA Mitte */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-line bg-[linear-gradient(135deg,rgba(164,230,58,0.08),transparent_60%)] px-5 py-5">
              <p className="max-w-[440px] text-[14.5px] leading-snug text-muted">
                <b className="text-fg">Keine Lust auf Prompt-Basteln?</b> Wir schreiben den Ablauf für Ihre Buchhaltung und testen ihn mit Ihren echten Belegen.
              </p>
              <a href={BOOKING} className="btn btn-ghost btn-sm">
                Umsetzung anfragen <ArrowRight size={14} aria-hidden />
              </a>
            </div>

            {/* Aufteilung */}
            <h2 className={H2}>Was die KI übernimmt – und was nicht</h2>
            <p className={P}>
              Die Zeit geht beim Abtippen und Suchen verloren, nicht beim Entscheiden. Genau dort setzt die Automatisierung an. Alles mit Ermessen
              bleibt bei Ihnen oder Ihrer Kanzlei.
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
              Alles bisher Beschriebene hat eine Bedingung: Ihr Rechner läuft, Chrome ist offen, Sie schauen zu. Für ein paar Stunden Belegarbeit im
              Monat reicht das völlig. Irgendwann kommt aber die Frage: Kann das nicht einfach jede Nacht von selbst passieren?
            </p>
            <p className={P}>
              Kann es. Dann wandert der Ablauf aber vom Browser auf einen Server. Statt eines Prompts, den Sie abschicken, gibt es einen Auslöser –
              eine neue Rechnung im Postfach, ein Beleg im Ordner, der Erste des Monats. Der Agent arbeitet seine Liste ab und legt die Ergebnisse
              zur Freigabe bereit. Am nächsten Morgen liegt in Ihrem Postfach eine Zusammenfassung: 47 Belege erfasst, 5 Rückfragen, ein Klick für
              die Freigabe. Gebucht wird weiterhin erst danach.
            </p>
            <p className={P}>
              Der Unterschied ist nicht nur technisch. Ein Agent, der ohne Zuschauer arbeitet, braucht festere Leitplanken: Protokoll über jeden
              Schritt, eine klare Grenze, ab der er stehen bleibt und fragt, einen Weg, ihn jederzeit anzuhalten, und eine saubere Antwort auf die
              Frage, wo die Daten liegen. Das ist kein Nachmittagsprojekt – aber es ist auch kein Konzern-Thema. Für einen gut abgegrenzten Ablauf
              wie die Belegvorerfassung sind das in der Regel zwei bis vier Wochen.
            </p>
          </GuideGate>

          {/* CTA unten */}
          <div className="relative mt-10 overflow-hidden rounded-[18px] border border-line bg-surface px-6 py-10 text-center">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_90%_at_50%_0%,rgba(164,230,58,0.14),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-[clamp(1.6rem,1.1rem+1.6vw,2.1rem)] font-bold leading-[1.15] tracking-[-0.03em]">
                Soll Ihre Buchhaltung <span className="text-accent">nachts arbeiten?</span>
              </h2>
              <p className="mx-auto mt-3 max-w-[460px] text-[15.5px] leading-[1.6] text-muted">
                Im kostenlosen Erstgespräch gehen wir Ihren Belegweg durch und sagen Ihnen ehrlich, was sich als Agent lohnt – und was Sie besser
                im Browser lassen.
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
