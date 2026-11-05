"use client";

import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n";
import { LogoLockup } from "@/components/Logo";

export default function Navbar({ t, locale }: { t: Dict["nav"]; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const other: Locale = locale === "de" ? "en" : "de";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("keydown", key);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "border-line bg-[rgba(11,12,14,0.78)] backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 btn btn-light btn-sm">
        {t.skip}
      </a>
      <nav className="relative mx-auto flex h-16 w-[min(100%-32px,1176px)] items-center justify-between gap-4">
        <a href={`/${locale}`} aria-label="solvomind" className="inline-flex items-center">
          <LogoLockup small />
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center whitespace-nowrap text-[14px] font-medium text-fg/70 lg:flex">
          {t.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="inline-flex h-9 items-center rounded-full px-3.5 transition-colors hover:bg-white/[0.05] hover:text-fg">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <a
            href={`/${other}`}
            hrefLang={other}
            aria-label={`${t.language}: ${other.toUpperCase()}`}
            className="hidden h-9 items-center gap-1.5 rounded-full px-3 text-[13px] font-semibold text-muted transition-colors hover:bg-white/5 hover:text-fg sm:inline-flex"
          >
            <Globe size={14} strokeWidth={2} aria-hidden />
            {other.toUpperCase()}
          </a>
          <a href="#kontakt" className="btn btn-light btn-sm hidden sm:inline-flex">
            {t.cta}
          </a>
          <button
            type="button"
            aria-label={open ? t.close : t.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-fg transition-colors hover:bg-white/5 lg:hidden"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {/* Mobiles Menü: Karte unter der Pill-Navbar */}
      <div
        // Geschlossen: komplett ausblenden. Ein unsichtbares Element mit
        // backdrop-blur würde in Chromium sonst die Seite darunter weichzeichnen.
        className={`mx-auto mb-3 w-[min(100%-24px,1176px)] origin-top overflow-hidden rounded-[22px] border border-line-2 bg-[rgba(14,15,18,0.96)] lg:hidden ${
          open ? "block backdrop-blur-xl animate-[tIn_.2s_var(--ease)_both]" : "hidden"
        }`}
      >
        <ul className="p-3">
          {t.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-[1.05rem] font-medium hover:bg-white/5">
                {l.label}
              </a>
            </li>
          ))}
          <li className="mx-4 my-2 h-px bg-line" />
          <li>
            <a href={`/${other}`} hrefLang={other} className="flex items-center justify-between rounded-xl px-4 py-3 text-[1.05rem] font-medium hover:bg-white/5">
              <span className="inline-flex items-center gap-3"><Globe size={17} aria-hidden /> {t.language}</span>
              <span className="text-muted">{locale.toUpperCase()} → {other.toUpperCase()}</span>
            </a>
          </li>
        </ul>
        <div className="border-t border-line p-4">
          <a href="#kontakt" onClick={() => setOpen(false)} className="btn btn-primary w-full">
            {t.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
