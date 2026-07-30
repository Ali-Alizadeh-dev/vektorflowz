"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionTitle, { Accent } from "./SectionTitle";
import {
  Users,
  FileText,
  PenTool,
  MessageSquare,
  Search,
  ClipboardList,
} from "lucide-react";

/* Ehrliches Framing: Beispiele dafür, was wir bauen — keine erfundenen
   Kunden-Claims (siehe Memory: Trust-Signale nur ehrlich). */
const agents = [
  {
    icon: Users,
    title: "Vertriebs-Agent",
    text: "Liest Ihre Gespräche und Nachrichten mit, bewertet Lead-Qualität, verfolgt Kundenstimmung und gibt Ihrem Vertrieb den Kontext zum Abschluss — ohne manuelle CRM-Pflege.",
  },
  {
    icon: FileText,
    title: "Angebots-Agent",
    text: "Erstellt maßgeschneiderte Angebote aus Gesprächsnotizen und früheren Aufträgen in Minuten — Angebote gehen noch am selben Tag raus statt eine Woche im Entwurf zu liegen.",
  },
  {
    icon: PenTool,
    title: "Content-Agent",
    text: "Macht aus einer Idee eine Woche voller markengerechter Posts, Captions und E-Mails — jeder Kanal bleibt aktiv, ohne ein eigenes Content-Team aufzubauen.",
  },
  {
    icon: MessageSquare,
    title: "Support-Agent",
    text: "Liest jede eingehende Nachricht, sortiert und leitet sie weiter und entwirft die Antwort — nichts bleibt unbeantwortet, Ihr Team fasst nur an, was einen Menschen braucht.",
  },
  {
    icon: Search,
    title: "Recherche-Agent",
    text: "Recherchiert Interessenten, Kunden oder Märkte auf Zuruf und in der Tiefe — die Daten, die Ihr Team braucht, in Sekunden statt in Stunden Kleinarbeit.",
  },
  {
    icon: ClipboardList,
    title: "Verwaltungs-Agent",
    text: "Übernimmt die Dokumentenarbeit: liest Verträge, Formulare und Anträge und überträgt die Daten direkt in Ihre Systeme — Schluss mit stundenlangem Abtippen.",
  },
];

export default function AgentsShowcase() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-agent-card]");
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
        <SectionTitle
          label="Unsere Lösungen"
          title={
            <>
              Ein paar der Agenten, <Accent>die wir bauen.</Accent>
            </>
          }
          intro="Jeder dieser Agenten ersetzt Stunden manueller Arbeit pro Woche. Ihrer wird genauso gebaut — um Ihre Workflows herum, nicht von der Stange."
        />

        <div className="mt-10 md:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((a) => (
            <article
              key={a.title}
              data-agent-card
              className="card shadow-card p-6 flex flex-col items-center text-center"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <a.icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {a.title}
              </h3>
              <p className="mt-2.5 text-[0.95rem] text-muted leading-relaxed">
                {a.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
