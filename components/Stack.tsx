"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SectionTitle, { Accent } from "./SectionTitle";

/* Tool-Chips als Monogramm-Badges — keine Fremdlogos nötig, wirkt trotzdem
   nach echtem Stack. Farbton je Tool grob an die Marke angelehnt. */
const row1 = [
  { name: "Gmail", color: "#ea4335" },
  { name: "Outlook", color: "#0078d4" },
  { name: "Slack", color: "#e01e5a" },
  { name: "Microsoft Teams", color: "#6264a7" },
  { name: "Notion", color: "#9fabb8" },
  { name: "Airtable", color: "#f8bd00" },
  { name: "HubSpot", color: "#ff7a59" },
  { name: "Salesforce", color: "#00a1e0" },
  { name: "Pipedrive", color: "#26aa5e" },
];
const row2 = [
  { name: "DATEV", color: "#9ed40e" },
  { name: "Lexware", color: "#0078d4" },
  { name: "Google Drive", color: "#34a853" },
  { name: "Dropbox", color: "#0061ff" },
  { name: "Calendly", color: "#006bff" },
  { name: "DocuSign", color: "#ffcc22" },
  { name: "Zapier", color: "#ff4f00" },
  { name: "Make", color: "#b02de9" },
  { name: "Personio", color: "#ff4d66" },
];

function Chip({ name, color }: { name: string; color: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-surface px-5 py-3 text-[0.95rem] font-medium text-fg/90">
      <span
        aria-hidden
        className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold"
        style={{ background: `${color}26`, color }}
      >
        {name.charAt(0)}
      </span>
      {name}
    </span>
  );
}

function MarqueeRow({
  tools,
  reverse = false,
}: {
  tools: typeof row1;
  reverse?: boolean;
}) {
  // Liste doppelt rendern → nahtlose Endlosschleife bei -50% translateX.
  return (
    <div className="marquee-mask overflow-hidden">
      <div
        className={`flex w-max gap-3 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {[...tools, ...tools].map((t, i) => (
          <Chip key={`${t.name}-${i}`} {...t} />
        ))}
      </div>
    </div>
  );
}

export default function Stack() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = ref.current?.querySelectorAll("[data-stack]");
      if (!items?.length) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from(items, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        clearProps: "transform,opacity",
      });
      if (document.hidden) tl.progress(1);
    },
    { scope: ref }
  );

  return (
    <section id="stack" ref={ref} className="section bg-bg">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle
          label="Arbeitet mit Ihrem Stack"
          title={
            <>
              Wir ersetzen Ihre Software nicht — <Accent>wir automatisieren sie.</Accent>
            </>
          }
          intro="Wir docken an die Software an, für die Sie bereits zahlen, und automatisieren die Arbeit darin. Ihr Team behält seine Logins, seine Gewohnheiten, seine Abläufe. Nur die manuellen Anteile fallen weg."
        />

        <div data-stack className="mt-10 md:mt-12 card p-5 md:p-6 space-y-4">
          <MarqueeRow tools={row1} />
          <MarqueeRow tools={row2} reverse />
        </div>

        <div data-stack className="mt-8 text-center">
          <p className="text-muted text-base md:text-lg">
            Unsicher, ob das mit Ihrem Setup funktioniert? Wir klären es im
            Gespräch.
          </p>
          <a
            href="#kontakt"
            className="mt-5 inline-flex items-center justify-center px-6 py-3 rounded-full bg-fg text-canvas text-[0.95rem] font-semibold hover:bg-fg/90 transition-colors"
          >
            Kostenloses Erstgespräch
          </a>
        </div>
      </div>
    </section>
  );
}
