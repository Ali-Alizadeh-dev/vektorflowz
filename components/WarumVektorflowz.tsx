"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeader from "./SectionHeader";
import { Minimize2, Clock, Link2, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Minimize2,
    title: "Prozesse vereinfachen",
    text: "Manuelle Aufgaben werden reduziert und Abläufe effizienter gestaltet.",
  },
  {
    icon: Clock,
    title: "Zeit gewinnen",
    text: "Weniger Routine bedeutet mehr Freiraum für wertschöpfende Arbeit.",
  },
  {
    icon: Link2,
    title: "Systeme verbinden",
    text: "Informationen fließen automatisch statt zwischen Tools verloren zu gehen.",
  },
  {
    icon: TrendingUp,
    title: "Nachhaltig skalieren",
    text: "Automatisierungen wachsen mit Ihrem Unternehmen und Ihren Anforderungen.",
  },
];

export default function WarumVektorflowz() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-reason]");
      if (!cards.length) return;

      // Reveal toward the visible state (fromTo, not from) and trigger via
      // batch/onEnter. If the trigger ever misfires the cards still end up
      // visible — they can never get stuck at opacity:0.
      gsap.set(cards, { y: 36, opacity: 0 });

      ScrollTrigger.batch(cards, {
        start: "top 85%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            overwrite: true,
          }),
      });

      // Safety net: if the section is already in view on load (or a refresh
      // race leaves them hidden), force them visible.
      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  return (
    <section id="warum" ref={ref} className="section">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          label="Warum Vektorflowz"
          title="Automatisierung mit klarem Mehrwert."
          intro="Technologie entfaltet ihren Wert erst dann, wenn sie konkrete Probleme löst. Genau hier setzen wir an – mit Automatisierungen, die Prozesse vereinfachen, Ihr Team entlasten und nachhaltig Zeit sparen."
        />

        <div
          data-reasons
          className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {reasons.map((r) => (
            <article
              key={r.title}
              data-reason
              className="group card p-6 md:p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg hover:border-accent/30"
            >
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <r.icon size={20} />
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-medium tracking-tight">
                  {r.title}
                </h3>
                <p className="mt-2 text-base text-muted leading-relaxed">
                  {r.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
