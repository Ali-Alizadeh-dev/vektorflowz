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
    <section ref={ref} className="section !pt-4 !pb-14 md:!pb-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div
          data-cta-card
          className="relative overflow-hidden rounded-[1.5rem] md:rounded-[1.75rem] px-6 py-9 md:px-10 md:py-11 text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:gap-8 shadow-card-lg"
          style={{
            background: "linear-gradient(135deg, #002bb0 0%, var(--accent) 100%)",
          }}
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tightest leading-[1.1] text-white">
              Weniger Routine. Mehr Zeit für Ihr Kerngeschäft.
            </h2>
            <p className="mt-2 text-base text-white/80">
              Unverbindlich · 30 Minuten · Individuelle Empfehlungen
            </p>
          </div>
          <a
            href="#kontakt"
            className="group mt-6 sm:mt-0 inline-flex shrink-0 items-center justify-center gap-2.5 pl-6 pr-2.5 py-2.5 rounded-full bg-white text-accent text-base font-semibold hover:bg-white/90 transition-colors"
          >
            Kostenloses Erstgespräch
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent/10 group-hover:translate-x-0.5 transition-transform">
              <ArrowRight size={16} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
