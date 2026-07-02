"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeader from "./SectionHeader";
import {
  MessageCircle,
  Search,
  Lightbulb,
  Wrench,
  Rocket,
} from "lucide-react";

const steps = [
  {
    n: "01",
    icon: MessageCircle,
    title: "Kennenlernen",
    text: "Wir lernen uns kennen: Sie schildern Ihre aktuellen Herausforderungen, wir hören zu und loten erste Potenziale aus.",
    tag: "Ganz unverbindlich",
  },
  {
    n: "02",
    icon: Search,
    title: "Analyse",
    text: "Wir schauen uns Ihre Abläufe im Detail an und finden die Stellen, an denen Automatisierung den größten Hebel hat.",
    tag: "Potenziale sichtbar machen",
  },
  {
    n: "03",
    icon: Lightbulb,
    title: "Konzept",
    text: "Sie erhalten einen konkreten Lösungsvorschlag inklusive Aufwand, Zeitrahmen und transparenter Kostenübersicht.",
    tag: "Klare Roadmap",
  },
  {
    n: "04",
    icon: Wrench,
    title: "Umsetzung",
    text: "Wir bauen die Lösung Schritt für Schritt – mit regelmäßigen Abstimmungen, damit Sie jederzeit wissen, wo das Projekt steht.",
    tag: "Schrittweise Entwicklung",
  },
  {
    n: "05",
    icon: Rocket,
    title: "Go-Live & Support",
    text: "Nach der Einführung unterstützen wir Sie bei Fragen, Optimierungen und Erweiterungen.",
    tag: "Langfristige Begleitung",
  },
];

export default function Ablauf() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const isDesktop = window.matchMedia(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
      ).matches;

      // Each item: card slides in from its side (desktop) or fades up
      // lightly (mobile). We tween toward the visible state so a missed
      // trigger can never leave a card stuck invisible.
      const items = gsap.utils.toArray<HTMLElement>("[data-step-item]");
      items.forEach((item) => {
        const side = item.dataset.side; // 'left' | 'right'
        const card = item.querySelector("[data-step-card]");
        const orb = item.querySelector("[data-step-orb]");
        if (!card || !orb) return;

        const cardFrom = isDesktop
          ? { x: side === "left" ? -60 : 60, opacity: 0 }
          : { y: 20, opacity: 0 };

        gsap.set(card, cardFrom);
        gsap.set(orb, isDesktop ? { scale: 0, opacity: 0 } : { opacity: 0 });

        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(card, {
              x: 0,
              y: 0,
              opacity: 1,
              duration: isDesktop ? 1 : 0.6,
              ease: "power3.out",
              overwrite: true,
            });
            gsap.to(orb, {
              scale: 1,
              opacity: 1,
              duration: isDesktop ? 0.8 : 0.5,
              ease: isDesktop ? "back.out(2)" : "power2.out",
              delay: 0.1,
              overwrite: true,
            });
          },
        });
      });

      // The vertical line draws downward as you scroll through the section
      const list = ref.current?.querySelector("[data-step-line]");
      if (list) {
        gsap.fromTo(
          list,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: "[data-step-track]",
              start: "top 70%",
              end: "bottom 80%",
              // numeric scrub adds inertia so the line tween isn't recomputed
              // on every single scroll event — smoother on mobile
              scrub: 0.5,
            },
          }
        );
      }

      // Refresh after layout settles
      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  return (
    <section id="ablauf" ref={ref} className="section bg-bg">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          label="Ablauf"
          title="So läuft die Zusammenarbeit ab."
          intro="Transparent, strukturiert und nachvollziehbar – vom ersten Gespräch bis zur fertigen Lösung."
        />

        <div data-step-track className="mt-20 md:mt-28 relative">
          {/* Vertical line: centered on desktop, left on mobile */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 w-px bg-line left-6 md:left-1/2 md:-translate-x-1/2"
          >
            <div
              data-step-line
              className="absolute inset-0 w-full bg-fg/30 origin-top"
            />
          </div>

          <ol className="relative space-y-10 md:space-y-20">
            {steps.map((s, i) => {
              const side = i % 2 === 0 ? "left" : "right";
              return (
                <li
                  key={s.n}
                  data-step-item
                  data-side={side}
                  className="relative md:grid md:grid-cols-2 md:gap-12 items-center"
                >
                  {/* Orb on the line */}
                  <span
                    data-step-orb
                    className="absolute top-6 left-6 md:left-1/2 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-fg text-bg shadow-card-lg ring-4 ring-bg"
                  >
                    <s.icon size={16} />
                  </span>

                  {/* Card — left or right column on desktop, always right on mobile */}
                  <div
                    data-step-card
                    className={`
                      ml-16 md:ml-0
                      ${side === "left" ? "md:col-start-1 md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}
                    `}
                  >
                    <article
                      className={`card shadow-card p-6 md:p-7 inline-block w-full ${
                        side === "left" ? "md:ml-auto" : ""
                      }`}
                    >
                      <div
                        className={`flex items-center gap-3 ${
                          side === "left" ? "md:justify-end" : ""
                        }`}
                      >
                        <span className="text-sm text-muted font-mono">
                          {s.n}
                        </span>
                        <h3 className="text-xl md:text-2xl font-medium tracking-tight">
                          {s.title}
                        </h3>
                      </div>
                      <p className="mt-3 text-base md:text-lg text-muted leading-relaxed">
                        {s.text}
                      </p>
                      <div
                        className={`mt-5 pt-4 border-t border-line text-sm text-accent font-medium ${
                          side === "left" ? "md:text-right" : ""
                        }`}
                      >
                        {s.tag}
                      </div>
                    </article>
                  </div>

                  {/* Spacer for opposite column on desktop */}
                  <div
                    aria-hidden
                    className={`hidden md:block ${side === "left" ? "md:col-start-2" : "md:col-start-1 md:row-start-1"}`}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
