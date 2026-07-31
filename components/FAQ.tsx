"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionTitle, { Accent } from "./SectionTitle";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Wie lange dauert es, neue Tools zu implementieren?",
    a: "Das hängt von Ihren bestehenden Systemen ab und davon, wie viele Integrationen wir aufbauen müssen. In den meisten Fällen lassen sich neue Werkzeuge innerhalb von 2 Wochen vollständig implementieren. Nach einem ersten Strategiegespräch geben wir Ihnen basierend auf Ihren Prozessen einen genaueren Zeitplan.",
  },
  {
    q: "Kann ich meine vorhandenen Tools und Systeme weiterhin verwenden?",
    a: "In 95 % der Fälle ja. Wir integrieren Ihre aktuelle Software in das Automatisierungs-Framework, sodass Sie nicht von Grund auf neu beginnen müssen — es sei denn, es gibt eine effizientere Alternative, die Ihr Geschäft noch skalierbarer machen würde. In diesem Fall beraten wir Sie dazu als vertrauenswürdiger Partner.",
  },
  {
    q: "Was ist mit der DSGVO und dem Datenschutz?",
    a: "Entgegen weit verbreiteter Meinung lassen sich Automatisierungslösungen und KI-Agenten durchaus DSGVO-konform einsetzen. Der Schlüssel liegt darin, das Setup an die spezifischen Anforderungen jedes Kunden anzupassen. Wir setzen auf moderne Sicherheitsmaßnahmen wie Verschlüsselung, starke Authentifizierung und die Einhaltung aktueller Datenschutzbestimmungen, damit Ihre Daten jederzeit geschützt sind. Werkzeuge wie n8n lassen sich bei Bedarf DSGVO-konform konfigurieren — etwa durch lokale Datenverarbeitung, Privacy-by-Design-Einstellungen oder Hosting auf Servern in der EU.",
  },
  {
    q: "Ist Automatisierung wirklich eine lohnende Investition?",
    a: "Es sind keine Kosten — es ist ein Multiplikator. Unternehmen, die unsere Systeme nutzen, sehen regelmäßig, wie ihre Gewinnmargen um 20–50 % steigen, während sich die Arbeitsbelastung um 5–20 Stunden pro Woche reduziert.",
  },
  {
    q: "Arbeiten Sie mit allen Unternehmen zusammen?",
    a: "Wir sind auf ehrgeizige, schnell wachsende B2B-Unternehmen und Agenturen spezialisiert, betreuen aber auch Steuerberater und Anwälte. Wenn Skalierung und Effizienz für Sie Priorität haben, passen wir perfekt zusammen.",
  },
  {
    q: "Können Sie mit unserem hauseigenen Technikteam zusammenarbeiten?",
    a: "Natürlich. Wir ergänzen Ihr Team, bringen Automatisierungs-Expertise ein und entlasten es von sich wiederholenden Aufgaben, damit es sich auf wirkungsvolle Arbeit konzentrieren kann.",
  },
  {
    q: "Bieten Sie laufende Wartung an?",
    a: "Ja. Wir verwalten, überwachen und optimieren Ihre Automatisierungen kontinuierlich, damit sie stets ihr Bestes leisten — auch wenn sich Ihre Werkzeuge, Daten oder geschäftlichen Anforderungen ändern.",
  },
  {
    q: "Wie sicher sind meine Daten?",
    a: "Ihre Daten sind vollständig geschützt — durch Verschlüsselung auf Unternehmensniveau, DSGVO-Konformität und strenge Zugriffskontrollen. Sicherheit ist bei uns nicht verhandelbar.",
  },
  {
    q: "Brauche ich technisches Wissen?",
    a: "Nein. Wir übernehmen die gesamte Einrichtung, Integration und Optimierung für Sie. Außerdem schulen wir Ihr Team, damit es die neuen Systeme effektiv nutzen kann — ganz ohne technisches Vorwissen.",
  },
  {
    q: "Für wen sind Ihre Dienstleistungen am besten geeignet?",
    a: "Unsere Lösungen sind ideal für KMUs, Agenturen, Berater, Steuerberater, Anwälte und generell dienstleistungsbasierte Unternehmen — besonders solche mit 5 bis 100 Teammitgliedern, die effizient skalieren und ihre Abhängigkeit von manuellen Prozessen reduzieren möchten.",
  },
  {
    q: "Wie sieht die Zusammenarbeit mit Ihnen normalerweise aus?",
    a: "Wir beginnen mit einem Strategie-Kick-off-Gespräch, um Engpässe und Chancen zu identifizieren. Anschließend entwerfen wir eine maßgeschneiderte Automatisierungsstrategie, implementieren die Systeme und optimieren sie kontinuierlich, damit Ihre Abläufe mit höchster Effizienz laufen.",
  },
  {
    q: "Was ist, wenn mein Team Schwierigkeiten hat, die neuen Tools zu verwenden?",
    a: "Unsere Lösungen sind bewusst intuitiv gestaltet, aber wir überlassen die Einführung nicht dem Zufall. Wir führen jeden Kunden persönlich ein — mit klaren Schulungen, verständlichen Anleitungen und einem festen Ansprechpartner, der bei Fragen jederzeit zur Verfügung steht, bis sich Ihr Team sicher im Umgang mit den neuen Systemen fühlt.",
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
