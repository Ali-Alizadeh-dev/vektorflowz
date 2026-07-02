"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SplitWords from "./SplitWords";
import { ArrowDown, ShieldCheck, MapPin, MessageCircle } from "lucide-react";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const glowA = useRef<HTMLDivElement>(null);
  const glowB = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const isDesktop = window.matchMedia(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
      ).matches;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (isDesktop) {
        // Rich word-by-word reveal — only on desktop where it's cheap.
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
            { y: 18, opacity: 0, duration: 0.8, stagger: 0.08, clearProps: "transform,opacity" },
            "-=0.5"
          )
          .from(
            '[data-hero="trust"] > *',
            { y: 12, opacity: 0, duration: 0.6, stagger: 0.08 },
            "-=0.3"
          )
          .from('[data-hero="scroll"]', { opacity: 0, duration: 0.6 }, "-=0.2");
      } else {
        // Mobile: one lightweight fade per block instead of dozens of
        // simultaneously-animating word spans — much smoother first paint.
        tl.from(
          [
            '[data-hero="title"]',
            '[data-hero="sub"]',
            '[data-hero="cta"]',
            '[data-hero="trust"]',
            '[data-hero="scroll"]',
          ],
          {
            y: 16,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            clearProps: "transform,opacity",
          }
        );
      }

      // Drifting blobs only on desktop (continuous transform of a large soft
      // layer is the kind of thing that stutters on phones).
      if (isDesktop) {
        const drift = (
          el: HTMLElement | null,
          x: number,
          y: number,
          s: number,
          d: number
        ) => {
          if (!el) return;
          el.style.willChange = "transform";
          gsap.to(el, { x, duration: d, ease: "sine.inOut", yoyo: true, repeat: -1 });
          gsap.to(el, { y, duration: d * 1.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
          gsap.to(el, { scale: s, duration: d * 0.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
        };
        drift(glowA.current, 140, 80, 1.25, 8);
        drift(glowB.current, -120, -90, 1.3, 10);
      }
    },
    { scope: root }
  );

  return (
    <section
      id="home"
      ref={root}
      className="relative min-h-[100svh] flex items-center justify-center pt-32 pb-24 bg-paper overflow-hidden"
    >
      {/* Eye-catcher: two gradient blobs (static on mobile, drifting on desktop).
          The soft edge comes from the radial-gradient itself (transparent stop),
          NOT a blur() filter — blur is very expensive to rasterize on the first
          paint on mobile GPUs and was a key cause of the initial-load jank. */}
      <div
        ref={glowA}
        aria-hidden
        className="absolute -top-32 left-[42%] -translate-x-1/2 w-[480px] h-[480px] md:w-[680px] md:h-[680px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,61,240,0.28) 0%, rgba(0,61,240,0.08) 38%, transparent 68%)",
        }}
      />
      <div
        ref={glowB}
        aria-hidden
        className="absolute top-10 left-[60%] -translate-x-1/2 w-[400px] h-[400px] md:w-[560px] md:h-[560px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(56,120,255,0.2) 0%, rgba(56,120,255,0.06) 42%, transparent 70%)",
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
          text="Wir automatisieren wiederkehrende Aufgaben mit KI — damit Sie Zeit sparen, Fehler vermeiden und sich auf das Wesentliche konzentrieren."
          className="mt-7 max-w-2xl mx-auto text-xl md:text-2xl text-muted leading-relaxed"
        />

        <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
          <a
            data-hero="cta"
            href="#warum"
            className="group inline-flex items-center gap-2.5 pl-7 pr-2.5 py-2.5 rounded-full bg-fg text-bg text-base font-medium hover:bg-fg/90 transition-colors"
          >
            So funktioniert's
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-bg/15 group-hover:translate-y-0.5 transition-transform">
              <ArrowDown size={16} />
            </span>
          </a>
          <a
            data-hero="cta"
            href="#kontakt"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-line bg-surface text-base font-medium text-fg hover:border-fg/25 transition-colors"
          >
            Direkt Kontakt aufnehmen
          </a>
        </div>

        {/* Trust signals — honest, verifiable facts (no fake testimonials) */}
        <div
          data-hero="trust"
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted"
        >
          <span className="inline-flex items-center gap-2">
            <MapPin size={15} className="text-accent" />
            Aus Hamburg, deutschlandweit
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={15} className="text-accent" />
            DSGVO-konform
          </span>
          <span className="inline-flex items-center gap-2">
            <MessageCircle size={15} className="text-accent" />
            Persönlicher Ansprechpartner
          </span>
        </div>

        {/* Scroll hint */}
        <a
          data-hero="scroll"
          href="#warum"
          aria-label="Nach unten scrollen"
          className="mt-20 inline-flex flex-col items-center gap-2 text-sm text-muted hover:text-fg transition-colors"
        >
          Mehr erfahren
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-line animate-bounce">
            <ArrowDown size={14} />
          </span>
        </a>
      </div>
    </section>
  );
}
