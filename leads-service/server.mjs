/**
 * Lead-Dienst für die Guides auf solvomind.de
 *
 * - POST /subscribe     (nur mit LEADS_API_SECRET, wird von der Website aufgerufen)
 * - POST /answer        (nur mit LEADS_API_SECRET, optionale Frage nach der Anmeldung)
 * - GET|POST /bestaetigen?t=…   Double-Opt-in aus der Bestätigungsmail
 * - GET|POST /abmelden?t=…      Abmeldung
 * - GET /leads, /leads.csv      Leadliste (Passwort: LEADS_ADMIN_PASSWORD)
 *
 * Bestätigen und Abmelden passieren erst per Knopfdruck (POST), weil
 * Virenscanner in Firmen-Postfächern Links in Mails automatisch aufrufen.
 * Sonst würden Adressen ohne echten Klick als „bestätigt“ gelten.
 *
 * Daten: eine SQLite-Datei in DATA_DIR. Keine weiteren Dienste.
 */
import http from "node:http";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import nodemailer from "nodemailer";
import { renderMail } from "./mails.mjs";

// ---------------------------------------------------------------- Konfiguration

const env = process.env;
const PORT = Number(env.PORT || 8787);
const SECRET = env.LEADS_API_SECRET || "";
const ADMIN_PASSWORD = env.LEADS_ADMIN_PASSWORD || "";
const PUBLIC_URL = (env.PUBLIC_URL || `http://localhost:${PORT}`).replace(/\/$/, "");
/**
 * Basis für Links, die Leads sehen (Bestätigen/Abmelden). Standard: über die
 * Website (https://solvomind.de/api/leads), damit in Mails nur die eigene
 * Domain auftaucht. Die Website reicht die Aufrufe an diesen Dienst weiter.
 */
const LINK_BASE = (env.LINK_BASE || PUBLIC_URL).replace(/\/$/, "");
const SITE_URL = (env.SITE_URL || "https://solvomind.de").replace(/\/$/, "");
const DATA_DIR = env.DATA_DIR || "./data";
const MAIL_FROM = env.MAIL_FROM || "Ali Alizadeh <ali.alizadeh@solvomind.de>";
const NOTIFY_TO = env.NOTIFY_TO || "ali.alizadeh@solvomind.de";
/** Termin-Link für den Button „Termin buchen“ (Cal.com-Seite aus lib/site.ts der Website). */
const BOOKING_URL = env.BOOKING_URL || "https://cal.com/ali-alizadeh-tahbua/erstgespraech";

/** Unbestätigte Anmeldungen werden nach so vielen Tagen gelöscht. */
const PENDING_DAYS = 30;
/** Frühestens nach so vielen Minuten geht eine weitere Bestätigungsmail an dieselbe Adresse. */
const RESEND_MINUTES = 10;

if (SECRET.length < 24) fail("LEADS_API_SECRET fehlt oder ist kürzer als 24 Zeichen.");
if (ADMIN_PASSWORD.length < 12) fail("LEADS_ADMIN_PASSWORD fehlt oder ist kürzer als 12 Zeichen.");

function fail(msg) {
  console.error(`[leads] ${msg}`);
  process.exit(1);
}

// ---------------------------------------------------------------- Datenbank

