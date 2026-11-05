"use client";

import { useEffect, Fragment } from "react";
import {
  Target, Megaphone, Headphones, Workflow, Wallet, FileText, Users, TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { DEPARTMENTS } from "@/lib/departments";
import { tool, logoColor } from "@/lib/tools";
import PixelAvatar from "./PixelAvatar";

const DEPT_ICONS: Record<string, LucideIcon> = {
  Target, Megaphone, Headphones, Workflow, Wallet, FileText, Users, TrendingUp,
};

/** Ein einziger IntersectionObserver für alle .rv-Elemente der Seite. */
export function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv:not(.in)");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

export function DeptIcon({ i, size = 16, className = "" }: { i: number; size?: number; className?: string }) {
  const Icon = DEPT_ICONS[DEPARTMENTS[i].icon];
  return <Icon size={size} strokeWidth={1.9} className={className} aria-hidden />;
}

/** Runder Abteilungs-Badge mit farbigem Ring und Glow. */
export function DeptBadge({ i, size = 34, active = false }: { i: number; size?: number; active?: boolean }) {
  const c = DEPARTMENTS[i].color;
  return (
    <span
      className="inline-grid place-items-center rounded-full transition-all duration-300"
      style={{
        width: size,
        height: size,
        color: c,
        background: `color-mix(in srgb, ${c} ${active ? 22 : 12}%, #0e1013)`,
        boxShadow: active ? `0 0 0 1.5px ${c}, 0 0 22px -2px ${c}` : `0 0 0 1px color-mix(in srgb, ${c} 45%, transparent)`,
      }}
    >
      <DeptIcon i={i} size={Math.round(size * 0.46)} />
    </span>
  );
}

/** Agent als Pixel-Figur in der Farbe seiner Abteilung. */
export function AgentOrb({ i, size = 40, state = "idle" }: { i: number; size?: number; state?: "idle" | "working" | "done" }) {
  return <PixelAvatar i={i} size={size} state={state} glow={state === "working"} />;
}

/** Tool-Logo: offizielles Icon aus simple-icons oder farbiges Kürzel. */
export function ToolLogo({ id, size = 16 }: { id: string; size?: number }) {
  const t = tool(id);
  if (t.icon) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-label={t.name} role="img" className="flex-none">
        <path d={t.icon.path} fill={logoColor(t.icon.hex)} />
      </svg>
    );
  }
  const m = t.mono!;
  return (
    <span
      aria-label={t.name}
      role="img"
      className="inline-grid place-items-center flex-none rounded-[5px] font-bold text-white leading-none"
      style={{ width: size, height: size, background: m.color, fontSize: size * (m.text.length > 1 ? 0.42 : 0.56) }}
    >
      {m.text}
    </span>
  );
}

/** Logo in einer kleinen dunklen Kachel (für Ringe, Listen, Raster). */
export function ToolTile({ id, size = 34, logo = 16, className = "" }: { id: string; size?: number; logo?: number; className?: string }) {
  return (
    <span
      className={`inline-grid place-items-center flex-none rounded-[10px] border border-line bg-surface-2 ${className}`}
      style={{ width: size, height: size }}
    >
      <ToolLogo id={id} size={logo} />
    </span>
  );
}

/**
 * Rendert einen Antworttext. „[1]“ wird zum Quellen-Marker.
 * Mit `animate` erscheint der Text Wort für Wort.
 */
/** Anzahl der Wörter (inkl. Quellen-Marker) – für Wort-für-Wort-Streaming. */
export function wordCount(text: string) {
  return text.split(/(\s+|\[\d+\])/).filter((p) => p !== "" && !/^\s+$/.test(p)).length;
}

export function Answer({ text, animate = true, step = 0.045, count }: { text: string; animate?: boolean; step?: number; count?: number }) {
  const parts = text.split(/(\s+|\[\d+\])/).filter((p) => p !== "");
  let n = 0;
  let shown = 0;
  return (
    <>
      {parts.map((p, k) => {
        const m = p.match(/^\[(\d+)\]$/);
        if (/^\s+$/.test(p)) return count != null && shown >= count ? null : <Fragment key={k}>{p}</Fragment>;
        if (count != null) {
          if (shown >= count) return null;
          shown++;
        }
        // Mit `count` blendet jedes neu hinzukommende Wort sofort ein (keine Staffelung)
        const delay = animate && count == null ? `${(n++ * step).toFixed(3)}s` : undefined;
        const cls = animate ? "w" : undefined;
        if (m) {
          return (
            <span key={k} className={cls} style={{ animationDelay: delay }}>
              <span className="src">{m[1]}</span>
            </span>
          );
        }
        return (
          <span key={k} className={cls} style={{ animationDelay: delay }}>
            {p}
          </span>
        );
      })}
    </>
  );
}

export function SectionHead({ eyebrow, title, sub, className = "" }: { eyebrow: string; title: string; sub?: string; className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <span className="eyebrow rv">{eyebrow}</span>
      <h2 className="h2 mt-[18px] rv" style={{ ["--d" as string]: "0.06s" }}>{title}</h2>
      {sub && (
        <p className="lead mt-5 rv" style={{ ["--d" as string]: "0.12s" }}>
          {sub}
        </p>
      )}
    </div>
  );
}
