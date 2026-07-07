"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Target, Puzzle, HeartHandshake } from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Individuell",
    text: "Jedes Unternehmen arbeitet anders. Deshalb entwickeln wir Lösungen, die zu Ihren Prozessen passen – nicht umgekehrt.",
  },
  {
    icon: Puzzle,
    title: "Integration statt Umstellung",
    text: "Wir bauen auf den Systemen auf, die Sie bereits nutzen.",
  },
  {
    icon: HeartHandshake,
    title: "Langfristige Zusammenarbeit",
    text: "Auch nach der Einführung begleiten wir Sie weiter und entwickeln Ihre Automatisierungen gemeinsam mit Ihnen weiter.",
  },
];

export default function WarumSolvomind() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-reason]");
      if (!cards.length) return;
      gsap.set(cards, { y: 26, opacity: 0 });
      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            overwrite: true,
          }),
      });
      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  return (
    <section
      id="warum-solvomind"
      ref={ref}
      className="section bg-bg border-y border-line"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center max-w-xl mx-auto">
          <div className="text-sm font-semibold uppercase tracking-[0.08em] text-accent">
            Warum solvomind
          </div>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tightest leading-[1.08]">
            Persönliche Zusammenarbeit statt Standardlösungen.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {reasons.map((r) => (
            <article key={r.title} data-reason className="card shadow-card p-8">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-soft text-accent">
                <r.icon size={22} />
              </span>
              <h3 className="mt-5 text-xl font-medium tracking-tight">
                {r.title}
              </h3>
              <p className="mt-2 text-base text-muted leading-relaxed">
                {r.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