fs.mkdirSync(DATA_DIR, { recursive: true });
const db = new DatabaseSync(path.join(DATA_DIR, "leads.sqlite"));
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS leads (
    id              INTEGER PRIMARY KEY,
    email           TEXT NOT NULL UNIQUE,
    name            TEXT NOT NULL DEFAULT '',
    company         TEXT NOT NULL DEFAULT '',
    guides          TEXT NOT NULL DEFAULT '',
    answer          TEXT NOT NULL DEFAULT '',
    status          TEXT NOT NULL DEFAULT 'pending',  -- pending | confirmed | unsubscribed
    token           TEXT NOT NULL UNIQUE,             -- für Bestätigen/Abmelden (steht in der Mail)
    ref             TEXT NOT NULL UNIQUE,             -- für die Antwort direkt nach der Anmeldung
    consent_text    TEXT NOT NULL DEFAULT '',
    consent_ip      TEXT NOT NULL DEFAULT '',
    consent_ua      TEXT NOT NULL DEFAULT '',
    created_at      TEXT NOT NULL,
    consent_at      TEXT NOT NULL,
    confirmed_at    TEXT,
    confirm_ip      TEXT NOT NULL DEFAULT '',
    unsubscribed_at TEXT,
    last_mail_at    TEXT
  );
  CREATE TABLE IF NOT EXISTS mail_log (
    id       INTEGER PRIMARY KEY,
    lead_id  INTEGER NOT NULL,
    kind     TEXT NOT NULL,      -- bestaetigung | willkommen
    subject  TEXT NOT NULL,
    sent_at  TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS mail_log_lead ON mail_log (lead_id);
`);
// Spalte nachrüsten (ältere Datenbanken): Titel des zuletzt angeforderten Guides
if (!db.prepare("PRAGMA table_info(leads)").all().some((c) => c.name === "guide_title")) {
  db.exec("ALTER TABLE leads ADD COLUMN guide_title TEXT NOT NULL DEFAULT ''");
}

const now = () => new Date().toISOString();
const newToken = () => crypto.randomBytes(24).toString("base64url");

const q = {
  byEmail: db.prepare("SELECT * FROM leads WHERE email = ?"),
  byToken: db.prepare("SELECT * FROM leads WHERE token = ?"),
  byRef: db.prepare("SELECT * FROM leads WHERE ref = ?"),
  byId: db.prepare("SELECT * FROM leads WHERE id = ?"),
  insert: db.prepare(`
    INSERT INTO leads (email, name, company, guides, guide_title, token, ref, consent_text, consent_ip, consent_ua, created_at, consent_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`),
  all: db.prepare("SELECT * FROM leads ORDER BY created_at DESC"),
  cleanup: db.prepare("DELETE FROM leads WHERE status = 'pending' AND confirmed_at IS NULL AND consent_at < ?"),
  remove: db.prepare("DELETE FROM leads WHERE id = ?"),
  removeLog: db.prepare("DELETE FROM mail_log WHERE lead_id = ?"),
  logMail: db.prepare("INSERT INTO mail_log (lead_id, kind, subject, sent_at) VALUES (?, ?, ?, ?)"),
  logsFor: db.prepare("SELECT kind, sent_at FROM mail_log WHERE lead_id = ? ORDER BY sent_at"),
  orphanLogs: db.prepare("DELETE FROM mail_log WHERE lead_id NOT IN (SELECT id FROM leads)"),
};

function update(id, fields) {
  const keys = Object.keys(fields);
  const sql = `UPDATE leads SET ${keys.map((k) => `${k} = ?`).join(", ")} WHERE id = ?`;
  db.prepare(sql).run(...keys.map((k) => fields[k]), id);
}

const addGuide = (list, slug) => {
  const set = new Set(list.split(",").filter(Boolean));
  const isNew = !set.has(slug);
  set.add(slug);
  return { guides: [...set].join(","), isNew };
};

function cleanup() {
  const cutoff = new Date(Date.now() - PENDING_DAYS * 864e5).toISOString();
  const { changes } = q.cleanup.run(cutoff);
  q.orphanLogs.run();
  if (changes) console.log(`[leads] ${changes} unbestätigte Anmeldung(en) gelöscht`);
}
/** Tägliche Sicherung nach DATA_DIR/backups, die letzten 14 Tage bleiben liegen. */
function backup() {
  const dir = path.join(DATA_DIR, "backups");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `leads-${now().slice(0, 10)}.sqlite`);
  if (fs.existsSync(file)) return;
  db.exec(`VACUUM INTO '${file.replace(/'/g, "''")}'`);
  const old = fs.readdirSync(dir).filter((f) => f.endsWith(".sqlite")).sort().slice(0, -14);
  for (const f of old) fs.unlinkSync(path.join(dir, f));
  console.log(`[leads] Sicherung: ${file}`);
}

function hourly() {
  cleanup();
  try {
    backup();
  } catch (e) {
    console.error("[leads] Sicherung fehlgeschlagen:", e.message);
  }
}
hourly();
setInterval(hourly, 3600e3).unref();

