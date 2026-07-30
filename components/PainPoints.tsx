"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionTitle, { Accent } from "./SectionTitle";
import { TrendingUp, Copy, Lock, HelpCircle } from "lucide-react";

const pains = [
  {
    icon: TrendingUp,
    title: "Sie wachsen schneller als Ihre Systeme",
    text: "Der Umsatz steigt, also stellen Sie ein — und jede neue Kraft übernimmt Dateneingabe, Terminplanung und Freigaben, die ein System von allein erledigen sollte.",
    stat: "70.000 €+/Jahr",
    statLabel: "pro Verwaltungsstelle für Arbeit, die KI übernimmt",
  },
  {
    icon: Copy,
    title: "Ihr Team lebt von Copy-Paste",
    text: "Daten zwischen Tools übertragen, Dokumente von Hand lesen, jeden Montag denselben Bericht neu erstellen. Ihre besten Leute leisten Arbeit ohne Wertschöpfung.",
    stat: "15–20 Std.",
    statLabel: "verliert jede Person — pro Woche",
  },
  {
    icon: Lock,
    title: "Sie haben es schon mit Software versucht",
    text: "Das CRM als Telefonbuch. Ein Projekttool, das niemand öffnet. Die Software war nie das Problem — sie wurde nur nie an Ihre echten Abläufe angepasst.",
    stat: "2.000 €+/Monat",
    statLabel: "für Software, um die Ihr Team herumarbeitet",
  },
  {
    icon: HelpCircle,
    title: "KI ist wichtig — aber wo anfangen?",
    text: "Ihre Daten liegen verstreut in CRM, Postfach, Tabellen und drei Apps, die nicht miteinander sprechen. Sie brauchen einen Plan, kein weiteres Abo.",
    stat: "6+ Tools",
    statLabel: "und keines spricht mit dem anderen",
  },
];

export default function PainPoints() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-pain-card]");
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
    <section id="probleme" ref={ref} className="section bg-bg">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTitle
          label="Für wen ist das"
          title={
            <>
              Kommt Ihnen das <Accent>bekannt vor?</Accent>
            </>
          }
          intro="Wir bauen für wachsende Unternehmen, die ihren Abläufen entwachsen sind — dort, wo manuelle Arbeit leise begrenzt, was das Team schaffen kann."
        />

        <div className="mt-10 md:mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pains.map((p) => (
            <article
              key={p.title}
              data-pain-card
              className="card shadow-card p-5 flex flex-col"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent-soft text-accent">
                <p.icon size={19} strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight leading-snug">
                {p.title}
              </h3>
              <p className="mt-2 text-[0.9rem] text-muted leading-relaxed flex-1">
                {p.text}
              </p>
              <div className="mt-5 pt-4 border-t border-line">
                <div className="text-2xl md:text-[1.6rem] font-semibold tracking-tight text-accent">
                  {p.stat}
                </div>
                <div className="mt-1 text-xs text-muted">{p.statLabel}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
