"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionTitle, { Accent } from "./SectionTitle";
import {
  Search,
  FileText,
  GitBranch,
  Mail,
  Inbox,
  File,
  Bot,
  ScanText,
  Send,
  Flag,
  MessageSquare,
  FolderOpen,
  FileCheck,
} from "lucide-react";

const auditRows = [
  { icon: File, label: "Dokumente & Datenerfassung", time: "14 Std./Wo.", cost: "65 T€/J." },
  { icon: FileText, label: "Angebote & Texterstellung", time: "8 Std./Wo.", cost: "37 T€/J." },
  { icon: ScanText, label: "Formulare & Dateneingabe", time: "6 Std./Wo.", cost: "28 T€/J." },
  { icon: FileCheck, label: "Berichte zusammenstellen", time: "5 Std./Wo.", cost: "23 T€/J." },
  { icon: MessageSquare, label: "Status-Updates & Korrespondenz", time: "3 Std./Wo.", cost: "14 T€/J." },
];

const roadmapRows = [
  { n: "01", label: "Dokumenten-Erfassung", value: "65 T€/J.", width: "92%" },
  { n: "02", label: "Angebots-Engine", value: "37 T€/J.", width: "68%" },
  { n: "03", label: "Report-Agent", value: "28 T€/J.", width: "54%" },
  { n: "04", label: "Formular-Routing", value: "23 T€/J.", width: "42%" },
];

