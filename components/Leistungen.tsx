"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeader from "./SectionHeader";
import { Phone, Bot, Users, Workflow, Database, MessageCircle } from "lucide-react";

const services = [
  {
    icon: Phone,
    title: "KI-Telefonassistenten",
    text: "Beantworten Anrufe natürlich, buchen Termine und beantworten Kundenfragen — rund um die Uhr, jeden Tag.",
  },
  {
    icon: Bot,
    title: "KI-Mitarbeiter",
    text: "Individuelle Assistenten, trainiert auf Ihr Unternehmenswissen, die Ihr Team unterstützen und wiederkehrende Aufgaben übernehmen.",
  },
  {
    icon: Users,
    title: "KI-Agenten-Teams",
    text: "Mehrere spezialisierte Agenten, die über Ihren gesamten Betrieb hinweg zusammenarbeiten.",
    tags: ["Vertrieb", "Support", "Admin", "Betrieb"],
  },
  {
    icon: Workflow,
    title: "Workflow-Automatisierung",
    text: "Automatisieren Sie die wiederkehrenden Prozesse, die Ihr Team ausbremsen.",
    tags: ["E-Mails", "Dokumente", "Freigaben", "Reports"],
  },
  {
    icon: Database,
    title: "CRM-KI-Integration",
    text: "Verbinden Sie KI direkt mit Ihrem CRM: Kundendaten lesen, Datensätze aktualisieren, Follow-ups erstellen und Ihren Vertrieb unterstützen.",
  },
  {
    icon: MessageCircle,
    title: "KI-Chatbots",
    text: "Website-Chatbots, die Fragen beantworten, Leads qualifizieren und Besucher rund um die Uhr unterstützen.",
  },
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
          label="Unsere KI-Lösungen"
          title="Alles, was Sie brauchen, um KI einzusetzen."
          intro="Sechs maßgeschneiderte Lösungen, die sich in Ihre bestehenden Abläufe einfügen."
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
