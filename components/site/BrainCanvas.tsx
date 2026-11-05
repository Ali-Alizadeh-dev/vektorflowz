"use client";

import { useEffect, useRef } from "react";
import { BrainScene } from "@/lib/brainScene";
import { DEPARTMENTS } from "@/lib/departments";
import { prefersReducedMotion } from "@/lib/motion";
import { DeptIcon, ToolLogo } from "./ui";

type Props = {
  variant: "hero" | "wheel";
  /** Tool-IDs für den Ring (nur Hero) */
  tools?: string[];
  className?: string;
  /** Hero: Element, an dessen Mitte sich die Szene ausrichtet. */
  anchorRef?: React.RefObject<HTMLElement | null>;
  /** Maus-Parallaxe auf diesem Element abgreifen statt auf dem Canvas. */
  pointerTarget?: React.RefObject<HTMLElement | null>;
  onReady?: (scene: BrainScene) => void;
};

/**
 * React-Hülle für die BrainScene: Canvas + DOM-Ebene für Badges und Logos.
 * Startet erst, wenn sichtbar, und pausiert im Hintergrund.
 */
export default function BrainCanvas({ variant, tools = [], className = "", anchorRef, pointerTarget, onReady }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const ovRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const host = hostRef.current!, cv = cvRef.current!, ov = ovRef.current!;
    const small = window.innerWidth < 640;
    const scene = new BrainScene(cv, ov, {
      variant,
      colors: DEPARTMENTS.map((d) => d.rgb),
      teams: DEPARTMENTS.map((d) => [...d.teams]),
      count: small ? 520 : 950,
      reduced: prefersReducedMotion(),
      anchor: anchorRef?.current,
    });
    onReadyRef.current?.(scene);

    let visible = false;
    const sync = () => (visible && !document.hidden ? scene.start() : scene.stop());
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { rootMargin: "60px" });
    io.observe(host);
    document.addEventListener("visibilitychange", sync);
    const ro = new ResizeObserver(() => scene.resize());
    ro.observe(host);
    if (anchorRef?.current) ro.observe(anchorRef.current);

    const target = pointerTarget?.current ?? host;
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = host.getBoundingClientRect();
      scene.pointer(e.clientX - r.left, e.clientY - r.top, true);
    };
    const leave = () => scene.pointer(0, 0, false);
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerleave", leave);
    return () => {
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerleave", leave);
      scene.destroy();
    };
  }, [variant, anchorRef, pointerTarget]);

  const badge = variant === "hero" ? 30 : 36;
  return (
    <div ref={hostRef} className={`relative ${className}`} aria-hidden>
      <canvas ref={cvRef} className="absolute inset-0 h-full w-full" />
      <div ref={ovRef} className="pointer-events-none absolute inset-0">
        {/* Außen: Position (setzt das Script). Innen: Optik + Skalierung. */}
        {DEPARTMENTS.map((d, i) => (
          <span key={d.id} data-dept={i} className="scene-el absolute left-0 top-0" style={{ ["--c" as string]: d.color, opacity: 0 }}>
            <span className="sbadge grid place-items-center rounded-full" style={{ width: badge, height: badge }}>
              <DeptIcon i={i} size={Math.round(badge * 0.46)} />
            </span>
          </span>
        ))}
        {tools.map((id) => (
          <span key={id} data-tool={id} className="scene-el absolute left-0 top-0" style={{ opacity: 0 }}>
            <span className="stool grid h-9 w-9 place-items-center rounded-[11px]">
              <ToolLogo id={id} size={17} />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
