"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeader from "./SectionHeader";

const steps = [
  {
    n: "1",
    title: "Kostenloses KI-Erstgespräch",
    text: "Wir lernen Ihr Unternehmen, Ihre Ziele und Ihre täglichen Engpässe kennen.",
  },
  {
    n: "2",
    title: "Prozess-Analyse",
    text: "Wir identifizieren die Automatisierungspotenziale mit dem größten Hebel.",
  },
  {
    n: "3",
    title: "Individuelle KI-Entwicklung",
    text: "Wir entwickeln KI-Lösungen speziell für Ihr Unternehmen.",
  },
  {
    n: "4",
    title: "Umsetzung & Optimierung",
    text: "Wir integrieren, testen und verbessern Ihre Systeme kontinuierlich.",
  },
];

export default function Ablauf() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const track = ref.current?.querySelector("[data-track]");
      if (!track) return;

      const line = track.querySelector<HTMLElement>("[data-line]");
      const items = gsap.utils.toArray<HTMLElement>("[data-step]");

      if (reduce) {
        // Respect reduced motion — show everything, no popping.
        gsap.set([...items, line].filter(Boolean), { clearProps: "all" });
        return;
      }

      // Start hidden: orbs collapsed, cards down + faded, connector empty.
      const orbs = items.map((i) => i.querySelector("[data-orb]"));
      const cards = items.map((i) => i.querySelector("[data-card]"));
      gsap.set(orbs, { scale: 0, opacity: 0 });
      gsap.set(cards, { y: 22, opacity: 0, scale: 0.92 });
      if (line) gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top 72%",
          once: true,
        },
      });

      // Connector draws across first…
      if (line) {
        tl.to(line, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 0);
      }

      // …then each step pops: orb springs in, card follows underneath.
      items.forEach((_, i) => {
        const at = 0.25 + i * 0.16;
        tl.to(
          orbs[i],
          { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(2.2)" },
          at
        ).to(
          cards[i],
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" },
          at + 0.08
        );
      });

      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  return (
    <section id="ablauf" ref={ref} className="section">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          label="Unser Ablauf"
          title="Ein einfacher Weg von der Idee zum Ergebnis."
          intro="Transparent, strukturiert und nachvollziehbar — vom ersten Gespräch bis zur fertigen Lösung."
        />

        <div
          data-track
          className="mt-16 md:mt-20 relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6"
        >
          {/* Dashed connector line — spans the row of orbs on desktop */}
          <div
            aria-hidden
            className="hidden md:block absolute top-[27px] left-[12.5%] right-[12.5%] h-px"
          >
            <div
              data-line
              className="h-full w-full"
              style={{
                background:
                  "repeating-linear-gradient(90deg, var(--accent) 0 7px, transparent 7px 15px)",
                opacity: 0.4,
              }}
            />
          </div>

          {steps.map((s) => (
            <div key={s.n} data-step className="relative text-center">
              <span
                data-orb
                className="relative z-10 mx-auto flex items-center justify-center w-[54px] h-[54px] rounded-2xl bg-accent text-white text-xl font-semibold shadow-accent-glow ring-4 ring-surface"
              >
                {s.n}
              </span>
              <div data-card className="mt-5">
                <h3 className="text-lg font-medium tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm md:text-base text-muted leading-relaxed">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
