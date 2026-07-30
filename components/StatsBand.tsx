"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

/**
 * PLATZHALTER — noch nicht auf der Seite eingebunden.
 * Das große Zahlen-Band (à la „1.284.402 ausgeführte Aktionen“) braucht
 * echte, belegbare Zahlen. Sobald sie vorliegen: Werte ersetzen und die
 * Sektion in app/page.tsx einkommentieren.
 */
const BIG_NUMBER = "0";
const stats = [
  { value: "— €", label: "Identifizierte Einsparungen" },
  { value: "— %", label: "Automatisch gelöste Aufgaben" },
  { value: "— Wo.", label: "Bis zum ersten Live-Workflow" },
  { value: "24/7", label: "Laufend überwacht" },
];

export default function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = ref.current?.querySelectorAll("[data-band]");
      if (!items?.length) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from(items, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        clearProps: "transform,opacity",
      });
      if (document.hidden) tl.progress(1);
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="section">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="card shadow-card-lg bg-dotgrid px-6 py-14 md:py-20 text-center">
          <p
            data-band
            className="text-[0.75rem] uppercase tracking-[0.3em] text-muted"
          >
            Von solvomind-Agenten ausgeführte Aktionen — Tendenz steigend
          </p>
          <p
            data-band
            className="mt-6 text-6xl md:text-8xl font-semibold tracking-tightest tabular-nums"
          >
            {BIG_NUMBER}
          </p>
          <div
            data-band
            className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-8 border-t border-line pt-10 md:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-semibold tracking-tight">
                  {s.value}
                </p>
                <p className="mt-1.5 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
