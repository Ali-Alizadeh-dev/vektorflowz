"use client";

import { useEffect, useRef } from "react";

/**
 * Flowing neural-network backdrop rendered on a single <canvas>.
 *
 * Nodes drift slowly and connect when close; light "signals" travel along the
 * connections — visualising data / work flowing efficiently through a network.
 *
 * Performance (this ran on phones that stuttered before, so it matters):
 *  - one canvas, not hundreds of DOM/SVG nodes
 *  - device-pixel-ratio capped; fewer nodes on small screens
 *  - starts after mount (never blocks first paint)
 *  - pauses when scrolled out of view or the tab is hidden
 *  - prefers-reduced-motion → a single static frame, no animation loop
 */
export default function NeuralNetwork({
  className = "",
  tone = "light",
  density = 1,
}: {
  className?: string;
  /** "light" = blue on transparent light bg; "dark" = glowing on dark card */
  tone?: "light" | "dark";
  /** node-count multiplier (dark product card can be a touch denser) */
  density?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dark = tone === "dark";
    const lineRGB = dark ? "125,165,255" : "0,61,240";
    const nodeColor = dark ? "rgba(160,190,255,0.8)" : "rgba(0,61,240,0.55)";
    const glowRGB = dark ? "150,185,255" : "56,120,255";
    const lineAlphaMul = dark ? 0.42 : 0.28;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let isMobile = false;

    type Node = { x: number; y: number; vx: number; vy: number };
    type Signal = { from: number; to: number; t: number; speed: number };

    let nodes: Node[] = [];
    let signals: Signal[] = [];
    let linkDist = 150;
    const pointer = { x: -9999, y: -9999, active: false };

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    function build() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      isMobile = w < 768;
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      linkDist = isMobile ? 108 : 150;
      const count = Math.min(
        Math.floor((w * h * density) / (isMobile ? 15000 : 12000)),
        isMobile ? 26 : 64
      );

      nodes = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.18, 0.18),
        vy: rand(-0.18, 0.18),
      }));

      // ~1 signal per 5 nodes, travelling between neighbours
      const sigCount = Math.max(3, Math.floor(count / 5));
      signals = Array.from({ length: sigCount }, () => {
        const from = Math.floor(rand(0, count));
        return { from, to: nearest(from), t: Math.random(), speed: rand(0.006, 0.014) };
      });
    }

    function nearest(i: number) {
      let best = i;
      let bestD = Infinity;
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const d = (nodes[i].x - nodes[j].x) ** 2 + (nodes[i].y - nodes[j].y) ** 2;
        if (d < bestD && Math.random() > 0.35) {
          bestD = d;
          best = j;
        }
      }
      return best;
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      // move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const a = (1 - dist / linkDist) * lineAlphaMul;
            ctx!.strokeStyle = `rgba(${lineRGB},${a})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // pointer links (desktop delight only)
      if (finePointer && pointer.active) {
        for (const n of nodes) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (d < linkDist * 1.4) {
            ctx!.strokeStyle = `rgba(${lineRGB},${(1 - d / (linkDist * 1.4)) * 0.5})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(n.x, n.y);
            ctx!.lineTo(pointer.x, pointer.y);
            ctx!.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx!.fillStyle = nodeColor;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, dark ? 2 : 1.7, 0, Math.PI * 2);
        ctx!.fill();
      }

      // travelling signals (the "flow")
      for (const s of signals) {
        s.t += s.speed;
        if (s.t >= 1) {
          s.from = s.to;
          s.to = nearest(s.from);
          s.t = 0;
        }
        const a = nodes[s.from];
        const b = nodes[s.to];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * s.t;
        const y = a.y + (b.y - a.y) * s.t;
        const r = dark ? 8 : 6;
        const g = ctx!.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${glowRGB},0.95)`);
        g.addColorStop(1, `rgba(${glowRGB},0)`);
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(x, y, r, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = "rgba(255,255,255,0.95)";
        ctx!.beginPath();
        ctx!.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    let raf = 0;
    let running = false;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    build();
    draw(); // static first frame (also the final image for reduced-motion)
    start();

    // pause when off-screen
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);

    // pause when tab hidden
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    // pointer
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => (pointer.active = false);
    if (finePointer) {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
    }

    // debounced resize
    let rt = 0;
    const onResize = () => {
      clearTimeout(rt);
      rt = window.setTimeout(() => {
        build();
        draw();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      if (finePointer) {
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerleave", onLeave);
      }
      clearTimeout(rt);
    };
  }, [tone, density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
