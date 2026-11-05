import { de } from "@/messages/de";
import { en } from "@/messages/en";

export const LOCALES = ["de", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "de";

export type Dict = typeof de;

const dicts: Record<Locale, Dict> = { de, en };

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

export function getDict(locale: string): Dict {
  return dicts[isLocale(locale) ? locale : DEFAULT_LOCALE];
}

/** Ersetzt {name}-Platzhalter in einem Text. */
export function fmt(s: string, vars: Record<string, string | number>) {
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
