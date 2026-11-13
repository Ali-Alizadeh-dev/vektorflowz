"use client";

import { useState } from "react";
import { Check, ChevronDown, Copy } from "lucide-react";

/** Prompt-Box mit Kopieren-Knopf, optional eingeklappt. */
export default function CopyBlock({ label, text, collapsible = false }: { label: string; text: string; collapsible?: boolean }) {
  const [open, setOpen] = useState(!collapsible);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-3 rounded-t-[18px] border border-b-0 border-line bg-surface-2 py-2.5 pl-5 pr-3">
        <span className="text-[13px] font-semibold text-muted">{label}</span>
        <div className="flex gap-1.5">
          {collapsible && (
            <button type="button" onClick={() => setOpen((v) => !v)} className="btn btn-ghost !h-8 !px-3 !text-[12.5px]">
              {open ? "Zuklappen" : "Aufklappen"}
            </button>
          )}
          <button type="button" onClick={copy} className="btn btn-light !h-8 !px-3 !text-[12.5px]" aria-live="polite">
            {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
            {copied ? "Kopiert" : "Kopieren"}
          </button>
        </div>
      </div>
      <div className="relative">
        <pre
          className={`overflow-hidden whitespace-pre-wrap break-words rounded-b-[18px] border border-line bg-[#0e0f12] p-5 font-mono text-[13px] leading-[1.65] text-fg/80 ${
            open ? "" : "max-h-[340px]"
          }`}
        >
          {text}
        </pre>
        {!open && (
          <>
            <div aria-hidden className="pointer-events-none absolute inset-x-px bottom-px h-32 rounded-b-[18px] bg-gradient-to-b from-transparent to-[#0e0f12]" />
            <button type="button" onClick={() => setOpen(true)} className="btn btn-ghost btn-sm absolute bottom-4 left-1/2 -translate-x-1/2 !bg-surface">
              Ganzen Agenten anzeigen <ChevronDown size={15} aria-hidden />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
