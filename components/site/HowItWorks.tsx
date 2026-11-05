"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { DEPARTMENTS, deptIndex, type DeptId } from "@/lib/departments";
import { fmt, type Dict } from "@/lib/i18n";
import { tool } from "@/lib/tools";
import { useActive, useLoop, useReducedMotion } from "@/lib/motion";
import { AgentOrb, SectionHead, ToolLogo } from "./ui";

const CONNECT = ["gmail", "datev", "slack", "googledrive"];

/* 1 · Ein Mauszeiger klickt nacheinander auf „Verbinden“, das Logo wandert in den Orbit. */
function ConnectVisual({ t }: { t: Dict["how"]; names?: string[] }) {
  const [ref, active] = useActive<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [done, setDone] = useState(reduced ? 4 : 0);
  const [cur, setCur] = useState(-1);

  useLoop(active && !reduced, async (sleep) => {
    for (;;) {
      setDone(0);
      setCur(-1);
      await sleep(700);
      for (let k = 0; k < CONNECT.length; k++) {
        setCur(k);
        await sleep(650);
        setDone(k + 1);
        await sleep(550);
      }
      setCur(-1);
      await sleep(2600);
    }
  });

  const shown = reduced ? 4 : done;
  return (
    <div ref={ref} className="relative h-[230px] overflow-hidden px-5 pt-5">
      <span className="eyebrow !text-[0.62rem]">{t.connectLabel}</span>
      <div className="mt-3 flex gap-4">
        <div className="relative flex-1">
        {/* Mauszeiger fährt zum Button der aktuellen Zeile */}
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute z-10 h-5 w-5 transition-[top,opacity] duration-500 ease-out"
          style={{ right: 12, top: (cur < 0 ? 3 : cur) * 48 + 20, opacity: cur >= 0 ? 1 : 0 }}
          aria-hidden
        >
          <path d="M4 2.5 19.5 11l-6.6 1.6L9.6 19z" fill="#fff" stroke="#0e1013" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
        <ul className="space-y-2">
          {CONNECT.map((id, k) => {
            const on = k < shown;
            return (
              <li key={id} className="panel-2 flex h-10 items-center gap-2.5 !rounded-xl pl-3 pr-1.5">
                <ToolLogo id={id} size={15} />
                <span className="flex-1 truncate text-[0.82rem] font-medium">{tool(id).name}</span>
                <span
                  className={`inline-flex h-7 items-center gap-1 rounded-full px-2.5 text-[0.72rem] font-semibold transition-all duration-300 ${
                    on ? "bg-accent/15 text-accent" : "bg-fg text-on-accent"
                  } ${cur === k && !on ? "scale-95" : ""}`}
                >
                  {on ? <Check size={12} strokeWidth={2.6} /> : <Plus size={12} strokeWidth={2.6} />}
                  <span className="hidden sm:inline">{on ? t.connected : t.connect}</span>
                </span>
              </li>
            );
          })}
        </ul>
        </div>
        {/* Mini-Gehirn mit Orbit */}
        <div className="relative hidden w-[104px] flex-none sm:block">
          <div className="absolute left-1/2 top-[84px] h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-full w-full rounded-full border border-dashed border-line-2" style={{ animation: "spin 30s linear infinite" }}>
            {CONNECT.map((id, k) => {
              const a = (-90 + k * 90) * (Math.PI / 180);
              return (
                <span
                  key={id}
                  className="absolute grid h-7 w-7 place-items-center rounded-lg border border-line bg-surface-2 transition-all duration-500"
                  style={{
                    left: `calc(50% + ${Math.cos(a) * 46}px - 14px)`,
                    top: `calc(50% + ${Math.sin(a) * 46}px - 14px)`,
                    opacity: k < shown ? 1 : 0,
                    transform: k < shown ? "scale(1)" : "scale(.4)",
                  }}
                >
                  <ToolLogo id={id} size={13} />
                </span>
              );
            })}
          </div>
          </div>
          <span className="absolute left-1/2 top-[84px] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_30px_8px_rgba(164,230,58,0.45)]" />
        </div>
      </div>
    </div>
  );
}

/* 2 · Fächer aus acht beschrifteten Abteilungs-Speichen, die nacheinander
   „analysiert“ werden: jede Speiche verzweigt sich und bekommt Knoten. */
