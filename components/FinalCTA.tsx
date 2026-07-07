"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = ref.current?.querySelector("[data-cta-card]");
      if (!card) return;
      gsap.set(card, { y: 30, opacity: 0, scale: 0.97 });
      ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        once: true,
        onEnter: () =>
          gsap.to(card, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true,
          }),
      });
      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="section !pt-4">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div
          data-cta-card
          className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2.25rem] px-8 py-16 md:px-12 md:py-20 text-center shadow-card-lg"
          style={{
            background:
              "linear-gradient(135deg, #002bb0 0%, var(--accent) 55%, #2f6bff 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(600px 300px at 15% 10%, rgba(255,255,255,0.16), transparent), radial-gradient(500px 300px at 90% 90%, rgba(255,255,255,0.12), transparent)",
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl md:text-5xl font-semibold tracking-tightest leading-[1.08] text-white">
              Weniger Routine. Mehr Zeit für Ihr Kerngeschäft.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg md:text-xl text-white/85 leading-relaxed">
              Lassen Sie uns gemeinsam herausfinden, welche Prozesse sich in
              Ihrem Unternehmen sinnvoll automatisieren lassen.
            </p>
            <a
              href="#kontakt"
              className="group mt-9 inline-flex items-center justify-center gap-2.5 pl-7 pr-2.5 py-2.5 rounded-full bg-white text-accent text-base font-semibold hover:bg-white/90 transition-colors"
            >
              Kostenloses Erstgespräch
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight size={16} />
              </span>
            </a>
            <div className="mt-5 text-sm font-medium text-white/70">
              Unverbindlich · 30 Minuten · Individuelle Empfehlungen
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
