"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionTitle, { Accent } from "./SectionTitle";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Wo fangen wir eigentlich an?",
    a: "Mit einem kostenlosen Erstgespräch. Wir schauen gemeinsam, wie Ihr Unternehmen heute arbeitet, wo Zeit und Geld versickern — und Sie bekommen eine klare Einschätzung, was sich zu automatisieren lohnt.",
  },
  {
    q: "Wie lange dauert die Umsetzung?",
    a: "Das hängt vom Umfang ab. Kleinere Automatisierungen können innerhalb weniger Tage live gehen, größere Lösungen benötigen meist einige Wochen. Nach dem Erstgespräch erhalten Sie einen realistischen Zeitplan.",
  },
  {
    q: "Mit welchen Kosten muss ich rechnen?",
    a: "Das hängt vom Umfang des Projekts ab. Nach dem Erstgespräch erstellen wir ein individuelles Angebot — gemeinsam finden wir eine faire Lösung, die sich für Ihr Unternehmen rechnet.",
  },
  {
    q: "Wie unterscheidet sich das von einem Chatbot oder einem Standard-KI-Tool?",
    a: "Fertige Tools kennen Ihr Unternehmen nicht. Wir dokumentieren zuerst, wie Ihre Abläufe wirklich funktionieren, und bauen die Agenten auf diesem Wissen auf — verbunden mit Ihren bestehenden Systemen statt als weitere Insel-App.",
  },
  {
    q: "Funktioniert das mit unserer Software?",
    a: "In den meisten Fällen ja. Wir integrieren unsere Lösungen in bestehende Systeme wie CRM, Kalender, E-Mail, Buchhaltung oder interne Datenbanken.",
  },
  {
    q: "Brauchen wir ein technisches Team?",
    a: "Nein. Wir übernehmen Konzeption, Entwicklung und Einrichtung. Sie müssen lediglich Ihre Abläufe kennen — um den Rest kümmern wir uns.",
  },
  {
    q: "Sind unsere Daten sicher?",
    a: "Ja. Wir arbeiten DSGVO-konform, besprechen vorab, welche Daten die Systeme verarbeiten dürfen, und behalten sensible Schritte in menschlicher Kontrolle.",
  },
  {
    q: "Was passiert, nachdem es gebaut ist?",
    a: "Wir begleiten Sie weiter: Wir überwachen die Workflows, passen sie an, wenn sich Ihre Abläufe ändern, und erweitern die Automatisierung Schritt für Schritt.",
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
            stagger: 0.06,
            ease: "power3.out",
            overwrite: true,
          }),
      });

      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  return (
    <section id="faq" ref={ref} className="section">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionTitle
          label="FAQ"
          title={
            <>
              Häufige <Accent>Fragen.</Accent>
            </>
          }
        />

        <div className="mt-10 md:mt-12 space-y-2.5">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                data-faq-row
                className={`card transition-colors ${
                  isOpen ? "border-accent/30" : ""
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-[0.95rem] md:text-base font-medium tracking-tight">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-muted transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-accent" : ""
                    }`}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[0.95rem] text-muted leading-relaxed">
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
