"use client";

import { useRef } from "react";
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
    highlight: true,
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
                Chief AI Officer
              </p>
              <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Orchestriert 18 KI-Agenten
              </p>
            </div>
          </div>
        </div>

        {/* Verbindungslinien */}
        <div aria-hidden data-wf className="relative mx-auto h-10 max-w-4xl">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            {[13, 38, 63, 88].map((x) => (
              <path
                key={x}
                d={`M 50 0 C 50 70, ${x} 30, ${x} 100`}
                fill="none"
                stroke="var(--accent)"
                strokeOpacity="0.3"
                strokeWidth="1"
                strokeDasharray="3 4"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </div>

        {/* Abteilungen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map((d) => (
            <div key={d.name} data-wf>
              <div
                className={`card p-4 flex items-center gap-3 ${
                  d.highlight ? "border-accent/40" : ""
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <d.icon size={17} strokeWidth={1.75} />
                </span>
                <div>
                  <div className="text-sm font-semibold tracking-tight">
                    {d.name}
                  </div>
                  <div className="text-[11px] text-muted">{d.count}</div>
                </div>
              </div>
              <div className="mt-3 space-y-2.5">
                {d.agents.map((a) => (
                  <div
                    key={a.label}
                    className={`flex items-center justify-between gap-2 rounded-xl border bg-surface px-3.5 py-3 text-[13px] font-medium text-fg/85 ${
                      d.highlight ? "border-accent/25" : "border-line"
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <a.icon
                        size={14}
                        strokeWidth={1.75}
                        className="shrink-0 text-muted"
                      />
                      <span className="truncate">{a.label}</span>
                    </span>
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        d.highlight ? "bg-accent" : "bg-fg/20"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
