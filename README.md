# Vektorflowz

Minimalistische Landingpage für die KI-Agentur **Vektorflowz** — gebaut mit Next.js 15, Tailwind CSS und Framer Motion. Optimiert für das Deployment auf Vercel.

## Lokal starten

```bash
npm install
npm run dev
```

Anschließend [http://localhost:3000](http://localhost:3000) öffnen.

## Auf Vercel deployen

1. Repository auf GitHub/GitLab pushen.
2. Auf [vercel.com](https://vercel.com) → **New Project** → Repo importieren.
3. Vercel erkennt Next.js automatisch — einfach **Deploy** klicken.

Alternativ via CLI:

```bash
npx vercel
```

## Struktur

- `app/page.tsx` — Single-Page mit allen Sections
- `app/impressum/page.tsx` — Impressum (TMG/DDG-konform, Platzhalter ausfüllen)
- `app/datenschutz/page.tsx` — Datenschutzerklärung (DSGVO-konform, Platzhalter ausfüllen)
- `components/` — alle UI-Bausteine (Hero, Ablauf, Leistungen, UeberMich, Kontakt, Navbar, Footer)

## Was noch zu tun ist

- Platzhalter in `app/impressum/page.tsx` und `app/datenschutz/page.tsx` mit den eigenen Angaben füllen (`[...]`-Markierungen).
- E-Mail-Adresse `hallo@vektorflowz.de` in `components/Kontakt.tsx`, `app/impressum/page.tsx` und `app/datenschutz/page.tsx` ggf. anpassen.
- Optional: eigene Domain in Vercel verknüpfen.
# vektorflowz
