"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { TOOLS, type ToolCategory } from "@/lib/tools";
import { SectionHead, ToolTile } from "./ui";

const CATS: ToolCategory[] = ["project", "finance", "mail", "comms", "crm", "storage", "docs", "scheduling", "marketing", "data"];

export default function Integrations({ t }: { t: Dict["integrations"] }) {
  const [cat, setCat] = useState<ToolCategory | "all">("all");
  const [page, setPage] = useState(0);
  const [per, setPer] = useState(12);

  useEffect(() => {
    const on = () => setPer(window.innerWidth < 640 ? 6 : window.innerWidth < 1024 ? 9 : 12);
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  const list = useMemo(() => (cat === "all" ? TOOLS : TOOLS.filter((x) => x.cat === cat)), [cat]);
  const pages = Math.max(1, Math.ceil(list.length / per));
  const p = Math.min(page, pages - 1);
  const shown = list.slice(p * per, p * per + per);

  const pick = (c: ToolCategory | "all") => {
    setCat(c);
    setPage(0);
  };

  return (
    <section id="integrationen" className="sec sec-paper">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} title={t.title} sub={t.sub} />

        <div className="rv mt-10 flex flex-wrap justify-center gap-2">
          {(["all", ...CATS] as const).map((c) => {
            const on = c === cat;
            return (
              <button
                key={c}
                type="button"
                onClick={() => pick(c)}
                aria-pressed={on}
                className={`chip h-9 px-4 text-[0.82rem] transition-colors ${on ? "!border-fg !bg-fg !text-on-accent font-semibold" : "hover:border-line-2"}`}
              >
                {c === "all" ? t.all : t.cats[c]}
              </button>
            );
          })}
        </div>

        <div key={`${cat}-${p}`} className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((x, k) => (
            <div key={x.id} className="panel t-in flex items-center gap-3 !rounded-2xl px-4 py-3.5" style={{ animationDelay: `${k * 0.03}s` }}>
              <ToolTile id={x.id} size={38} logo={18} />
              <span className="min-w-0">
                <b className="block truncate text-[0.92rem] font-semibold">{x.name}</b>
                <span className="block truncate text-[0.76rem] text-muted">{t.cats[x.cat]}</span>
              </span>
            </div>
          ))}
        </div>

        {pages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <button type="button" onClick={() => setPage(Math.max(0, p - 1))} disabled={p === 0} aria-label={t.prev} className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg disabled:opacity-30">
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: pages }, (_, k) => (
                <button key={k} type="button" onClick={() => setPage(k)} aria-label={t.page.replace("{n}", String(k + 1))} aria-current={k === p} className={`h-1.5 rounded-full transition-all ${k === p ? "w-6 bg-fg" : "w-1.5 bg-line-2"}`} />
              ))}
            </div>
            <button type="button" onClick={() => setPage(Math.min(pages - 1, p + 1))} disabled={p === pages - 1} aria-label={t.next} className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg disabled:opacity-30">
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        <div className="panel rv mt-8 flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center">
          <span className="grid h-10 w-10 flex-none place-items-center rounded-xl border border-line-2"><Plus size={18} /></span>
          <span className="flex-1">
            <b className="block font-semibold">{t.missingTitle}</b>
            <span className="text-[0.9rem] text-muted">{t.missingText}</span>
          </span>
          <a href="#kontakt" className="btn btn-light btn-sm">{t.missingCta}</a>
        </div>
      </div>
    </section>
  );
}
