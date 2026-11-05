/**
 * BrainScene – das „Firmen-Gehirn“ als Skill-Baum auf einem 2D-Canvas.
 *
 *  Aufbau (von innen nach außen):
 *   1. Kern: Partikelwolke in Pseudo-3D (dreht sich langsam, Maus kippt sie).
 *   2. Acht Abteilungs-Badges im Ring um den Kern (DOM-Elemente).
 *   3. Pro Abteilung ein Fächer aus Teams; jedes Team ist eine Kette von
 *      Skill-Knoten: gefüllt = läuft, hohl = geplant, blass = Idee.
 *   4. Hero: ein Ring aus Tool-Logos (DOM), der langsam rotiert.
 *
 *  ask(dept, tools) färbt den Fächer einer Abteilung ein, schickt Signale
 *  nach außen und verbindet den Kern mit den genutzten Tools.
 *  Beim Start blendet alles ruhig an seinem Platz ein (kein Reinzoomen).
 *  Läuft nur, solange start() aktiv ist; bei reduzierter Bewegung wird ein
 *  fertiges Standbild gezeichnet.
 */

type RGB = readonly number[];

export type SceneOptions = {
  variant: "hero" | "wheel";
  colors: RGB[];
  /** Anzahl Skills pro Team, je Abteilung (bestimmt die Fächer). */
  teams: number[][];
  count: number;
  reduced: boolean;
  /** Element, dessen Mitte der Mittelpunkt der Szene ist (sonst Canvas-Mitte). */
  anchor?: HTMLElement | null;
};

const TAU = Math.PI * 2;
/** Abstand Tool-Ring hinter den äußersten Skill-Knoten (in Kernradien). */
const HERO_RING = 1.05;
const IVORY: RGB = [236, 239, 242];
const SIGNAL: RGB = [164, 230, 58];

function mulberry(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const easeOut = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const mix = (a: RGB, b: RGB, t: number) => [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * t));
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

function sprite(rgb: RGB, size: number) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const h = size / 2;
  const gr = g.createRadialGradient(h, h, 0, h, h, h);
  const w = (v: number) => Math.round(v + (255 - v) * 0.55);
  gr.addColorStop(0, `rgba(${w(rgb[0])},${w(rgb[1])},${w(rgb[2])},1)`);
  gr.addColorStop(0.2, rgba(rgb, 0.9));
  gr.addColorStop(0.5, rgba(rgb, 0.18));
  gr.addColorStop(1, rgba(rgb, 0));
  g.fillStyle = gr;
  g.fillRect(0, 0, size, size);
  return c;
}

/* ---------- Baum-Geometrie (in Einheiten des Kernradius) ---------- */

type Node = { x: number; y: number; from: number; kind: "hub" | "on" | "plan" | "idea"; t: number; depth: number };
type Fan = { nodes: Node[]; ang: number };

function buildFans(teams: number[][], variant: "hero" | "wheel"): { fans: Fan[]; rb: number; reach: number } {
  const hero = variant === "hero";
  const rb = hero ? 1.9 : 2.35; // Radius des Badge-Rings
  const stem = hero ? 0.42 : 0.55; // Badge → Team-Knoten
  const step = hero ? 0.25 : 0.36; // Abstand der Skill-Knoten
  const wedge = (hero ? 74 : 92) * (Math.PI / 180);
  const rnd = mulberry(23);
  let reach = 0;
  const fans = teams.map((counts, d) => {
    const ang = -Math.PI / 2 + (d / teams.length) * TAU;
    const bx = Math.cos(ang) * rb, by = Math.sin(ang) * rb;
    const nodes: Node[] = [];
    const n = counts.length;
    counts.forEach((cnt, ti) => {
      const off = n === 1 ? 0 : (ti / (n - 1) - 0.5) * wedge;
      const a = ang + off;
      const hx = bx + Math.cos(a) * stem, hy = by + Math.sin(a) * stem;
      const hub = nodes.push({ x: hx, y: hy, from: -1, kind: "hub", t: d * 0.05 + 0.1, depth: 0 }) - 1;
      let prev = hub;
      const len = hero ? Math.min(cnt, 4) : cnt + 1;
      for (let j = 0; j < len; j++) {
        const zig = (j % 2 ? 1 : -1) * (0.05 + rnd() * 0.04);
        const r = stem + step * (j + 1);
        const x = bx + Math.cos(a + zig) * r, y = by + Math.sin(a + zig) * r;
        const roll = rnd();
        const kind = roll < 0.46 ? "on" : roll < 0.76 ? "plan" : "idea";
        prev = nodes.push({ x, y, from: prev, kind, t: d * 0.05 + 0.18 + j * 0.07, depth: j + 1 }) - 1;
        reach = Math.max(reach, Math.hypot(x, y));
      }
    });
    return { nodes, ang };
  });
  return { fans, rb, reach };
}

