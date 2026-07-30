"use client";

import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SectionTitle, { Accent } from "./SectionTitle";
import { TrendingDown } from "lucide-react";

/* Angenommene versteckte Kosten pro Tool (Lizenz-Overlap, Kontextwechsel,
   doppelte Datenpflege) — bewusst konservativ angesetzt. */
const TOOL_COST_PER_YEAR = 900;
const WEEKS_PER_YEAR = 52;

const tools = [
  "HubSpot",
  "Salesforce",
  "Pipedrive",
  "Gmail",
  "Outlook",
  "Slack",
  "Microsoft Teams",
  "Notion",
  "Airtable",
  "DATEV",
  "Lexware",
  "Google Drive",
  "Dropbox",
  "Calendly",
  "DocuSign",
  "Personio",
  "Zoho",
];

const fmt = (n: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

function Slider({
  label,
  value,
  display,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <label className="text-[11px] uppercase tracking-[0.18em] text-muted">
          {label}
        </label>
        <span className="text-lg font-semibold tracking-tight whitespace-nowrap">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-range mt-3 w-full"
        aria-label={label}
      />
    </div>
  );
}

export default function ROICalculator() {
  const ref = useRef<HTMLDivElement>(null);
  const [team, setTeam] = useState(8);
  const [rate, setRate] = useState(55);
  const [hours, setHours] = useState(12);
  const [selected, setSelected] = useState<string[]>([]);

  const timeLoss = useMemo(
    () => team * rate * hours * WEEKS_PER_YEAR,
    [team, rate, hours]
  );
  const toolLoss = selected.length * TOOL_COST_PER_YEAR;
  const total = timeLoss + toolLoss;

  const toggle = (t: string) =>
    setSelected((s) =>
      s.includes(t) ? s.filter((x) => x !== t) : [...s, t]
    );

  useGSAP(
    () => {
      const items = ref.current?.querySelectorAll("[data-roi]");
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
    <section id="rechner" ref={ref} className="section bg-bg">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionTitle
          label="Ihre Zahl finden"
          title={
            <>
              Was kostet Sie manuelle Arbeit <Accent>wirklich?</Accent>
            </>
          }
          intro="Drei Regler, dreißig Sekunden, Ihr Jahresverlust. Das Audit macht ihn dann präzise — bis auf den einzelnen Workflow."
        />

        <div data-roi className="mt-10 md:mt-12 card shadow-card-lg p-6 md:p-8">
          {/* Kopf */}
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <TrendingDown size={20} strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                Wie viel verliert Ihr Unternehmen?
              </h3>
              <p className="mt-1 text-[0.95rem] text-muted">
                Stellen Sie Team, Stunden und Tools ein — und sehen Sie, was
                manuelle Arbeit Sie pro Jahr kostet.
              </p>
            </div>
          </div>

          {/* Regler */}
          <div className="mt-9 grid md:grid-cols-2 gap-x-10 gap-y-8">
            <Slider
              label="Wie groß ist Ihr Team?"
              value={team}
              display={`${team}`}
              min={1}
              max={50}
              onChange={setTeam}
            />
            <Slider
              label="Durchschnittlicher Stundensatz im Team?"
              value={rate}
              display={`${rate} €/Std.`}
              min={20}
              max={150}
              step={5}
              onChange={setRate}
            />
            <div className="md:col-span-2">
              <Slider
                label="Stunden manuelle Arbeit — pro Person, pro Woche?"
                value={hours}
                display={`${hours} Std.`}
                min={1}
                max={40}
                onChange={setHours}
              />
            </div>
          </div>

          {/* Tools */}
          <div className="mt-9">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
              Für welche Tools zahlen Sie aktuell?
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tools.map((t) => {
                const on = selected.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggle(t)}
                    aria-pressed={on}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      on
                        ? "border-accent/50 bg-accent-soft text-accent"
                        : "border-line bg-surface text-fg/75 hover:border-fg/25"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ergebnis */}
          <div className="mt-10 border-t border-line pt-7 space-y-3">
            <div className="flex items-baseline justify-between gap-3 text-[0.95rem]">
              <span className="text-muted">Zeitverlust durch manuelle Arbeit</span>
              <span
                aria-hidden
                className="hidden sm:block flex-1 border-b border-dashed border-line self-center"
              />
              <span className="font-semibold">{fmt(timeLoss)}</span>
            </div>
            <div className="flex items-baseline justify-between gap-3 text-[0.95rem]">
              <span className="text-muted">
                Tool-Wildwuchs × {selected.length}
              </span>
              <span
                aria-hidden
                className="hidden sm:block flex-1 border-b border-dashed border-line self-center"
              />
              <span className="font-semibold">{fmt(toolLoss)}</span>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-t border-line pt-6">
              <span className="text-[11px] uppercase tracking-[0.18em] text-muted">
                Geschätzter Jahresverlust
              </span>
              <span
                aria-live="polite"
                className="text-4xl md:text-5xl font-semibold tracking-tight text-accent"
              >
                {fmt(total)}
              </span>
            </div>
          </div>

          <div className="mt-8 text-center sm:text-right">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-accent text-on-accent text-base font-semibold hover:bg-accent/90 transition-colors shadow-accent-glow"
            >
              Erstgespräch buchen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
