/**
 * Alle Leitfäden für die Übersicht unter /de/guides.
 * Neuer Guide: Seite unter app/[locale]/guides/<slug>/ anlegen und hier oben eintragen.
 */
export const GUIDES_PATH = "/de/guides";

export type GuideInfo = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tag: string;
  date: string;
  readTime: string;
};

export const GUIDES: GuideInfo[] = [
  {
    slug: "ki-steuererklaerung",
    title: "KI-Steuererklärung",
    description:
      "Die Einkommensteuererklärung mit Claude: Belege aus Postfach, Cloud und Ordner sammeln lassen, Rückfragen beantworten, Werte in Mein ELSTER eintragen. Abgeschickt wird erst nach Ihrer Prüfung.",
    category: "KI-Systeme",
    tag: "Steuern",
    date: "22. November 2026",
    readTime: "8 Min.",
  },
  {
    slug: "ki-buchhaltung",
    title: "KI-Buchhaltung",
    description:
      "Claude per Chrome-Erweiterung auf Ihre Buchhaltung in Lexware oder DATEV loslassen: Einrichtung, Beispiel-Prompt und klare Grenzen, wo der Mensch freigibt.",
    category: "KI-Systeme",
    tag: "Buchhaltung",
    date: "16. November 2026",
    readTime: "7 Min.",
  },
  {
    slug: "ki-prozess-audit",
    title: "KI-Prozess-Audit",
    description:
      "Ein kostenloser Audit-Agent für Claude oder ChatGPT. Er schätzt, welche Abläufe sich bei Ihnen zuerst automatisieren lassen, und schreibt einen Steckbrief für den besten.",
    category: "KI-Systeme",
    tag: "Audit",
    date: "13. November 2026",
    readTime: "6 Min.",
  },
];

export const guideHref = (slug: string) => `${GUIDES_PATH}/${slug}`;
