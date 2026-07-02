"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeader from "./SectionHeader";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Für welche Unternehmen lohnt sich KI-Automatisierung?",
    a: "Grundsätzlich für jedes Unternehmen, das wiederkehrende, regelbasierte Aufgaben hat – von der Angebotserstellung über die Lead-Bearbeitung bis zum Reporting. Schon kleine Teams sparen oft mehrere Stunden pro Woche.",
  },
  {
    q: "Wie lange dauert ein typisches Projekt?",
    a: "Das hängt vom Umfang ab. Kleinere Automatisierungen sind oft in ein bis zwei Wochen einsatzbereit, größere Integrationen dauern entsprechend länger. Nach dem Erstgespräch erhalten Sie eine klare Einschätzung mit Zeitrahmen.",
  },
  {
    q: "Was passiert mit unseren Daten? Ist das DSGVO-konform?",
    a: "Datenschutz hat Priorität. Wir arbeiten DSGVO-konform, setzen wo möglich auf europäische oder selbst gehostete Lösungen und verarbeiten nur die Daten, die für die jeweilige Aufgabe wirklich nötig sind.",
  },
  {
    q: "Müssen wir unsere bestehenden Tools wechseln?",
    a: "Nein. Wir setzen auf Ihre vorhandenen Systeme auf und verbinden sie miteinander, statt alles neu aufzubauen. Ziel ist, Ihren Alltag zu erleichtern – nicht ihn umzukrempeln.",
  },
  {
    q: "Was kostet eine Automatisierung?",
    a: "Jedes Projekt ist individuell. Sie erhalten vorab eine transparente Kostenübersicht mit Fixpreis oder klarem Rahmen – ohne versteckte Posten. Das Erstgespräch ist immer unverbindlich und kostenfrei.",
  },
];

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-faq-row]");
      gsap.set(rows, { y: 24, opacity: 0 });

      ScrollTrigger.batch(rows, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.7,
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
    <section id="faq" ref={ref} className="section bg-bg">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionHeader
          label="FAQ"
          title="Häufige Fragen."
          intro="Was Unternehmen vor der Zusammenarbeit am häufigsten wissen möchten."
        />

        <div className="mt-14 md:mt-16">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                data-faq-row
                className="border-t border-line last:border-b"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="text-lg md:text-xl font-medium tracking-tight">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border border-line transition-all duration-300 ${
                      isOpen
                        ? "bg-accent text-white rotate-45 border-accent"
                        : "text-accent"
                    }`}
                  >
                    <Plus size={18} />
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-12 text-base md:text-lg text-muted leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
