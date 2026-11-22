/**
 * Dashboard des Lead-Dienstes (nur mit Passwort erreichbar, siehe server.mjs).
 *
 *   /leads              Übersicht: Kennzahlen, Anmeldungen pro Tag, Guides, Leadliste
 *   /leads/<id>         ein Lead: Angaben, Verlauf, Vertriebsstatus, Notiz
 *   /leads/mails        jede verschickte Mail an Leads
 *
 * Reines HTML vom Server, ein paar Zeilen JavaScript nur für Suche und Filter.
 */

export const STAGES = {
  neu: "Neu",
  angeschrieben: "Angeschrieben",
  gespraech: "Gespräch",
  kunde: "Kunde",
  kein_interesse: "Kein Interesse",
};

const STATUS = { confirmed: "bestätigt", pending: "offen", unsubscribed: "abgemeldet" };
const MAIL_NAMES = { bestaetigung: "Bestätigungsmail", willkommen: "Willkommensmail" };
const TZ = "Europe/Berlin";

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const fmt = (iso, opts = { dateStyle: "short", timeStyle: "short" }) => (iso ? new Date(iso).toLocaleString("de-DE", { timeZone: TZ, ...opts }) : "");
const dayKey = (d) => new Date(d).toLocaleDateString("sv-SE", { timeZone: TZ }); // YYYY-MM-DD
const slugLabel = (slug) => slug.replace(/-/g, " ").replace(/\b(ki)\b/gi, "KI").replace(/^\w/, (c) => c.toUpperCase());

