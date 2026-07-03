"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Clock, Timer, Zap, TrendingDown } from "lucide-react";

const stats = [
  { icon: Clock, value: "24/7", label: "Verfügbarkeit, jeden Tag" },
  { icon: Timer, value: "Hunderte", label: "eingesparte Stunden" },
  { icon: Zap, value: "Schneller", label: "Reaktion auf Kundenanfragen" },
  { icon: TrendingDown, value: "Geringer", label: "Betriebskosten" },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-stat]");
      if (!items.length) return;
      gsap.set(items, { y: 24, opacity: 0 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
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
    <section
      ref={ref}
      className="section bg-bg border-y border-line !py-16 md:!py-20"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center max-w-xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-accent">
            Unternehmen arbeiten smarter mit KI
          </p>
          <p className="mt-2 text-lg text-muted">
            Praktische KI-Systeme mit messbaren Ergebnissen — keine Experimente.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {stats.map((s) => (
            <div
              key={s.label}
              data-stat
              className="card shadow-card p-6 md:p-7"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent-soft text-accent">
                <s.icon size={18} />
              </span>
              <div className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight">
                {s.value}
              </div>
              <div className="mt-1 text-sm md:text-base text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
