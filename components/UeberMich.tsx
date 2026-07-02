"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeader from "./SectionHeader";

const pillars = [
  {
    title: "Persönlich",
    text: "Sie haben feste Ansprechpartner, die Ihr Projekt von Anfang bis Ende begleiten – keine Ticketsysteme, keine Warteschleifen.",
  },
  {
    title: "Praxisnah",
    text: "Wir setzen auf Ihre vorhandenen Tools auf, statt alles neu aufzubauen. Das einfachste System, das den Job zuverlässig erledigt.",
  },
  {
    title: "Messbar",
    text: "Vor dem Start definieren wir gemeinsam, woran sich der Erfolg messen lässt – und prüfen es nach dem Go-live gemeinsam nach.",
  },
];

export default function UeberMich() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = [
        ...gsap.utils.toArray<HTMLElement>("[data-pillar]"),
        ...gsap.utils.toArray<HTMLElement>("[data-quote-card]"),
      ];
      if (!items.length) return;

      // fromTo toward the visible state via batch/onEnter — can't get stuck
      // hidden, and cheap enough for phones (single transform per element).
      gsap.set(items, { y: 24, opacity: 0 });

      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.7,
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
    <section id="ueber-mich" ref={ref} className="section">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          label="Über uns"
          title="Technologie sollte Arbeit erleichtern."
          intro="Mit solvomind helfen wir Unternehmen, Prozesse intelligenter zu gestalten und wiederkehrende Aufgaben zu automatisieren – mit Lösungen, die sich nahtlos in bestehende Abläufe einfügen."
        />

        <div className="mt-16 md:mt-24 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Values as a divider list — no cards */}
          <ul className="lg:col-span-7">
            {pillars.map((p, i) => (
              <li
                key={p.title}
                data-pillar
                className="py-7 border-t border-line last:border-b"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-sm font-mono text-accent">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-base md:text-lg text-muted leading-relaxed">
                      {p.text}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* The one card in this section: founder quote */}
          <aside
            data-quote-card
            className="lg:col-span-5 card shadow-card-lg p-8 md:p-10 lg:sticky lg:top-28"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center text-lg font-medium">
                AA
              </div>
              <div>
                <p className="text-lg font-medium">Ali Alizadeh</p>
                <p className="text-base text-muted">Gründer · solvomind</p>
              </div>
            </div>

            <blockquote className="mt-8 text-2xl md:text-3xl leading-snug text-fg">
              <span className="text-accent">„</span>
              Die besten Prozesse sind die, die zuverlässig im Hintergrund
              funktionieren und Menschen den Rücken freihalten.
              <span className="text-accent">"</span>
            </blockquote>

            <a
              href="#kontakt"
              className="group mt-10 inline-flex items-center gap-2 text-base font-medium hover:text-accent transition-colors"
            >
              Projekt besprechen
              <span className="inline-block group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
