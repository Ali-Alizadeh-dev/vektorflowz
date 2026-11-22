/**
 * Macht aus den Textdateien in mails/ fertige Mails ({ subject, text, html }).
 * Die Texte selbst stehen NICHT hier, sondern in mails/*.md (Aufbau: mails/LIESMICH.md).
 * Vorschau ohne Server: node preview.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "mails");
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const INK = "#1d1f23";
const MUTED = "#6b6f77";

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const BUTTON_RE = /^\[([^\]]+)\]\(([^)\s]+)\)$/;
const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Platzhalter {Name} ersetzen. Unbekannte Platzhalter fallen auf, statt still zu verschwinden. */
function fill(raw, vars) {
  return raw.replace(/\{([^{}\n]+)\}/g, (m, key) => {
    if (!(key in vars)) throw new Error(`Unbekannter Platzhalter ${m}`);
    return vars[key];
  });
}

/** Zerlegt einen Absatz in Gruppen: Aufzählung, Button oder normaler Text. */
function groups(block) {
  const out = [];
  for (const line of block.split("\n")) {
    const kind = line.startsWith("- ") ? "list" : BUTTON_RE.test(line.trim()) ? "button" : "text";
    const last = out[out.length - 1];
    if (last && last.kind === kind && kind !== "button") last.lines.push(line);
    else out.push({ kind, lines: [line] });
  }
  return out;
}

function inlineHtml(s, color) {
  return esc(s).replace(LINK_RE, (_, t, u) => `<a href="${u}" style="color:${color}">${t}</a>`);
}
const inlineText = (s) => s.replace(LINK_RE, (_, t, u) => `${t} (${u})`);

function buttonHtml(label, href, primary) {
  const bg = primary ? "#a4e63a" : "#ffffff";
  const border = primary ? "#a4e63a" : "#0b0c0e";
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:4px 0 20px"><tr>
<td style="border-radius:999px;background:${bg};border:1.5px solid ${border}"><a href="${esc(href)}" style="display:inline-block;padding:13px 26px;font:600 15px ${FONT};color:#0b0c0e;text-decoration:none;border-radius:999px">${esc(label)}</a></td>
</tr></table>`;
}

function renderPart(part, { color, size, first }) {
  const html = [];
  const text = [];
  let buttons = 0;
  for (const block of part.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean)) {
    for (const g of groups(block)) {
      if (g.kind === "list") {
        const items = g.lines.map((l) => l.slice(2));
        html.push(
          `<ul style="margin:0 0 16px;padding-left:20px;font:${size} ${FONT};color:${color}">${items
            .map((i) => `<li style="margin-bottom:4px">${inlineHtml(i, color)}</li>`)
            .join("")}</ul>`,
        );
        text.push(items.map((i) => `- ${inlineText(i)}`).join("\n"));
      } else if (g.kind === "button") {
        const [, label, href] = g.lines[0].trim().match(BUTTON_RE);
        html.push(buttonHtml(label, href, first && buttons++ === 0));
        text.push(`${label}: ${href}`);
      } else {
        html.push(`<p style="margin:0 0 16px;font:${size} ${FONT};color:${color}">${g.lines.map((l) => inlineHtml(l, color)).join("<br>")}</p>`);
        text.push(g.lines.map(inlineText).join("\n"));
      }
    }
  }
  return { html: html.join("\n"), text: text.join("\n\n") };
}

/**
 * Baut eine Mail aus mails/<name>.md.
 * @param {"bestaetigung" | "willkommen"} name
 * @param {Record<string, string>} vars Platzhalter, z. B. { "Guide-Titel": "KI-Buchhaltung" }
 */
export function renderMail(name, vars) {
  const raw = fs.readFileSync(path.join(DIR, `${name}.md`), "utf8").replace(/\r\n/g, "\n");
  const all = { Anrede: vars.Vorname ? `Hallo ${vars.Vorname},` : "Hallo,", ...vars };
  const filled = fill(raw, all);

  const header = {};
  const lines = filled.split("\n");
  while (lines.length && /^(Betreff|Vorschau):/.test(lines[0])) {
    const [k, ...v] = lines.shift().split(":");
    header[k] = v.join(":").trim();
  }
  if (!header.Betreff) throw new Error(`mails/${name}.md: Zeile „Betreff: …“ fehlt`);

  const [mainRaw, footRaw = ""] = lines.join("\n").split(/\n---\n/);
  const main = renderPart(mainRaw, { color: INK, size: "16px/1.6", first: true });
  const foot = renderPart(footRaw, { color: MUTED, size: "12.5px/1.6", first: false });

  const html = `<!doctype html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light"><title>${esc(header.Betreff)}</title></head>
<body style="margin:0;padding:0;background:#f4f4f2">
${header.Vorschau ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(header.Vorschau)}${"&#8199;&#65279;&#847;".repeat(20)}</div>` : ""}
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f4f2"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#ffffff;border-radius:16px"><tr><td style="padding:36px 32px 16px">
${main.html}
</td></tr></table>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px"><tr><td style="padding:20px 32px">
${foot.html}
</td></tr></table>
</td></tr></table>
</body></html>`;

  const text = foot.text ? `${main.text}\n\n--\n${foot.text}` : main.text;
  return { subject: header.Betreff, text, html };
}
