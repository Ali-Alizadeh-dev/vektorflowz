"use client";

import { useState } from "react";
import { Check, ChevronRight, ArrowUp, ArrowRight } from "lucide-react";
import { DEPARTMENTS, type DeptId } from "@/lib/departments";
import { fmt, type Dict } from "@/lib/i18n";
import { useActive, useLoop, useReducedMotion } from "@/lib/motion";
import { AgentOrb, Answer, DeptIcon, SectionHead, ToolLogo, ToolTile } from "./ui";

const IDS = DEPARTMENTS.map((d) => d.id) as DeptId[];

export default function Team({ t, depts }: { t: Dict["team"]; depts: Dict["depts"] }) {
  const [ref, active] = useActive<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [d, setD] = useState(4); // Start: Finanzen
  const [j, setJ] = useState(0);
  const [ph, setPh] = useState(reduced ? 9 : 0);
  const [start, setStart] = useState({ d: 4, j: 0, n: 0 });

  useLoop(
    active && !reduced,
    async (sleep) => {
      let dd = start.d, jj = start.j;
      for (;;) {
        setD(dd);
        setJ(jj);
        setPh(0);
        await sleep(450);
        for (const [p, ms] of [[1, 800], [2, 600], [3, 1100], [4, 1100], [5, 400], [6, 2000], [7, 3600]] as const) {
          setPh(p);
          await sleep(ms);
        }
        jj++;
        if (jj > 2) {
          jj = 0;
          dd = (dd + 1) % IDS.length;
        }
      }
    },
    [start],
  );

  const choose = (nd: number, nj: number) => {
    setD(nd);
    setJ(nj);
    setPh(0);
    setStart((s) => ({ d: nd, j: nj, n: s.n + 1 }));
  };

  const id = IDS[d];
  const dep = DEPARTMENTS[d];
  const info = depts[id];
  const data = t.depts[id];
  const job = data.jobs[j];
  const working = ph > 0 && ph < 7;

  return (
    <section id="agenten" className="sec flush">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} title={t.title} sub={t.sub} />

        <div ref={ref} className="rv mt-12">
          {/* Abteilungs-Tabs */}
          <div className="scroll-x -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:justify-center md:px-0" role="tablist">
            {IDS.map((x, k) => {
              const on = k === d;
              const c = DEPARTMENTS[k].color;
              return (
                <button
                  key={x}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => choose(k, 0)}
                  className="chip h-10 flex-none px-4 text-[0.86rem] transition-all hover:border-line-2"
                  style={on ? { borderColor: c, background: `color-mix(in srgb, ${c} 13%, var(--surface-2))`, boxShadow: `0 0 24px -8px ${c}` } : undefined}
                >
                  <span style={{ color: c }}><DeptIcon i={k} size={15} /></span>
                  {depts[x].name}
                </button>
              );
            })}
          </div>

          {/* App-Fenster */}
          <div className="panel mt-5 overflow-hidden">
            <header className="flex items-center gap-3 border-b border-line px-5 py-4">
              <AgentOrb i={d} size={38} state={working ? "working" : "idle"} />
              <span className="min-w-0 flex-1">
                <b className="block text-[1rem] font-semibold">{info.agent}</b>
                <span className="block truncate text-[0.78rem] text-muted">{info.line}</span>
              </span>
              <span className="inline-flex flex-none items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-1 text-[0.75rem]">
                <span className="live-dot" style={{ ["--c" as string]: working ? dep.color : "var(--accent)" }} />
                {working ? t.working : t.done}
              </span>
            </header>

            <div className="grid md:grid-cols-[1fr_290px]">
              {/* Chat */}
              <div className="flex min-h-[470px] flex-col p-5">
                <div className="flex-1 space-y-4">
                  {ph >= 1 && (
                    <div className="t-in flex items-end justify-end gap-2">
                      <div className="max-w-[80%] rounded-2xl rounded-br-md border px-4 py-2.5 text-[0.9rem]" style={{ borderColor: `color-mix(in srgb, ${dep.color} 35%, transparent)`, background: `color-mix(in srgb, ${dep.color} 9%, var(--surface-2))` }}>
                        {job.prompt}
                      </div>
                      <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-surface-3 text-[0.62rem] font-semibold text-muted">{t.user}</span>
                    </div>
                  )}
                  {ph >= 2 && (
                    <div className="t-in space-y-3">
                      <div className="flex items-center gap-2 text-[0.82rem]">
                        <AgentOrb i={d} size={22} state={working ? "working" : "idle"} />
                        <b className="font-semibold">{info.agent}</b>
                      </div>
                      <span className="chip h-7 text-[0.75rem]">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: dep.color }} />
                        {info.name} <ChevronRight size={12} className="text-muted-2" /> <b className="font-semibold">{job.title}</b>
                      </span>
                      {ph >= 3 && (
                        <div>
                          <span className="eyebrow !text-[0.6rem]">{t.used}</span>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {job.steps.map(([tid, label, n], k) =>
                              ph >= 3 + k ? (
                                <span key={k} className="chip t-in h-8 text-[0.76rem]">
                                  <ToolLogo id={tid} size={13} /> {label} <span className="text-muted-2">{n}</span>
                                  {ph > 3 + k ? <Check size={12} className="text-accent" /> : <span className="spinner" style={{ ["--c" as string]: dep.color }} />}
                                </span>
                              ) : null,
                            )}
                          </div>
                        </div>
                      )}
                      {ph >= 6 && (
                        <p key={`${d}-${j}-${start.n}`} className="panel-2 p-4 text-[0.9rem] leading-relaxed">
                          <Answer text={job.a} animate={!reduced} step={0.035} />
                        </p>
                      )}
                      {ph >= 7 && (
                        <div className="t-in rounded-xl border p-4" style={{ borderColor: `color-mix(in srgb, ${dep.color} 45%, transparent)`, background: `color-mix(in srgb, ${dep.color} 7%, transparent)` }}>
                          <b className="flex items-center gap-2 text-[0.9rem] font-semibold"><Check size={15} style={{ color: dep.color }} /> {job.result}</b>
                          <ul className="mt-1.5 space-y-0.5 text-[0.8rem] text-muted">
                            {job.lines.map((l) => <li key={l}>{l}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="mt-4 flex h-11 items-center rounded-full border border-line bg-surface-2 pl-4 pr-1.5 text-[0.85rem] text-muted-2">
                  <span className="flex-1 truncate">{fmt(t.message, { agent: info.agent })}</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-surface-3"><ArrowUp size={14} /></span>
                </div>
              </div>

              {/* Seitenleiste */}
              <aside className="space-y-6 border-t border-line p-5 md:border-l md:border-t-0">
                <div>
                  <span className="eyebrow !text-[0.6rem]">{t.startWith}</span>
                  <ul className="mt-3 space-y-2">
                    {data.jobs.map((jb, k) => {
                      const on = k === j;
                      return (
                        <li key={k}>
                          <button
                            type="button"
                            onClick={() => choose(d, k)}
                            className="flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-[0.82rem] transition-all hover:border-line-2"
                            style={on ? { borderColor: dep.color, background: `color-mix(in srgb, ${dep.color} 9%, var(--surface-2))` } : { borderColor: "var(--line)", background: "var(--surface-2)" }}
                          >
                            {on && working ? <span className="spinner" style={{ ["--c" as string]: dep.color }} /> : <span style={{ color: dep.color }}><DeptIcon i={d} size={13} /></span>}
                            <span className="flex-1">{jb.title}</span>
                            <ArrowRight size={13} className="text-muted-2" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <span className="eyebrow !text-[0.6rem]">{t.teamsOnTree}</span>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {data.teams.map(([name, n]) => (
                      <span key={String(name)} className="chip h-7 text-[0.74rem]">
                        {name} <span className="text-muted-2">{n}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="eyebrow !text-[0.6rem]">{t.worksWith}</span>
                  <div className="mt-3 flex gap-2">
                    {data.tools.map((x) => <ToolTile key={x} id={x} size={36} logo={17} />)}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
