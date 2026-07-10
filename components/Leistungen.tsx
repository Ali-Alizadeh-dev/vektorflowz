"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeader from "./SectionHeader";
import { Phone, Bot, Users, Workflow, Database, MessageCircle } from "lucide-react";

const services = [
  {
    icon: Phone,
    title: "KI-Telefonassistent",
    text: "Nimmt Anrufe entgegen, beantwortet  Fragen, vereinbart Termine und ist auch außerhalb Ihrer Geschäftszeiten erreichbar.",
  },
  {
    icon: Users,
    title: "KI-Agenten Team",
    text: "Mehrere spezialisierte KI-Agenten arbeiten zusammen und übernehmen unterschiedliche Aufgaben in Ihrem Unternehmen.",
    tags: ["Vertrieb", "Support", "Verwaltung", "Betrieb"],
  },
  {
    icon: Workflow,
    title: "Workflow-Automatisierung",
    text: "Automatisiert wiederkehrende Abläufe wie E-Mails, Dokumente, Freigaben oder Berichte.",
  },
  {
    icon: Database,
    title: "CRM-Integration",
    text: "KI greift auf Ihr CRM zu, aktualisiert Daten, erstellt Follow-ups und unterstützt Ihren Vertrieb direkt im bestehenden System.",
  },
  {
    icon: MessageCircle,
    title: "KI-Chatbot",
    text: "Beantwortet Fragen auf Ihrer Website, qualifiziert Anfragen und hilft Besuchern rund um die Uhr weiter.",
  }
];

export default function Leistungen() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-svc-card]");
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
            stagger: 0.07,
            ease: "power3.out",
            overwrite: true,
          }),
      });
      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  return (
    <section id="leistungen" ref={ref} className="section">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          label="Unsere Lösungen"
          title="Die passende automatisierung für ihren Use Case"
          intro="Nicht jede Aufgabe braucht einen neuen Mitarbeiter. Viele wiederkehrende Tätigkeiten lassen sich automatisieren – zuverlässig und ohne Ihre bestehenden Abläufe auf den Kopf zu stellen."
        />

        <div className="mt-14 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <article
              key={s.title}
              data-svc-card
              className="card shadow-card p-7 flex flex-col"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-soft text-accent">
                <s.icon size={22} />
              </span>
              <h3 className="mt-5 text-xl font-medium tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-base text-muted leading-relaxed">
                {s.text}
              </p>
              {s.tags && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-medium text-muted bg-bg border border-line px-2.5 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
