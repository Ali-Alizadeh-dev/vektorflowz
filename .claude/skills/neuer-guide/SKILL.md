---
name: neuer-guide
description: Legt einen neuen Guide (Leitfaden) auf solvomind.de an – Seite, Inhaltsmodul, Eintrag in der Übersicht, Preview auf localhost. Nutzen, wenn von einem neuen Guide, Leitfaden oder Ratgeber-Artikel die Rede ist ("neuer Guide", "Guide über X", "Leitfaden erstellen").
---

# Neuen Guide anlegen

Ziel: aus einem Thema in einem Satz einen fertigen, deutschsprachigen Leitfaden auf solvomind.de machen. Der Nutzer liefert nur das Thema, alles andere übernimmst du.

## Schritt 1 – Thema erfragen

Wenn das Thema noch nicht genannt wurde, frag genau einmal nach, kurz und offen:

> Worum soll der neue Guide gehen?

Ist das Thema schon genannt, überspring die Frage. Stell **keine** weiteren Rückfragen zu Struktur, Länge, Tonfall, Slug oder CTA – das entscheidest du nach den Regeln unten. Nur wenn fachlich etwas fehlt, das du nicht sinnvoll annehmen kannst (z. B. welches konkrete Tool gemeint ist), frag das in einem Satz mit nach.

## Schritt 2 – Vorlage lesen

Lies vor dem Schreiben immer den zuletzt angelegten Guide als Vorlage:

- `lib/guides/index.ts` – Liste aller Guides
- `lib/guides/<letzterGuide>.ts` – Inhaltsmodul (Texte, Prompts, Daten)
- `app/[locale]/guides/<letzter-slug>/page.tsx` – Seite
- `components/guide/CopyBlock.tsx` und `components/guide/bits.tsx` – Bausteine

Struktur, Klassen und Abstände werden übernommen, nicht neu erfunden.

## Schritt 3 – Dateien anlegen

1. **Inhaltsmodul** `lib/guides/<camelCaseName>.ts` mit `GUIDE_PATH`, `GUIDE_META` (title/description für SEO), allen Prompts als Template-Strings und den Listen (Checkliste, typische Fehler usw.). Alle Fließtexte und Daten gehören hierhin, nicht in die Seite.
2. **Seite** `app/[locale]/guides/<slug>/page.tsx` nach dem Muster der Vorlage: `notFound()` für alles außer `locale === "de"`, Navbar, Artikel in `w-[min(100%-32px,720px)]`, Footer. Die Konstanten `H2` und `P` für Überschriften und Absätze übernehmen.
3. **Eintrag** in `lib/guides/index.ts` – neuer Guide kommt **oben** in das `GUIDES`-Array. `date` ist das heutige Datum im Format „16. November 2026“, `readTime` realistisch geschätzt (ca. 200 Wörter pro Minute).

## Schritt 4 – Aufbau des Guides

In dieser Reihenfolge, so wie in den bestehenden Guides:

1. „← Alle Guides“-Link
2. Header-Box mit Raster-Hintergrund, Eyebrow links „Leitfaden“ / rechts das Thema, H1 mit einem Teil in `text-accent`
3. Teaser-Absatz, darunter „Von Ali Alizadeh · X Min. Lesezeit“
4. CTA-Box oben (dezent, `btn btn-light btn-sm`)
5. „Was drin ist“-Box mit 4–5 Pfeil-Punkten
6. Hauptteil: Warum → Voraussetzungen → Schritt-für-Schritt → Prompts in `CopyBlock` → was die KI übernimmt / was beim Menschen bleibt
7. CTA-Box in der Mitte (`btn btn-ghost btn-sm`, mit `ArrowRight`)
8. Typische Fehler (5 Stück, je fett + Erklärung)
9. Checkliste mit anklickbaren Checkboxen
10. Abschnitt „Und wenn es ganz allein laufen soll?“ – der Schritt vom manuellen Ablauf zum autonomen Agenten mit menschlicher Freigabe, der auch ohne offenen Rechner läuft. Ehrlich bleiben: mehr Leitplanken nötig, Protokoll, Freigabe, Datenhaltung, grobe Zeitangabe.
11. CTA-Box unten (groß, zentriert, `btn btn-primary`, Texte aus `t.final.cta` / `t.final.foot`)

Jeder Guide endet mit einer Einladung zum kostenlosen Erstgespräch – das ist der Zweck der Guides. Ziel sind drei CTAs: oben, Mitte, unten. Buchungs-Link ist immer `const BOOKING = "/de#kontakt"`.

## Schritt 5 – Schreibstil

- Deutsch, Sie-Form, Zielgruppe sind Inhaber und Geschäftsführung kleiner und mittlerer Unternehmen ohne IT-Abteilung.
- Kurze Sätze, konkrete Beispiele, keine Marketing-Floskeln, kein Denglisch, keine Ausrufezeichen.
- Ehrlich über Grenzen: Was nicht klappt, wird benannt. Keine überzogenen Versprechen.
- Zahlen immer als Schätzung kennzeichnen. Bei Recht, Steuern oder Datenschutz einen Hinweis setzen, dass das keine Beratung ersetzt.
- Prompts in Template-Strings mit Platzhaltern in `[ECKIGEN KLAMMERN]`. Im Fließtext ausdrücklich dazuschreiben, dass der Prompt an das eigene Vorhaben angepasst werden muss.
- Wenn der Guide auf ein Produkt oder eine Funktion verweist (Preise, Verfügbarkeit, Pläne), vorher mit einer Websuche prüfen, statt aus dem Gedächtnis zu schreiben.

## Schritt 6 – Prüfen und zeigen

1. `npx tsc --noEmit`
2. Dev-Server starten (`npm run dev`), falls nicht schon laufend
3. Mit Playwright `/de/guides/<slug>` und `/de/guides` öffnen, Screenshot machen, selbst anschauen
4. Aufräumen: erzeugte Screenshots und `.playwright-mcp/` löschen
5. Dem Nutzer die Preview-URL nennen und auf sein Okay warten

**Nicht ungefragt committen oder pushen.** Erst wenn der Nutzer die Preview freigegeben hat: committen mit deutscher Commit-Message im Stil der bestehenden Historie (z. B. „Guides-Bereich mit Leitfaden ‚KI-Prozess-Audit‘“) und pushen – das Deployment läuft automatisch.
