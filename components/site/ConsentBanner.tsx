"use client";

import { ShieldCheck } from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n";
import { saveConsent, useConsentOpen } from "@/lib/consent";

export default function ConsentBanner({ t, locale }: { t: Dict["consent"]; locale: Locale }) {
  const [open, setOpen] = useConsentOpen();
  if (!open) return null;

  const choose = (c: "necessary" | "all") => {
    setOpen(false);
    saveConsent(c);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-[460px] animate-[tIn_.3s_var(--ease)_both] rounded-[18px] border border-line-2 bg-[rgba(18,19,22,0.96)] p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:inset-x-auto sm:left-5 sm:bottom-5 md:p-6"
    >
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg border border-line-2 text-accent">
          <ShieldCheck size={16} />
        </span>
        <b id="consent-title" className="text-[1rem] font-semibold">{t.title}</b>
      </div>
      <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">{t.text}</p>
      <a href={`/${locale}/datenschutz`} className="mt-2 inline-block text-[0.85rem] text-fg/80 underline decoration-line-2 underline-offset-4 hover:text-fg">
        {t.privacy}
      </a>
      <div className="mt-5 grid grid-cols-2 gap-2.5">
        <button type="button" onClick={() => choose("necessary")} className="btn btn-ghost btn-sm w-full justify-center">
          {t.necessary}
        </button>
        <button type="button" onClick={() => choose("all")} className="btn btn-ghost btn-sm w-full justify-center">
          {t.all}
        </button>
      </div>
    </div>
  );
}
