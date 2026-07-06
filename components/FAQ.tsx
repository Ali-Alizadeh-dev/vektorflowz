"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeader from "./SectionHeader";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Wie lange dauert die Implementierung?",
    a: "Die meisten Projekte gehen innerhalb weniger Wochen live. Nach der kostenlosen Beratung legen wir einen klaren Zeitplan fest – einfache Automatisierungen laufen oft in wenigen Tagen, größere Multi-Agenten-Systeme brauchen etwas länger.",
  },
  {
    q: "Lässt sich KI in unsere bestehende Software integrieren?",
    a: "Ja. Wir bauen auf den Tools auf, die Sie bereits nutzen – CRM, Kalender, E-Mail, Telefonanlage und interne Datenbanken – damit sich KI in Ihren Betrieb einfügt, statt ihn zu ersetzen.",
  },
  {
    q: "Brauchen wir technisches Wissen?",
    a: "Nein. Wir übernehmen Konzeption, Entwicklung und Integration vollständig und schulen Ihr Team. Wenn Sie Ihren Arbeitsalltag beschreiben können, reicht das, um zu starten.",
  },
  {
    q: "Wie sicher sind unsere Daten?",
    a: "Sicherheit ist von Anfang an eingebaut. Wir arbeiten DSGVO-konform, Ihre Daten bleiben in Ihren freigegebenen Systemen und werden in der EU verarbeitet, Zugriffe sind kontrolliert und nachvollziehbar.",
  },
  {
    q: "Welche Unternehmen profitieren am meisten?",
    a: "Jedes Unternehmen mit wiederkehrenden Prozessen, hohem Anruf- oder Nachrichtenaufkommen oder manueller Datenarbeit – vom lokalen Dienstleister bis zum vertriebs- und betriebsstarken Unternehmen.",
  },
  {
    q: "Wie viel lässt sich mit KI automatisieren?",
    a: "Oft mehr als erwartet. Wir beginnen mit Ihren wirkungsvollsten, wiederkehrenden Aufgaben und erweitern Schritt für Schritt, sobald Sie Ergebnisse sehen.",
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
          title="Häufige Fragen, klar beantwortet."
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
