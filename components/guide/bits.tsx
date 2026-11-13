import type { Privacy, Verdict } from "@/lib/guides/prozessAudit";

const VERDICT: Record<Verdict, { label: string; cls: string }> = {
  go: { label: "SOFORT", cls: "bg-[rgba(164,230,58,0.12)] text-accent" },
  plan: { label: "EINPLANEN", cls: "bg-[#F5A524]/[0.12] text-[#F5A524]" },
  park: { label: "PARKEN", cls: "bg-[#FB7185]/[0.12] text-[#FB7185]" },
};

const PRIVACY: Record<Privacy, { label: string; color: string }> = {
  green: { label: "Grün", color: "#A4E63A" },
  yellow: { label: "Gelb", color: "#F5A524" },
  red: { label: "Rot", color: "#FB7185" },
};

/** Empfehlungs-Badge (SOFORT / EINPLANEN / PARKEN). */
export function Pill({ v }: { v: Verdict }) {
  const p = VERDICT[v];
  return <span className={`inline-block whitespace-nowrap rounded-full px-2 py-[3px] text-[10.5px] font-bold tracking-[0.07em] ${p.cls}`}>{p.label}</span>;
}

/** Punkt der Datenschutz-Ampel mit Beschriftung. */
export function PrivacyDot({ p }: { p: Privacy }) {
  const d = PRIVACY[p];
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span className="h-2 w-2 flex-none rounded-full" style={{ background: d.color }} aria-hidden />
      {d.label}
    </span>
  );
}
