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
    text: "Sie sprechen direkt mit uns – keine Ticketsysteme, keine Warteschleifen. Ein fester Ansprechpartner von Anfang bis Ende.",
  },
  {
    title: "Praxisnah",
    text: "Wir setzen auf Ihre vorhandenen Tools auf, statt alles neu aufzubauen. Das einfachste System, das den Job zuverlässig erledigt.",
  },
  {
    title: "Messbar",
    text: "Vor dem Start definieren wir gemeinsam, woran sich der Erfolg messen lässt – und prüfen es nach dem Go-live nach.",
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
          title="Die Menschen hinter solvomind."
          intro="Bei kleinen Teams zählt Vertrauen. Deshalb wissen Sie von Anfang an, mit wem Sie arbeiten."
        />

        <div className="mt-16 md:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Compact founder card */}
          <aside
            data-about-reveal
            className="lg:col-span-5 card shadow-card-lg p-6 md:p-8 lg:sticky lg:top-28"
          >
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <div
                  aria-hidden
                  className="absolute -inset-1.5 rounded-[1.25rem] opacity-70"
                  style={{
                    background:
                      "radial-gradient(60% 60% at 30% 20%, rgba(0,61,240,0.25), transparent 70%)",
                  }}
                />
                <Image
                  src="/ali-alizadeh.jpeg"
                  alt="Ali Alizadeh, Gründer von solvomind"
                  width={256}
                  height={256}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-line"
                  sizes="112px"
                />
              </div>
              <div>
                <p className="text-xl font-semibold tracking-tight">
                  Ali Alizadeh
                </p>
                <p className="text-base text-muted">Gründer · solvomind</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  <MapPin size={14} /> Hamburg, deutschlandweit
                </p>
              </div>
            </div>

            <blockquote className="mt-7 text-lg md:text-xl font-display font-medium leading-snug tracking-tight">
              <span className="text-accent">„</span>
              Die besten Prozesse laufen zuverlässig im Hintergrund und halten
              Menschen den Rücken frei.
              <span className="text-accent">"</span>
            </blockquote>

            <div className="mt-6 pt-5 border-t border-line flex items-center gap-2 text-sm text-muted">
              <ShieldCheck size={16} className="text-accent" />
              Persönlich betreut · DSGVO-konform
            </div>
          </aside>

          {/* Story + values */}
          <div className="lg:col-span-7">
            <p
              data-about-reveal
              className="text-lg md:text-xl text-fg leading-relaxed"
            >
              Gegründet von Ali Alizadeh, sind wir ein Team, das Unternehmen
              dabei hilft, wiederkehrende Aufgaben mit KI zu automatisieren und
              Systeme zu einem fließenden Netzwerk zu verbinden. Kein
              Technik-Overkill, sondern Lösungen, die im Alltag wirklich
              entlasten.
            </p>

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