export function createDashboard(db, { pendingDays }) {
  const q = {
    leads: db.prepare("SELECT * FROM leads ORDER BY created_at DESC"),
    lead: db.prepare("SELECT * FROM leads WHERE id = ?"),
    mailsFor: db.prepare("SELECT kind, subject, sent_at FROM mail_log WHERE lead_id = ? ORDER BY sent_at"),
    mailCounts: db.prepare("SELECT lead_id, COUNT(*) AS n, MAX(sent_at) AS last FROM mail_log GROUP BY lead_id"),
    eventsFor: db.prepare("SELECT kind, guide, detail, at FROM events WHERE lead_id = ? ORDER BY at"),
    guideTitles: db.prepare("SELECT guide, detail FROM events WHERE kind IN ('anmeldung','guide') AND guide <> '' GROUP BY guide"),
    allMails: db.prepare(`SELECT m.kind, m.subject, m.sent_at, l.id AS lead_id, l.name, l.email
                          FROM mail_log m LEFT JOIN leads l ON l.id = m.lead_id ORDER BY m.sent_at DESC LIMIT 500`),
  };

  /** Lesbarer Titel je Guide-Slug (aus dem Verlauf, sonst aus dem Slug). */
  function titles(leads) {
    const map = {};
    for (const r of q.guideTitles.all()) if (r.detail) map[r.guide] = r.detail;
    for (const l of leads) {
      const last = l.guides.split(",").filter(Boolean).pop();
      if (last && l.guide_title && !map[last]) map[last] = l.guide_title;
    }
    return (slug) => map[slug] || slugLabel(slug);
  }

  // ------------------------------------------------------------ Bausteine

  const statusPill = (s) => `<span class="pill ${s}">${STATUS[s] || s}</span>`;
  const stagePill = (s) => (s && s !== "neu" ? `<span class="pill stage-${s}">${STAGES[s] || s}</span>` : `<span class="muted">–</span>`);

  function layout(title, active, inner) {
    const nav = [
      ["/leads", "Übersicht"],
      ["/leads/mails", "Mail-Protokoll"],
    ]
      .map(([h, l]) => `<a href="${h}" class="${active === h ? "on" : ""}">${l}</a>`)
      .join("");
    return `<!doctype html>
<html lang="de"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${esc(title)} · Leads · solvomind</title>
<style>${CSS}</style></head>
<body>
<header class="top"><div class="in">
  <a href="/leads" class="brand"><span class="logo">↗</span> solvomind <span class="muted">Leads</span></a>
  <nav>${nav}<a href="/leads.csv">CSV</a></nav>
</div></header>
<main class="in">${inner}</main>
</body></html>`;
  }

  function kpi(label, value, note = "") {
    return `<div class="kpi"><div class="kpi-l">${label}</div><div class="kpi-v">${value}</div>${note ? `<div class="kpi-n">${note}</div>` : ""}</div>`;
  }

  /** Balkendiagramm: Anmeldungen pro Tag (letzte 30 Tage), bestätigte Anteile in Grün. */
  function dailyChart(leads) {
    const days = [];
    for (let i = 29; i >= 0; i--) days.push(dayKey(Date.now() - i * 864e5));
    const by = Object.fromEntries(days.map((d) => [d, { all: 0, ok: 0 }]));
    for (const l of leads) {
      const d = dayKey(l.created_at);
      if (by[d]) {
        by[d].all++;
        if (l.confirmed_at) by[d].ok++;
      }
    }
    const max = Math.max(1, ...days.map((d) => by[d].all));
    const W = 720, H = 160, pad = 22, bw = W / days.length;
    const bars = days
      .map((d, i) => {
        const { all, ok } = by[d];
        const h = ((H - pad) * all) / max;
        const hk = ((H - pad) * ok) / max;
        const x = i * bw + 3;
        const label = `${fmt(d + "T12:00:00Z", { dateStyle: "medium" })}: ${all} Anmeldung${all === 1 ? "" : "en"}, ${ok} bestätigt`;
        return `<g><title>${esc(label)}</title>
          <rect x="${x}" y="${H - pad - h}" width="${bw - 6}" height="${Math.max(h, all ? 2 : 0)}" rx="3" class="bar-all"/>
          <rect x="${x}" y="${H - pad - hk}" width="${bw - 6}" height="${hk}" rx="3" class="bar-ok"/>
          <rect x="${i * bw}" y="0" width="${bw}" height="${H}" fill="transparent"/></g>`;
      })
      .join("");
    const ticks = [0, 7, 14, 21, 29]
      .map((i) => `<text x="${i === 0 ? 0 : i === 29 ? W : i * bw + bw / 2}" y="${H - 4}" text-anchor="${i === 0 ? "start" : i === 29 ? "end" : "middle"}">${fmt(days[i] + "T12:00:00Z", { day: "2-digit", month: "2-digit" })}</text>`)
      .join("");
    return `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="Anmeldungen pro Tag, letzte 30 Tage">
      <line x1="0" x2="${W}" y1="${H - pad}" y2="${H - pad}" class="axis"/>${bars}${ticks}</svg>
      <div class="legend"><span><i class="sw all"></i>Anmeldungen</span><span><i class="sw ok"></i>davon bestätigt</span><span class="muted">höchster Tag: ${max}</span></div>`;
  }

  // ------------------------------------------------------------ Seiten

  function overview() {
    const leads = q.leads.all();
    const title = titles(leads);
    const mails = Object.fromEntries(q.mailCounts.all().map((r) => [r.lead_id, r]));
    const total = leads.length;
    const count = (f) => leads.filter(f).length;
    const confirmed = count((l) => l.status === "confirmed");
    const pending = count((l) => l.status === "pending");
    const unsub = count((l) => l.status === "unsubscribed");
    const everConfirmed = count((l) => l.confirmed_at);
    const week = count((l) => Date.now() - Date.parse(l.created_at) < 7 * 864e5);
    const talks = count((l) => l.stage === "gespraech" || l.stage === "kunde");
    const rate = total ? Math.round((everConfirmed / total) * 100) : 0;

    // Guides
    const g = {};
    for (const l of leads)
      for (const s of l.guides.split(",").filter(Boolean)) {
        g[s] ??= { all: 0, ok: 0 };
        g[s].all++;
        if (l.confirmed_at) g[s].ok++;
      }
    const guideRows = Object.entries(g)
      .sort((a, b) => b[1].all - a[1].all)
      .map(([s, v]) => {
        const w = Math.round((v.all / Math.max(...Object.values(g).map((x) => x.all))) * 100);
        return `<tr><td>${esc(title(s))}</td><td class="num">${v.all}</td><td class="num">${v.ok}</td>
          <td class="barcell"><div class="hbar"><span style="width:${w}%"></span></div></td></tr>`;
      })
      .join("");

    const rows = leads
      .map((l) => {
        const m = mails[l.id];
        const search = [l.name, l.company, l.email, l.answer, l.notes].join(" ").toLowerCase();
        return `<tr data-status="${l.status}" data-stage="${esc(l.stage || "neu")}" data-q="${esc(search)}" onclick="location.href='/leads/${l.id}'">
          <td class="nowrap">${esc(fmt(l.created_at))}</td>
          <td><a href="/leads/${l.id}"><b>${esc(l.name) || "–"}</b></a><div class="muted small">${esc(l.email)}</div></td>
          <td>${esc(l.company) || "–"}</td>
          <td>${esc(l.guides.split(",").filter(Boolean).map(title).join(", "))}</td>
          <td class="clip">${esc(l.answer) || "<span class='muted'>–</span>"}</td>
          <td>${statusPill(l.status)}</td>
          <td>${stagePill(l.stage)}</td>
          <td class="nowrap small">${m ? `${m.n} · zuletzt ${esc(fmt(m.last, { dateStyle: "short" }))}` : "–"}</td>
        </tr>`;
      })
      .join("");

    const filters = [
      ["all", `Alle <b>${total}</b>`],
      ["confirmed", `Bestätigt <b>${confirmed}</b>`],
      ["pending", `Offen <b>${pending}</b>`],
      ["unsubscribed", `Abgemeldet <b>${unsub}</b>`],
    ]
      .map(([v, l], i) => `<button type="button" data-f="${v}" class="${i === 0 ? "on" : ""}">${l}</button>`)
      .join("");

    return layout(
      "Übersicht",
      "/leads",
      `<h1>Übersicht</h1>
      <div class="kpis">
        ${kpi("Leads gesamt", total, `${week} in den letzten 7 Tagen`)}
        ${kpi("Bestätigt", confirmed, "dürfen angeschrieben werden")}
        ${kpi("Bestätigungsquote", `${rate}&thinsp;%`, `${pending} warten noch auf Bestätigung`)}
        ${kpi("Gespräche", talks, "Vertriebsstatus Gespräch oder Kunde")}
      </div>

      <div class="grid2">
        <section class="card"><h2>Anmeldungen pro Tag <span class="muted">· letzte 30 Tage</span></h2>${dailyChart(leads)}</section>
        <section class="card"><h2>Guides</h2>
          ${guideRows ? `<table class="t"><thead><tr><th>Guide</th><th class="num">Leads</th><th class="num">bestätigt</th><th></th></tr></thead><tbody>${guideRows}</tbody></table>` : `<p class="muted">Noch keine Anmeldungen.</p>`}
        </section>
      </div>

      <section class="card">
        <div class="bar">
          <h2>Leads</h2>
          <div class="tools">
            <div class="seg" id="f">${filters}</div>
            <input id="s" type="search" placeholder="Suchen: Name, Firma, E-Mail, Notiz …" aria-label="Leads durchsuchen">
          </div>
        </div>
        <p class="muted small">Anschreiben dürfen Sie nur <b>bestätigte</b> Kontakte. Offene werden nach ${pendingDays} Tagen automatisch gelöscht. Zeile anklicken für Details.</p>
        <div class="wrap"><table class="t rows" id="t">
          <thead><tr><th>Datum</th><th>Name</th><th>Firma</th><th>Guides</th><th>Vorhaben</th><th>Status</th><th>Vertrieb</th><th>Mails</th></tr></thead>
          <tbody>${rows || `<tr><td colspan="8" class="muted">Noch keine Leads.</td></tr>`}</tbody>
        </table></div>
        <p id="none" class="muted" hidden>Keine Treffer.</p>
      </section>
      <script>
        const f = document.getElementById("f"), s = document.getElementById("s"), rows = [...document.querySelectorAll("#t tbody tr[data-status]")];
        let st = "all";
        function apply() {
          const t = s.value.trim().toLowerCase(); let n = 0;
          for (const r of rows) { const ok = (st === "all" || r.dataset.status === st) && (!t || r.dataset.q.includes(t)); r.hidden = !ok; n += ok; }
          document.getElementById("none").hidden = n > 0 || !rows.length;
        }
        f.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; st = b.dataset.f; for (const x of f.children) x.classList.toggle("on", x === b); apply(); });
        s.addEventListener("input", apply);
      </script>`,
    );
  }

  function leadPage(id) {
    const l = q.lead.get(id);
    if (!l) return null;
    const title = titles([l]);
    const events = q.eventsFor.all(id);
    const has = (k) => events.some((e) => e.kind === k);

    // Verlauf: Ereignisse + Mails; ältere Leads ohne Ereignisse aus den Zeitstempeln ergänzen
    const tl = [];
    if (!has("anmeldung")) tl.push({ at: l.created_at, t: "Angemeldet", d: title(l.guides.split(",")[0] || "") });
    if (l.confirmed_at && !has("bestaetigt")) tl.push({ at: l.confirmed_at, t: "Bestätigt", d: "", ok: true });
    if (l.unsubscribed_at && !has("abgemeldet")) tl.push({ at: l.unsubscribed_at, t: "Abgemeldet", d: "" });
    const NAMES = {
      anmeldung: "Angemeldet",
      guide: "Weiteren Guide geholt",
      erneut: "Erneut eingetragen",
      bestaetigt: "Bestätigt",
      abgemeldet: "Abgemeldet",
      antwort: "Vorhaben angegeben",
      vertrieb: "Vertriebsstatus geändert",
    };
    for (const e of events) {
      const d = e.kind === "vertrieb" ? STAGES[e.detail] || e.detail : e.detail;
      tl.push({ at: e.at, t: NAMES[e.kind] || e.kind, d, ok: e.kind === "bestaetigt" });
    }
    for (const m of q.mailsFor.all(id)) tl.push({ at: m.sent_at, t: `${MAIL_NAMES[m.kind] || m.kind} verschickt`, d: m.subject, mail: true });
    tl.sort((a, b) => (a.at < b.at ? 1 : -1));

    const timeline = tl
      .map(
        (e) => `<li class="${e.ok ? "ok" : e.mail ? "mail" : ""}"><div class="when">${esc(fmt(e.at))}</div>
          <div><b>${esc(e.t)}</b>${e.d ? `<div class="muted small">${esc(e.d)}</div>` : ""}</div></li>`,
      )
      .join("");

    const stageOptions = Object.entries(STAGES)
      .map(([v, label]) => `<option value="${v}" ${(l.stage || "neu") === v ? "selected" : ""}>${label}</option>`)
      .join("");

    const field = (label, value) => `<div class="f"><div class="f-l">${label}</div><div class="f-v">${value || "<span class='muted'>–</span>"}</div></div>`;

    return layout(
      l.name || l.email,
      "",
      `<a href="/leads" class="back">← Alle Leads</a>
      <div class="head">
        <div>
          <h1>${esc(l.name) || esc(l.email)} ${statusPill(l.status)}</h1>
          <p class="muted">${esc(l.company) || "Keine Firma angegeben"} · eingetragen am ${esc(fmt(l.created_at, { dateStyle: "long" }))}</p>
        </div>
        <a class="btn" href="mailto:${esc(l.email)}">E-Mail schreiben</a>
      </div>
      ${l.status === "pending" ? `<p class="warn">Noch nicht bestätigt: Diesen Kontakt bitte noch nicht anschreiben.</p>` : ""}
      ${l.status === "unsubscribed" ? `<p class="warn">Abgemeldet: Dieser Kontakt möchte keine E-Mails mehr.</p>` : ""}

      <div class="grid2 detail">
        <div>
          <section class="card">
            <h2>Angaben</h2>
            ${field("E-Mail", `<a href="mailto:${esc(l.email)}">${esc(l.email)}</a>`)}
            ${field("Vorname", esc(l.name))}
            ${field("Firma", esc(l.company))}
            ${field("Guides", esc(l.guides.split(",").filter(Boolean).map(title).join(", ")))}
            ${field("Vorhaben", esc(l.answer))}
            ${field("Einwilligung", `${esc(fmt(l.consent_at))}${l.consent_ip ? ` · IP ${esc(l.consent_ip)}` : ""}`)}
            ${field("Bestätigt", l.confirmed_at ? `${esc(fmt(l.confirmed_at))}${l.confirm_ip ? ` · IP ${esc(l.confirm_ip)}` : ""}` : "")}
          </section>

          <section class="card">
            <h2>Vertrieb</h2>
            <form method="post" action="/leads/${l.id}/speichern" class="crm">
              <label class="f-l" for="stage">Status</label>
              <select id="stage" name="stage">${stageOptions}</select>
              <label class="f-l" for="notes">Notiz</label>
              <textarea id="notes" name="notes" rows="6" maxlength="5000" placeholder="z. B. 24.11. angeschrieben, nutzt DATEV, Termin am …">${esc(l.notes)}</textarea>
              <button class="btn" type="submit">Speichern</button>
            </form>
          </section>

          <section class="card danger">
            <h2>Verwalten</h2>
            <div class="row">
              ${l.status !== "unsubscribed" ? `<form method="post" action="/leads/${l.id}/abmelden" onsubmit="return confirm('Als abgemeldet markieren? Der Kontakt bekommt dann keine Mails mehr.')"><button class="ghost" type="submit">Als abgemeldet markieren</button></form>` : ""}
              <form method="post" action="/leads/${l.id}/loeschen" onsubmit="return confirm('${esc(l.email)} endgültig löschen? Das kann nicht rückgängig gemacht werden.')"><button class="ghost red" type="submit">Endgültig löschen</button></form>
            </div>
          </section>
        </div>

        <section class="card">
          <h2>Verlauf</h2>
          <ol class="tl">${timeline}</ol>
        </section>
      </div>`,
    );
  }

  function mailsPage() {
    const rows = q.allMails
      .all()
      .map(
        (m) => `<tr${m.lead_id ? ` onclick="location.href='/leads/${m.lead_id}'"` : ""}>
        <td class="nowrap">${esc(fmt(m.sent_at))}</td>
        <td>${m.lead_id ? `<a href="/leads/${m.lead_id}"><b>${esc(m.name) || "–"}</b></a><div class="muted small">${esc(m.email)}</div>` : "<span class='muted'>gelöschter Lead</span>"}</td>
        <td>${esc(MAIL_NAMES[m.kind] || m.kind)}</td>
        <td class="muted">${esc(m.subject)}</td></tr>`,
      )
      .join("");
    return layout(
      "Mail-Protokoll",
      "/leads/mails",
      `<h1>Mail-Protokoll</h1>
      <p class="muted">Jede Mail, die der Dienst an Leads geschickt hat, neueste zuerst. Mails, die Sie selbst aus Ihrem Postfach schreiben, tauchen hier nicht auf.</p>
      <section class="card"><div class="wrap"><table class="t rows">
        <thead><tr><th>Datum</th><th>Empfänger</th><th>Mail</th><th>Betreff</th></tr></thead>
        <tbody>${rows || `<tr><td colspan="4" class="muted">Noch keine Mails verschickt.</td></tr>`}</tbody>
      </table></div></section>`,
    );
  }

  return { overview, leadPage, mailsPage };
}

