"use client";

import { useEffect, useRef, useState } from "react";

/** Nutzer möchte weniger Bewegung? (Betriebssystem-Einstellung) */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * true, solange das Element (teilweise) sichtbar ist UND der Tab aktiv ist.
 * Demos und Canvas-Szenen laufen nur dann – das spart Akku und CPU.
 */
export function useActive<T extends Element>(rootMargin = "0px") {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin, threshold: 0.15 });
    io.observe(el);
    const onVis = () => setPageVisible(!document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [rootMargin]);
  return [ref, visible && pageVisible] as const;
}

export class Cancelled extends Error {}

/**
 * Führt eine asynchrone Demo-Schleife aus, solange `active` true ist.
 * `sleep(ms)` wirft Cancelled, sobald die Demo gestoppt wird – so bricht
 * jede laufende Sequenz sauber ab, ohne Timer-Leichen.
 */
export function useLoop(active: boolean, run: (sleep: (ms: number) => Promise<void>) => Promise<void>, deps: unknown[] = []) {
  const runRef = useRef(run);
  runRef.current = run;
  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const sleep = (ms: number) =>
      new Promise<void>((res, rej) => {
        if (cancelled) return rej(new Cancelled());
        const t = setTimeout(() => {
          timers.delete(t);
          cancelled ? rej(new Cancelled()) : res();
        }, ms);
        timers.add(t);
      });
    runRef.current(sleep).catch((e) => {
      if (!(e instanceof Cancelled)) console.error(e);
    });
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, ...deps]);
}

/** Zahl, die von 0 auf `to` hochzählt, sobald `run` true wird. */
export function useCountUp(to: number, run: boolean, ms = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (prefersReducedMotion()) return setV(to);
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run, ms]);
  return v;
}
