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
