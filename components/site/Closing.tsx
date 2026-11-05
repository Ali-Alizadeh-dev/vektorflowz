"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, Instagram, Mail } from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { openConsent, saveConsent, useConsent } from "@/lib/consent";
import { LogoLockup } from "@/components/Logo";
import BrainCanvas from "./BrainCanvas";
import { SectionHead } from "./ui";

export function FinalCta({ t }: { t: Dict["final"] }) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(70%_60%_at_50%_40%,#111316_0%,#0b0c0e_70%)] pb-[150px] pt-0">
      <BrainCanvas variant="wheel" className="mx-auto h-[min(520px,90vw)] w-[min(620px,100%)]" />
      <div className="wrap relative -mt-6 text-center">
        <h2 className="h2 rv mx-auto !max-w-[1136px]">{t.title}</h2>
        <p className="lead rv mt-5" style={{ ["--d" as string]: ".08s" }}>{t.sub}</p>
        <div className="rv mt-8 flex flex-wrap justify-center gap-3" style={{ ["--d" as string]: ".14s" }}>
          <a href="#kontakt" className="btn btn-primary">{t.cta}</a>
          <a href={`mailto:${SITE.email}`} className="btn btn-ghost"><Mail size={16} /> {t.cta2}</a>
        </div>
        <p className="rv mt-6 text-[0.82rem] text-muted-2" style={{ ["--d" as string]: ".2s" }}>{t.foot}</p>
      </div>
    </section>
  );
}

/**
 * Cal.com-Kalender, eingebettet über das offizielle Embed-Script.
 * - Lädt erst, wenn der Kontaktbereich in die Nähe kommt (keine Verzögerung
 *   der Hero-Animation, keine Verbindung zu Cal.com ohne Hinscrollen).
 * - Dunkles Theme mit den Farben der Seite, damit der Kalender „dunkel auf
 *   dunkel" ohne sichtbaren Rahmen in der Karte sitzt.
 */
const CAL_VARS = {
  "cal-brand": "#a4e63a",
  "cal-brand-emphasis": "#b6ef5a",
  "cal-brand-text": "#0b0c0e",
  "cal-bg": "#121316",
  "cal-bg-emphasis": "#1f2125",
  "cal-bg-subtle": "#17191c",
  "cal-bg-muted": "#17191c",
  "cal-bg-inverted": "#efefed",
  "cal-border": "rgba(239,239,237,0.13)",
  "cal-border-emphasis": "rgba(239,239,237,0.22)",
  "cal-border-subtle": "rgba(239,239,237,0.075)",
  "cal-border-booker": "rgba(239,239,237,0.09)",
  "cal-text": "#efefed",
  "cal-text-emphasis": "#ffffff",
  "cal-text-subtle": "#9b9ea5",
  "cal-text-muted": "#6b6f77",
  "cal-text-inverted": "#0b0c0e",
};

type CalApi = ((...a: unknown[]) => void) & { ns: Record<string, (...a: unknown[]) => void>; q?: unknown[]; loaded?: boolean };

function loadCal(): CalApi {
  const w = window as unknown as { Cal?: CalApi };
  if (!w.Cal) {
    // Offizieller Lade-Stub von Cal.com (Befehle werden gepuffert, bis embed.js da ist)
    const push = (a: { q: unknown[] }, ar: unknown) => a.q.push(ar);
    const Cal = function (this: unknown, ...ar: unknown[]) {
      const cal = Cal as unknown as CalApi & { q: unknown[] };
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        const sc = document.createElement("script");
        sc.src = "https://app.cal.com/embed/embed.js";
        sc.async = true;
        document.head.appendChild(sc);
        cal.loaded = true;
      }
      if (ar[0] === "init") {
        const api = function (...a: unknown[]) { push(api as unknown as { q: unknown[] }, a); } as unknown as { q: unknown[] };
        api.q = [];
        const ns = ar[1];
        if (typeof ns === "string") {
          cal.ns[ns] = cal.ns[ns] || (api as unknown as (...a: unknown[]) => void);
          push(cal.ns[ns] as unknown as { q: unknown[] }, ar);
          push(cal, ["initNamespace", ns]);
        } else push(cal, ar);
        return;
      }
      push(cal, ar);
    } as unknown as CalApi;
    w.Cal = Cal;
  }
  return w.Cal;
}