// ---------------------------------------------------------------- Mail

const transport = env.SMTP_HOST && env.SMTP_PASS
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT || 587),
      secure: Number(env.SMTP_PORT || 587) === 465,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    })
  : null;

if (!transport) console.warn("[leads] SMTP_HOST oder SMTP_PASS fehlt: Mails werden nur in der Konsole ausgegeben (Testmodus).");

async function sendMail({ to, subject, text, html, replyTo }) {
  if (!transport) {
    console.log(`\n----- MAIL (Testmodus) -----\nAn: ${to}\nBetreff: ${subject}\n${replyTo ? `Reply-To: ${replyTo}\n` : ""}\n${text}\n----------------------------\n`);
    return;
  }
  await transport.sendMail({ from: MAIL_FROM, to, subject, text, html, replyTo });
}

/** Schutz vor Missbrauch des Postfachs: höchstens so viele Bestätigungsmails pro Stunde insgesamt. */
const mailBudget = { hour: 0, count: 0, max: 60 };
function takeMailBudget() {
  const h = Math.floor(Date.now() / 3600e3);
  if (mailBudget.hour !== h) Object.assign(mailBudget, { hour: h, count: 0 });
  return ++mailBudget.count <= mailBudget.max;
}

/**
 * Link zum zuletzt angeforderten Guide. ?freigabe=… schaltet ihn auf jedem
 * Gerät frei (z. B. am Handy, wenn die Anmeldung am Rechner war).
 */
function guideLink(lead) {
  const slug = lead.guides.split(",").filter(Boolean).pop() || "";
  return `${SITE_URL}/de/guides/${slug}?freigabe=${encodeURIComponent(lead.token)}`;
}

/** Platzhalter für die Mailtexte (siehe mails/LIESMICH.md). */
function mailVars(lead, guideTitle) {
  const slug = lead.guides.split(",").filter(Boolean).pop() || "";
  return {
    Vorname: lead.name,
    "Guide-Titel": guideTitle || lead.guide_title || guideLabel(slug),
    "Guide-Link": guideLink(lead),
    "Bestätigungslink": `${LINK_BASE}/bestaetigen?t=${lead.token}`,
    Abmeldelink: `${LINK_BASE}/abmelden?t=${lead.token}`,
    Terminlink: BOOKING_URL,
    Impressum: `${SITE_URL}/de/impressum`,
    Datenschutz: `${SITE_URL}/de/datenschutz`,
    Tage: String(PENDING_DAYS),
  };
}

/** Schickt eine Mail aus mails/<kind>.md an einen Lead und vermerkt sie im Protokoll. */
async function sendLeadMail(lead, kind, guideTitle) {
  const mail = renderMail(kind, mailVars(lead, guideTitle));
  await sendMail({ to: lead.email, ...mail });
  const at = now();
  q.logMail.run(lead.id, kind, mail.subject, at);
  update(lead.id, { last_mail_at: at });
}

async function sendConfirmMail(lead, guide) {
  if (!takeMailBudget()) throw new Error("Stündliches Mail-Limit erreicht");
  await sendLeadMail(lead, "bestaetigung", guide.title);
}

function guideLabel(slug) {
  return slug.replace(/-/g, " ");
}

async function notifyOwner(lead, headline) {
  const fresh = q.byId.get(lead.id);
  if (!fresh) return;
  const who = [fresh.name, fresh.company && `(${fresh.company})`].filter(Boolean).join(" ") || fresh.email;
  const guides = fresh.guides.split(",").filter(Boolean).map(guideLabel).join(", ");
  try {
    await sendMail({
      to: NOTIFY_TO,
      replyTo: fresh.email,
      subject: `${headline}: ${who}`,
      text: `${headline}

Name:     ${fresh.name || "–"}
Firma:    ${fresh.company || "–"}
E-Mail:   ${fresh.email}
Guides:   ${guides || "–"}
Vorhaben: ${fresh.answer || "–"}
Status:   ${fresh.status === "confirmed" ? `bestätigt am ${fmtDate(fresh.confirmed_at)}` : fresh.status === "pending" ? "noch nicht bestätigt" : "abgemeldet"}

Tipp: Auf diese Mail antworten geht direkt an ${fresh.email}.

Alle Leads: ${PUBLIC_URL}/leads`,
    });
  } catch (e) {
    console.error("[leads] Benachrichtigung fehlgeschlagen:", e.message);
  }
}

