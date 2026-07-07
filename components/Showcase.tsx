"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PhoneCall, Phone, Check, ArrowRight } from "lucide-react";

const subDefs = [
  { label: "Informationen prüfen", at: 2 },
  { label: "CRM aktualisieren", at: 3 },
  { label: "Termin anlegen", at: 4 },
  { label: "Bestätigung senden", at: 5 },
];

export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  // tick 0..7 drives the looping "self-completing call" demo
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // Show the finished state, no looping.
      setTick(7);
      return;
    }
    const iv = setInterval(() => setTick((t) => (t + 1) % 8), 850);
    return () => clearInterval(iv);
  }, []);

  useGSAP(
    () => {
      const consoleEl = ref.current?.querySelector("[data-console]");
      if (!consoleEl) return;
      gsap.set(consoleEl, { y: 24, opacity: 0 });
      ScrollTrigger.create({
        trigger: consoleEl,
        start: "top 80%",
        once: true,
        onEnter: () =>
          gsap.to(consoleEl, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            overwrite: true,
          }),
      });
      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  const callActive = tick === 0;
  const agentActive = tick === 1;
  const doneActive = tick >= 6;

  return (
    <section id="showcase" ref={ref} className="section">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-sm font-semibold uppercase tracking-[0.08em] text-accent">
            Automatisierung in Aktion
          </div>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tightest leading-[1.08]">
            So läuft ein Anruf automatisch durch Ihr System.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Der KI-Telefonassistent nimmt den Anruf entgegen, beantwortet Fragen,
            prüft Informationen, legt Termine an, aktualisiert Ihr CRM und
            verschickt bei Bedarf eine Bestätigung – automatisch und
            nachvollziehbar.
          </p>
        </div>

        <div
          data-console
          className="mt-12 rounded-[1.75rem] bg-[#0b1220] shadow-card-lg overflow-hidden"
        >
          {/* Console title bar */}
          <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-[13px] font-medium text-white/50">
              solvomind · Automatisierungs-Konsole
            </span>
          </div>

          {/* Flow */}
          <div
            className="p-8 md:p-11"
            style={{
              background:
                "radial-gradient(900px 320px at 50% -10%, rgba(0,61,240,0.22), transparent)",
            }}
          >
            <div className="flex flex-col md:flex-row items-stretch md:items-start gap-4 md:gap-2">
              {/* Incoming call */}
              <ConsoleStep
                icon={<PhoneCall size={20} className="text-slate-300" />}
                iconWrap="bg-white/[0.06] border border-white/10"
                glow={callActive ? "0 0 0 4px rgba(96,165,250,.35)" : "none"}
                label="Eingehender Anruf"
                badge="Empfangen"
                badgeClass="text-emerald-400 bg-emerald-400/10"
              />
              <Arrow />

              {/* Voice agent */}
              <ConsoleStep
                icon={<Phone size={20} className="text-white" />}
                iconWrap="bg-accent"
                glow={
                  agentActive
                    ? "0 0 0 4px rgba(96,165,250,.4), 0 10px 24px rgba(0,61,240,.5)"
                    : "0 10px 24px rgba(0,61,240,.35)"
                }
                label="Telefonassistent"
                badge="Bearbeitet"
                badgeClass="text-blue-300 bg-blue-400/15"
              />
              <Arrow />

              {/* Task list */}
              <div className="flex-[1.5] min-w-0 flex flex-col gap-2 md:pt-1.5">
                {subDefs.map((s) => {
                  const isDone = tick >= s.at;
                  const isActive = tick === s.at;
                  return (
                    <div
                      key={s.label}
                      className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 border transition-colors duration-300"
                      style={{
                        background: isDone
                          ? "rgba(34,197,94,.12)"
                          : isActive
                          ? "rgba(96,165,250,.16)"
                          : "rgba(255,255,255,.05)",
                        borderColor: isDone
                          ? "rgba(74,222,128,.4)"
                          : isActive
                          ? "rgba(96,165,250,.5)"
                          : "rgba(255,255,255,.1)",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: isDone ? "#4ade80" : "#60a5fa" }}
                      />
                      <span className="flex-1 text-[13px] font-medium text-slate-200">
                        {s.label}
                      </span>
                      <Check
                        size={15}
                        className="text-emerald-400 transition-opacity duration-300"
                        style={{ opacity: isDone ? 1 : 0.14 }}
                      />
                    </div>
                  );
                })}
              </div>
              <Arrow />

              {/* Done */}
              <ConsoleStep
                icon={<Check size={24} className="text-white" />}
                iconWrap={doneActive ? "bg-emerald-500" : "bg-white/[0.08]"}
                glow={
                  doneActive
                    ? "0 0 0 4px rgba(74,222,128,.3), 0 10px 24px rgba(16,185,129,.45)"
                    : "none"
                }
                label="Aufgabe erledigt"
                badge="Automatisch"
                badgeClass="text-emerald-400 bg-emerald-400/15"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConsoleStep({
  icon,
  iconWrap,
  glow,
  label,
  badge,
  badgeClass,
}: {
  icon: React.ReactNode;
  iconWrap: string;
  glow: string;
  label: string;
  badge: string;
  badgeClass: string;
}) {
  return (
    <div className="flex-1 min-w-0 flex flex-col items-center text-center gap-3">
      <span
        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl transition-shadow duration-300 ${iconWrap}`}
        style={{ boxShadow: glow }}
      >
        {icon}
      </span>
      <span className="text-[13px] font-medium text-slate-200">{label}</span>
      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}`}>
        {badge}
      </span>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center text-accent/60 md:pt-5 rotate-90 md:rotate-0">
      <ArrowRight size={18} />
    </div>
  );
}
