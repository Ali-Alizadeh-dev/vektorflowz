"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SplitWords from "./SplitWords";
import {
  ArrowDown,
  Share2,
  Bot,
  Search,
  PenLine,
  TrendingUp,
} from "lucide-react";

// Sub-agents coordinated by the master. `x` is the connector line's landing
// point on the 0–100 SVG band, aligned with each grid column's centre.
const agents: {
  icon: typeof Search;
  name: string;
  role: string;
  x: number;
}[] = [
  { icon: Search, name: "Data Researcher", role: "Recherche", x: 16 },
  { icon: PenLine, name: "Content Writer", role: "Texterstellung", x: 50 },
  { icon: TrendingUp, name: "SEO Optimizer", role: "Optimierung", x: 84 },
];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  // Which connector line is highlighted: an agent index, "all" (master), or none.
  const [active, setActive] = useState<number | "all" | null>(null);

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
          // Card pops in, then master + sub-agents cascade
          .from(
            '[data-hero="card"]',
            { y: 30, opacity: 0, scale: 0.96, duration: 0.9, clearProps: "transform,opacity" },
            "-=0.9"
          )
          .from(
            '[data-hero="hub"]',
            { y: 12, opacity: 0, scale: 0.94, duration: 0.6, ease: "back.out(1.7)", clearProps: "transform,opacity" },
            "-=0.5"
          )
          .from(
            '[data-hero="agent"]',
            { y: 14, opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)", clearProps: "transform,opacity" },
            "-=0.3"
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
      {/* Clean, static backdrop — a single soft accent glow, no animation. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 12%, rgba(0,61,240,0.07) 0%, transparent 60%)",
        }}
      />

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
              KI-Automatisierung für Unternehmen
            </span>

            <h1
              data-hero="title"
              className="mt-6 text-[10vw] sm:text-5xl lg:text-[3.4rem] leading-[1.03] font-semibold tracking-tightest"
            >
              <SplitWords text="KI-Lösungen, die Ihrem Team" />{" "}
              <span className="text-accent">
                <SplitWords text="täglich Arbeit abnehmen." />
              </span>
            </h1>

            <SplitWords
              as="p"
              data-hero="sub"
              text="Wir entwickeln KI-Lösungen, die wiederkehrende Aufgaben zuverlässig übernehmen – von der Telefonannahme über Kundenanfragen bis hin zu internen Prozessen. Jede Lösung wird auf Ihr Unternehmen abgestimmt und in Ihre bestehenden Abläufe integriert."
              className="mt-6 max-w-xl text-lg md:text-xl text-muted leading-relaxed"
            />

            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                data-hero="cta"
                href="#ablauf"
                className="group inline-flex items-center justify-center gap-2.5 pl-7 pr-2.5 py-2.5 rounded-full bg-accent text-white text-base font-medium hover:bg-accent/90 transition-colors shadow-accent-glow"
              >
                So arbeiten wir
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 group-hover:translate-x-0.5 transition-transform">
                  <ArrowDown size={16} className="-rotate-90" />
                </span>
              </a>
              <a
                data-hero="cta"
                href="#kontakt"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-line bg-surface/80 backdrop-blur-sm text-base font-medium text-fg hover:border-fg/25 transition-colors"
              >
                Kostenloses Erstgespräch
                <span className="text-accent">→</span>
              </a>
            </div>
          </div>

          {/* Right: KI-Agenten-Workflow — master coordinator + sub-agents */}
          <div data-hero="card" className="relative card shadow-card-lg p-6 md:p-7">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Share2 size={18} strokeWidth={1.75} />
                </span>
                <div>
                  <div className="text-sm font-semibold tracking-tight leading-tight">
                    KI-Agenten-Workflow
                  </div>
                  <div className="text-xs text-muted">
                    Vernetztes System · 4 Agenten
                  </div>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>

            {/* Master agent */}
            <div className="relative mt-6 flex justify-center">
              <div
                data-hero="hub"
                onMouseEnter={() => setActive("all")}
                onMouseLeave={() => setActive(null)}
                className="relative z-10 flex w-max items-center gap-3 rounded-2xl border border-accent/20 bg-accent-soft px-4 py-3 transition-transform hover:scale-[1.03]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white shadow-accent-glow">
                  <Bot size={22} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-tight">Koordinator</p>
                  <p className="text-xs text-muted">Master Agent</p>
                </div>
              </div>
            </div>

            {/* Connectors */}
            <div className="relative mt-1 h-12">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
                className="absolute inset-0 h-full w-full"
              >
                {agents.map((a, i) => {
                  const on = active === i || active === "all";
                  return (
                    <line
                      key={a.name}
                      x1="50"
                      y1="0"
                      x2={a.x}
                      y2="100"
                      stroke="var(--accent)"
                      strokeOpacity={on ? 0.9 : 0.35}
                      strokeWidth={on ? 2 : 1.1}
                      strokeLinecap="round"
                      strokeDasharray="4 5"
                      vectorEffect="non-scaling-stroke"
                      style={{
                        animation: `flowdash ${on ? 0.7 : 1.2}s linear infinite`,
                        transition: "stroke-opacity .2s, stroke-width .2s",
                      }}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Sub-agents */}
            <div className="relative grid grid-cols-3 gap-2 sm:gap-2.5">
              {agents.map((a, i) => (
                <div
                  key={a.name}
                  data-hero="agent"
                  tabIndex={0}
                  role="group"
                  aria-label={a.name}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="relative cursor-pointer rounded-2xl border border-line bg-surface p-2.5 sm:p-3 text-center outline-none transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-card focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <a.icon size={20} strokeWidth={1.75} />
                  </span>
                  <div className="mt-2 text-[13px] font-semibold leading-tight">
                    {a.name}
                  </div>
                  <div className="text-[11px] text-muted">{a.role}</div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-5 flex items-center gap-1.5 border-t border-line pt-3 text-[11px] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Echtzeit-Synchronisation
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
