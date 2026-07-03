"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import NeuralNetwork from "./NeuralNetwork";
import { Clock, ShieldCheck, Target } from "lucide-react";

const outcomes = [
  {
    icon: Clock,
    title: "Weniger Handarbeit",
    text: "Routineaufgaben laufen automatisch – Ihr Team gewinnt Stunden zurück.",
  },
  {
    icon: ShieldCheck,
    title: "Weniger Fehler",
    text: "Klare Abläufe statt Copy-&-Paste. Konsistent und zuverlässig, jedes Mal.",
  },
  {
    icon: Target,
    title: "Mehr Fokus",
    text: "Ihr Team kümmert sich um das Wesentliche – nicht um Kleinkram.",
  },
];

export default function Mehrwert() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-mw-reveal]");
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
    <section id="warum" ref={ref} className="section">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: value proposition */}
          <div>
            <span
              data-mw-reveal
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-soft text-accent text-sm font-medium"
            >
              Warum solvomind
            </span>
            <h2
              data-mw-reveal
              className="mt-6 text-4xl md:text-5xl font-semibold tracking-tightest leading-[1.03]"
            >
              Aus Aufwand
              <br />
              wird Ablauf.
            </h2>
            <p
              data-mw-reveal
              className="mt-5 text-lg text-muted leading-relaxed max-w-md"
            >
              Wir bündeln Ihre verstreuten, manuellen Aufgaben zu einem
              automatisierten Fluss – und machen Ihre Arbeit spürbar
              effizienter.
            </p>

            <ul className="mt-9 space-y-6">
              {outcomes.map((o) => (
                <li
                  key={o.title}
                  data-mw-reveal
                  className="flex gap-4"
                >
                  <span className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-accent-soft text-accent">
                    <o.icon size={20} />
                  </span>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight">
                      {o.title}
                    </h3>
                    <p className="mt-1 text-base text-muted leading-relaxed">
                      {o.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: premium dark network card */}
          <div data-mw-reveal className="relative">
            {/* ambient accent glow behind the card */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2.5rem] opacity-60 pointer-events-none"
              style={{
                background:
                  "radial-gradient(50% 50% at 60% 40%, rgba(0,61,240,0.28), transparent 70%)",
              }}
            />
            <div className="relative rounded-[1.75rem] bg-[#0b1220] shadow-card-lg overflow-hidden aspect-[4/5] sm:aspect-[16/12] lg:aspect-[4/5]">
              <NeuralNetwork
                tone="dark"
                density={1.25}
                className="absolute inset-0 w-full h-full"
              />
              {/* subtle top vignette + grid feel handled by canvas */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(120% 80% at 50% 0%, transparent 55%, rgba(11,18,32,0.5) 100%)",
                }}
              />

              {/* live label chip */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5b8cff] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5b8cff]" />
                </span>
                Automatisierung · aktiv
              </div>

              {/* caption */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <p className="text-white font-medium text-lg">
                  Ihr vernetztes System
                </p>
                <p className="mt-1 text-sm text-white/60 max-w-xs">
                  Informationen fließen automatisch dorthin, wo sie gebraucht
                  werden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