export function Contact({ t, c, locale }: { t: Dict["contact"]; c: Dict["consent"]; locale: Locale }) {
  const consent = useConsent();
  const allowed = consent === "all";
  const ref = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setLoad(true), io.disconnect()), { rootMargin: "900px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!load || !allowed || !box.current) return;
    const ns = "solvomind";
    const Cal = loadCal();
    Cal("init", ns, { origin: "https://app.cal.com" });
    const api = Cal.ns[ns];
    api("inline", {
      elementOrSelector: box.current,
      calLink: SITE.cal,
      config: { layout: "month_view", theme: "dark", locale },
    });
    api("ui", {
      theme: "dark",
      layout: "month_view",
      hideEventTypeDetails: false,
      cssVarsPerTheme: { dark: CAL_VARS, light: CAL_VARS },
      styles: { branding: { brandColor: "#a4e63a" } },
    });
    api("on", { action: "linkReady", callback: () => setReady(true) });
    const fallback = setTimeout(() => setReady(true), 6000);
    return () => clearTimeout(fallback);
  }, [load, allowed, locale]);

  return (
    <section id="kontakt" className="sec sec-paper">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
        <div ref={ref} className="rv relative mt-10">
          {consent !== undefined && !allowed ? (
            <div className="panel mx-auto grid min-h-[420px] max-w-[760px] place-items-center p-8 text-center">
              <div className="max-w-[440px]">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-line-2 text-accent"><CalendarDays size={22} /></span>
                <b className="mt-5 block text-[1.15rem] font-semibold">{c.calTitle}</b>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">{c.calText}</p>
                <button type="button" onClick={() => saveConsent("all")} className="btn btn-primary mt-6">{c.calLoad}</button>
              </div>
            </div>
          ) : (
            <>
          <div
            ref={box}
            className={`cal-box min-h-[640px] w-full transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
          />
          {!ready && (
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-[0.9rem] text-muted-2">
              <span className="tdots"><i /><i /><i /></span>
            </div>
          )}
            </>
          )}
        </div>
        <p className="mt-4 text-center text-[0.8rem] text-muted-2">
          {t.alt}{" "}
          <a href={`mailto:${SITE.email}`} className="text-fg/80 underline decoration-line-2 underline-offset-4 hover:text-fg">{SITE.email}</a>
        </p>
      </div>
    </section>
  );
}

export function Footer({ t, locale }: { t: Dict["footer"]; locale: Locale }) {
  const L = t.links;
  const cols = [
    { h: t.product, items: [[L.how, "#ablauf"], [L.agents, "#agenten"], [L.integrations, "#integrationen"]] },
    { h: t.company, items: [[L.about, "#ueber-uns"], [L.faq, "#faq"], [L.contact, "#kontakt"]] },
    { h: t.legal, items: [[L.imprint, `/${locale}/impressum`], [L.privacy, `/${locale}/datenschutz`]] },
  ];
  const home = (h: string) => (h.startsWith("#") ? `/${locale}${h}` : h);
  return (
    <footer className="border-t border-line bg-[#0c0f12]">
      <div className="wrap py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href={`/${locale}`} className="inline-flex"><LogoLockup /></a>
            <p className="mt-4 max-w-xs text-[0.92rem] leading-relaxed text-muted">{t.claim}</p>
            <span className="eyebrow mt-6 !text-[0.62rem]">{t.follow}</span>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="mt-3 grid h-10 w-10 place-items-center rounded-xl border border-line text-muted transition-colors hover:border-line-2 hover:text-fg">
              <Instagram size={17} />
            </a>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <span className="eyebrow !text-[0.62rem]">{c.h}</span>
              <ul className="mt-4 space-y-2.5">
                {c.items.map(([label, href]) => (
                  <li key={href}><a href={home(href)} className="text-[0.92rem] text-fg/75 transition-colors hover:text-fg">{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-line pt-6 text-[0.8rem] text-muted-2 md:flex-row">
          <span>© {new Date().getFullYear()} solvomind · Ali Alizadeh. {t.rights}</span>
          <span className="flex items-center gap-5">
            <button type="button" onClick={openConsent} className="transition-colors hover:text-fg">{t.cookies}</button>
            <span>{t.made}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
