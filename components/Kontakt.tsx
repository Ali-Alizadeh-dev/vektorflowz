"use client";

import { useRef } from "react";
import Script from "next/script";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SectionTitle, { Accent } from "./SectionTitle";

const CALENDLY_URL = "https://calendly.com/ali-alizadeh-solvomind/neues-meeting";

export default function Kontakt() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = ref.current?.querySelectorAll("[data-contact]");
      if (!items?.length) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from(items, {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        clearProps: "transform,opacity",
      });
      if (document.hidden) tl.progress(1);
    },
    { scope: ref }
  );

  return (
    <section id="kontakt" ref={ref} className="section bg-bg">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionTitle
          label="Sprechen wir"
          title={
            <>
              Jeden Tag frisst manuelle Arbeit unbemerkt Ihre Marge.{" "}
              <Accent>Spüren wir es gemeinsam auf.</Accent>
            </>
          }
          intro="Buchen Sie ein kostenloses 30-Minuten-Gespräch. Wir schauen uns an, wie Ihr Betrieb heute läuft, zeigen Ihnen, wo KI Zeit und Geld zurückholt — und Sie gehen mit einer klaren Roadmap raus, ob wir am Ende bauen oder nicht."
        />

        {/* Calendly-Einbettung */}
        <div data-contact className="mt-10 md:mt-12 card shadow-card-lg p-3 md:p-5">
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
    </section>
  );
}
