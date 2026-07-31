"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionTitle, { Accent } from "./SectionTitle";
import { FileSearch, Network, Bot, Check } from "lucide-react";

const steps = [
  {
    icon: FileSearch,
    title: "Audit",
    lead: "Wir finden, wo Sie Zeit und Geld verlieren.",
    text: "Wir erfassen Ihre Abläufe von Anfang bis Ende — jeden Workflow, jede Übergabe, jeden Engpass — und rechnen aus, wo Ihre Stunden und Ihr Geld wirklich hingehen. Sie bekommen ein klares, priorisiertes Bild davon, was zuerst angepackt gehört.",
    check: "Eine bezifferte Workflow-Karte",
  },
  {
    icon: Network,
    title: "Dokumentation",
    lead: "Wir erfassen, wie Ihr Unternehmen wirklich läuft.",
    text: "Wir dokumentieren Ihre Prozesse, Tools, Daten und die ungeschriebenen Regeln, die nur Ihr Team kennt — und machen daraus die Wissensbasis, auf der Ihre Agenten arbeiten. Genau das macht die KI wirklich zu Ihrer eigenen.",
    check: "Ihr Unternehmen, im Kontext",
  },
  {
    icon: Bot,
    title: "Umsetzung",
    lead: "Wir bauen Agenten, die die Arbeit erledigen.",
    text: "Auf dieser Basis bauen wir Agenten, verbinden sie mit den Tools, die Sie bereits nutzen, und führen sie gemeinsam mit Ihrem Team ein. Die Routinearbeit verschwindet Stück für Stück — und das System lernt weiter dazu.",
    check: "Laufende KI-Workflows",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-how]");
      if (!items.length) return;
      gsap.set(items, { y: 26, opacity: 0 });
      ScrollTrigger.batch(items, {
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
    <section id="ablauf" ref={ref} className="section">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle
          label="So funktioniert's"
          title={
            <>
              Ihre Abläufe, <Accent>neu gebaut für KI.</Accent>
            </>
          }
          intro="Kein Tool von der Stange — ein Prozess, gebaut auf dem, was in Ihrem Unternehmen wirklich passiert."
        />

        {/* 01 — 02 — 03 Verbindungsleiste */}
        <div
          data-how
          aria-hidden
          className="hidden md:flex mt-12 items-center max-w-4xl mx-auto px-16"
        >
          {["01", "02", "03"].map((n, i) => (
            <div key={n} className="flex items-center flex-1 last:flex-none">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-sm font-semibold text-fg/80">
                {n}
              </span>
              {i < 2 && <span className="h-px flex-1 bg-line" />}
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-10 grid md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <article
              key={s.title}
              data-how
              className="card shadow-card p-6 flex flex-col text-center"
            >
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <s.icon size={20} strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-[0.95rem] font-medium text-accent/90">
                {s.lead}
              </p>
              <p className="mt-2.5 text-[0.9rem] text-muted leading-relaxed flex-1">
                {s.text}
              </p>
              <div className="mt-5 pt-4 border-t border-line flex items-center justify-center gap-2 text-sm text-fg/80">
                <Check size={15} className="text-accent" />
                {s.check}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
