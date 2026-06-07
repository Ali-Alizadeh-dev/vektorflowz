"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SplitWords from "./SplitWords";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from('[data-hero="title"] .word-inner', {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.06,
      })
        .from(
          '[data-hero="sub"] .word-inner',
          { yPercent: 110, duration: 0.8, stagger: 0.015 },
          "-=0.7"
        )
        .from(
          '[data-hero="cta"]',
          { y: 18, duration: 0.8, stagger: 0.08, clearProps: "transform" },
          "-=0.5"
        );

      // Organic floating motion for the glow — four independent loops with
      // different durations so x / y / scale / opacity never re-sync. The
      // result drifts and "breathes" without an obvious repeating pattern.
      gsap.to(glowRef.current, {
        x: 120,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(glowRef.current, {
        y: 70,
        duration: 11,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(glowRef.current, {
        scale: 1.25,
        duration: 6.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(glowRef.current, {
        opacity: 0.6,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: root }
  );

  return (
    <section
      id="home"
      ref={root}
      className="relative min-h-[100svh] flex items-center justify-center pt-32 pb-20 bg-paper overflow-hidden"
    >
      {/* Animated soft accent glow */}
      <div
        ref={glowRef}
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full pointer-events-none will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(77,238,234,0.18) 0%, rgba(77,238,234,0.05) 35%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-5 md:px-8 text-center">
        <h1
          data-hero="title"
          className="text-[10vw] sm:text-[7.5vw] md:text-[5.5vw] lg:text-[4.7vw] leading-[0.95] font-medium tracking-tightest"
        >
          <SplitWords text="Weniger Aufwand." />
          <br />
          <SplitWords text="Mehr" />{" "}
          <span className="text-accent">
            <SplitWords text="Wirkung." />
          </span>
        </h1>

        <SplitWords
          as="p"
          data-hero="sub"
          text="KI-gestützte Automatisierungen für effizientere Prozesse und mehr Zeit fürs Wesentliche."
          className="mt-8 max-w-2xl mx-auto text-xl md:text-2xl text-muted leading-relaxed"
        />

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <a
            data-hero="cta"
            href="#kontakt"
            className="group inline-flex items-center gap-2.5 pl-7 pr-2.5 py-2.5 rounded-full bg-accent text-bg text-base font-medium hover:bg-accent/90"
          >
            Unverbindlich austauschen
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-bg/15 group-hover:translate-x-0.5 transition-transform">
              <ArrowRight size={16} />
            </span>
          </a>
          <a
            data-hero="cta"
            href="#leistungen"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-base text-muted hover:text-fg transition-colors"
          >
            Leistungen entdecken
          </a>
        </div>
      </div>
    </section>
  );
}
