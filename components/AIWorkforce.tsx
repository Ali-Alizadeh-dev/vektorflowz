"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionTitle, { Accent } from "./SectionTitle";
import {
  Cpu,
  Target,
  Megaphone,
  BadgeDollarSign,
  Settings,
  Send,
  Mail,
  FileText,
  RefreshCw,
  ShieldQuestion,
  PenTool,
  Zap,
  Globe,
  CalendarDays,
  Receipt,
  Scale,
  BarChart3,
  ListChecks,
  UserPlus,
  Clock,
  LifeBuoy,
  FileStack,
} from "lucide-react";

const departments = [
  {
    icon: Target,
    name: "Vertrieb",
    count: "5 KI-Agenten",
    agents: [
      { icon: Send, label: "Outreach-Agent" },
      { icon: Mail, label: "Kaltakquise-Mails" },
      { icon: FileText, label: "Angebots-Assistent" },
      { icon: RefreshCw, label: "Deal-Follow-up" },
      { icon: ShieldQuestion, label: "Einwandbehandlung" },
    ],
  },
  {
    icon: Megaphone,
    name: "Marketing",
    count: "4 KI-Agenten",
    agents: [
      { icon: PenTool, label: "Content-Engine" },
      { icon: Zap, label: "Kampagnen" },
      { icon: Globe, label: "SEO & Web" },
      { icon: CalendarDays, label: "Social-Planer" },
    ],
  },
  {
    icon: BadgeDollarSign,
    name: "Finanzen",
    count: "4 KI-Agenten",
    agents: [
      { icon: Receipt, label: "Rechnungsstellung" },
      { icon: Scale, label: "Kontenabgleich" },
      { icon: BarChart3, label: "Reporting" },
      { icon: ListChecks, label: "Ausgaben-Tracking" },
    ],
  },
  {
    icon: Settings,
    name: "Betrieb",
    count: "5 KI-Agenten",
    agents: [
      { icon: UserPlus, label: "Onboarding" },
      { icon: Clock, label: "Terminplanung" },
      { icon: LifeBuoy, label: "Support-Triage" },
      { icon: FileStack, label: "Dokumente" },
      { icon: RefreshCw, label: "Status-Updates" },
    ],
  },
];

/* Horizontale Endpunkte (im 0–100-viewBox) der vier Verbindungslinien —
   ausgerichtet auf die vier Abteilungsspalten, gleiche Reihenfolge wie
   `departments`. Beam i und Spalte i teilen sich denselben Versatz, damit
   Linie, Kopf und Agenten derselben Abteilung gemeinsam aufleuchten.
   STEP_SECONDS = ein voller Schritt der Schleife (4 × 1,5 s = 6-s-Zyklus,
   passend zur animation-duration der wf-*-Keyframes in globals.css). So
   läuft das Signal nacheinander Abteilung 1 → 2 → 3 → 4 → von vorn. */
const CONNECTORS = [13, 38, 63, 88];
const STEP_SECONDS = 1.5;

type Department = (typeof departments)[number];
type AgentEntry = Department["agents"][number];

/* Abteilungs-Kopf (Icon + Name + Agentenzahl) — geteilt von Desktop-Grid
   und Mobile-Baum, damit beide Layouts identisch aussehen. */
function DeptHead({ d }: { d: Department }) {
  return (
    <div className="card wf-head p-4 flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
        <d.icon size={17} strokeWidth={1.75} />
      </span>
      <div>
        <div className="text-sm font-semibold tracking-tight">{d.name}</div>
        <div className="text-[11px] text-muted">{d.count}</div>
      </div>
    </div>
  );
}

/* Einzelne Agenten-Karte mit Status-Punkt rechts (leuchtet, wenn die
   Abteilung im Zyklus aktiv ist — siehe .wf-dot in globals.css). */
function AgentRow({ a }: { a: AgentEntry }) {
  return (
    <div className="wf-agent flex items-center justify-between gap-2 rounded-xl border bg-surface px-3.5 py-3 text-[13px] font-medium text-fg/85">
      <span className="flex items-center gap-2.5 truncate">
        <a.icon size={14} strokeWidth={1.75} className="shrink-0 text-muted" />
        <span className="truncate">{a.label}</span>
      </span>
      <span className="wf-dot h-1.5 w-1.5 shrink-0 rounded-full" />
    </div>
  );
}