// ---------------------------------------------------------------- Prüfungen

const EMAIL_RE = /^[^\s@"<>]+@[^\s@"<>]+\.[^\s@"<>]{2,}$/;
const SLUG_RE = /^[a-z0-9-]{1,60}$/;

const clean = (v, max) =>
  String(v ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, max);

/** Pro IP höchstens 5 Anmeldungen in 10 Minuten. */
const hits = new Map();
function rateLimited(ip) {
  const t = Date.now();
  const list = (hits.get(ip) || []).filter((x) => t - x < 600e3);
  list.push(t);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > 5;
}

function sameSecret(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function apiAuthorized(req) {
  const h = req.headers.authorization || "";
  return h.startsWith("Bearer ") && sameSecret(h.slice(7), SECRET);
}

function adminAuthorized(req) {
  const h = req.headers.authorization || "";
  if (!h.startsWith("Basic ")) return false;
  const [, pass = ""] = Buffer.from(h.slice(6), "base64").toString().split(/:(.*)/s);
  return sameSecret(pass, ADMIN_PASSWORD);
}

// ---------------------------------------------------------------- Aktionen

async function handleSubscribe(body) {
  const email = clean(body.email, 254).toLowerCase();
  const name = clean(body.name, 80);
  const company = clean(body.company, 120);
  const slug = clean(body.guide, 60);
  const title = clean(body.guideTitle, 140) || guideLabel(slug);
  const ip = clean(body.ip, 64);
  const ua = clean(body.ua, 300);
  const consentText = clean(body.consentText, 1000);

  if (!EMAIL_RE.test(email)) return [400, { error: "email" }];
  if (!SLUG_RE.test(slug)) return [400, { error: "guide" }];
  if (!consentText) return [400, { error: "consent" }];
  if (ip && rateLimited(ip)) return [429, { error: "rate" }];

  const guide = { title, url: `${SITE_URL}/de/guides/${slug}` };
  const ref = newToken();
  const at = now();
  let lead = q.byEmail.get(email);

  if (!lead) {
    q.insert.run(email, name, company, slug, title, newToken(), ref, consentText, ip, ua, at, at);
    lead = q.byEmail.get(email);
    await sendConfirmMail(lead, guide);
    console.log(`[leads] neu: ${email} (${slug})`);
    return [200, { ok: true, ref }];
  }

  const { guides, isNew } = addGuide(lead.guides, slug);
  const fields = { guides, guide_title: title, ref, name: name || lead.name, company: company || lead.company };

  if (lead.status === "confirmed") {
    update(lead.id, fields);
    if (isNew) await notifyOwner(lead, `Bekannter Lead holt weiteren Guide „${title}“`);
    return [200, { ok: true, ref, confirmed: true }];
  }

  // pending oder abgemeldet: neue Einwilligung festhalten, Bestätigung erneut anfordern
  Object.assign(fields, { consent_text: consentText, consent_ip: ip, consent_ua: ua, consent_at: at });
  if (lead.status === "unsubscribed") Object.assign(fields, { status: "pending", token: newToken(), unsubscribed_at: null });
  update(lead.id, fields);
  lead = q.byId.get(lead.id);
  const last = lead.last_mail_at ? Date.parse(lead.last_mail_at) : 0;
  if (Date.now() - last > RESEND_MINUTES * 60e3) await sendConfirmMail(lead, guide);
  return [200, { ok: true, ref }];
}

async function handleAnswer(body) {
  const ref = clean(body.ref, 64);
  const answer = clean(body.answer, 500);
  if (!ref || !answer) return [400, { error: "input" }];
  const lead = q.byRef.get(ref);
  if (!lead) return [404, { error: "ref" }];
  update(lead.id, { answer });
  if (lead.status === "confirmed") await notifyOwner(lead, "Lead hat sein Vorhaben ergänzt");
  return [200, { ok: true }];
}

// ---------------------------------------------------------------- Seiten

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleString("de-DE", { timeZone: "Europe/Berlin", dateStyle: "short", timeStyle: "short" }) : "";

function page(title, inner, { wide = false } = {}) {
  return `<!doctype html>
<html lang="de"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${esc(title)} · solvomind</title>
<style>
  :root{--bg:#0b0c0e;--surface:#121316;--fg:#efefed;--muted:#9b9ea5;--line:rgba(239,239,237,.1);--accent:#a4e63a}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif}
  main{max-width:${wide ? "1200px" : "520px"};margin:0 auto;padding:64px 16px}
  .card{background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:28px}
  h1{font-size:26px;line-height:1.2;letter-spacing:-.02em;margin:0 0 12px}
  p{color:var(--muted);margin:0 0 16px}
  a{color:var(--fg)}
  .btn{display:inline-flex;align-items:center;height:44px;padding:0 20px;border:0;border-radius:999px;background:var(--accent);color:#0b0c0e;font:600 15px system-ui,sans-serif;cursor:pointer;text-decoration:none}
  .link{color:var(--muted);font-size:14px}
  table{width:100%;border-collapse:collapse;font-size:14px}
  th,td{text-align:left;vertical-align:top;padding:10px 8px;border-bottom:1px solid var(--line)}
  th{color:var(--muted);font-weight:600;white-space:nowrap}
  .pill{display:inline-block;padding:2px 8px;border-radius:999px;font-size:12px;border:1px solid var(--line)}
  .ok{color:var(--accent);border-color:rgba(164,230,58,.4)}
  .small{border:1px solid var(--line);background:none;color:var(--muted);border-radius:8px;padding:3px 8px;font-size:12px;cursor:pointer}
  .wrap{overflow-x:auto}
</style></head><body><main>${inner}</main></body></html>`;
}

const back = `<a class="link" href="${SITE_URL}/de/guides">← Zu den Guides</a>`;
const toGuide = (lead) => `<a class="btn" href="${esc(guideLink(lead))}">Zum Guide</a>`;

function actionPage(kind, lead, token) {
  const isConfirm = kind === "bestaetigen";
  if (!lead) {
    return page("Link ungültig", `<div class="card"><h1>Dieser Link ist nicht mehr gültig.</h1>
      <p>Vielleicht wurde die Anmeldung schon gelöscht. Holen Sie sich den Guide einfach erneut, dann bekommen Sie einen neuen Link.</p>${back}</div>`);
  }
  if (isConfirm && lead.status === "confirmed") {
    return page("Bereits bestätigt", `<div class="card"><h1>Schon erledigt.</h1><p>Ihre Adresse ist bestätigt. Danke!</p>${toGuide(lead)}</div>`);
  }
  if (!isConfirm && lead.status === "unsubscribed") {
    return page("Abgemeldet", `<div class="card"><h1>Sie sind abgemeldet.</h1><p>Sie bekommen keine weiteren E-Mails von mir.</p>${back}</div>`);
  }
  const title = isConfirm ? "Anmeldung bestätigen" : "Abmelden";
  const text = isConfirm
    ? `Ein Klick noch: Damit bestätigen Sie, dass ich Ihnen an <b>${esc(lead.email)}</b> gelegentlich E-Mails zu KI-Automatisierung schicken darf.`
    : `Sie möchten keine E-Mails mehr an <b>${esc(lead.email)}</b> bekommen?`;
  return page(title, `<div class="card"><h1>${title}</h1><p>${text}</p>
    <form method="post" action="${LINK_BASE}/${kind}?t=${encodeURIComponent(token)}"><button class="btn" type="submit">${isConfirm ? "Jetzt bestätigen" : "Abmelden"}</button></form></div>`);
}

const MAIL_NAMES = { bestaetigung: "Bestätigung", willkommen: "Willkommen" };

function adminPage() {
  const rows = q.all.all();
  const counts = { confirmed: 0, pending: 0, unsubscribed: 0 };
  for (const r of rows) counts[r.status] = (counts[r.status] || 0) + 1;
  const statusPill = (s) =>
    s === "confirmed" ? `<span class="pill ok">bestätigt</span>` : s === "pending" ? `<span class="pill">offen</span>` : `<span class="pill">abgemeldet</span>`;
  const body = rows
    .map(
      (r) => `<tr>
      <td>${esc(fmtDate(r.created_at))}</td>
      <td>${esc(r.name) || "–"}</td>
      <td>${esc(r.company) || "–"}</td>
      <td><a href="mailto:${esc(r.email)}">${esc(r.email)}</a></td>
      <td>${esc(r.guides.split(",").map(guideLabel).join(", "))}</td>
      <td>${esc(r.answer) || "–"}</td>
      <td>${statusPill(r.status)}</td>
      <td style="white-space:nowrap;font-size:13px">${q.logsFor.all(r.id).map((m) => `${esc(MAIL_NAMES[m.kind] || m.kind)} ${esc(fmtDate(m.sent_at))}`).join("<br>") || "–"}</td>
      <td style="white-space:nowrap">
        ${r.status === "confirmed" ? `<form method="post" action="/leads/abmelden" style="display:inline"><input type="hidden" name="id" value="${r.id}"><button class="small" title="Will keine Mails mehr">abmelden</button></form>` : ""}
        <form method="post" action="/leads/loeschen" style="display:inline" onsubmit="return confirm('${esc(r.email)} endgültig löschen?')"><input type="hidden" name="id" value="${r.id}"><button class="small">löschen</button></form>
      </td></tr>`,
    )
    .join("");
  return page(
    "Leads",
    `<h1>Leads</h1>
     <p>${counts.confirmed} bestätigt · ${counts.pending} offen · ${counts.unsubscribed} abgemeldet &nbsp;·&nbsp; <a href="/leads.csv">CSV herunterladen</a></p>
     <p style="font-size:14px">Anschreiben dürfen Sie nur <b>bestätigte</b> Kontakte. Offene werden nach ${PENDING_DAYS} Tagen automatisch gelöscht.</p>
     <div class="wrap"><table><thead><tr><th>Datum</th><th>Name</th><th>Firma</th><th>E-Mail</th><th>Guides</th><th>Vorhaben</th><th>Status</th><th>Mails</th><th></th></tr></thead>
     <tbody>${body || `<tr><td colspan="9">Noch keine Leads.</td></tr>`}</tbody></table></div>`,
    { wide: true },
  );
}

function csv() {
  const cols = ["created_at", "status", "name", "company", "email", "guides", "answer", "confirmed_at", "consent_at", "consent_ip", "consent_text"];
  const cell = (v) => {
    let s = String(v ?? "");
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`; // keine Formeln in Excel
    return `"${s.replace(/"/g, '""')}"`;
  };
  const lines = q.all.all().map((r) => cols.map((c) => cell(r[c])).join(";"));
  return "﻿" + [cols.join(";"), ...lines].join("\r\n");
}

