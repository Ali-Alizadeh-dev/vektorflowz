"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ShieldCheck, UserCheck, Globe, Sparkles, Check } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "DSGVO-konform",
    text: "Ihre Daten werden ausschließlich in den freigegebenen Systemen verarbeitet und nach europäischen Datenschutzstandards behandelt.",
  },
  {
    icon: UserCheck,
    title: "Menschliche Kontrolle",
    text: "Wichtige Entscheidungen trifft weiterhin ein Mensch. KI unterstützt Ihr Team, ersetzt aber keine Verantwortung.",
  },
  {
    icon: Globe,
    title: "Datenverarbeitung in der EU",
    text: "Ihre Daten bleiben unter Ihrer Kontrolle und werden innerhalb der EU verarbeitet.",
  },
];

export default function Sicherheit() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-sec-reveal]");
      if (!items.length) return;
      gsap.set(items, { y: 24, opacity: 0 });
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.09,
            ease: "power3.out",
            overwrite: true,
          }),
      });
      ScrollTrigger.refresh();
    },
    { scope: ref }
  );

  return (
    <section
      id="security"
      ref={ref}
      className="section bg-bg border-y border-line"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy + features */}
          <div>
            <div
              data-sec-reveal
              className="text-sm font-semibold uppercase tracking-[0.08em] text-accent"
            >
              Sicherheit
            </div>
            <h2
              data-sec-reveal
              className="mt-3 text-3xl md:text-[2.5rem] font-semibold tracking-tightest leading-[1.1]"
            >
              KI verantwortungsvoll einsetzen.
            </h2>
            <p
              data-sec-reveal
              className="mt-5 text-lg text-muted leading-relaxed max-w-lg"
            >
              Datenschutz und Transparenz gehören von Anfang an dazu.
            </p>

            <div className="mt-9 flex flex-col gap-5">
              {features.map((f) => (
                <div key={f.title} data-sec-reveal className="flex gap-4">
                  <span className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-surface border border-line text-accent shadow-card">
                    <f.icon size={20} />
                  </span>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-base text-muted leading-relaxed">
                      {f.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: human-in-the-loop diagram */}
          <div data-sec-reveal className="card shadow-card-lg p-6 md:p-8">
            <div className="text-sm font-semibold tracking-tight">
              So bleibt der Mensch in Kontrolle
            </div>

            <div className="mt-5 flex flex-col">
              {/* KI proposes */}
              <div className="flex items-center gap-3.5 rounded-2xl bg-accent-soft border border-accent/20 px-4 py-3.5">
                <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent text-white shadow-accent-glow">
                  <Sparkles size={17} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-accent">
                    KI erstellt einen Vorschlag
                  </p>
                  <p className="text-xs text-accent/70">
                    Analyse, Entwurf &amp; Empfehlung in Sekunden
                  </p>
                </div>
              </div>

              <Connector />

              {/* Human decides — highlighted */}
              <div
                className="relative flex items-center gap-3.5 rounded-2xl bg-surface border-2 border-accent px-4 py-3.5"
                style={{ boxShadow: "0 12px 26px -10px rgba(0,61,240,0.35)" }}
              >
                <span className="absolute -top-2.5 left-4 rounded-full bg-accent px-2.5 py-0.5 text-[10.5px] font-semibold tracking-[0.04em] text-white">
                  MENSCH ENTSCHEIDET
                </span>
                <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent-soft text-accent">
                  <UserCheck size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">
                    Mitarbeiter prüft &amp; gibt frei
                  </p>
                  <p className="text-xs text-muted">
                    Volle Transparenz — Freigabe, Anpassung oder Ablehnung
                  </p>
                </div>
              </div>

              <Connector />

              {/* KI executes */}
              <div className="flex items-center gap-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3.5">
                <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500 text-white">
                  <Check size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-emerald-700">
                    KI führt automatisch aus
                  </p>
                  <p className="text-xs text-emerald-600/80">
                    Erst nach menschlicher Freigabe — protokolliert &amp;
                    nachvollziehbar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Connector() {
  return (
    <span aria-hidden className="ml-[29px] my-0.5 block h-4 w-px bg-accent/25" />
  );
}
