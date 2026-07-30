"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionTitle, { Accent } from "./SectionTitle";
import { Star } from "lucide-react";

/**
 * PLATZHALTER — noch nicht auf der Seite eingebunden.
 * Sobald echte Kundenstimmen vorliegen: Einträge unten ersetzen und die
 * Sektion in app/page.tsx einkommentieren. Keine erfundenen Testimonials
 * veröffentlichen.
 */
const testimonials = [
  {
    quote:
      "Hier steht später ein echtes Kundenzitat: welches Problem bestand, was gebaut wurde und was sich dadurch messbar verändert hat.",
    name: "Vorname Nachname",
    role: "Position · Unternehmen",
  },
  {
    quote:
      "Hier steht später ein echtes Kundenzitat: welches Problem bestand, was gebaut wurde und was sich dadurch messbar verändert hat.",
    name: "Vorname Nachname",
    role: "Position · Unternehmen",
  },
  {
    quote:
      "Hier steht später ein echtes Kundenzitat: welches Problem bestand, was gebaut wurde und was sich dadurch messbar verändert hat.",
    name: "Vorname Nachname",
    role: "Position · Unternehmen",
  },
  {
    quote:
      "Hier steht später ein echtes Kundenzitat: welches Problem bestand, was gebaut wurde und was sich dadurch messbar verändert hat.",
    name: "Vorname Nachname",
    role: "Position · Unternehmen",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-quote-card]");
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
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          }),
      });
      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  return (
    <section id="testimonials" ref={ref} className="section">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle
          label="Kundenstimmen"
          title={
            <>
              Ergebnisse, die <Accent>für sich sprechen.</Accent>
            </>
          }
        />

        <div className="mt-14 md:mt-16 grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <figure key={i} data-quote-card className="card shadow-card p-7">
              <div className="flex gap-1 text-accent" aria-hidden>
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={16} fill="currentColor" />
                ))}
              </div>
              <blockquote className="mt-5 text-base md:text-lg leading-relaxed text-fg/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent text-sm font-bold">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{t.name}</span>
                  <span className="block text-xs text-muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
