"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SectionHeader from "./SectionHeader";
import {
  Bot,
  Workflow,
  Database,
  Mail,
  FileSpreadsheet,
  Sparkles,
  Check,
} from "lucide-react";

const TAB_DURATION = 6; // seconds per tab before auto-advance

const services = [
  {
    id: "assistants",
    icon: Bot,
    title: "KI-Assistenten",
    short: "Schnelle Antworten. Rund um die Uhr.",
    long: "Digitale Assistenten unterstützen Kunden, Mitarbeitende und Interessenten bei wiederkehrenden Fragen und Aufgaben.",
    points: [
      "Entlastung von Support und Service",
      "Zugriff auf Unternehmenswissen in Sekunden",
      "Individuell auf Ihre Anforderungen abgestimmt",
    ],
  },
  {
    id: "process",
    icon: Workflow,
    title: "Prozess-Automatisierung",
    short: "Routine läuft automatisch.",
    long: "Wiederkehrende Aufgaben werden automatisiert und standardisiert, damit Prozesse schneller und zuverlässiger ablaufen.",
    points: [
      "Weniger manuelle Arbeit",
      "Schnellere Bearbeitungszeiten",
      "Höhere Prozesssicherheit",
    ],
  },
  {
    id: "data",
    icon: Database,
    title: "Daten-Integration",
    short: "Verbundene Systeme statt Datensilos.",
    long: "Bestehende Anwendungen werden intelligent miteinander verknüpft, damit Informationen dort ankommen, wo sie benötigt werden.",
    points: [
      "Automatischer Datenaustausch",
      "Weniger doppelte Eingaben",
      "Einheitliche Datenbasis",
    ],
  },
  {
    id: "content",
    icon: Sparkles,
    title: "Content & Kommunikation",
    short: "Professionelle Inhalte mit weniger Aufwand.",
    long: "E-Mails, Angebote, Berichte oder interne Kommunikation werden automatisiert vorbereitet und in Ihrer Tonalität erstellt.",
    points: [
      "Konsistente Kommunikation",
      "Individuelle Vorlagen",
      "Mehrsprachige Inhalte möglich",
    ],
  },
  {
    id: "leads",
    icon: Mail,
    title: "Lead-Bearbeitung",
    short: "Keine Anfrage bleibt liegen.",
    long: "Anfragen werden automatisch erfasst, qualifiziert und an die richtige Stelle weitergeleitet.",
    points: [
      "Schnellere Reaktionszeiten",
      "Automatische Qualifizierung",
      "Strukturierte Übergabe an den Vertrieb",
    ],
  },
  {
    id: "reporting",
    icon: FileSpreadsheet,
    title: "Reporting & Insights",
    short: "Relevante Zahlen auf einen Blick.",
    long: "Daten werden automatisch ausgewertet und verständlich aufbereitet.",
    points: [
      "Zentrale Auswertungen",
      "Automatische Berichte",
      "Bessere Entscheidungsgrundlagen",
    ],
  },
];