export class BrainScene {
  private cv: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private overlay: HTMLElement;
  private o: SceneOptions;
  private dpr = 1;
  private w = 0;
  private h = 0;
  private cx = 0;
  private cy = 0;
  private R = 60; // Kernradius in px
  private raf = 0;
  private running = false;
  private t = 0;
  private last = 0;
  private started = false;
  private clock = 0; // Intro-Uhr (echte Zeit)

  // Kern-Partikel
  private n: number;
  private X: Float32Array; private Y: Float32Array; private Z: Float32Array;
  private S: Float32Array; private A: Float32Array; private P: Float32Array;
  private Wv: Float32Array; private D: Uint8Array;
  private stars: { x: number; y: number; r: number; p: number }[] = [];
  private sp: HTMLCanvasElement[] = [];

  // Baum
  private fans: Fan[];
  private rb: number;
  private reach: number;

  private cam = { yaw: 0, pitch: 0, ty: 0, tp: 0, px: 0, py: 0, tpx: 0, tpy: 0 };
  private glow = -1;
  private glowAmt = new Float32Array(16);
  private lit = new Set<string>();
  private litAmt = new Map<string, number>();

  private deptEls: HTMLElement[] = [];
  private toolEls: { el: HTMLElement; id: string; k: number; of: number }[] = [];

  constructor(canvas: HTMLCanvasElement, overlay: HTMLElement, o: SceneOptions) {
    this.cv = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.overlay = overlay;
    this.o = o;
    this.n = o.count;
    const n = this.n;
    this.X = new Float32Array(n); this.Y = new Float32Array(n); this.Z = new Float32Array(n);
    this.S = new Float32Array(n); this.A = new Float32Array(n); this.P = new Float32Array(n);
    this.Wv = new Float32Array(n); this.D = new Uint8Array(n);
    this.buildCore();
    const g = buildFans(o.teams, o.variant);
    this.fans = g.fans;
    this.rb = g.rb;
    this.reach = g.reach;
    this.sp = [...o.colors, IVORY, SIGNAL].map((c) => sprite(c, 48));
    this.deptEls = Array.from(overlay.querySelectorAll<HTMLElement>("[data-dept]"));
    const tools = Array.from(overlay.querySelectorAll<HTMLElement>("[data-tool]"));
    this.toolEls = tools.map((el, k) => ({ el, id: el.dataset.tool!, k, of: tools.length }));
    this.resize();
  }

