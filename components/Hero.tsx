"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SplitWords from "./SplitWords";
import NeuralNetwork from "./NeuralNetwork";
import { ArrowDown, Check, Phone, User, CheckCircle2 } from "lucide-react";

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
          .from(
            '[data-hero="trust"] > *',
            { y: 12, opacity: 0, duration: 0.6, stagger: 0.08 },
            "-=0.3"
          )
          // Workflow card pops in, then its rows cascade
          .from(
            '[data-hero="card"]',
            { y: 30, opacity: 0, scale: 0.96, duration: 0.9, clearProps: "transform,opacity" },
            "-=0.9"
          )
          .from(
            '[data-hero="flow"]',
            { y: 14, opacity: 0, scale: 0.94, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)", clearProps: "transform,opacity" },
            "-=0.5"
          );
      } else {
        // Mobile: light block-fade per element — smooth first paint.
        tl.from(
          [
            '[data-hero="eyebrow"]',
            '[data-hero="title"]',
            '[data-hero="sub"]',
            '[data-hero="cta"]',
            '[data-hero="trust"]',
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
              text="solvomind entwickelt und implementiert individuelle KI-Lösungen, die wiederkehrende Arbeit automatisieren, Kundenanrufe beantworten, Abläufe optimieren und Ihr Team mit intelligenten Systemen unterstützen — zugeschnitten auf Ihr Unternehmen."
              className="mt-6 max-w-xl text-lg md:text-xl text-muted leading-relaxed"
            />

            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                data-hero="cta"
                href="#kontakt"
                className="group inline-flex items-center justify-center gap-2.5 pl-7 pr-2.5 py-2.5 rounded-full bg-accent text-white text-base font-medium hover:bg-accent/90 transition-colors shadow-accent-glow"
              >
                Kostenloses KI-Erstgespräch
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

            <div
              data-hero="trust"
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted"
            >
              <span className="inline-flex items-center gap-2">
                <Check size={15} className="text-accent" />
                Kein technisches Wissen nötig
              </span>
              <span className="inline-flex items-center gap-2">
                <Check size={15} className="text-accent" />
                Arbeitet mit Ihren bestehenden Tools
              </span>
            </div>
          </div>

          {/* Right: live workflow card */}
          <div
            data-hero="card"
            className="relative card shadow-card-lg p-6 md:p-7"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-semibold tracking-tight">
                KI-Telefonassistent · Live-Workflow
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Aktiv
              </span>
            </div>

            <div className="flex flex-col">
              <FlowRow
                icon={<User size={15} className="text-muted" />}
                iconWrap="bg-bg border border-line"
                title="Kunde"
                sub="Eingehender Anruf empfangen"
              />
              <Connector />
              <div
                data-hero="flow"
                className="flex items-center gap-3 rounded-2xl bg-accent-soft border border-accent/20 px-4 py-3.5"
              >
                <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-accent text-white shadow-accent-glow">
                  <Phone size={15} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-accent">
                    KI-Telefonassistent
                  </p>
                  <p className="text-xs text-accent/70">
                    Versteht &amp; antwortet natürlich
                  </p>
                </div>
              </div>
              <Connector />
              <div
                data-hero="flow"
                className="grid grid-cols-2 gap-2"
              >
                {["Unternehmenswissen", "CRM", "Kalender", "E-Mail"].map((t) => (
                  <span
                    key={t}
                    className="rounded-xl bg-surface border border-line px-3 py-2.5 text-[13px] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Connector />
              <FlowRow
                data-hero="flow"
                icon={<CheckCircle2 size={16} className="text-white" />}
                iconWrap="bg-emerald-500"
                title="Aufgabe erledigt"
                titleClass="text-emerald-700"
                sub="Termin gebucht · im CRM erfasst"
                subClass="text-emerald-600/80"
                wrapClass="bg-emerald-50 border border-emerald-200"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowRow({
  icon,
  iconWrap,
  title,
  titleClass = "",
  sub,
  subClass = "text-muted",
  wrapClass = "bg-bg border border-line",
  ...rest
}: {
  icon: React.ReactNode;
  iconWrap: string;
  title: string;
  titleClass?: string;
  sub: string;
  subClass?: string;
  wrapClass?: string;
  [key: string]: unknown;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 ${wrapClass}`}
      {...rest}
    >
      <span
        className={`shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl ${iconWrap}`}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className={`text-sm font-semibold ${titleClass}`}>{title}</p>
        <p className={`text-xs ${subClass}`}>{sub}</p>
      </div>
    </div>
  );
}

function Connector() {
  return (
    <span aria-hidden className="ml-[26px] my-0.5 block h-3.5 w-px bg-accent/25" />
  );
}
