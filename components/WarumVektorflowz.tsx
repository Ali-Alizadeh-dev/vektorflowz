"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
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
      gsap.from('[data-reason]', {
        scrollTrigger: {
          trigger: '[data-reasons]',
          start: "top 80%",
          once: true,
        },
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="section">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          label="Warum Vektorflowz"
          title="Automatisierung mit klarem Mehrwert."
          intro="Moderne Technologien entfalten ihren Wert erst dann, wenn sie konkrete Probleme lösen. Deshalb entwickeln wir Lösungen, die Prozesse vereinfachen, Teams entlasten und nachhaltig Zeit sparen."
        />

        <div
          data-reasons
          className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {reasons.map((r) => (
            <article
              key={r.title}
              data-reason
              className="card p-6 md:p-7 flex flex-col gap-5 hover:border-accent/30 transition-colors"
            >
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-accent-soft text-accent">
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