export default function AIWorkforce() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-wf]");
      if (!items.length) return;
      gsap.set(items, { y: 26, opacity: 0 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.6,
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
    <section id="workforce" ref={ref} className="section bg-bg">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle
          label="Ihre KI-Workforce"
          title={
            <>
              So arbeitet Ihr Unternehmen in ein paar Monaten —{" "}
              <Accent>mit KI im Rücken.</Accent>
            </>
          }
          intro="Ein KI-Betriebssystem, trainiert darauf, wie Ihr Unternehmen wirklich arbeitet: ein Team spezialisierter Agenten für Vertrieb, Marketing, Finanzen und Betrieb — im Hintergrund, mit Ihren Leuten am Steuer."
        />

        {/* Chief AI Officer */}
        <div data-wf className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-3.5 rounded-2xl border border-accent/25 bg-surface-2 px-5 py-4 shadow-card">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-on-accent">
              <Cpu size={22} strokeWidth={1.75} />
            </span>
            <div className="text-left">
              <p className="text-base font-semibold tracking-tight leading-tight">
                Master Agent
              </p>
              <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Orchestriert 18 KI-Agenten
              </p>
            </div>
          </div>
        </div>

        {/* ─────────────  Desktop (lg+): 4-Spalten-Orgchart  ───────────── */}

        {/* Verbindungslinien — die aktive zeichnet sich zur Abteilung.
            Nur ab lg, wo tatsächlich vier Spalten unter dem Fächer liegen. */}
        <div
          aria-hidden
          data-wf
          className="relative mx-auto hidden h-12 max-w-4xl lg:block"
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            {CONNECTORS.map((x) => (
              <path
                key={`line-${x}`}
                d={`M 50 0 C 50 70, ${x} 30, ${x} 100`}
                fill="none"
                stroke="var(--accent)"
                strokeOpacity="0.18"
                strokeWidth="1"
                strokeDasharray="3 4"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {CONNECTORS.map((x, i) => (
              <path
                key={`beam-${x}`}
                className="wf-beam"
                style={{ animationDelay: `${i * STEP_SECONDS}s` }}
                d={`M 50 0 C 50 70, ${x} 30, ${x} 100`}
                pathLength={100}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="100"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </div>

        <div className="hidden gap-4 lg:grid lg:grid-cols-4">
          {departments.map((d, i) => (
            <div
              key={d.name}
              data-wf
              style={{ "--wf-delay": `${i * STEP_SECONDS}s` } as CSSProperties}
            >
              <DeptHead d={d} />
              <div className="relative mt-3">
                {/* Vertikale Spalten-Verbindung (leuchtet mit der Abteilung) */}
                <span
                  aria-hidden
                  className="wf-spine pointer-events-none absolute left-[1.3rem] top-0 bottom-2 w-px rounded-full"
                />
                <div className="space-y-2.5">
                  {d.agents.map((a) => (
                    <AgentRow key={a.label} a={a} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─────────────  Mobile / Tablet (<lg): vertikaler Baum  ─────────────
            Statt vier Spalten stapeln sich die Abteilungen untereinander.
            Jede hängt über einen zentralen Stamm am Master Agent, die Agenten
            sind eingerückt an einer Zweiglinie aufgereiht — wie im Referenzbild.
            Highlight-Zyklus (--wf-delay + .wf-* Keyframes) läuft identisch. */}
        <div className="mx-auto mt-2 max-w-md lg:hidden">
          {departments.map((d, i) => (
            <div
              key={d.name}
              data-wf
              style={{ "--wf-delay": `${i * STEP_SECONDS}s` } as CSSProperties}
            >
              {/* Stamm von oben (Master Agent bzw. vorherige Abteilung) */}
              <div aria-hidden className="flex justify-center">
                <span className="h-6 w-px bg-line" />
              </div>

              <DeptHead d={d} />

              {/* Agenten, eingerückt an einer vertikalen Zweiglinie */}
              <div className="relative mt-3">
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-[11px] top-4 bottom-6 w-px bg-line"
                />
                <span
                  aria-hidden
                  className="wf-spine pointer-events-none absolute left-[11px] top-4 bottom-6 w-px rounded-full"
                />
                <ul className="space-y-2.5 pl-6">
                  {d.agents.map((a) => (
                    <li key={a.label} className="relative">
                      {/* horizontaler Zweig von der Stammlinie zur Karte */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -left-[13px] top-1/2 h-px w-[13px] -translate-y-1/2 bg-line"
                      />
                      <AgentRow a={a} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