// ---------------------------------------------------------------- HTTP

function readBody(req, limit = 16_000) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (c) => {
      size += c.length;
      if (size > limit) {
        reject(new Error("too large"));
        req.destroy();
      } else chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function send(res, status, body, type = "application/json; charset=utf-8", extra = {}) {
  const payload = typeof body === "string" ? body : JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "X-Frame-Options": "DENY",
    ...extra,
  });
  res.end(payload);
}
const html = (res, status, body) => send(res, status, body, "text/html; charset=utf-8");
const redirect = (res, to) => send(res, 303, "", "text/plain", { Location: to });

/** Formulare der Leadliste nur von der eigenen Seite annehmen (Schutz vor fremden Seiten, die Knöpfe auslösen). */
function sameOrigin(req) {
  const o = req.headers.origin;
  return !o || o === PUBLIC_URL;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, PUBLIC_URL);
  const p = url.pathname;
  try {
    if (p === "/health") return send(res, 200, { ok: true });

    // --- API für die Website
    if (req.method === "POST" && (p === "/subscribe" || p === "/answer")) {
      if (!apiAuthorized(req)) return send(res, 401, { error: "auth" });
      let body;
      try {
        body = JSON.parse(await readBody(req));
      } catch {
        return send(res, 400, { error: "json" });
      }
      const [status, out] = p === "/subscribe" ? await handleSubscribe(body) : await handleAnswer(body);
      return send(res, status, out);
    }

    // --- Freischalt-Link aus der Mail prüfen (nur für die Website)
    if (req.method === "GET" && p === "/freigabe") {
      if (!apiAuthorized(req)) return send(res, 401, { error: "auth" });
      const token = url.searchParams.get("t") || "";
      return send(res, 200, { ok: Boolean(token && q.byToken.get(token)) });
    }

    // --- Links aus der Mail
    if (p === "/bestaetigen" || p === "/abmelden") {
      const token = url.searchParams.get("t") || "";
      const lead = token ? q.byToken.get(token) : null;
      if (req.method === "POST" && lead) {
        // Über die Website weitergereicht: echte Besucher-IP steht in x-lead-ip
        const viaSite = apiAuthorized(req) && req.headers["x-lead-ip"];
        const ip = String(viaSite || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
        if (p === "/bestaetigen" && lead.status !== "confirmed") {
          update(lead.id, { status: "confirmed", confirmed_at: now(), confirm_ip: ip, unsubscribed_at: null });
          console.log(`[leads] bestätigt: ${lead.email}`);
          try {
            await sendLeadMail(q.byId.get(lead.id), "willkommen");
          } catch (e) {
            console.error("[leads] Willkommensmail fehlgeschlagen:", e.message);
          }
          await notifyOwner(lead, "Neuer Lead");
          return html(res, 200, page("Bestätigt", `<div class="card"><h1>Danke, das hat geklappt.</h1><p>Ihre Adresse ist bestätigt. Über den Knopf öffnen Sie Ihren Guide auf jedem Gerät, auch am Handy.</p>${toGuide(lead)}</div>`));
        }
        if (p === "/abmelden" && lead.status !== "unsubscribed") {
          update(lead.id, { status: "unsubscribed", unsubscribed_at: now() });
          console.log(`[leads] abgemeldet: ${lead.email}`);
          return html(res, 200, page("Abgemeldet", `<div class="card"><h1>Sie sind abgemeldet.</h1><p>Sie bekommen keine weiteren E-Mails von mir.</p>${back}</div>`));
        }
      }
      return html(res, lead ? 200 : 404, actionPage(p.slice(1), lead, token));
    }

    // --- Leadliste
    if (p === "/leads" || p === "/leads.csv" || p.startsWith("/leads/")) {
      if (!adminAuthorized(req)) {
        return send(res, 401, "Anmeldung erforderlich", "text/plain; charset=utf-8", { "WWW-Authenticate": 'Basic realm="solvomind leads", charset="UTF-8"' });
      }
      if (req.method === "GET" && p === "/leads") return html(res, 200, adminPage());
      if (req.method === "GET" && p === "/leads.csv") {
        return send(res, 200, csv(), "text/csv; charset=utf-8", { "Content-Disposition": `attachment; filename="leads-${now().slice(0, 10)}.csv"` });
      }
      if (req.method === "POST" && (p === "/leads/loeschen" || p === "/leads/abmelden")) {
        if (!sameOrigin(req)) return send(res, 403, "Falsche Herkunft", "text/plain; charset=utf-8");
        const id = Number(new URLSearchParams(await readBody(req)).get("id"));
        if (p === "/leads/loeschen") {
          q.removeLog.run(id);
          q.remove.run(id);
        }
        else update(id, { status: "unsubscribed", unsubscribed_at: now() });
        return redirect(res, "/leads");
      }
    }

    return send(res, 404, { error: "not found" });
  } catch (e) {
    console.error("[leads] Fehler:", e);
    if (!res.headersSent) send(res, 500, { error: "server" });
  }
});

server.listen(PORT, () => console.log(`[leads] läuft auf Port ${PORT} · öffentlich: ${PUBLIC_URL}`));
