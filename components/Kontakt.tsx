"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeader from "./SectionHeader";
import { ArrowRight, Mail, Phone } from "lucide-react";

export default function Kontakt() {
  const ref = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `Anfrage von ${data.get("name") ?? "Website"}`
    );
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nE-Mail: ${data.get("email")}\nUnternehmen: ${data.get("company")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:ali.alizadeh@solvomind.de?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="kontakt" ref={ref} className="section">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          label="Kontakt"
          title="Lassen Sie uns über Ihre Prozesse sprechen."
          intro="Schildern Sie kurz Ihr Anliegen. Sie erhalten innerhalb von 24 Stunden eine persönliche Rückmeldung."
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
            <div data-field className="py-6 border-b border-line">
              <p className="text-sm uppercase tracking-[0.2em] text-muted">
                Telefon
              </p>
              <a
                href="tel:+491794392400"
                className="mt-3 inline-flex items-center gap-2 text-lg font-medium hover:text-accent transition-colors"
              >
                <Phone size={18} className="shrink-0 text-accent" /> 0179 4392400
              </a>
            </div>
            <div data-field className="pt-6">
              <p className="text-sm uppercase tracking-[0.2em] text-muted">
                Erstgespräch
              </p>
              <p className="mt-3 text-lg font-medium">
                Unverbindlich &amp; kostenfrei
              </p>
              <p className="mt-1 text-sm text-muted">
                Antwort werktags innerhalb von 24 Stunden.
              </p>
            </div>
          </aside>

          <form
            data-card
            onSubmit={handleSubmit}
            className="lg:col-span-8 card shadow-card p-6 md:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field data-field name="name" label="Name" required />
              <Field
                data-field
                name="email"
                label="E-Mail"
                type="email"
                required
              />
            </div>
            <Field data-field name="company" label="Unternehmen (optional)" />

            <div data-field>
              <label className="block text-sm uppercase tracking-[0.18em] text-muted mb-2">
                Ihr Anliegen
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Welche Prozesse kosten aktuell besonders viel Zeit oder Aufwand?"
                className="w-full rounded-xl bg-bg border border-line px-4 py-3 text-base md:text-lg text-fg placeholder:text-muted/60 focus:outline-none focus:border-accent transition resize-none"
              />
            </div>

            <button
              data-field
              type="submit"
              className="group w-full inline-flex items-center justify-center gap-2.5 pl-7 pr-2.5 py-2.5 rounded-full bg-accent text-bg text-base font-medium hover:bg-accent/90"
            >
              {sent ? "E-Mail-Programm geöffnet" : "Nachricht senden"}
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-bg/15 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight size={16} />
              </span>
            </button>

            <p data-field className="text-sm text-muted text-center">
              Mit dem Absenden öffnet sich Ihr E-Mail-Programm. Es werden keine Daten gespeichert oder an Server übertragen.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  ...rest
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  [key: string]: any;
}) {
  return (
    <div {...rest}>
      <label className="block text-xs uppercase tracking-[0.18em] text-muted mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl bg-bg border border-line px-4 py-3 text-base md:text-lg text-fg placeholder:text-muted/60 focus:outline-none focus:border-accent transition"
      />
    </div>
  );
}
