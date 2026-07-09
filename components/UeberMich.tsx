"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeader from "./SectionHeader";
import { MapPin, ShieldCheck } from "lucide-react";

const pillars = [
  {
    title: "Persönlich",
    text: "Sie sprechen direkt mit uns – vom ersten Gespräch bis zur fertigen Lösung.",
  },
  {
    title: "Praxisnah",
    text: "Wir setzen auf Ihre vorhandenen Systeme auf, statt alles neu aufzubauen.",
  },
  {
    title: "Messbar",
    text: "Vor Projektbeginn legen wir gemeinsam fest, woran wir den Erfolg messen.",
  },
  {
    title: "Langfristig",
    text: "Auch nach der Einführung begleiten wir Sie weiter und entwickeln Ihre Automatisierungen gemeinsam mit Ihnen weiter.",
  },
];

export default function UeberMich() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
      () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-about-reveal]");
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
      <section id="ueber-uns" ref={ref} className="section">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeader
              label="Über uns"
              title="Hinter solvomind."
              intro="Bei kleinen Teams ist Vertrauen wichtig. Deshalb wissen Sie immer, mit wem Sie zusammenarbeiten."
          />

          <div className="mt-16 md:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Compact founder card */}
              {/* Compact founder card */}
              <aside
                  data-about-reveal
                  className="lg:col-span-5 card shadow-card-lg p-6 md:p-8 lg:sticky lg:top-28"
              >
                  <div className="relative">
                      <div
                          aria-hidden
                          className="absolute -inset-2 rounded-[1.75rem] opacity-70"
                          style={{
                              background:
                                  "radial-gradient(60% 60% at 30% 20%, rgba(0,61,240,0.22), transparent 70%)",
                          }}
                      />
                      {/* NEU: mx-auto sorgt für die Zentrierung auf mobilen Geräten */}
                      <div className="relative w-2/3 max-w-[220px] aspect-square mx-auto md:w-full md:max-w-none md:aspect-[4/3] overflow-hidden rounded-2xl border border-line">
                          <Image
                              src="/ali-alizadeh.jpeg"
                              alt="Ali Alizadeh, Gründer von solvomind"
                              fill
                              className="object-cover object-top"
                              sizes="(max-width: 700px) 220px, 420px"
                          />
                      </div>
                  </div>

                  {/* Text unter dem Bild auf Mobile ebenfalls zentrieren? */}
                  {/* Falls gewünscht, kannst du bei den Texten unten 'text-center md:text-left' hinzufügen */}
                  <div className="mt-6 text-center md:text-left">
                      <p className="text-xl font-semibold tracking-tight">
                          Ali Alizadeh
                      </p>
                      <p className="text-base text-muted">Gründer von solvomind</p>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                          <MapPin size={14} /> Hamburg · deutschlandweit
                      </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-line flex items-center justify-center md:justify-start gap-2 text-sm text-muted">
                      <ShieldCheck size={16} className="text-accent" />
                      Persönlich betreut · DSGVO-konform
                  </div>
              </aside>

            {/* Story + values */}
            <div className="lg:col-span-7">
              <ul className="mt-8">
                {pillars.map((p, i) => (
                    <li
                        key={p.title}
                        data-about-reveal
                        className="py-6 border-t border-line last:border-b"
                    >
                      <div className="flex items-baseline gap-4">
                    <span className="text-sm font-mono text-accent">
                      0{i + 1}
                    </span>
                        <div>
                          <h3 className="text-lg md:text-xl font-medium tracking-tight">
                            {p.title}
                          </h3>
                          <p className="mt-1.5 text-base text-muted leading-relaxed">
                            {p.text}
                          </p>
                        </div>
                      </div>
                    </li>
                ))}
              </ul>

              <a
                  data-about-reveal
                  href="#kontakt"
                  className="group mt-8 inline-flex items-center gap-2 text-base font-medium hover:text-accent transition-colors"
              >
                Lernen wir uns kennen
                <span className="inline-block group-hover:translate-x-1 transition-transform">
                →
              </span>
              </a>
            </div>
          </div>
        </div>
      </section>
  );
}