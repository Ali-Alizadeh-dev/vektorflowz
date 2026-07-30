"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionTitle from "./SectionTitle";
import { MapPin, Handshake, Puzzle, Ruler, Infinity as InfinityIcon, ShieldCheck } from "lucide-react";

/* Ehrliche Fakten — kein erfundener Track-Record (siehe Memory). */
const facts = [
  {
    icon: Handshake,
    strong: "Persönlich.",
    text: "Sie sprechen direkt mit uns — vom ersten Gespräch bis zur fertigen Lösung, ohne Zwischenstellen.",
  },
  {
    icon: Puzzle,
    strong: "Praxisnah.",
    text: "Wir setzen auf Ihren vorhandenen Systemen auf, statt alles neu aufzubauen.",
  },
  {
    icon: Ruler,
    strong: "Messbar.",
    text: "Vor Projektbeginn legen wir gemeinsam fest, woran wir den Erfolg messen.",
  },
  {
    icon: InfinityIcon,
    strong: "Langfristig.",
    text: "Auch nach der Einführung begleiten wir Sie weiter und entwickeln Ihre Automatisierungen gemeinsam mit Ihnen weiter.",
  },
];

export default function Founder() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-founder]");
      if (!items.length) return;
      gsap.set(items, { y: 26, opacity: 0 });
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            overwrite: true,
          }),
      });
      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  return (
    <section id="ueber-uns" ref={ref} className="section bg-bg">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle
          label="Über uns"
          title="Hinter Solvomind."
        />

        <div className="mt-10 md:mt-12 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Porträt */}
          <div data-founder className="lg:col-span-4 text-center">
            <div className="relative mx-auto w-56 h-56 md:w-64 md:h-64">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-full opacity-70"
                style={{
                  background:
                    "radial-gradient(60% 60% at 35% 25%, rgba(164,230,58,0.25), transparent 70%)",
                }}
              />
              <div className="relative h-full w-full overflow-hidden rounded-full border border-line">
                <Image
                  src="/ali-alizadeh.jpeg"
                  alt="Ali Alizadeh, Gründer von solvomind"
                  fill
                  className="object-cover object-top"
                  sizes="256px"
                />
              </div>
            </div>
            <p className="mt-6 text-2xl font-semibold tracking-tight">
              Ali Alizadeh
            </p>
            <p className="mt-1 text-base text-muted">Gründer, solvomind</p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              <MapPin size={14} /> Hamburg · deutschlandweit
            </p>
          </div>

          {/* Fakten-Karte */}
          <div data-founder className="lg:col-span-8">
            <div className="card shadow-card p-6 md:p-8 space-y-5">
              {facts.map((f) => (
                <div key={f.strong} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <f.icon size={17} strokeWidth={1.75} />
                  </span>
                  <p className="text-[0.95rem] md:text-base leading-relaxed">
                    <span className="font-semibold">{f.strong}</span>{" "}
                    <span className="text-muted">{f.text}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
