"use client";

import { useEffect, useState } from "react";

/**
 * Einwilligung für externe Inhalte (derzeit nur der Cal.com-Kalender).
 * "necessary": nur technisch Notwendiges, "all": externe Inhalte erlaubt.
 * Die Wahl liegt im localStorage des Besuchers, es wird kein Cookie gesetzt.
 */
export type Consent = "necessary" | "all";

const KEY = "solvomind-consent-v1";
const EVENT = "solvomind:consent";

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "all" || v === "necessary" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(c: Consent) {
  const before = readConsent();
  try {
    localStorage.setItem(KEY, c);
  } catch {}
  window.dispatchEvent(new CustomEvent(EVENT, { detail: c }));
  // Widerruf: bereits geladene externe Inhalte nur per Neuladen sicher entfernen
  if (before === "all" && c === "necessary") window.location.reload();
}

/** Öffnet den Hinweis erneut, z. B. über „Cookie-Einstellungen“ im Footer. */
export function openConsent() {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: "open" }));
}

/** undefined = noch nicht gelesen (Server/erstes Rendern), null = keine Wahl getroffen. */
export function useConsent() {
  const [c, setC] = useState<Consent | null | undefined>(undefined);
  useEffect(() => {
    setC(readConsent());
    const on = (e: Event) => {
      const d = (e as CustomEvent).detail;
      if (d === "all" || d === "necessary") setC(d);
    };
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);
  return c;
}

/** Ob der Hinweis gerade sichtbar sein soll. */
export function useConsentOpen() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(readConsent() === null);
    const on = (e: Event) => setOpen((e as CustomEvent).detail === "open");
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);
  return [open, setOpen] as const;
}
