"use client";

import { useState } from "react";
import { Check, ArrowUp, Lock, Users as UsersIcon, Sparkles } from "lucide-react";
import { DEPARTMENTS } from "@/lib/departments";
import type { Dict } from "@/lib/i18n";
import { MODELS, tool } from "@/lib/tools";
import { useActive, useCountUp, useLoop, useReducedMotion } from "@/lib/motion";
import { Answer, DeptBadge, DeptIcon, SectionHead, ToolLogo } from "./ui";

type F = Dict["features"];
type Depts = Dict["depts"];

function Card({ title, text, children, d = 0, className = "" }: { title: string; text: string; children: React.ReactNode; d?: number; className?: string }) {
  return (
    <article className={`panel rv flex flex-col overflow-hidden ${className}`} style={{ ["--d" as string]: `${d}s` }}>
      <div className="p-6 pb-0 md:p-[30px] md:pb-0">
        <h3 className="card-title">{title}</h3>
        <p className="card-text mt-2.5">{text}</p>
      </div>
      <div className="relative mt-6 flex-1 px-6 pb-6 md:px-[30px] md:pb-[30px]">{children}</div>
    </article>
  );
}

/* Antworten mit Quellen: Frage → Suchschritte → Antwort → Quellenliste */
function AnswersCard({ t }: { t: F["answers"] }) {
  const [ref, active] = useActive<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [step, setStep] = useState(reduced ? 9 : 0); // 0 leer, 1 Frage, 2-4 Schritte, 5 Antwort, 6 Quellen
  const [run, setRun] = useState(0);
  useLoop(active && !reduced, async (sleep) => {
    for (;;) {
      setStep(0);
      setRun((r) => r + 1);
      await sleep(500);
      for (let s = 1; s <= 6; s++) {
        setStep(s);
        await sleep(s === 5 ? 1800 : s === 1 ? 900 : 750);
      }
      await sleep(5200);
    }
  });
  return (
    <div ref={ref} className="flex h-[470px] flex-col">
      <div className="flex-1 space-y-3 overflow-hidden">
        {step >= 1 && <div className="t-in ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-surface-3 px-4 py-2.5 text-[0.88rem]">{t.q}</div>}
        {step >= 2 && (
          <ul className="space-y-1.5">
            {t.steps.map(([id, label, n], k) =>
              step >= 2 + k ? (
                <li key={k} className="t-in flex items-center gap-2.5 text-[0.8rem] text-fg/80">
                  <ToolLogo id={id} size={13} />
                  <span className="flex-1">{label}</span>
                  <span className="text-muted-2">{n}</span>
                  {step > 2 + k ? <Check size={13} className="text-accent" /> : <span className="spinner" />}
                </li>
              ) : null,
            )}
          </ul>
        )}
        {step >= 5 && (
          <div key={run}>
            <p className="t-in flex items-center gap-2 text-[0.72rem] text-muted"><span className="live-dot" /> {t.answered}</p>
            <p className="mt-2 text-[0.92rem] leading-relaxed"><Answer text={t.a} animate={!reduced} step={0.03} /></p>
          </div>
        )}
        {step >= 6 && (
          <ol className="space-y-1.5">
            {t.sources.map(([a, b], k) => (
              <li key={k} className="t-in panel-2 flex items-center gap-3 !rounded-lg px-3 py-2 text-[0.78rem]" style={{ animationDelay: `${k * 0.08}s` }}>
                <span className="src !m-0">{k + 1}</span>
                <span className="flex-1 truncate">{a}</span>
                <span className="text-muted-2">{b}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div className="mt-3 flex h-11 items-center rounded-full border border-line bg-surface-2 pl-4 pr-1.5 text-[0.85rem] text-muted-2">
        <span className="flex-1">{t.followup}</span>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-surface-3"><ArrowUp size={14} /></span>
      </div>
    </div>
  );
}

/* Ein Agent für jede Abteilung: Rad + Liste, der aktive Agent wechselt */
function AgentsCard({ t, depts, jobs }: { t: F["agents"]; depts: Depts; jobs: string[] }) {
  const [ref, active] = useActive<HTMLDivElement>();
  const [cur, setCur] = useState(4);
  useLoop(active, async (sleep) => {
    for (let i = 4; ; i++) {
      setCur(i % 8);
      await sleep(2300);
    }
  });
  const ids = Object.keys(depts) as (keyof Depts)[];
  return (
    <div ref={ref} className="flex h-[470px] items-center gap-4">
      <div className="relative h-[220px] w-[220px] flex-none max-sm:hidden">
        {DEPARTMENTS.map((d, k) => {
          const a = -Math.PI / 2 + (k / 8) * Math.PI * 2;
          return (
            <span key={d.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: 110 + Math.cos(a) * 88, top: 110 + Math.sin(a) * 88 }}>
              <DeptBadge i={k} size={34} active={k === cur} />
            </span>
          );
        })}
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <b className="block text-[0.62rem] font-semibold tracking-[0.2em] transition-colors" style={{ color: DEPARTMENTS[cur].color }}>{depts[ids[cur]].name.toUpperCase()}</b>
            <span className="mt-1 inline-flex items-center gap-1.5 text-[0.7rem] text-muted"><span className="live-dot" style={{ ["--c" as string]: DEPARTMENTS[cur].color }} />{t.running}</span>
          </div>
        </div>
      </div>
      <ul className="flex-1 space-y-1.5">
        {ids.map((id, k) => (
          <li
            key={id}
            className="flex items-center gap-2.5 rounded-xl border px-3 py-1.5 transition-all duration-300"
            style={{ borderColor: k === cur ? `color-mix(in srgb, ${DEPARTMENTS[k].color} 50%, transparent)` : "var(--line)", background: k === cur ? `color-mix(in srgb, ${DEPARTMENTS[k].color} 8%, var(--surface-2))` : "var(--surface-2)" }}
          >
            <span style={{ color: DEPARTMENTS[k].color }}><DeptIcon i={k} size={14} /></span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.8rem] font-medium">{depts[id].agent}</span>
              <span className="block truncate text-[0.68rem] text-muted-2">
                {k === cur ? <span className="t-in inline-block" style={{ color: DEPARTMENTS[k].color }}>{t.running} · {jobs[k]}</span> : `${t.counts[k]} ${t.skills}`}
              </span>
            </span>
            {k === cur && <span className="live-dot" style={{ ["--c" as string]: DEPARTMENTS[k].color }} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Freie Modellwahl: Auswahl wandert, darunter Verteilung der Ausführungen */
function ModelsCard({ t }: { t: F["models"] }) {
  const [ref, active] = useActive<HTMLDivElement>();
  const [sel, setSel] = useState(0);
  useLoop(active, async (sleep) => {
    for (let i = 0; ; i++) {
      setSel(i % 4);
      await sleep(2600);
    }
  });
  const share = [54, 26, 12, 8];
  const colors = ["#D97757", "#10A37F", "#8E75F7", "#FA520F"];
  return (
    <div ref={ref}>
      <p className="mb-2 text-[0.72rem] text-muted">{t.label}</p>
      <ul className="space-y-1.5">
        {MODELS.slice(0, 4).map((m, k) => (
          <li key={m.id} className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all duration-300 ${k === sel ? "border-line-2 bg-surface-3" : "border-line bg-surface-2"}`}>
            <ToolLogo id={m.id} size={16} />
            <span className="flex-1 text-[0.85rem] font-medium">{m.name}</span>
            {k === sel && <Check size={15} className="t-in text-accent" />}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.75rem] text-muted-2">{t.more}</p>
      <div className="mt-5 flex items-center justify-between text-[0.72rem] text-muted"><span>{t.runs}</span><span className="tabular-nums">{t.runsCount}</span></div>
      <div className="mt-2 flex h-2 gap-0.5 overflow-hidden rounded-full">
        {share.map((s, k) => (
          <span key={k} className="bar-grow h-full rounded-full" style={{ width: `${s}%`, background: colors[k], ["--d" as string]: `${k * 0.1}s` }} />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.7rem] text-muted">
        {MODELS.slice(0, 4).map((m, k) => (
          <span key={m.id} className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: colors[k] }} />{m.name} {share[k]} %</span>
        ))}
      </div>
    </div>
  );
}

/* Kostenkontrolle: Betrag zählt hoch, Balken wachsen */
function SpendCard({ t, depts }: { t: F["spend"]; depts: Depts }) {
  const [ref, active] = useActive<HTMLDivElement>();
  const total = useCountUp(397, active);
  const rows: [keyof Depts, number][] = [["sales", 128], ["marketing", 85], ["finance", 57], ["service", 46], ["operations", 31]];
  const [paused, setPaused] = useState(true);
  return (
    <div ref={ref}>
      <div className="flex items-baseline gap-2">
        <span className="text-[2.4rem] font-semibold tracking-[-0.04em] tabular-nums">{total} €</span>
        <span className="text-[0.85rem] text-muted">{t.of}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-3">
        <span className="bar-grow block h-full rounded-full bg-accent" style={{ width: "66%" }} />
      </div>
      <ul className="mt-5 space-y-2.5">
        {rows.map(([id, v], k) => {
          const i = DEPARTMENTS.findIndex((d) => d.id === id);
          return (
            <li key={id} className="grid grid-cols-[1.2rem_1fr_auto] items-center gap-3 text-[0.8rem]">
              <span style={{ color: DEPARTMENTS[i].color }}><DeptIcon i={i} size={14} /></span>
              <span>
                <span className="block">{depts[id].name}</span>
                <span className="mt-1 block h-1 overflow-hidden rounded-full bg-surface-3">
                  <span className="bar-grow block h-full rounded-full" style={{ width: `${(v / 128) * 100}%`, background: DEPARTMENTS[i].color, ["--d" as string]: `${0.15 + k * 0.08}s` }} />
                </span>
              </span>
              <span className="tabular-nums text-muted">{v} €</span>
            </li>
          );
        })}
      </ul>
      <button type="button" onClick={() => setPaused((p) => !p)} className="mt-5 flex w-full items-center justify-between rounded-xl border border-line bg-surface-2 px-3 py-2.5 text-[0.82rem]" aria-pressed={paused}>
        {t.pause}
        <span className={`relative h-5 w-9 rounded-full transition-colors ${paused ? "bg-accent" : "bg-surface-3"}`}>
          <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${paused ? "left-[18px]" : "left-0.5"}`} />
        </span>
      </button>
    </div>
  );
}

/* Skills auf einem Baum: kleiner Baum + Skill-Karte, deren Zeilen sich füllen */
function SkillsCard({ t }: { t: F["skills"] }) {
  const [ref, active] = useActive<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? 3 : 0);
  useLoop(active && !reduced, async (sleep) => {
    for (;;) {
      setN(0);
      await sleep(700);
      for (let k = 1; k <= 3; k++) {
        setN(k);
        await sleep(900);
      }
      await sleep(3600);
    }
  });
  const c = DEPARTMENTS[0].color;
  return (
    <div ref={ref} className="flex items-center gap-4">
      <svg viewBox="0 0 140 170" className="h-[170px] w-[120px] flex-none max-sm:hidden" aria-hidden>
        {[...Array(5)].map((_, k) => {
          const a = -Math.PI / 2 + (k - 2) * 0.42;
          const x = 70 + Math.cos(a) * 62, y = 150 + Math.sin(a) * 62;
          const hot = k === 2 && n > 0;
          return (
            <g key={k}>
              <line x1="70" y1="150" x2={x} y2={y} stroke={hot ? c : "rgba(241,244,246,.16)"} strokeWidth={hot ? 1.6 : 1} style={{ transition: "stroke .4s" }} />
              {[-0.2, 0, 0.2].map((da, j) => (
                <circle key={j} cx={x + Math.cos(a + da) * 18} cy={y + Math.sin(a + da) * 18} r={hot && n >= j + 1 ? 3.2 : 2} fill={hot ? c : "rgba(241,244,246,.25)"} style={{ transition: "all .35s" }} />
              ))}
            </g>
          );
        })}
        <circle cx="70" cy="150" r="7" fill="#a4e63a" />
      </svg>
      <div className="panel-2 flex-1 p-4">
        <span className="inline-flex items-center gap-2 text-[0.7rem] text-muted"><span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />{t.tag}</span>
        <b className="mt-2 block text-[0.95rem] font-semibold">{t.name}</b>
        <ul className="mt-3 space-y-1.5">
          {t.rows.map(([k, v], j) => (
            <li key={k} className={`grid grid-cols-[3.6rem_1fr] items-center gap-2 rounded-lg border px-2.5 py-2 text-[0.78rem] transition-all duration-400 ${j < n ? "border-line-2 bg-surface-3" : "border-line opacity-40"}`}>
              <span className="text-[0.62rem] font-semibold tracking-[0.14em] text-muted">{k}</span>
              <span>{v}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* Dashboards: KPI-Kacheln zählen hoch, die Kurve zeichnet sich */
function DashboardsCard({ t, locale }: { t: F["dashboards"]; locale: string }) {
  const [ref, active] = useActive<HTMLDivElement>();
  const a = useCountUp(18420, active);
  const b = useCountUp(942, active);
  const nf = new Intl.NumberFormat(locale === "de" ? "de-DE" : "en-GB");
  const fmtB = locale === "de" ? `${nf.format(b / 10)} Tsd. €` : `€${nf.format(b / 10)}k`;
  return (
    <div ref={ref} className="grid grid-cols-2 gap-3">
      <div className="panel-2 flex flex-col p-4">
        <div className="flex items-center justify-between text-[0.72rem] text-muted">{t.k1.label}<span className="inline-flex items-center gap-1.5 text-accent"><span className="live-dot" />{t.live}</span></div>
        <b className="mt-2 block text-[1.6rem] font-semibold tracking-[-0.03em] tabular-nums">{nf.format(a)} €</b>
        <span className="text-[0.72rem] text-muted-2">{t.k1.note}</span>
        <div className="mt-4 flex h-[64px] items-end gap-1.5">
          {[34, 48, 40, 62, 55, 72, 66, 84, 78, 100].map((v, k) => (
            <span
              key={k}
              className="flex-1 rounded-[3px] transition-[height] duration-700"
              style={{ height: active ? `${v}%` : "6%", transitionDelay: `${k * 0.05}s`, background: k === 9 ? "var(--fg)" : "rgba(239,239,237,.22)" }}
            />
          ))}
        </div>
      </div>
      <div className="panel-2 flex flex-col p-4">
        <div className="text-[0.72rem] text-muted">{t.k2.label}</div>
        <b className="mt-2 block text-[1.6rem] font-semibold tracking-[-0.03em] tabular-nums">{fmtB}</b>
        <span className="text-[0.72rem] text-muted-2">{t.k2.note}</span>
        <svg viewBox="0 0 160 64" className="mt-4 h-[64px] w-full" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="dashFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#a4e63a" stopOpacity=".28" /><stop offset="1" stopColor="#a4e63a" stopOpacity="0" /></linearGradient>
          </defs>
          <path d="M0 54 L16 50 L32 52 L48 40 L64 43 L80 31 L96 34 L112 22 L128 25 L144 13 L160 8 L160 64 L0 64 Z" fill="url(#dashFill)" className={`transition-opacity duration-1000 ${active ? "opacity-100" : "opacity-0"}`} />
          <path d="M0 54 L16 50 L32 52 L48 40 L64 43 L80 31 L96 34 L112 22 L128 25 L144 13 L160 8" fill="none" stroke="#a4e63a" strokeWidth="2" vectorEffect="non-scaling-stroke" className={`draw ${active ? "in" : ""}`} style={{ ["--len" as string]: 200 }} />
        </svg>
      </div>
    </div>
  );
}

/* Private Verbindungen: eine Zeile verbindet sich, dann erscheint die Sichtbarkeit */
function PrivateCard({ t }: { t: F["private"] }) {
  const [ref, active] = useActive<HTMLUListElement>();
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? 5 : 1);
  const [busy, setBusy] = useState(false);
  useLoop(active && !reduced, async (sleep) => {
    for (;;) {
      setN(1);
      await sleep(600);
      for (let k = 1; k < 5; k++) {
        setBusy(true);
        await sleep(900);
        setBusy(false);
        setN(k + 1);
        await sleep(500);
      }
      await sleep(3400);
    }
  });
  return (
    <ul ref={ref} className="space-y-1.5">
      {t.rows.map(([id, sub, scope], k) => {
        const on = k < n;
        const connecting = busy && k === n;
        return (
          <li key={id} className={`flex items-center gap-3 rounded-xl border border-line bg-surface-2 px-3 py-2.5 transition-opacity duration-300 ${on || connecting ? "opacity-100" : "opacity-45"}`}>
            <ToolLogo id={id} size={16} />
            <span className="min-w-0 flex-1">
              <b className="block truncate text-[0.82rem] font-semibold">{tool(id).name}</b>
              <span className="block truncate text-[0.72rem] text-muted">{sub}</span>
            </span>
            {connecting && <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-muted"><span className="spinner" />{t.connecting}</span>}
            {on && (
              <span className={`t-in inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.7rem] font-semibold ${scope === "only" ? "bg-accent/12 text-accent" : "bg-surface-3 text-fg/75"}`}>
                {scope === "only" ? <Lock size={11} /> : <UsersIcon size={11} />}
                {scope === "only" ? t.only : t.team}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* Auch in Claude oder ChatGPT: kleiner Chat im fremden Assistenten */
function McpCard({ t }: { t: F["mcp"] }) {
  const [ref, active] = useActive<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [tab, setTab] = useState(0);
  const [st, setSt] = useState(reduced ? 3 : 0);
  const [run, setRun] = useState(0);
  useLoop(active && !reduced, async (sleep) => {
    for (let i = 0; ; i++) {
      setTab(i % 2);
      setSt(0);
      setRun((r) => r + 1);
      await sleep(500);
      setSt(1);
      await sleep(900);
      setSt(2);
      await sleep(1400);
      setSt(3);
      await sleep(5200);
    }
  });
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between">
        <div className="flex rounded-full border border-line bg-surface-2 p-0.5 text-[0.75rem]">
          {["Claude", "ChatGPT"].map((n, k) => (
            <span key={n} className={`rounded-full px-3 py-1 transition-colors ${k === tab ? "bg-surface-3 text-fg" : "text-muted"}`}>{n}</span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[0.7rem] font-semibold text-accent"><span className="live-dot" />{t.connected}</span>
      </div>
      <div className="panel-2 mt-3 space-y-3 p-4">
        {st >= 1 && <div className="t-in ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-surface-3 px-3.5 py-2 text-[0.82rem]">{t.q}</div>}
        {st >= 2 && (
          <div className="t-in flex items-center gap-2 text-[0.75rem]">
            <span className="grid h-5 w-5 place-items-center rounded-md bg-accent text-on-accent"><Sparkles size={11} /></span>
            <b className="font-semibold">solvomind</b>
            {st === 2 ? <span className="shimmer">{t.searching}</span> : <span className="text-muted-2">MCP</span>}
          </div>
        )}
        {st >= 3 && (
          <div key={run}>
            <p className="text-[0.85rem] leading-relaxed"><Answer text={t.a} animate={!reduced} step={0.035} /></p>
            <div className="mt-3 flex flex-wrap gap-2">
              {t.chips.map(([id, label]) => (
                <span key={id} className="chip t-in h-7 text-[0.72rem]"><ToolLogo id={id} size={12} />{label}</span>
              ))}
            </div>
          </div>
        )}
        <div className="flex h-9 items-center rounded-full border border-line px-3.5 text-[0.78rem] text-muted-2">{t.reply}</div>
      </div>
    </div>
  );
}

export default function Features({ t, depts, locale, jobs }: { t: F; depts: Depts; locale: string; jobs: string[] }) {
  return (
    <section id="plattform" className="sec flush">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} title={t.title} />
        <div className="head-gap grid gap-5 md:grid-cols-2">
          <Card title={t.answers.title} text={t.answers.text}><AnswersCard t={t.answers} /></Card>
          <Card title={t.agents.title} text={t.agents.text} d={0.08}><AgentsCard t={t.agents} depts={depts} jobs={jobs} /></Card>
          <Card title={t.models.title} text={t.models.text}><ModelsCard t={t.models} /></Card>
          <Card title={t.spend.title} text={t.spend.text} d={0.08}><SpendCard t={t.spend} depts={depts} /></Card>
          <Card title={t.skills.title} text={t.skills.text}><SkillsCard t={t.skills} /></Card>
          <Card title={t.dashboards.title} text={t.dashboards.text} d={0.08}><DashboardsCard t={t.dashboards} locale={locale} /></Card>
          <Card title={t.private.title} text={t.private.text}><PrivateCard t={t.private} /></Card>
          <Card title={t.mcp.title} text={t.mcp.text} d={0.08}><McpCard t={t.mcp} /></Card>
        </div>
      </div>
    </section>
  );
}
