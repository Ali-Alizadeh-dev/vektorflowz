"use client";

import { useRef, useState } from "react";
import { ArrowUp, FileText, Sparkles } from "lucide-react";
import type { BrainScene } from "@/lib/brainScene";
import { DEPARTMENTS, deptIndex, type DeptId } from "@/lib/departments";
import { fmt, type Dict } from "@/lib/i18n";
import { useActive, useLoop, useReducedMotion } from "@/lib/motion";
import BrainCanvas from "./BrainCanvas";
import PixelAvatar from "./PixelAvatar";
import { Answer, ToolLogo, wordCount } from "./ui";

const RING = [
  "gmail", "slack", "hubspot", "googledrive", "datev", "notion", "zendesk", "stripe",
  "linkedin", "mailchimp", "outlook", "asana", "googleanalytics", "personio", "whatsapp", "googlesheets",
];

type Phase = "idle" | "asking" | "thinking" | "answering" | "done";

/*
 * Ablauf pro Frage – Zeiten 1:1 wie im Original gemessen:
 *  0 ms     Karten zeigen sofort die neue Frage (Ladezustand), Abteilung leuchtet
 *  +160     Frage tippt sich ein, 38–60 ms pro Zeichen
 *  +200     Senden-Button wird gedrückt (120 ms) → „Denkt nach“, Tools leuchten
 *  +650     „Antwortet“: Wörter erscheinen einzeln, 36–54 ms pro Wort
 *  danach   Quellen-Chips im 90-ms-Takt, „Beantwortet“, 4,5 s Pause
 * Start der Schleife: 600 ms nach dem Laden. Klick auf einen Chip startet
 * sofort und tippt etwas schneller (Faktor 0,6).
 */
