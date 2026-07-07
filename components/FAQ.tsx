"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeader from "./SectionHeader";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Wie lange dauert die Umsetzung?",
    a: "Das hängt vom Umfang des Projekts ab. Kleinere Automatisierungen können innerhalb weniger Tage umgesetzt werden, größere Lösungen benötigen meist einige Wochen. Nach dem Erstgespräch erhalten Sie einen realistischen Zeitplan.",
  },
  {
    q: "Funktioniert das mit unserer Software?",
    a: "In den meisten Fällen ja. Wir integrieren unsere Lösungen in bestehende Systeme wie CRM, Kalender, Telefonanlagen oder interne Datenbanken.",
  },
  {
    q: "Brauchen wir technisches Vorwissen?",
    a: "Nein. Wir übernehmen Konzeption, Entwicklung und Einrichtung. Sie müssen lediglich Ihre Abläufe kennen – um den Rest kümmern wir uns.",
  },
  {
    q: "Wie sicher sind unsere Daten?",
    a: "Datenschutz hat für uns einen hohen Stellenwert. Wir arbeiten DSGVO-konform, setzen auf europäische Datenverarbeitung und sorgen dafür, dass Zugriffe nachvollziehbar bleiben.",
  },
  {
    q: "Für welche Unternehmen lohnt sich KI?",
    a: "Für alle Unternehmen, die regelmäßig ähnliche Aufgaben erledigen, viele Kundenanfragen bearbeiten oder wiederkehrende Prozesse automatisieren möchten.",
  },
  {
    q: "Wie viel lässt sich automatisieren?",
    a: "Oft deutlich mehr, als zunächst vermutet wird. Gemeinsam identifizieren wir zuerst die Bereiche mit dem größten Nutzen und erweitern die Automatisierung anschließend Schritt für Schritt.",
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
