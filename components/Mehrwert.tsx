"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SplitWords from "./SplitWords";
import { Minimize2, Clock, Link2, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Minimize2,
    title: "Prozesse vereinfachen",
    text: "Manuelle Aufgaben werden reduziert und Abläufe spürbar effizienter gestaltet.",
  },
  {
    icon: Clock,
    title: "Zeit gewinnen",
    text: "Weniger Routine bedeutet mehr Freiraum für die wertschöpfende Arbeit.",
  },
  {
    icon: Link2,
    title: "Systeme verbinden",
    text: "Informationen fließen automatisch, statt zwischen Tools verloren zu gehen.",
  },
  {
    icon: TrendingUp,
    title: "Nachhaltig skalieren",
    text: "Automatisierungen wachsen mit Ihrem Unternehmen und Ihren Anforderungen.",
  },
];

export default function Mehrwert() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const header = gsap.utils.toArray<HTMLElement>("[data-mw-head]");
      const rows = gsap.utils.toArray<HTMLElement>("[data-mw-row]");

      gsap.set([...header, ...rows], { y: 28, opacity: 0 });

      ScrollTrigger.batch([...header, ...rows], {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.09,
            ease: "power3.out",
            overwrite: true,
          }),
      });

      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  return (
    <section id="warum" ref={ref} className="section">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: editorial heading */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <span
            data-mw-head
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fg text-bg text-sm font-medium"
          >
            Warum solvomind
          </span>
          <SplitWords
            as="h2"
            data-mw-head
            text="Automatisierung mit klarem Mehrwert."
            className="mt-8 text-4xl md:text-5xl font-medium tracking-tightest leading-[1.05]"
          />
          <p
            data-mw-head
            className="mt-6 text-lg md:text-xl text-muted leading-relaxed"
          >
            Technologie entfaltet ihren Wert erst dann, wenn sie konkrete
            Probleme löst. Genau hier setzen wir an – mit Lösungen, die
            entlasten statt zu beeindrucken.
          </p>
        </div>

        {/* Right: value list with dividers (no cards) */}
        <ul className="lg:col-span-7 lg:pt-2">
          {reasons.map((r, i) => (
            <li
              key={r.title}
              data-mw-row
              className="group flex gap-5 md:gap-7 py-7 border-t border-line first:border-t-0 lg:first:border-t lg:first:pt-7"
            >
              <span className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <r.icon size={22} />
              </span>
              <div className="flex-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-mono text-muted">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight">
                    {r.title}
                  </h3>
                </div>
                <p className="mt-2 text-base md:text-lg text-muted leading-relaxed">
                  {r.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