export default function Hero({ t, depts }: { t: Dict["hero"]; depts: Dict["depts"] }) {
  const sceneRef = useRef<BrainScene | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const brainRef = useRef<HTMLDivElement | null>(null);
  const [activeRef, active] = useActive<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [start, setStart] = useState({ i: 0, n: 0 });
  const [phase, setPhase] = useState<Phase>(reduced ? "done" : "idle");
  const [typed, setTyped] = useState("");
  const [pressed, setPressed] = useState(false);
  const [words, setWords] = useState(0);
  const [srcShown, setSrcShown] = useState(0);
  const [run, setRun] = useState(0);

  useLoop(
    active && !reduced,
    async (sleep) => {
      let i = start.i;
      let fast = start.n > 0;
      if (!fast) await sleep(600);
      for (;;) {
        const k = i % t.demos.length;
        const d = t.demos[k];
        const di = deptIndex(d.dept as DeptId);
        // Beide Karten wechseln sofort auf die neue Frage
        setTyped("");
        setIdx(k);
        setRun((r) => r + 1);
        setWords(0);
        setSrcShown(0);
        setPhase("asking");
        sceneRef.current?.release();
        sceneRef.current?.focus(di);
        await sleep(fast ? 80 : 160);
        for (let c = 1; c <= d.q.length; c++) {
          setTyped(d.q.slice(0, c));
          await sleep((38 + Math.random() * 22) * (fast ? 0.6 : 1));
        }
        await sleep(200);
        setPressed(true);
        await sleep(120);
        setPressed(false);
        setPhase("thinking");
        sceneRef.current?.ask(di, d.tools);
        await sleep(650);
        setPhase("answering");
        const n = wordCount(d.a);
        for (let w = 1; w <= n; w++) {
          setWords(w);
          await sleep(36 + Math.random() * 18);
        }
        for (let c = 1; c <= d.sources.length; c++) {
          await sleep(90);
          setSrcShown(c);
        }
        setPhase("done");
        fast = false;
        await sleep(4500);
        i++;
      }
    },
    [start],
  );

  const pick = (i: number) => setStart((s) => ({ i, n: s.n + 1 }));

  const demo = t.demos[idx];
  const di = deptIndex(demo.dept as DeptId);
  const dept = DEPARTMENTS[di];
  const shown = reduced || run > 0;
  const status = phase === "asking" ? t.statusAsking : phase === "thinking" ? t.statusThinking : phase === "answering" ? t.statusAnswering : t.statusDone;
  const busy = phase === "asking" || phase === "thinking" || phase === "answering";
  const searching = phase === "asking" || phase === "thinking";
  const isTyping = phase === "asking" && typed.length > 0 && typed !== demo.q;

  // Maße 1:1 nach dem Original vermessen (bei 1512 × 860 px)
  const asked = (
    <div className={`glass rounded-[18px] px-[15px] pb-[13px] pt-[14px] text-left transition-[opacity,translate] duration-[450ms,550ms] ease-[cubic-bezier(.2,.7,.2,1)] ${shown ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}>
      <span className="eyebrow !text-[11px] !leading-[24px]">{t.asked}</span>
      <p key={`q${run}`} className="t-in mt-2 text-[15px] font-semibold leading-[1.35] tracking-[-0.01em]">{demo.q}</p>
      <div className="mt-3 flex items-center gap-3 border-t border-line pt-3">
        <PixelAvatar i={di} size={48} state={busy ? "working" : "idle"} />
        <span className="min-w-0">
          <b className="flex items-center gap-2 text-[13px] font-semibold leading-[1.5]">
            <span className="h-2 w-2 rounded-full" style={{ background: dept.color }} />
            {depts[demo.dept as DeptId].agent}
          </b>
          <span key={phase} className={`block text-[12.5px] font-medium leading-[1.5] ${busy ? "shimmer" : "text-muted"}`}>{status}</span>
        </span>
      </div>
    </div>
  );

  const answer = (
    <div
      className={`glass rounded-[18px] px-4 py-[15px] text-left transition-[opacity,translate,box-shadow] duration-[450ms,550ms,400ms] ease-[cubic-bezier(.2,.7,.2,1)] ${shown ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"}`}
      style={{ boxShadow: `0 0 0 1px color-mix(in srgb, ${dept.color} 45%, transparent), 0 30px 80px -40px ${dept.color}` }}
      aria-live="polite"
    >
      <div className="flex items-center gap-2 text-[12.5px] leading-[1.5]">
        <PixelAvatar i={di} size={26} glow={false} state={busy ? "working" : "idle"} />
        <b className="font-semibold">{depts[demo.dept as DeptId].agent}</b>
        <span className="ml-auto font-medium">
          {searching ? <span className="shimmer">{fmt(t.searching, { n: demo.tools.length })}</span> : <span className="text-muted-2">{fmt(t.meta, { n: demo.sources.length })}</span>}
        </span>
      </div>
      <p key={`a${run}`} className="mt-2.5 min-h-[6.3em] text-[14.5px] leading-[1.58] text-fg/90">
        {reduced || phase === "done" ? <Answer text={demo.a} animate={false} /> : phase === "answering" ? <Answer text={demo.a} count={words} /> : <span className="tdots text-muted"><i /><i /><i /></span>}
      </p>
      <div className="mt-3.5 flex min-h-[96px] flex-col items-start gap-1.5 border-t border-line pt-3">
        {demo.sources.slice(0, reduced ? demo.sources.length : srcShown).map(([id, label], k) => (
          <span key={`${run}-${k}`} className="t-in inline-flex h-[26px] items-center gap-1.5 rounded-full border border-line bg-surface-2 pl-[7px] pr-[9px] text-[12px] font-medium" style={{ animationDelay: `${k * 0.08}s` }}>
            {id === "file" ? <FileText size={14} /> : <ToolLogo id={id} size={14} />} {label}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[radial-gradient(90%_70%_at_50%_55%,#121418_0%,#0b0c0e_70%)] pb-[clamp(16px,2.2vh,28px)] pt-[clamp(104px,18.4vh,190px)]"
    >
      <div ref={activeRef} className="absolute inset-0 -z-10">
        <BrainCanvas variant="hero" tools={RING} anchorRef={brainRef} pointerTarget={heroRef} className="h-full w-full" onReady={(s) => (sceneRef.current = s)} />
      </div>

      <div className="relative mx-auto w-[min(100%-32px,1180px)] text-center">
        <h1 className="hero-in mx-auto text-[clamp(2.25rem,3.754vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.045em]">
          {t.titleA} <span className="text-accent">{t.titleB}</span>
        </h1>
        <p className="hero-in mx-auto mt-3 max-w-[640px] text-[17px] font-[450] leading-[1.5] text-muted [text-wrap:balance] md:text-[19px]" style={{ animationDelay: ".12s" }}>
          {t.sub}
        </p>
        <div className="hero-in mt-6 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: ".22s" }}>
          <a href="#kontakt" className="btn btn-light">{t.cta}</a>
          <a href="#ablauf" className="btn btn-ghost">{t.cta2}</a>
        </div>
      </div>

      {/* Bühne: ab xl drei Spalten (Frage 270 · Baum 390 · Antwort 333) */}
      <div className="relative mx-auto grid w-full flex-1 items-center justify-center xl:grid-cols-[270px_390px_333px]">
        <div className="hidden xl:block">{asked}</div>
        <div ref={brainRef} className="h-[340px] w-[min(100vw,390px)] justify-self-center xl:h-full xl:min-h-[330px] xl:w-[390px]" aria-hidden />
        <div className="hidden xl:block">{answer}</div>
      </div>

      <div className="relative mx-auto w-[min(100%-32px,640px)]">
        <div className="mb-4 min-h-[250px] xl:hidden">{answer}</div>
        <div className="scroll-x -mx-4 mb-[9px] flex items-center gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:justify-center sm:overflow-visible sm:px-0">
          <span className="mr-1.5 hidden flex-none text-[12px] font-medium text-muted-2 sm:inline">{t.try}</span>
          {t.demos.map((d, i) => {
            const k = deptIndex(d.dept as DeptId);
            const on = i === idx && run > 0;
            return (
              <button
                key={i}
                type="button"
                onClick={() => pick(i)}
                aria-pressed={on}
                className={`inline-flex h-[30px] flex-none items-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-[12.5px] font-semibold transition-colors ${on ? "border-line-2 bg-surface-3 text-fg" : "border-line bg-surface-2 text-fg/80 hover:border-line-2"}`}
              >
                <PixelAvatar i={k} size={18} glow={false} />
                {depts[d.dept as DeptId].agent}
              </button>
            );
          })}
        </div>
        <div className="glass flex h-14 items-center gap-3 rounded-[18px] py-2 pl-4 pr-2">
          <Sparkles size={16} className="flex-none text-muted" aria-hidden />
          <span className="min-w-0 flex-1 truncate text-left text-[15px]">
            {typed ? <>{typed}{isTyping && <span className="caret" />}</> : <span className="text-muted-2">{t.placeholder}</span>}
          </span>
          <span className={`grid h-[38px] w-[38px] flex-none place-items-center rounded-[10px] transition-[background-color,color,scale] duration-150 ${typed ? "bg-fg text-on-accent" : "bg-surface-3 text-muted"} ${pressed ? "scale-90" : "scale-100"}`} aria-label={t.send}>
            <ArrowUp size={17} />
          </span>
        </div>
      </div>
    </section>
  );
}
