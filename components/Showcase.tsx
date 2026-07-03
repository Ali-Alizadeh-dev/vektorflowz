"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PhoneCall, Phone, Check, ArrowRight } from "lucide-react";

const tasks = [
  "Wissensdatenbank",
  "CRM-Abgleich",
  "Kalenderbuchung",
  "Bestätigungs-E-Mail",
];

export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const nodes = gsap.utils.toArray<HTMLElement>("[data-node]");
      if (!nodes.length) return;

      if (reduce) {
        gsap.set(nodes, { clearProps: "all" });
        return;
      }

      gsap.set(nodes, { y: 16, opacity: 0, scale: 0.94 });
      gsap.to(nodes, {
        scrollTrigger: { trigger: "[data-console]", start: "top 78%", once: true },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.12,
        ease: "back.out(1.6)",
        overwrite: true,
      });
      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  return (
    <section id="showcase" ref={ref} className="section">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-sm font-semibold uppercase tracking-[0.08em] text-accent">
            Automatisierung in Aktion
          </div>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tightest leading-[1.08]">
            Ein Anruf. Vollständig erledigt — von Anfang bis Ende.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Sehen Sie, wie ein einzelner eingehender Anruf durch Ihr KI-System
            fließt und sich selbst abschließt.
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
                label="Eingehender Anruf"
                badge="Empfangen"
                badgeClass="text-emerald-400 bg-emerald-400/10"
              />
              <Arrow />

              {/* Voice agent */}
              <ConsoleStep
                icon={<Phone size={20} className="text-white" />}
                iconWrap="bg-accent shadow-accent-glow"
                label="KI-Telefonassistent"
                badge="Bearbeitet"
                badgeClass="text-blue-300 bg-blue-400/15"
              />
              <Arrow />

              {/* Task list */}
              <div data-node className="flex-[1.5] min-w-0 flex flex-col gap-2 md:pt-1.5">
                {tasks.map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-2.5 rounded-xl bg-white/[0.05] border border-white/10 px-3.5 py-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span className="flex-1 text-[13px] font-medium text-slate-200">
                      {t}
                    </span>
                    <Check size={15} className="text-emerald-400" />
                  </div>
                ))}
              </div>
              <Arrow />

              {/* Done */}
              <ConsoleStep
                icon={<Check size={24} className="text-white" />}
                iconWrap="bg-emerald-500 shadow-[0_10px_24px_rgba(16,185,129,0.4)]"
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
  label,
  badge,
  badgeClass,
}: {
  icon: React.ReactNode;
  iconWrap: string;
  label: string;
  badge: string;
  badgeClass: string;
}) {
  return (
    <div data-node className="flex-1 min-w-0 flex flex-col items-center text-center gap-3">
      <span
        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${iconWrap}`}
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
    <div
      data-node
      className="flex items-center justify-center text-accent/60 md:pt-5 rotate-90 md:rotate-0"
    >
      <ArrowRight size={18} />
    </div>
  );
}