export default function Deliverables() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-deliv]");
      if (!items.length) return;
      gsap.set(items, { y: 26, opacity: 0 });
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            overwrite: true,
          }),
      });
      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  return (
    <section id="ergebnisse" ref={ref} className="section">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTitle
          label="Ihre Roadmap, geliefert"
          title={
            <>
              <Accent>Drei konkrete Ergebnisse.</Accent>
              <br />
              Gehören dauerhaft Ihnen.
            </>
          }
          intro="Keine Folien. Kein vages „Wir melden uns dann“. Alles schriftlich, innerhalb von 48 Stunden nach dem Termin."
        />

        <div className="mt-10 md:mt-12 grid md:grid-cols-3 gap-4 items-start">
          {/* 01 · Workflow-Kosten-Audit */}
          <div data-deliv>
            <div className="card shadow-card overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-line">
                <span className="flex items-center gap-2 text-sm font-semibold text-accent">
                  <Search size={15} /> Workflow-Kosten-Audit
                </span>
                <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-medium text-muted">
                  167 T€/J. gesamt
                </span>
              </div>
              <div className="px-5 py-2">
                <div className="grid grid-cols-[1fr_auto_auto] gap-3 py-2 text-[10px] uppercase tracking-[0.15em] text-muted">
                  <span>Workflow</span>
                  <span>Zeit</span>
                  <span>Kosten</span>
                </div>
                {auditRows.map((r) => (
                  <div
                    key={r.label}
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-t border-line/60 py-2.5 text-[12px]"
                  >
                    <span className="flex items-center gap-2 truncate text-fg/85">
                      <r.icon size={13} className="shrink-0 text-muted" />
                      <span className="truncate">{r.label}</span>
                    </span>
                    <span className="text-muted">{r.time}</span>
                    <span className="font-semibold">{r.cost}</span>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="mt-5 flex items-center gap-2.5 text-lg font-semibold tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Search size={15} />
              </span>
              01 · Workflow-Kosten-Audit
            </h3>
            <p className="mt-2.5 text-[0.95rem] text-muted leading-relaxed">
              Jeder manuelle Workflow erfasst und beziffert. Sie sehen genau,
              welche Aufgaben Geld verbrennen und wie viel — vermutlich zum
              ersten Mal.
            </p>
          </div>

          {/* 02 · Priorisierte KI-Roadmap */}
          <div data-deliv>
            <div className="card shadow-card overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-line">
                <span className="flex items-center gap-2 text-sm font-semibold text-accent">
                  <FileText size={15} /> KI-Roadmap
                </span>
                <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-medium text-muted">
                  4,2× im 1. Jahr
                </span>
              </div>
              <div className="px-5 py-4 space-y-4">
                {roadmapRows.map((r) => (
                  <div key={r.n}>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="flex items-center gap-2.5 text-fg/85">
                        <span className="text-muted font-mono text-[11px]">
                          {r.n}
                        </span>
                        {r.label}
                      </span>
                      <span className="font-semibold text-accent">
                        {r.value}
                      </span>
                    </div>
                    <div className="mt-2 h-1 rounded-full bg-surface">
                      <div
                        className="h-full rounded-full bg-accent/70"
                        style={{ width: r.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="mt-5 flex items-center gap-2.5 text-lg font-semibold tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <FileText size={15} />
              </span>
              02 · Priorisierte KI-Roadmap
            </h3>
            <p className="mt-2.5 text-[0.95rem] text-muted leading-relaxed">
              Die 3–5 Automatisierungen mit dem höchsten ROI, sortiert nach
              Euro-Rendite. Gebaut um Ihre Tools, Ihr Team und Ihre größten
              Kostentreiber. Nichts von der Stange.
            </p>
          </div>

          {/* 03 · KI-OS-Architektur */}
          <div data-deliv>
            <div className="card shadow-card overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-line">
                <span className="flex items-center gap-2 text-sm font-semibold text-accent">
                  <GitBranch size={15} /> KI-Betriebssystem
                </span>
                <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-medium text-muted">
                  Integrations-Map
                </span>
              </div>
              <div className="px-5 py-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted">
                  Quellen
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {[
                    { icon: Mail, label: "E-Mail" },
                    { icon: Inbox, label: "CRM" },
                    { icon: File, label: "PDF" },
                  ].map((s) => (
                    <span
                      key={s.label}
                      className="flex items-center justify-center gap-1.5 rounded-lg border border-line bg-surface px-2 py-2 text-[11px] text-fg/85"
                    >
                      <s.icon size={12} className="text-muted" /> {s.label}
                    </span>
                  ))}
                </div>
                <div aria-hidden className="mx-auto my-2 h-4 w-px bg-line" />
                <div className="rounded-xl border border-accent/25 bg-accent-soft/60 p-3">
                  <p className="text-center text-[10px] uppercase tracking-[0.15em] text-accent">
                    KI-Agenten
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {[
                      { icon: Bot, label: "Erfassungs-Agent" },
                      { icon: ScanText, label: "Extraktions-KI" },
                      { icon: Send, label: "Output-Gen" },
                      { icon: Flag, label: "Review-Flag" },
                    ].map((a) => (
                      <span
                        key={a.label}
                        className="flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2 py-2 text-[11px] text-fg/85"
                      >
                        <a.icon size={12} className="text-accent" /> {a.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div aria-hidden className="mx-auto my-2 h-4 w-px bg-line" />
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted">
                  Ausgabe
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {[
                    { icon: MessageSquare, label: "Slack" },
                    { icon: FolderOpen, label: "Ablage" },
                    { icon: FileCheck, label: "Doku" },
                  ].map((o) => (
                    <span
                      key={o.label}
                      className="flex items-center justify-center gap-1.5 rounded-lg border border-line bg-surface px-2 py-2 text-[11px] text-fg/85"
                    >
                      <o.icon size={12} className="text-muted" /> {o.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <h3 className="mt-5 flex items-center gap-2.5 text-lg font-semibold tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <GitBranch size={15} />
              </span>
              03 · KI-OS-Architektur
            </h3>
            <p className="mt-2.5 text-[0.95rem] text-muted leading-relaxed">
              Ein visuelles Diagramm Ihres eigenen KI-Betriebssystems: was es
              übernimmt, womit es verbunden ist, was es von der To-do-Liste
              Ihres Teams streicht.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
