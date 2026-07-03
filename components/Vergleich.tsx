"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { X, Check } from "lucide-react";

const challenges = [
  "Mitarbeitende verbringen zu viel Zeit mit wiederkehrender Arbeit",
  "Langsame Reaktionszeiten frustrieren Kunden",
  "Manuelle Dateneingabe und Fehler",
  "Hohe Betriebskosten",
  "Ein Arbeitspensum, das immer weiter wächst",
];

const withUs = [
  "KI arbeitet rund um die Uhr, ohne Pausen",
  "Deutlich weniger Routinearbeit für Ihr Team",
  "Geringere Betriebskosten",
  "Schnellerer Kundensupport",
  "Höhere Produktivität im Team",
  "Skalierbare Geschäftsprozesse",
];

export default function Vergleich() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-cmp]");
      if (!items.length) return;
      gsap.set(items, { y: 26, opacity: 0 });
      ScrollTrigger.batch(items, {
        start: "top 85%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            overwrite: true,
          }),
      });
      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  return (
    <section id="warum" ref={ref} className="section bg-bg border-y border-line">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-sm font-semibold uppercase tracking-[0.08em] text-accent">
            Warum Unternehmen auf KI setzen
          </div>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tightest leading-[1.08]">
            Vom ständigen Feuerlöschen zu einem ruhigen, skalierbaren
            Unternehmen.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {/* Challenges */}
          <div data-cmp className="card shadow-card p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600">
                <X size={16} />
              </span>
              <span className="text-lg font-medium">Aktuelle Herausforderungen</span>
            </div>
            <ul className="space-y-3.5">
              {challenges.map((c) => (
                <li key={c} className="flex gap-3 text-base text-muted leading-relaxed">
                  <span className="text-red-500 mt-0.5 shrink-0">—</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* With solvomind */}
          <div
            data-cmp
            className="relative rounded-[18px] border border-accent/20 p-8 shadow-card-lg overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, rgba(0,61,240,0.06) 0%, var(--surface) 70%)",
            }}
          >
            <div className="flex items-center gap-2.5 mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-accent text-white">
                <Check size={16} />
              </span>
              <span className="text-lg font-medium text-accent">Mit solvomind</span>
            </div>
            <ul className="space-y-3.5">
              {withUs.map((c) => (
                <li key={c} className="flex gap-3 text-base font-medium leading-relaxed">
                  <Check size={18} className="text-accent mt-0.5 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
