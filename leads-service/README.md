# Lead-Dienst für die Guides

Speichert die Anmeldungen aus den Guides auf solvomind.de, verschickt die
Bestätigungsmail (Double-Opt-in) über das eigene Postfach und schickt dir bei
jedem bestätigten Lead eine Mail. Darauf antworten geht direkt an den Lead.

```
Besucher → solvomind.de (Vercel) → /api/leads/… → leads.82-165-24-131.sslip.io (VPS) → SQLite
                                                              ↓
                                         Bestätigungsmail + Benachrichtigung über IONOS/Strato-SMTP
```

Kosten: 0 €. Abhängigkeiten: Node 24 und `nodemailer`.

## Einrichten auf dem VPS (einmalig, ca. 20 Minuten)

1. **Adresse:** Kein DNS-Eintrag nötig. `leads.82-165-24-131.sslip.io` zeigt automatisch auf den VPS, Caddy holt das HTTPS-Zertifikat. Leads sehen diese Adresse nie: Links in Mails laufen über `solvomind.de/api/leads/…` (`LINK_BASE`).
2. **Docker** auf dem VPS installieren, falls noch nicht da: `curl -fsSL https://get.docker.com | sh`
3. **Ordner hochladen** (vom Rechner aus):
   ```bash
   rsync -av --exclude node_modules --exclude data --exclude .env leads-service/ root@DEINE-VPS-IP:/opt/leads/
   ```
4. **Konfiguration** auf dem VPS:
   ```bash
   cd /opt/leads
   cp .env.example .env
   openssl rand -base64 36   # → als LEADS_API_SECRET eintragen
   nano .env                 # SMTP-Daten, Admin-Passwort usw. ausfüllen
   ```
5. **Starten:** `docker compose up -d --build`
6. **Prüfen:** `https://leads.82-165-24-131.sslip.io/health` muss `{"ok":true}` zeigen.

Läuft auf dem VPS schon nginx/Caddy/Traefik auf Port 80/443? Dann siehe Kommentar oben in `docker-compose.yml`.

## Vercel verbinden

Vercel → Projekt → Settings → Environment Variables (Production):

| Name | Wert |
|---|---|
| `LEADS_API_URL` | `https://leads.82-165-24-131.sslip.io` |
| `LEADS_API_SECRET` | derselbe Wert wie in `/opt/leads/.env` |

Danach neu deployen.

## Im Alltag

- **Dashboard:** https://leads.82-165-24-131.sslip.io (Passwort = `LEADS_ADMIN_PASSWORD`, Benutzername egal)
  - *Übersicht:* Kennzahlen, Anmeldungen pro Tag, Leads je Guide, Leadliste mit Suche und Filter
  - *Lead anklicken:* Angaben, Verlauf (Anmeldung, Mails, Bestätigung …), Vertriebsstatus und Notiz, abmelden/löschen
  - *Mail-Protokoll:* jede Mail, die der Dienst an Leads geschickt hat
  - *CSV:* Export aller Leads
- **Mailtexte ändern:** `mails/*.md`, Anleitung in `mails/LIESMICH.md`
- **Neuer Lead:** Du bekommst eine Mail „Neuer Lead: Name (Firma)“. Einfach antworten, dann schreibst du ihm persönlich.
- **Nur bestätigte Kontakte anschreiben.** Offene werden nach 30 Tagen automatisch gelöscht.
- **Will jemand keine Mails mehr:** in der Leadliste auf „abmelden“ klicken.
- **Logs:** `docker compose logs -f leads`
- **Backup:** passiert automatisch einmal täglich nach `/opt/leads/data/backups/` (14 Tage). Die Sicherungen liegen auf demselben Server, also ab und zu eine herunterladen:
  `scp root@82.165.24.131:/opt/leads/data/backups/* ~/Backups/leads/`
- **Update nach Code-Änderungen** (vom Rechner, im Projektordner):
  ```bash
  rsync -az --exclude node_modules --exclude data --exclude .env leads-service/ root@82.165.24.131:/opt/leads/
  ssh root@82.165.24.131 'cd /opt/leads && docker compose up -d --build'
  ```
  Nicht `chown -R` auf `/opt/leads` ausführen: `data/` muss dem Benutzer 1000 gehören, sonst ist die Datenbank schreibgeschützt.

## Lokal testen

```bash
cd leads-service && npm install
LEADS_API_SECRET=test-secret-test-secret-123456 LEADS_ADMIN_PASSWORD=admin-pass-1234 PORT=8799 npm start
```
Ohne `SMTP_HOST` werden Mails nur in der Konsole ausgegeben. Für die Website
in `.env.local` setzen: `LEADS_API_URL=http://localhost:8799` und dasselbe Secret.