const CSS = `
:root{--bg:#0b0c0e;--surface:#121316;--surface2:#17191c;--fg:#efefed;--muted:#9b9ea5;--line:rgba(239,239,237,.09);--line2:rgba(239,239,237,.16);--accent:#a4e63a;--warn:#F5A524;--red:#ff6b6b}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif}
a{color:inherit}
.in{max-width:1200px;margin:0 auto;padding:0 16px}
.top{position:sticky;top:0;z-index:5;background:rgba(11,12,14,.85);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.top .in{display:flex;align-items:center;justify-content:space-between;gap:16px;height:60px}
.brand{display:flex;align-items:center;gap:8px;font-weight:700;text-decoration:none}
.logo{display:inline-grid;place-items:center;width:24px;height:24px;border-radius:7px;background:var(--accent);color:#0b0c0e;font-size:14px}
nav{display:flex;gap:4px;flex-wrap:wrap}
nav a{padding:6px 12px;border-radius:999px;text-decoration:none;color:var(--muted);font-size:14px}
nav a:hover{color:var(--fg)} nav a.on{background:var(--surface2);color:var(--fg)}
main{padding-top:28px;padding-bottom:64px}
h1{font-size:28px;line-height:1.2;letter-spacing:-.02em;margin:0 0 20px;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
h2{font-size:16px;margin:0 0 14px;letter-spacing:-.01em}
.muted{color:var(--muted)} .small{font-size:13px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:20px;margin-bottom:16px;min-width:0}
.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px}
.kpi{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:16px 18px}
.kpi-l{color:var(--muted);font-size:13px} .kpi-v{font-size:30px;font-weight:700;letter-spacing:-.03em;margin-top:2px} .kpi-n{color:var(--muted);font-size:12.5px}
.grid2{display:grid;grid-template-columns:1.4fr 1fr;gap:16px}
.grid2.detail{grid-template-columns:1fr 1fr}
.chart{width:100%;height:auto;display:block} .chart text{fill:var(--muted);font-size:11px}
.axis{stroke:var(--line2)} .bar-all{fill:rgba(239,239,237,.18)} .bar-ok{fill:var(--accent)}
.legend{display:flex;gap:16px;flex-wrap:wrap;font-size:12.5px;margin-top:8px}
.sw{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;vertical-align:-1px} .sw.all{background:rgba(239,239,237,.18)} .sw.ok{background:var(--accent)}
.t{width:100%;border-collapse:collapse;font-size:14px}
.t th{color:var(--muted);font-weight:600;text-align:left;padding:8px;border-bottom:1px solid var(--line2);white-space:nowrap;font-size:12.5px}
.t td{padding:10px 8px;border-bottom:1px solid var(--line);vertical-align:top}
.t.rows tbody tr{cursor:pointer} .t.rows tbody tr:hover{background:var(--surface2)}
.t a{text-decoration:none}
.num{text-align:right!important;font-variant-numeric:tabular-nums}
.nowrap{white-space:nowrap} .clip{max-width:240px}
.barcell{width:35%} .hbar{height:8px;border-radius:99px;background:var(--surface2);overflow:hidden} .hbar span{display:block;height:100%;background:var(--accent);border-radius:99px}
.wrap{overflow-x:auto}
.pill{display:inline-block;padding:2px 9px;border-radius:999px;font-size:12px;font-weight:600;border:1px solid var(--line2);color:var(--muted);white-space:nowrap}
.pill.confirmed{color:var(--accent);border-color:rgba(164,230,58,.4)} .pill.unsubscribed{color:var(--red);border-color:rgba(255,107,107,.35)}
.pill.stage-angeschrieben{color:#8fc7ff;border-color:rgba(143,199,255,.35)} .pill.stage-gespraech{color:var(--warn);border-color:rgba(245,165,36,.4)}
.pill.stage-kunde{color:#0b0c0e;background:var(--accent);border-color:var(--accent)} .pill.stage-kein_interesse{opacity:.7}
h1 .pill{font-size:13px}
.bar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:6px} .bar h2{margin:0}
.tools{display:flex;gap:8px;flex-wrap:wrap}
.seg{display:flex;background:var(--surface2);border-radius:999px;padding:3px}
.seg button{border:0;background:none;color:var(--muted);padding:6px 12px;border-radius:999px;font:inherit;font-size:13px;cursor:pointer}
.seg button.on{background:var(--bg);color:var(--fg)} .seg b{font-weight:600;margin-left:2px}
input[type=search],select,textarea{background:var(--bg);color:var(--fg);border:1px solid var(--line2);border-radius:10px;padding:8px 12px;font:inherit;font-size:14px;outline:none}
input[type=search]{min-width:260px} input:focus,select:focus,textarea:focus{border-color:var(--accent)}
.btn{display:inline-flex;align-items:center;height:40px;padding:0 18px;border:0;border-radius:999px;background:var(--accent);color:#0b0c0e;font:600 14px system-ui,sans-serif;cursor:pointer;text-decoration:none;white-space:nowrap}
.ghost{background:none;border:1px solid var(--line2);color:var(--fg);border-radius:999px;padding:8px 14px;font:inherit;font-size:13px;cursor:pointer}
.ghost.red{color:var(--red);border-color:rgba(255,107,107,.35)}
.row{display:flex;gap:8px;flex-wrap:wrap}
.back{color:var(--muted);text-decoration:none;font-size:14px}
.head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap;margin:12px 0 8px} .head h1{margin:0 0 4px} .head p{margin:0}
.warn{background:rgba(245,165,36,.08);border:1px solid rgba(245,165,36,.3);border-radius:12px;padding:10px 14px;margin:12px 0 16px;font-size:14px}
.f{display:grid;grid-template-columns:120px 1fr;gap:12px;padding:8px 0;border-bottom:1px solid var(--line);font-size:14px} .f:last-child{border-bottom:0}
.f-l{color:var(--muted);font-size:13px} .f-v{overflow-wrap:anywhere}
.crm{display:grid;gap:8px} .crm select{max-width:240px} .crm .btn{justify-self:start;margin-top:6px} .crm textarea{resize:vertical}
.tl{list-style:none;margin:0;padding:0 0 0 18px;border-left:2px solid var(--line2)}
.tl li{position:relative;display:grid;grid-template-columns:120px 1fr;gap:12px;padding:0 0 18px 8px;font-size:14px}
.tl li::before{content:"";position:absolute;left:-25px;top:5px;width:10px;height:10px;border-radius:50%;background:var(--surface);border:2px solid var(--line2)}
.tl li.ok::before{background:var(--accent);border-color:var(--accent)} .tl li.mail::before{border-color:#8fc7ff}
.when{color:var(--muted);font-size:12.5px;font-variant-numeric:tabular-nums}
[hidden]{display:none!important}
@media (max-width:900px){.kpis{grid-template-columns:repeat(2,1fr)}.grid2,.grid2.detail{grid-template-columns:1fr}input[type=search]{min-width:0;width:100%}.tools{width:100%}}
@media (max-width:520px){.f,.tl li{grid-template-columns:1fr;gap:2px}.kpi-v{font-size:24px}.brand .muted{display:none}nav{flex-wrap:nowrap;gap:0}nav a{padding:6px 8px;font-size:13px;white-space:nowrap}}
`;
