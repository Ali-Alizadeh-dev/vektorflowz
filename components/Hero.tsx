"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SplitWords from "./SplitWords";
import {
  BadgeDollarSign,
  Megaphone,
  Settings,
  Eye,
  MessageSquare,
  Landmark,
  Target,
  FileText,
  RefreshCw,
  Mic,
  PenTool,
  Image as ImageIcon,
  Search,
  UserPlus,
  Sun,
  Activity,
  LifeBuoy,
  BookOpen,
  Receipt,
  ClipboardList,
  ListChecks,
  Database,
  Mail,
  BarChart3,
  FolderOpen,
  Scale,
  TrendingUp,
} from "lucide-react";

/* "Second Brain" — Agenten-Kategorien wie im Altari-Hero. Die Chips laufen
   pro Spalte in einer vertikalen Endlosschleife. Auf Mobile werden nur die
   ersten Spalten gezeigt. */
const categories = [
  {
    icon: BadgeDollarSign,
    name: "Vertrieb",
    count: "24 Agenten",
    agents: [
      { icon: FileText, label: "Angebots-Assistent" },
      { icon: RefreshCw, label: "Follow-ups" },
      { icon: Mic, label: "Gesprächsnotizen" },
      { icon: Target, label: "Lead-Scoring" },
      { icon: Database, label: "CRM-Pflege" },
    ],
  },
  {
    icon: Megaphone,
    name: "Marketing",
    count: "23 Agenten",
    agents: [
      { icon: PenTool, label: "Content-Engine" },
      { icon: ImageIcon, label: "Social Posts" },
      { icon: Search, label: "SEO-Briefings" },
      { icon: Mail, label: "Newsletter" },
      { icon: BarChart3, label: "Kampagnen-Reports" },
    ],
  },
  {
    icon: Settings,
    name: "Betrieb",
    count: "19 Agenten",
    agents: [
      { icon: UserPlus, label: "Kunden-Onboarding" },
      { icon: Sun, label: "Termin-Planung" },
      { icon: Activity, label: "Status-Updates" },
      { icon: FolderOpen, label: "Dokumenten-Ablage" },
      { icon: ListChecks, label: "Aufgaben-Routing" },
    ],
  },
  {
    icon: MessageSquare,
    name: "Kundenservice",
    count: "14 Agenten",
    agents: [
      { icon: LifeBuoy, label: "Anfragen-Triage" },
      { icon: BookOpen, label: "FAQ-Engine" },
      { icon: Eye, label: "Ticket-Routing" },
      { icon: PenTool, label: "Antwort-Entwürfe" },
      { icon: Activity, label: "Stimmungs-Analyse" },
    ],
  },
  {
    icon: Landmark,
    name: "Back Office",
    count: "18 Agenten",
    agents: [
      { icon: Receipt, label: "Rechnungen" },
      { icon: ClipboardList, label: "Belege & Ablage" },
      { icon: ListChecks, label: "Datenabgleich" },
      { icon: Scale, label: "Zahlungsabgleich" },
      { icon: FileText, label: "Berichte" },
    ],
  },
  {
    icon: Target,
    name: "Recherche",
    count: "17 Agenten",
    agents: [
      { icon: Search, label: "Lead-Dossiers" },
      { icon: Eye, label: "Wettbewerb" },
      { icon: FileText, label: "Marktberichte" },
      { icon: Landmark, label: "Firmen-Profile" },
      { icon: TrendingUp, label: "Preis-Monitoring" },
    ],
  },
];

/* Bunte Partikelwolke — das "Brain" über dem Label, wie im Original.
   Zeichnet sofort einen statischen Frame (sichtbar auch ohne laufendes rAF,
   z. B. in Hintergrund-Tabs) und rotiert dann sanft weiter. */
function BrainCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 440;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    const colors = [
      "#f4f6f8",
      "#a4e63a",
      "#7dd3fc",
      "#f9a8d4",
      "#fcd34d",
      "#c4b5fd",
      "#86efac",
    ];
    const bell = () => (Math.random() + Math.random() + Math.random()) / 3;
    const particles = Array.from({ length: 680 }, () => {
      // Gleichverteilte Richtung, zur Mitte hin dichter — wirkt wie ein Kern.
      const u = Math.random() * 2 - 1;
      const theta = Math.random() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const r = Math.sqrt(Math.random()) * (0.3 + 0.7 * bell());
      return {
        x: r * s * Math.cos(theta),
        y: r * u,
        z: r * s * Math.sin(theta),
        size: 0.8 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random(),
      };
    });

    const R = SIZE * 0.42;
    let rot = 0;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      // Weicher Kern-Glow
      const g = ctx.createRadialGradient(
        SIZE / 2,
        SIZE / 2,
        0,
        SIZE / 2,
        SIZE / 2,
        R
      );
      g.addColorStop(0, "rgba(244,246,248,0.18)");
      g.addColorStop(0.4, "rgba(164,230,58,0.05)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, SIZE, SIZE);

      const cos = Math.cos(rot);
      const sin = Math.sin(rot);
      for (const p of particles) {
        const x = p.x * cos - p.z * sin;
        const z = p.x * sin + p.z * cos;
        const persp = 1 / (1.6 - z * 0.55);
        const px = SIZE / 2 + x * R * persp;
        const py = SIZE / 2 + p.y * R * persp;
        const tw = 0.7 + 0.3 * Math.sin(t * 0.001 * p.speed + p.phase);
        const dist = Math.hypot(p.x, p.y, p.z);
        ctx.globalAlpha = Math.max(
          0,
          Math.min(1, tw * (1.15 - dist) * (0.5 + 0.5 * persp))
        );
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.size * persp, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    draw(0);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    let raf = 0;
    const loop = (t: number) => {
      rot += 0.0016;
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Das Canvas ist 440×440, die sichtbare Wolke sitzt aber nur in der Mitte.
  // Wir zeigen es in einem kürzeren 300px-Fenster (mit weichem Fade oben/unten),
  // damit der transparente Canvas-Rand nicht als Leerraum die Sektion aufbläht.
  return (
    <div
      aria-hidden
      className="pointer-events-none relative mx-auto h-[300px] w-[440px] max-w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(180deg, transparent 0%, black 16%, black 84%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(180deg, transparent 0%, black 16%, black 84%, transparent 100%)",
      }}
    >
      <canvas
        ref={ref}
        className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2"
        style={{ width: 440, height: 440 }}
      />
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const isDesktop = window.matchMedia(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
      ).matches;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (isDesktop) {
        tl.from('[data-hero="eyebrow"]', { y: 14, opacity: 0, duration: 0.7 })
          .from(
            '[data-hero="title"] .word-inner',
            { yPercent: 110, duration: 1.1, stagger: 0.05 },
            "-=0.3"
          )
          .from(
            '[data-hero="sub"] .word-inner',
            { yPercent: 110, duration: 0.8, stagger: 0.012 },
            "-=0.7"
          )
          .from(
            '[data-hero="cta"]',
            {
              y: 18,
              opacity: 0,
              duration: 0.8,
              stagger: 0.08,
              clearProps: "transform,opacity",
            },
            "-=0.5"
          )
          .from(
            '[data-hero="brain"]',
            { y: 40, opacity: 0, duration: 1, clearProps: "transform,opacity" },
            "-=0.5"
          )
          .from(
            '[data-hero="col"]',
            {
              y: 24,
              opacity: 0,
              duration: 0.6,
              stagger: 0.07,
              clearProps: "transform,opacity",
            },
            "-=0.7"
          );
      } else {
        // Mobile: leichter Block-Fade pro Element — flüssiger First Paint.
        tl.from(
          [
            '[data-hero="eyebrow"]',
            '[data-hero="title"]',
            '[data-hero="sub"]',
            '[data-hero="cta"]',
            '[data-hero="brain"]',
          ],
          {
            y: 16,
            opacity: 0,
            duration: 0.55,
            stagger: 0.1,
            clearProps: "transform,opacity",
          }
        );
      }

      // Safety: pausiertes rAF in Hintergrund-Tabs würde Inhalte verstecken.
      if (document.hidden) tl.progress(1);
    },
    { scope: root }
  );

  return (
    <section
      id="home"
      ref={root}
      className="relative overflow-hidden pt-32 md:pt-36 pb-0"
    >
      {/* Dot-Matrix-Hintergrund wie bei Altari — zu den Rändern ausgeblendet */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-dotgrid"
        style={{
          maskImage:
            "radial-gradient(75% 65% at 50% 35%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(75% 65% at 50% 35%, black 0%, transparent 100%)",
        }}
      />
      {/* Sanfter Lime-Glow hinter der Headline */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 20%, rgba(164,230,58,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 md:px-8 text-center">
        <span
          data-hero="eyebrow"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-fg/80"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Audit-First-Ansatz
        </span>

        <h1
          data-hero="title"
          className="mx-auto mt-6 max-w-4xl text-[9vw] sm:text-5xl lg:text-[3.6rem] leading-[1.06] font-semibold tracking-tightest"
        >
          <SplitWords text="Ihr Unternehmen verliert täglich" />{" "}
          <span className="text-accent">
            <SplitWords text="Zeit und Umsatz." />
          </span>
          <br className="hidden sm:block" />{" "}
          <SplitWords text="Wir bauen" />{" "}
          <span className="text-accent">
            <SplitWords text="KI-Systeme," />
          </span>{" "}
          <SplitWords text="die das ändern." />
        </h1>

        <SplitWords
          as="p"
          data-hero="sub"
          text="Verstreute Tools und manuelle Routinearbeit kosten Sie unbemerkt Geld. Wir analysieren Ihre Abläufe, dokumentieren, wie Ihr Unternehmen wirklich arbeitet — und bauen dann die Workflows, die Ihnen die Arbeit abnehmen."
          className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-muted leading-relaxed"
        />

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <a
            data-hero="cta"
            href="#kontakt"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-on-accent text-[0.95rem] font-semibold hover:bg-accent/90 transition-colors shadow-accent-glow"
          >
            Kostenloses Erstgespräch
          </a>
          <a
            data-hero="cta"
            href="#leistungen"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-line bg-surface/60 backdrop-blur-sm text-[0.95rem] font-medium text-fg hover:border-fg/25 transition-colors"
          >
            Lösungen ansehen
          </a>
        </div>

        {/* ——— "Second Brain": Partikelwolke + scrollende Agenten-Spalten ———
            Negativer Top-Margin zieht den Block nach oben: das Canvas hat oben
            transparenten Rand, ohne das Ziehen entstünde eine große Leerfläche
            zwischen den CTA-Buttons und der sichtbaren Wolke. */}
        <div data-hero="brain" className="relative mt-4 md:mt-6 mb-16">
          {/* Knotenpunkt */}
          <div className="flex flex-col items-center">
            <BrainCanvas />
            <span className="mt-1 text-xl md:text-2xl font-semibold tracking-tight">
              Second Brain
            </span>
            <span className="mt-1.5 text-sm text-muted">
              Ihr Unternehmenswissen, als System
            </span>
          </div>

          {/* Verbindungslinien vom Knoten zu den Spalten */}
          <div aria-hidden className="relative mx-auto mt-4 h-10 max-w-5xl">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              {[8, 25, 42, 58, 75, 92].map((x) => (
                <path
                  key={x}
                  d={`M 50 0 C 50 60, ${x} 40, ${x} 100`}
                  fill="none"
                  stroke="var(--accent)"
                  strokeOpacity="0.25"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 text-left">
            {categories.map((c, i) => (
              <div
                key={c.name}
                data-hero="col"
                className={`${i >= 4 ? "hidden sm:block" : ""} ${
                  i >= 3 ? "sm:max-lg:hidden lg:block" : ""
                }`}
              >
                <div className="card p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <c.icon size={17} strokeWidth={1.75} />
                  </span>
                  <div className="mt-3 text-sm font-semibold tracking-tight">
                    {c.name}
                  </div>
                  <div className="text-[11px] text-muted">{c.count}</div>
                </div>

                {/* Endlos nach oben scrollende Chips */}
                <div className="chip-window mt-2 h-[200px] overflow-hidden">
                  <div
                    className="animate-chipscroll"
                    style={
                      { "--chip-dur": `${19 + i * 2.6}s` } as CSSProperties
                    }
                  >
                    {[0, 1].map((copy) => (
                      <div
                        key={copy}
                        aria-hidden={copy === 1}
                        className="flex flex-col gap-2 pb-2"
                      >
                        {c.agents.map((a) => (
                          <div
                            key={a.label}
                            className="flex items-center gap-2 rounded-xl border border-line bg-surface/60 px-3 py-2.5 text-[12px] font-medium text-fg/80"
                          >
                            <a.icon
                              size={13}
                              strokeWidth={1.75}
                              className="shrink-0 text-muted"
                            />
                            <span className="truncate">{a.label}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
