"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SectionHeader from "./SectionHeader";
import { Check } from "lucide-react";

const pillars = [
  {
    title: "Persönlich",
    text: "Sie sprechen direkt mit dem Umsetzer — keine Account-Manager-Schichten, keine Telefonwarteschleifen.",
  },
  {
    title: "Pragmatisch",
    text: "Lösungen statt überdimensionierter Tool-Stacks. Das einfachste System, das den Job zuverlässig erledigt.",
  },
  {
    title: "Messbar",
    text: "Fokus auf Zeit, Qualität, Umsatz. Ich definiere Erfolg mit Ihnen vorher — und prüfe ihn nachher.",
  },
];

export default function UeberMich() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('[data-pillar]', {
        scrollTrigger: {
          trigger: '[data-pillars]',
          start: "top 80%",
          once: true,
        },
        x: -30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from('[data-quote-card]', {
        scrollTrigger: {
          trigger: '[data-quote-card]',
          start: "top 80%",
          once: true,
        },
        x: 30,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
      });
    },
    { scope: ref }
  );

  return (
    <section id="ueber-mich" ref={ref} className="section">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          label="Über mich"
          title="Handgemacht, nicht von der Stange."
          intro="Hinter Vektorflowz steht eine klare Idee — KI dort einsetzen, wo sie wirklich Wirkung zeigt."
        />

        <div className="mt-16 md:mt-24 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <ul data-pillars className="lg:col-span-7 space-y-4">
            {pillars.map((p, i) => (
              <li key={p.title} data-pillar>
                <div className="card shadow-card p-6 md:p-7 flex gap-5">
                  <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent-soft text-accent">
                    <Check size={18} />
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight flex items-baseline gap-3">
                      <span className="text-sm text-muted font-mono tracking-normal">
                        0{i + 1}
                      </span>
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

          <aside
            data-quote-card
            className="lg:col-span-5 card shadow-card-lg p-8 md:p-10 lg:sticky lg:top-24"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-fg text-bg flex items-center justify-center text-lg font-medium">
                V
              </div>
              <div>
                <p className="text-lg font-medium">Ihr Ansprechpartner</p>
                <p className="text-base text-muted">Gründer · Vektorflowz</p>
              </div>
            </div>

            <blockquote className="mt-8 text-2xl md:text-3xl italic leading-snug text-fg">
              <span className="text-accent">„</span>
              Die beste Automatisierung ist die, die niemand mehr bemerkt — weil
              sie einfach funktioniert.
              <span className="text-accent">"</span>
            </blockquote>

            <a
              href="#kontakt"
              className="group mt-10 inline-flex items-center gap-2 text-base font-medium"
            >
              Schreiben Sie mir
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
