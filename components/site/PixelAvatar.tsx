import { DEPARTMENTS } from "@/lib/departments";

/**
 * Eigene Pixel-Figuren für die acht Agenten (11 × 9 Raster).
 *  #  Körper (Abteilungsfarbe)   h  Glanz (heller)   e  Auge (dunkel)
 * `legs` ist die zweite Bein-Stellung für die Laufbewegung.
 * Zustände: idle = leichtes Wippen, working = laufen + hüpfen.
 */
const SPRITES: { rows: string[]; legs: string }[] = [
  // Vertrieb – Antennen-Bot
  { rows: ["..h.....h..", "...#...#...", "..#######..", ".##hh#####.", ".##ee#ee##.", "###########", "#.#######.#", "..#.....#..", ".##.....##."], legs: "..##...##.." },
  // Marketing – Eule mit Federohren
  { rows: [".#.......#.", ".##.....##.", ".#hh######.", "##ee###ee##", "###########", ".###hhh###.", "..#######..", "...#...#...", "..##...##.."], legs: "...##.##..." },
  // Kundenservice – Geist mit Headset
  { rows: ["...#####...", "..#hhhh##..", ".#########.", "h##ee#ee##h", "h#########h", ".#########.", ".#########.", ".##.###.##.", ".#...#...#."], legs: "..#.#.#.#.." },
  // Betrieb – Kisten-Bot mit Armen
  { rows: ["....#h#....", "..#######..", ".##hh####..", ".##e###e##.", ".#########.", "###.....###", "#.#######.#", "..#.....#..", "..##...##.."], legs: ".##.....##." },
  // Finanzen – Münz-Käfer
  { rows: ["...#...#...", "....#.#....", "..#######..", ".#hh#####h.", "##e#####e##", "###########", "#.#.###.#.#", "..#######..", ".#.#...#.#."], legs: "#.#.....#.#" },
  // Verwaltung – Dokumenten-Wesen mit Ecke
  { rows: ["..######...", "..#hhh###..", "..######h#.", "..#e###e#..", "..#######..", "..#.....#..", "..#######..", "..#######..", "..#.#.#.#.."], legs: "...#.#.#..." },
  // Personal – Pilzkopf
  { rows: ["...#####...", ".###hh####.", "###########", "###########", "..#ee#ee#..", "..#######..", "...#####...", "..#.....#..", ".##.....##."], legs: "..##...##.." },
  // Analyse – Tentakel-Qualle
  { rows: ["...#####...", "..##hh###..", ".#########.", ".##ee#ee##.", ".#########.", "..#######..", ".#.#.#.#.#.", "#.#.#.#.#.#", ".#...#...#."], legs: "#...#.#...#" },
];

function cells(rows: string[], ch: string) {
  const out: [number, number][] = [];
  rows.forEach((r, y) => [...r].forEach((c, x) => c === ch && out.push([x, y])));
  return out;
}

export default function PixelAvatar({ i, size = 32, state = "idle", glow = true }: { i: number; size?: number; state?: "idle" | "working" | "done"; glow?: boolean }) {
  const s = SPRITES[i % SPRITES.length];
  const c = DEPARTMENTS[i].color;
  const top = s.rows.slice(0, 8);
  const body = [...cells(top, "#"), ...cells(top, "e")];
  const hi = cells(top, "h");
  const eyes = cells(top, "e");
  const legA = cells([s.rows[8]], "#");
  const legB = cells([s.legs], "#");
  const working = state === "working";
  return (
    <svg
      viewBox="-1 -1 13 11"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      className={`px-av flex-none ${working ? "px-working" : "px-idle"}`}
      style={{ filter: glow ? `drop-shadow(0 0 ${size / 8}px color-mix(in srgb, ${c} 70%, transparent))` : undefined }}
      aria-hidden
    >
      <g className="px-body">
        {body.map(([x, y]) => <rect key={`b${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={c} />)}
        {hi.map(([x, y]) => <rect key={`h${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={`color-mix(in srgb, ${c} 45%, #fff)`} />)}
        <g className="px-eyes">
          {eyes.map(([x, y]) => <rect key={`e${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill="#0b0d10" />)}
        </g>
      </g>
      <g className="px-leg-a">{legA.map(([x]) => <rect key={`a${x}`} x={x} y={8} width="1.02" height="1.02" fill={c} />)}</g>
      <g className="px-leg-b">{legB.map(([x]) => <rect key={`l${x}`} x={x} y={8} width="1.02" height="1.02" fill={c} />)}</g>
    </svg>
  );
}
