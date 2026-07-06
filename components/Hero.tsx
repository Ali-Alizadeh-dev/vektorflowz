"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SplitWords from "./SplitWords";
import NeuralNetwork from "./NeuralNetwork";
import { ArrowDown, Megaphone, LifeBuoy, ClipboardList, Cog } from "lucide-react";
import { LogoMark } from "./Logo";

const agents = [
  { icon: Megaphone, label: "Vertrieb", pos: "left-0 top-1.5" },
  { icon: LifeBuoy, label: "Support", pos: "right-0 top-1.5" },
  { icon: ClipboardList, label: "Verwaltung", pos: "left-0 bottom-1.5" },
  { icon: Cog, label: "Betrieb", pos: "right-0 bottom-1.5" },
];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const isDesktop = window.matchMedia(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
      ).matches;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (isDesktop) {
        tl.from('[data-hero="eyebrow"]', { y: 14, opacity: 0, duration: 0.7 })
          .from(
            '[data-hero="title"] .word-inner',
            { yPercent: 110, duration: 1.1, stagger: 0.06 },
            "-=0.3"
          )
          .from(
            '[data-hero="sub"] .word-inner',
            { yPercent: 110, duration: 0.8, stagger: 0.012 },
            "-=0.7"
          )
          .from(
            '[data-hero="cta"]',
            { y: 18, opacity: 0, duration: 0.8, stagger: 0.08, clearProps: "transform,opacity" },
            "-=0.5"
          )
          // Diagram card pops in, then hub + agent chips cascade
          .from(
            '[data-hero="card"]',
            { y: 30, opacity: 0, scale: 0.96, duration: 0.9, clearProps: "transform,opacity" },
            "-=0.9"
          )
          .from(
            '[data-hero="hub"]',
            { scale: 0, opacity: 0, duration: 0.6, ease: "back.out(1.8)", clearProps: "transform,opacity" },
            "-=0.5"
          )
          .from(
            '[data-hero="agent"]',
            { y: 12, opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.09, ease: "back.out(1.7)", clearProps: "transform,opacity" },
            "-=0.35"
          );
      } else {
        // Mobile: light block-fade per element — smooth first paint.
        tl.from(
          [
            '[data-hero="eyebrow"]',
            '[data-hero="title"]',
            '[data-hero="sub"]',
            '[data-hero="cta"]',
            '[data-hero="card"]',
          ],
          {
            y: 16,
            opacity: 0,
            duration: 0.55,
            stagger: 0.1,
            clearProps: "transform,opacity",
          }
        );
      }

      // Safety: paused rAF in a background tab would leave content hidden.
      if (document.hidden) tl.progress(1);
    },
    { scope: root }
  );

  return (
    <section
      id="home"
      ref={root}
      className="relative overflow-hidden pt-32 md:pt-36 pb-20 md:pb-28"
    >
      {/* Flowing neural network backdrop — kept faint so the two-column
          content stays crisp. */}
      <div className="absolute inset-0 pointer-events-none">
        <NeuralNetwork className="w-full h-full opacity-30 md:opacity-40" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 30%, #ffffff 0%, rgba(255,255,255,0.82) 55%, rgba(255,255,255,0.35) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          {/* Left: copy */}
          <div>
            <span
              data-hero="eyebrow"
              className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-4 py-1.5 text-sm font-medium text-accent"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              KI-Beratung &amp; Automatisierungsagentur
            </span>

            <h1
              data-hero="title"
              className="mt-6 text-[10vw] sm:text-5xl lg:text-[3.4rem] leading-[1.03] font-semibold tracking-tightest"
            >
              <SplitWords text="KI-Lösungen, die arbeiten" />{" "}
              <span className="text-accent">
                <SplitWords text="wie echte Mitarbeiter." />
              </span>
            </h1>

            <SplitWords
              as="p"
              data-hero="sub"
              text="solvomind entwickelt und implementiert maßgeschneiderte KI-Lösungen, die wiederkehrende Aufgaben automatisieren, Kundenanrufe beantworten, Arbeitsabläufe optimieren und Ihr Team mit intelligenten Systemen unterstützen — individuell auf Ihr Unternehmen zugeschnitten."
              className="mt-6 max-w-xl text-lg md:text-xl text-muted leading-relaxed"
            />

            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                data-hero="cta"
                href="#kontakt"
                className="group inline-flex items-center justify-center gap-2.5 pl-7 pr-2.5 py-2.5 rounded-full bg-accent text-white text-base font-medium hover:bg-accent/90 transition-colors shadow-accent-glow"
              >
                Kostenlose KI-Beratung buchen
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 group-hover:translate-x-0.5 transition-transform">
                  <ArrowDown size={16} className="-rotate-90" />
                </span>
              </a>
              <a
                data-hero="cta"
                href="#ablauf"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-line bg-surface/80 backdrop-blur-sm text-base font-medium text-fg hover:border-fg/25 transition-colors"
              >
                So funktioniert&apos;s
                <span className="text-accent">→</span>
              </a>
            </div>
          </div>

          {/* Right: vernetztes KI-Team — hub & spoke */}
          <div data-hero="card" className="relative card shadow-card-lg p-6 md:p-7">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold tracking-tight">
                Ihr vernetztes KI-Team
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Aktiv
              </span>
            </div>

            <div className="relative mt-4 h-[300px] sm:h-[330px]">
              {/* Connector lines with flowing dashes */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
                className="absolute inset-0 w-full h-full overflow-visible"
              >
                {[
                  [15, 16],
                  [85, 16],
                  [15, 84],
                  [85, 84],
                ].map(([x, y], i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={x}
                    y2={y}
                    stroke="var(--accent)"
                    strokeOpacity="0.35"
                    strokeWidth="0.5"
                    strokeDasharray="1.6 1.6"
                    style={{ animation: `flowdash ${1.1 + i * 0.15}s linear infinite` }}
                  />
                ))}
              </svg>

              {/* Central hub */}
              <div
                data-hero="hub"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2"
              >
                <span
                  className="flex items-center justify-center w-[74px] h-[74px] rounded-[22px] shadow-accent-glow"
                  style={{ boxShadow: "0 0 0 8px var(--accent-soft), 0 18px 36px rgba(0,61,240,0.35)" }}
                >
                  <LogoMark className="w-[74px] h-[74px]" />
                </span>
                <span className="rounded-lg bg-surface border border-line px-2.5 py-1 text-xs font-semibold text-accent shadow-card">
                  KI-Core
                </span>
              </div>

              {/* Agent chips */}
              {agents.map((a) => (
                <div
                  key={a.label}
                  data-hero="agent"
                  className={`absolute ${a.pos} z-20 flex items-center gap-2.5 rounded-2xl bg-surface border border-line px-3 py-2 shadow-card whitespace-nowrap`}
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent-soft text-accent">
                    <a.icon size={15} />
                  </span>
                  <div className="leading-tight">
                    <div className="text-[13px] font-semibold">{a.label}</div>
                    <div className="text-[10.5px] text-muted">KI-Agent</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 pt-3.5 border-t border-line flex items-center gap-2 text-[12.5px] text-muted">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                style={{ animation: "softpulse 1.6s ease-in-out infinite" }}
              />
              Agenten arbeiten zusammen &amp; teilen Wissen in Echtzeit
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