  private buildCore() {
    const rnd = mulberry(7);
    const gauss = () => {
      let u = 0;
      while (!u) u = rnd();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * rnd());
    };
    const k = this.o.colors.length;
    const ga = Math.PI * (3 - Math.sqrt(5));
    const dirs: number[][] = [];
    for (let i = 0; i < k; i++) {
      const y = 1 - ((i + 0.5) / k) * 2, r = Math.sqrt(1 - y * y), th = i * ga + 0.4;
      dirs.push([Math.cos(th) * r, y * 0.9, Math.sin(th) * r]);
    }
    for (let i = 0; i < this.n; i++) {
      const r = rnd();
      let x: number, y: number, z: number, d: number;
      if (r < 0.66) {
        d = i % k;
        const c = dirs[d], sg = 0.15 + rnd() * 0.1;
        x = c[0] * 0.5 + gauss() * sg; y = c[1] * 0.5 + gauss() * sg; z = c[2] * 0.5 + gauss() * sg;
        const m = Math.hypot(x, y, z);
        if (m > 1) { const f = (0.85 + rnd() * 0.15) / m; x *= f; y *= f; z *= f; }
        this.S[i] = 0.5 + rnd() * 1.1; this.A[i] = 0.45 + rnd() * 0.5;
      } else if (r < 0.84) {
        d = k; // ivory
        x = gauss() * 0.32; y = gauss() * 0.32; z = gauss() * 0.32;
        this.S[i] = 0.4 + rnd() * 0.7; this.A[i] = 0.3 + rnd() * 0.4;
      } else {
        d = k + 1; // lime im Zentrum
        x = gauss() * 0.13; y = gauss() * 0.13; z = gauss() * 0.13;
        this.S[i] = 0.5 + rnd() * 0.9; this.A[i] = 0.35 + rnd() * 0.45;
      }
      this.X[i] = x; this.Y[i] = y; this.Z[i] = z; this.D[i] = d;
      this.P[i] = rnd() * TAU; this.Wv[i] = 0.35 + rnd() * 0.9;
    }
    const s = mulberry(99);
    this.stars = Array.from({ length: 120 }, () => ({ x: s(), y: s(), r: 0.35 + s() * 0.85, p: s() * TAU }));
  }

  resize() {
    const r = this.cv.getBoundingClientRect();
    this.dpr = Math.min(1.75, window.devicePixelRatio || 1);
    this.w = r.width;
    this.h = r.height;
    this.cv.width = Math.max(1, Math.round(r.width * this.dpr));
    this.cv.height = Math.max(1, Math.round(r.height * this.dpr));
    let cx = this.w / 2, cy = this.h / 2, availW = this.w, availH = this.h;
    if (this.o.anchor) {
      const a = this.o.anchor.getBoundingClientRect();
      cx = a.left + a.width / 2 - r.left;
      cy = a.top + a.height / 2 - r.top;
      availW = a.width;
      availH = a.height;
    }
    this.cx = cx;
    this.cy = cy;
    // Gesamtradius (inkl. Tool-Ring im Hero) muss in die verfügbare Fläche passen
    // Hero: Maßstab wie im Original – Badges ≈ 0,15 × Bühnenhöhe vom Kern,
    // Tool-Ring ≈ 0,35 × Bühnenhöhe (bei 366 px: 56 px bzw. 128 px).
    const outer = this.o.variant === "hero" ? this.reach + HERO_RING + 0.65 : this.reach + 0.2;
    const fit = (Math.min(availW, availH) / 2 - 6) / outer;
    this.R = this.o.variant === "hero" ? Math.max(22, Math.min(46, availH * 0.08, fit)) : Math.max(26, Math.min(84, fit));
    if (!this.running) this.frame(performance.now(), true);
  }

  start() {
    if (this.o.reduced) {
      this.started = true;
      this.clock = 99;
      this.frame(performance.now(), true);
      return;
    }
    if (this.running) return;
    this.running = true;
    this.started = true;
    this.last = performance.now();
    const loop = (now: number) => {
      if (!this.running) return;
      this.frame(now, false);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  destroy() { this.stop(); }

  pointer(x: number, y: number, inside: boolean) {
    if (inside && this.w) {
      this.cam.tp = (y / this.h - 0.5) * 0.2;
      this.cam.ty = (x / this.w - 0.5) * 0.4;
      this.cam.tpx = (x / this.w - 0.5) * 8;
      this.cam.tpy = (y / this.h - 0.5) * 6;
    } else {
      this.cam.tp = this.cam.ty = this.cam.tpx = this.cam.tpy = 0;
    }
  }

  /** Abteilung leuchtet auf (Frage wird gestellt) – noch ohne Tool-Linien. */
  focus(dept: number) {
    this.glow = dept;
    this.lit = new Set();
    const c = this.o.colors[dept] ?? SIGNAL;
    this.overlay.style.setProperty("--lit", rgba(c, 1));
    this.toolEls.forEach((t) => t.el.classList.remove("lit"));
    this.deptEls.forEach((el, i) => el.classList.toggle("lit", i === dept));
    if (!this.running) this.frame(performance.now(), true);
  }

  /** Frage abgeschickt: Abteilung + genutzte Tools leuchten, Linien zum Kern. */
  ask(dept: number, tools: string[] = []) {
    this.glow = dept;
    this.lit = new Set(tools);
    const c = this.o.colors[dept] ?? SIGNAL;
    this.overlay.style.setProperty("--lit", rgba(c, 1));
    this.toolEls.forEach((t) => t.el.classList.toggle("lit", this.lit.has(t.id)));
    this.deptEls.forEach((el, i) => el.classList.toggle("lit", i === dept));
    if (!this.running) this.frame(performance.now(), true);
  }

  release() {
    this.glow = -1;
    this.lit = new Set();
    this.toolEls.forEach((t) => t.el.classList.remove("lit"));
    this.deptEls.forEach((el) => el.classList.remove("lit"));
  }

  frame(now: number, still: boolean) {
    const raw = still ? 0 : (now - this.last) / 1000;
    const dt = Math.min(0.05, raw);
    this.last = now;
    this.t += dt;
    if (this.started && this.clock < 99) this.clock += Math.min(1, raw);
    const it = this.started ? this.clock : 0;
    const { ctx, dpr } = this;
    const k = this.o.colors.length;
    const hero = this.o.variant === "hero";

    const cam = this.cam;
    const e = still ? 1 : 1 - Math.pow(0.002, dt);
    cam.yaw += (cam.ty - cam.yaw) * e;
    cam.pitch += (cam.tp - cam.pitch) * e;
    cam.px += (cam.tpx - cam.px) * e;
    cam.py += (cam.tpy - cam.py) * e;
    for (let d = 0; d < k; d++) {
      const target = d === this.glow ? 1 : 0;
      this.glowAmt[d] += (target - this.glowAmt[d]) * (still ? 1 : Math.min(1, dt * 3.5));
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, this.w, this.h);

    // Sternenfeld
    for (const s of this.stars) {
      ctx.fillStyle = `rgba(230,236,240,${0.12 + 0.2 * (0.5 + 0.5 * Math.sin(this.t * 0.7 + s.p))})`;
      ctx.beginPath();
      ctx.arc(s.x * this.w, s.y * this.h, s.r, 0, TAU);
      ctx.fill();
    }

    const R = this.R;
    const cx = this.cx + cam.px;
    const cy = this.cy + cam.py;
    // Kein Reinzoomen: alles steht an seinem Platz und blendet nur ruhig ein.
    const fade = easeOut(it / 1.1);

    // Farbige Nebel pro Abteilung
    ctx.globalCompositeOperation = "lighter";
    this.fans.forEach((f, d) => {
      const g = this.glowAmt[d];
      const vis = fade;
      if (vis <= 0) return;
      const c = this.o.colors[d];
      const bx = cx + Math.cos(f.ang) * this.rb * R * 1.15, by = cy + Math.sin(f.ang) * this.rb * R * 1.15;
      const rad = R * (hero ? 2 : 2.6);
      const gr = ctx.createRadialGradient(bx, by, 0, bx, by, rad);
      gr.addColorStop(0, rgba(c, (hero ? 0.05 : 0.085) * vis + g * 0.12));
      gr.addColorStop(1, rgba(c, 0));
      ctx.fillStyle = gr;
      ctx.fillRect(bx - rad, by - rad, rad * 2, rad * 2);
    });
    ctx.globalCompositeOperation = "source-over";

    // Fächer: Linien
    this.fans.forEach((f, d) => {
      const c = this.o.colors[d];
      const g = this.glowAmt[d];
      for (const nd of f.nodes) {
        const p = fade;
        if (p <= 0) continue;
        const bx = Math.cos(f.ang) * this.rb, by = Math.sin(f.ang) * this.rb;
        const fx = nd.from < 0 ? bx : f.nodes[nd.from].x, fy = nd.from < 0 ? by : f.nodes[nd.from].y;
        const x0 = cx + fx * R, y0 = cy + fy * R;
        const x1 = x0 + (nd.x - fx) * R, y1 = y0 + (nd.y - fy) * R;
        const inner = nd.depth <= 1 ? 1 : 0;
        const a = ((hero ? 0.07 : 0.12) + inner * 0.12 + g * 0.6) * p;
        ctx.strokeStyle = rgba(mix(IVORY, c, Math.max(inner * 0.8, g)), a);
        ctx.lineWidth = 1 + g * 0.5;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }
    });

    // Fächer: Knoten
    const dotR = hero ? 1.65 : 2.6;
    this.fans.forEach((f, d) => {
      const c = this.o.colors[d];
      const g = this.glowAmt[d];
      for (const nd of f.nodes) {
        const p = fade;
        if (p <= 0) continue;
        const x = cx + nd.x * R, y = cy + nd.y * R;
        const near = nd.depth <= 1 ? 1 : 0;
        const col = mix(IVORY, c, Math.max(near * 0.9, g * 0.85));
        const r = nd.kind === "hub" ? dotR * 0.85 : nd.kind === "idea" ? dotR * 0.7 : dotR;
        if (g > 0.05 && nd.kind !== "idea") {
          ctx.globalCompositeOperation = "lighter";
          const s = r * 7;
          ctx.globalAlpha = 0.5 * g;
          ctx.drawImage(this.sp[d], x - s / 2, y - s / 2, s, s);
          ctx.globalAlpha = 1;
          ctx.globalCompositeOperation = "source-over";
        }
        ctx.globalAlpha = p;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, TAU);
        if (nd.kind === "plan") {
          ctx.strokeStyle = rgba(col, 0.55 + g * 0.4);
          ctx.lineWidth = 1.1;
          ctx.stroke();
        } else {
          ctx.fillStyle = rgba(col, nd.kind === "idea" ? 0.28 + g * 0.3 : 0.88);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      // Signale laufen über den aktiven Fächer nach außen
      if (g > 0.3) {
        const phase = (this.t * 0.9) % 1;
        for (const nd of f.nodes) {
          if (nd.from < 0 || (nd.depth + phase * 5) % 5 > 1) continue;
          const a = f.nodes[nd.from];
          const q = ((this.t * 1.6 + nd.depth * 0.21) % 1);
          const x = cx + (a.x + (nd.x - a.x) * q) * R, y = cy + (a.y + (nd.y - a.y) * q) * R;
          ctx.globalCompositeOperation = "lighter";
          ctx.globalAlpha = g;
          ctx.drawImage(this.sp[d], x - 5, y - 5, 10, 10);
          ctx.globalAlpha = 1;
          ctx.globalCompositeOperation = "source-over";
        }
      }
    });

    // Speichen Kern → Badge
    this.fans.forEach((f, d) => {
      const vis = fade;
      if (vis <= 0) return;
      const c = this.o.colors[d];
      const g = this.glowAmt[d];
      const x0 = cx + Math.cos(f.ang) * R * 0.75, y0 = cy + Math.sin(f.ang) * R * 0.75;
      const x1 = cx + Math.cos(f.ang) * R * this.rb, y1 = cy + Math.sin(f.ang) * R * this.rb;
      const lg = ctx.createLinearGradient(x0, y0, x1, y1);
      lg.addColorStop(0, rgba(c, 0));
      lg.addColorStop(1, rgba(c, (0.22 + g * 0.6) * vis));
      ctx.strokeStyle = lg;
      ctx.lineWidth = 1 + g;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
      const el = this.deptEls[d];
      if (el) {
        el.style.opacity = String(fade);
        el.style.transform = `translate(${cx + Math.cos(f.ang) * R * this.rb}px, ${cy + Math.sin(f.ang) * R * this.rb}px) translate(-50%, -50%)`;
      }
    });

    // Tool-Ring (Hero)
    if (hero && this.toolEls.length) {
      const rt = R * (this.reach + HERO_RING);
      const ra = fade;
      ctx.strokeStyle = `rgba(230,236,240,${0.06 * ra})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, rt, 0, TAU);
      ctx.stroke();
      for (const t of this.toolEls) {
        const a = -Math.PI / 2 + (t.k / t.of) * TAU + this.t * 0.025;
        const x = cx + Math.cos(a) * rt, y = cy + Math.sin(a) * rt;
        const target = this.lit.has(t.id) ? 1 : 0;
        const cur = this.litAmt.get(t.id) ?? 0;
        const la = cur + (target - cur) * (still ? 1 : Math.min(1, dt * 4));
        this.litAmt.set(t.id, la);
        if (la > 0.02 && this.glow >= 0) {
          const c = this.o.colors[this.glow];
          ctx.strokeStyle = rgba(c, 0.45 * la);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
        t.el.style.opacity = String(ra);
        t.el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
    }

    // Kern-Partikel
    ctx.globalCompositeOperation = "lighter";
    const yaw = this.t * 0.12 + cam.yaw;
    const pitch = 0.3 + cam.pitch;
    const cyw = Math.cos(yaw), syw = Math.sin(yaw), cp = Math.cos(pitch), spp = Math.sin(pitch);
    for (let i = 0; i < this.n; i++) {
      const p = fade;
      if (p <= 0) continue;
      const br = 1 + 0.025 * Math.sin(this.t * 1.3 + this.P[i]);
      const x = this.X[i] * br, y = this.Y[i] * br, z = this.Z[i] * br;
      const x1 = x * cyw - z * syw, z1 = x * syw + z * cyw;
      const y1 = y * cp - z1 * spp, z2 = y * spp + z1 * cp;
      const persp = 1 / (1 + z2 * 0.3);
      const d = this.D[i];
      const g = d < k ? this.glowAmt[d] : 0;
      const flick = 0.7 + 0.3 * Math.sin(this.t * this.Wv[i] * 2 + this.P[i]);
      const depth = 0.55 + 0.45 * clamp01((1 - z2) / 2);
      ctx.globalAlpha = Math.min(1, this.A[i] * flick * depth * (1 + g) * Math.min(1, p * 1.4));
      const size = (this.S[i] * R * 0.075 + 1.4) * persp * (1 + g * 0.3);
      ctx.drawImage(this.sp[d], cx + x1 * R * persp - size / 2, cy + y1 * R * persp - size / 2, size, size);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }
}