function AuditVisual({ t, names }: { t: Dict["how"]; names: string[] }) {
  const [ref, active] = useActive<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? 8 : 0);

  useLoop(active && !reduced, async (sleep) => {
    for (;;) {
      setN(0);
      await sleep(600);
      for (let k = 1; k <= 8; k++) {
        setN(k);
        await sleep(480);
      }
      await sleep(3000);
    }
  });

  const cx = 160, cy = 196, L = 86;
  const P = (a: number, r: number) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const;
  return (
    <div ref={ref} className="relative h-[230px] px-5 pt-5">
      <span className="eyebrow !text-[0.62rem]">{t.auditLabel}</span>
      <span className="mt-1 block text-[0.85rem] font-semibold tabular-nums text-fg/90">{fmt(t.audited, { n })}</span>
      <svg viewBox="0 0 320 205" className="absolute inset-x-0 bottom-0 mx-auto h-[178px] w-full max-w-[330px]" aria-hidden>
        {DEPARTMENTS.map((d, k) => {
          const a = Math.PI + (k + 0.5) * (Math.PI / 8);
          const deg = (a * 180) / Math.PI;
          const on = k < n;
          const [mx, my] = P(a, L * 0.5);
          const tips = [P(a - 0.13, L * 0.86), P(a + 0.1, L)];
          const [lx, ly] = P(a, L + 12);
          const left = deg < 270;
          const col = on ? d.color : "rgba(239,239,237,.14)";
          const grow = { strokeDasharray: 1, strokeDashoffset: on ? 0 : 1, transition: "stroke-dashoffset .5s var(--ease), stroke .3s" };
          return (
            <g key={d.id}>
              <line x1={cx} y1={cy} x2={mx} y2={my} stroke={on ? d.color : "rgba(239,239,237,.12)"} strokeWidth="1.3" />
              {tips.map(([x, y], j) => (
                <g key={j}>
                  <line x1={mx} y1={my} x2={x} y2={y} pathLength={1} stroke={col} strokeWidth="1.3" style={{ ...grow, transitionDelay: `${0.1 + j * 0.08}s` }} />
                  <circle cx={x} cy={y} r={on ? 2.8 : 1.6} fill={col} style={{ transition: "r .35s var(--ease), fill .3s", transitionDelay: `${0.25 + j * 0.08}s`, filter: on ? `drop-shadow(0 0 3px ${d.color})` : undefined }} />
                </g>
              ))}
              <circle cx={mx} cy={my} r={on ? 2.4 : 1.6} fill={col} style={{ transition: "all .3s" }} />
              <text
                x={lx}
                y={ly}
                transform={`rotate(${left ? deg - 180 : deg} ${lx} ${ly})`}
                textAnchor={left ? "end" : "start"}
                dominantBaseline="middle"
                fontSize="7.4"
                fontWeight="600"
                letterSpacing="1.1"
                fill={on ? d.color : "rgba(239,239,237,.28)"}
                style={{ transition: "fill .4s" }}
              >
                {names[k].toUpperCase()}
              </text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="12" fill="#8f93f0" opacity=".18" />
        <circle cx={cx} cy={cy} r="7.5" fill="#a4e63a" style={{ filter: "drop-shadow(0 0 8px rgba(164,230,58,.7))" }} />
      </svg>
    </div>
  );
}

/* 3 · Agenten-Zeilen wechseln von „Wartet“ über „Läuft“ zu „Fertig“. */
function WorkVisual({ t }: { t: Dict["how"]; names?: string[] }) {
  const [ref, active] = useActive<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [st, setSt] = useState<number[]>(reduced ? [2, 2, 2] : [0, 0, 0]);

  useLoop(active && !reduced, async (sleep) => {
    for (;;) {
      setSt([0, 0, 0]);
      await sleep(700);
      for (let k = 0; k < 3; k++) {
        setSt((s) => s.map((v, j) => (j === k ? 1 : v)));
        await sleep(1300);
        setSt((s) => s.map((v, j) => (j === k ? 2 : v)));
        await sleep(350);
      }
      await sleep(3000);
    }
  });

  return (
    <div ref={ref} className="h-[230px] px-5 pt-5">
      <span className="eyebrow !text-[0.62rem]">{t.workLabel}</span>
      <ul className="mt-3 space-y-2">
        {t.workRows.map((r, k) => {
          const i = deptIndex(r.dept as DeptId);
          const s = st[k];
          return (
            <li key={k} className="panel-2 flex items-center gap-3 !rounded-xl px-3 py-2.5 transition-colors duration-300" style={s === 1 ? { borderColor: `color-mix(in srgb, ${DEPARTMENTS[i].color} 40%, transparent)` } : undefined}>
              <AgentOrb i={i} size={26} state={s === 1 ? "working" : "idle"} />
              <span className="min-w-0 flex-1">
                <b className="block truncate text-[0.8rem] font-semibold">{r.job}</b>
                <span className="block truncate text-[0.72rem] text-muted">
                  {s === 2 ? <span className="t-in inline-block text-fg/70">{r.result}</span> : " "}
                </span>
              </span>
              <span className="flex flex-none items-center gap-1.5 text-[0.7rem] font-semibold" style={{ color: s === 2 ? "var(--accent)" : s === 1 ? DEPARTMENTS[i].color : "var(--muted-2)" }}>
                {s === 1 && <span className="spinner" style={{ ["--c" as string]: DEPARTMENTS[i].color }} />}
                {s === 2 && <Check size={12} strokeWidth={2.6} />}
                {s === 0 ? t.status.queued : s === 1 ? t.status.working : t.status.done}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function HowItWorks({ t, names }: { t: Dict["how"]; names: string[] }) {
  const visuals = [ConnectVisual, AuditVisual, WorkVisual];
  return (
    <section id="ablauf" className="sec">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} title={t.title} />
        <div className="head-gap grid gap-[18px] md:grid-cols-3">
          {t.steps.map((s, k) => {
            const V = visuals[k];
            return (
              <article key={k} className="panel rv overflow-hidden" style={{ ["--d" as string]: `${k * 0.08}s` }}>
                <V t={t} names={names} />
                <div className="border-t border-line p-6">
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-line-2 text-[0.75rem] font-semibold text-muted">{k + 1}</span>
                  <h3 className="mt-4 text-[20px] font-bold tracking-[-0.025em]">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.55] text-muted">{s.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
