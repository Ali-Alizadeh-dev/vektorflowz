"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Prompt-Box mit Kopieren-Knopf. Der Text wird immer vollständig angezeigt. */
export default function CopyBlock({ label, text }: { label: string; text: string }) {
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
        <button type="button" onClick={copy} className="btn btn-light !h-8 !px-3 !text-[12.5px]" aria-live="polite">
          {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
          {copied ? "Kopiert" : "Kopieren"}
        </button>
      </div>
      <pre className="whitespace-pre-wrap break-words rounded-b-[18px] border border-line bg-[#0e0f12] p-5 font-mono text-[13px] leading-[1.65] text-fg/80">
        {text}
      </pre>
    </div>
  );
}