export default function Leistungen() {
  const ref = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = services[activeIdx];

  // Initial scroll-in animation
  useGSAP(
    () => {
      gsap.from('[data-svc-item]', {
        scrollTrigger: {
          trigger: '[data-svc-list]',
          start: "top 80%",
          once: true,
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from(panelRef.current, {
        scrollTrigger: {
          trigger: panelRef.current,
          start: "top 80%",
          once: true,
        },
        x: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: ref }
  );

  // Auto-iterate + drive the active tab's progress bar
  useGSAP(
    () => {
      tweenRef.current?.kill();
      // Reset all bars
      gsap.set('[data-bar-fill]', { scaleY: 0 });

      const bar = document.querySelector(
        `[data-bar-fill="${activeIdx}"]`
      );
      if (!bar) return;

      tweenRef.current = gsap.fromTo(
        bar,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: TAB_DURATION,
          ease: "none",
          transformOrigin: "top center",
          onComplete: () => {
            setActiveIdx((i) => (i + 1) % services.length);
          },
        }
      );

      if (paused) tweenRef.current.pause();
    },
    { dependencies: [activeIdx, paused] }
  );

  // Re-animate panel content on tab change
  useGSAP(
    () => {
      const el = panelRef.current;
      if (!el) return;
      gsap.fromTo(
        el.querySelectorAll('[data-panel-anim]'),
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          overwrite: true,
        }
      );
    },
    { dependencies: [activeIdx], scope: panelRef }
  );

  return (
    <section id="leistungen" ref={ref} className="section">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          label="Leistungen"
          title="Automatisierungen, die echten Mehrwert schaffen."
          intro="Jedes Unternehmen hat Prozesse, die Zeit kosten, Ressourcen binden oder vermeidbare Fehler verursachen. Wir entwickeln intelligente Lösungen, die Abläufe vereinfachen und Teams nachhaltig entlasten."
        />

        <div
          className="mt-16 md:mt-24 grid lg:grid-cols-12 gap-5 md:gap-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Tab list */}
          <ol data-svc-list className="lg:col-span-5 flex flex-col gap-2.5">
            {services.map((s, i) => {
              const isActive = i === activeIdx;
              return (
                <li key={s.id} data-svc-item>
                  <button
                    onClick={() => setActiveIdx(i)}
                    aria-pressed={isActive}
                    className={`relative w-full text-left rounded-2xl border pl-5 pr-7 py-4 flex items-center gap-4 transition-all duration-300 overflow-hidden ${
                      isActive
                        ? "bg-accent text-bg border-accent shadow-accent-glow"
                        : "bg-surface border-line hover:border-fg/20 hover:bg-fg/[0.03]"
                    }`}
                  >
                    <span
                      className={`shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl transition-colors ${
                        isActive
                          ? "bg-bg/15 text-bg"
                          : "bg-accent-soft text-accent"
                      }`}
                    >
                      <s.icon size={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg font-medium tracking-tight">
                        {s.title}
                      </span>
                      <span
                        className={`block text-base mt-0.5 ${
                          isActive ? "text-bg/65" : "text-muted"
                        }`}
                      >
                        {s.short}
                      </span>
                    </span>

                    {/* Vertical progress bar on the right */}
                    <span
                      aria-hidden
                      className={`absolute top-3 bottom-3 right-2 w-[3px] rounded-full overflow-hidden ${
                        isActive ? "bg-bg/20" : "bg-transparent"
                      }`}
                    >
                      <span
                        data-bar-fill={i}
                        className="block w-full h-full bg-bg origin-top"
                        style={{ transform: "scaleY(0)" }}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Detail panel */}
          <div className="lg:col-span-7">
            <div
              ref={panelRef}
              className="card shadow-card p-6 md:p-8 min-h-[380px] flex flex-col"
            >
              <div className="flex items-center gap-3" data-panel-anim>
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-accent-soft text-accent">
                  <active.icon size={20} />
                </span>
                <span className="text-sm uppercase tracking-[0.2em] text-muted">
                  {String(activeIdx + 1).padStart(2, "0")} · {active.short}
                </span>
              </div>

              <h3
                data-panel-anim
                className="mt-6 text-3xl md:text-4xl font-medium tracking-tight"
              >
                {active.title}
              </h3>

              <p
                data-panel-anim
                className="mt-5 text-lg text-muted leading-relaxed max-w-prose"
              >
                {active.long}
              </p>

              <ul data-panel-anim className="mt-6 space-y-3">
                {active.points.map((p) => (
                  <li key={p} className="flex gap-3 items-start text-base">
                    <Check
                      size={18}
                      className="text-accent shrink-0 mt-0.5"
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div
                data-panel-anim
                className="mt-auto pt-8 border-t border-line flex items-center justify-end"
              >
                <a
                  href="#kontakt"
                  className="group text-base font-medium inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                >
                  Anfragen
                  <span
                    aria-hidden
                    className="inline-block group-hover:translate-x-0.5 transition-transform"
                  >
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
