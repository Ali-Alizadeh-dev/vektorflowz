import Image from "next/image";
import { Check, ShieldCheck, UserRound, Server, ArrowRight, Plus } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { SectionHead } from "./ui";

export function Founder({ t }: { t: Dict["founder"] }) {
  const h3 = "rv mt-[18px] text-[clamp(2rem,1.2rem+2.2vw,3rem)] font-bold leading-[1.05] tracking-[-0.04em]";
  return (
    <section id="ueber-uns" className="sec-paper">
      {/* Gründer */}
      <div className="wrap py-[136px] max-md:py-20">
        <span className="eyebrow rv">{t.eyebrow}</span>
        <h2 className={h3} style={{ ["--d" as string]: ".05s" }}>{t.title}</h2>
        <div className="mt-12 grid items-start gap-8 sm:grid-cols-[minmax(0,260px)_1fr] md:gap-14">
          <article className="rv panel w-full max-w-[260px] p-3" style={{ ["--d" as string]: ".08s" }}>
            <div className="relative aspect-square overflow-hidden rounded-[12px] bg-surface-2">
              <Image src="/ali-alizadeh.jpg" alt={t.name} fill sizes="260px" className="object-cover" />
            </div>
            <div className="px-1 pb-1 pt-4">
              <b className="block text-[1.1rem] font-semibold tracking-[-0.01em]">{t.name}</b>
              <span className="eyebrow mt-1.5 block !text-[11px] !text-accent">{t.role}</span>
            </div>
          </article>
          <div className="max-w-[620px] space-y-5 pt-1 text-[18px] leading-[1.65] text-fg/80">
            {t.bio.map((p, k) => (
              <p key={k} className="rv" style={{ ["--d" as string]: `${0.1 + k * 0.06}s` }}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Prinzipien */}
      <div className="border-t border-line bg-[#0c0d10]">
        <div className="wrap py-[120px] max-md:py-20">
          <span className="eyebrow rv">{t.principles.eyebrow}</span>
          <h3 className={h3} style={{ ["--d" as string]: ".05s" }}>{t.principles.title}</h3>
          <div className="mt-12 grid gap-10 border-t border-fg/70 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {t.principles.items.map(([h, p], k) => (
              <div key={h} className="rv" style={{ ["--d" as string]: `${k * 0.06}s` }}>
                <b className="block text-[1.2rem] font-semibold leading-snug tracking-[-0.015em]">{h}</b>
                <p className="mt-3 text-[0.98rem] leading-[1.6] text-muted">{p}</p>
              </div>
            ))}
          </div>
          <a href="#kontakt" className="btn btn-ghost rv mt-12 inline-flex">
            {t.principles.cta} <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function DataSafety({ t }: { t: Dict["data"] }) {
  const icons = [ShieldCheck, UserRound, Server, Check];
  return (
    <section className="sec sec-paper">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} title={t.title} />
        <div className="head-gap grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map(([h, p], k) => {
            const I = icons[k];
            return (
              <div key={h} className="panel rv px-6 py-[26px]" style={{ ["--d" as string]: `${k * 0.05}s` }}>
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line-2 text-accent"><I size={18} /></span>
                <b className="mt-5 block text-[17px] font-bold tracking-[-0.015em]">{h}</b>
                <p className="mt-1.5 text-[14.5px] leading-[1.5] text-muted">{p}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FAQ({ t }: { t: Dict["faq"] }) {
  return (
    <section id="faq" className="sec faq-end">
      <div className="wrap max-w-[820px]">
        <SectionHead eyebrow={t.eyebrow} title={t.title} />
        <div className="rv head-gap divide-y divide-line border-y border-line">
          {t.items.map(([q, a]) => (
            <details key={q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.05rem] font-medium [&::-webkit-details-marker]:hidden">
                {q}
                <span className="grid h-8 w-8 flex-none place-items-center rounded-full border border-line-2 transition-transform duration-300 group-open:rotate-45">
                  <Plus size={15} />
                </span>
              </summary>
              <p className="pb-6 pr-12 text-[0.97rem] leading-relaxed text-muted">{a}</p>
            </details>
          ))}
        </div>
        <p className="rv mt-8 text-center text-[0.92rem] text-muted">
          {t.more}{" "}
          <a href={`mailto:${SITE.email}`} className="font-semibold text-fg underline decoration-line-2 underline-offset-4 hover:decoration-accent">
            {t.moreCta}
          </a>
        </p>
      </div>
    </section>
  );
}
