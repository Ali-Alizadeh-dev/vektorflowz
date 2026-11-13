import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getDict } from "@/lib/i18n";
import Navbar from "@/components/site/Navbar";
import { Footer } from "@/components/site/Closing";
import { GUIDES, GUIDES_PATH, guideHref } from "@/lib/guides";

const TITLE = "Guides: Kostenlose KI-Leitfäden | solvomind";
const DESCRIPTION = "Kostenlose Leitfäden, Prompts und Vorlagen, mit denen Sie KI in Ihrem Unternehmen selbst ausprobieren können.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: GUIDES_PATH, languages: { de: GUIDES_PATH } },
  openGraph: { title: TITLE, description: DESCRIPTION, locale: "de_DE", type: "website" },
};

export default async function GuidesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Die Guides gibt es nur auf Deutsch.
  if (locale !== "de") notFound();
  const t = getDict("de");

  return (
    <>
      <Navbar t={t.nav} locale="de" base="/de" />
      <main id="main" className="pb-28 pt-32 md:pt-40">
        <div className="wrap">
          <span className="eyebrow">Kostenlose Leitfäden</span>
          <h1 className="mt-4 text-[clamp(2.25rem,1.4rem+2.8vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.04em]">Guides</h1>
          <p className="mt-4 max-w-[560px] text-[18px] leading-[1.55] text-muted">
            Prompts, Agenten und Vorlagen, mit denen Sie KI in Ihrem Unternehmen selbst ausprobieren können.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map((g) => (
              <a
                key={g.slug}
                href={guideHref(g.slug)}
                className="group flex flex-col overflow-hidden rounded-[18px] border border-line bg-surface transition-colors hover:border-line-2"
              >
                <div className="relative h-[170px] overflow-hidden border-b border-line p-5">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_120%_at_0%_0%,rgba(164,230,58,0.16),transparent_60%),repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_24px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_24px)]"
                  />
                  <div className="relative flex justify-between text-[10.5px] font-semibold uppercase tracking-[0.16em] text-accent">
                    <span>{g.category}</span>
                    <span>{g.tag}</span>
                  </div>
                  <b className="relative mt-8 block text-[26px] font-bold leading-[1.1] tracking-[-0.03em]">{g.title}</b>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <b className="flex items-center gap-2 text-[17px] font-semibold tracking-[-0.015em]">
                    {g.title}
                    <ArrowRight size={16} className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden />
                  </b>
                  <p className="mt-2 flex-1 text-[14.5px] leading-[1.55] text-muted">{g.description}</p>
                  <span className="mt-4 text-[12.5px] text-muted-2">
                    {g.date} · {g.readTime} Lesezeit
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer t={t.footer} locale="de" />
    </>
  );
}
