"use client";

import { useRef } from "react";
import Script from "next/script";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeader from "./SectionHeader";
import { Mail } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/ali-alizadeh-solvomind/neues-meeting";

export default function Kontakt() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate the aside rows + the form as whole blocks (not every single
      // form field) — cheaper on phones and, because we tween toward the
      // visible state via batch/onEnter, nothing can get stuck hidden.
      const items = [
        ...gsap.utils.toArray<HTMLElement>("aside [data-field]"),
        ...gsap.utils.toArray<HTMLElement>("[data-card]"),
      ];
      if (!items.length) return;

      gsap.set(items, { y: 24, opacity: 0 });

      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          }),
      });

      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  return (
    <section id="kontakt" ref={ref} className="section">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          label="Kontakt"
          title="Mehr Effizienz beginnt mit dem richtigen Gespräch."
          intro="Buchen Sie direkt ein kostenloses 30-minütiges Erstgespräch — passende Zeitfenster finden Sie im Kalender."
        />

        <div className="mt-16 md:mt-20 grid lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
          {/* Plain divider list instead of three stacked cards — the form
              stays the single card in this section */}
          <aside className="lg:col-span-4">
            <div data-field className="pb-6 border-b border-line">
              <p className="text-sm uppercase tracking-[0.2em] text-muted">
                E-Mail
              </p>
              <a
                href="mailto:ali.alizadeh@solvomind.de"
                className="mt-3 inline-flex items-center gap-2 text-lg font-medium hover:text-accent transition-colors break-all"
              >
                <Mail size={18} className="shrink-0 text-accent" />{" "}
                ali.alizadeh@solvomind.de
              </a>
            </div>
            <div data-field className="pt-6">
              <p className="text-sm uppercase tracking-[0.2em] text-muted">
                Erstgespräch
              </p>
              <p className="mt-3 text-lg font-medium">
                Kostenlos und unverbindlich.
              </p>
            </div>
          </aside>

          <div
            data-card
            className="lg:col-span-8 card shadow-card p-6 md:p-8"
          >
            <Script
              src="https://assets.calendly.com/assets/external/widget.js"
              strategy="afterInteractive"
            />
            <div
              className="calendly-inline-widget rounded-xl overflow-hidden"
              data-url={CALENDLY_URL}
              style={{ minWidth: "320px", height: "700px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
