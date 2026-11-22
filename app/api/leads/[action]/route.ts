import { NextResponse } from "next/server";
import { GUIDES } from "@/lib/guides";
import { CONSENT_TEXT } from "@/lib/leads";

/**
 * Leitet Anmeldungen aus dem Guide-Formular an den Lead-Dienst auf dem VPS weiter.
 * Das Geheimnis bleibt so auf dem Server, der Browser spricht nur mit solvomind.de.
 *
 * Außerdem laufen die Links aus der Bestätigungsmail (/api/leads/bestaetigen,
 * /api/leads/abmelden) hier durch, damit Leads nur solvomind.de sehen.
 *
 * Umgebungsvariablen (Vercel → Settings → Environment Variables):
 *   LEADS_API_URL     https://leads.82-165-24-131.sslip.io
 *   LEADS_API_SECRET  gleicher Wert wie in leads-service/.env
 */
export const dynamic = "force-dynamic";

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const clientIp = (req: Request) => (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();

function config() {
  const base = process.env.LEADS_API_URL?.replace(/\/$/, "");
  const secret = process.env.LEADS_API_SECRET;
  if (!base || !secret) console.error("[leads] LEADS_API_URL oder LEADS_API_SECRET fehlt");
  return base && secret ? { base, secret } : null;
}

/** Bestätigen/Abmelden: Seite vom Lead-Dienst holen (GET) bzw. Knopfdruck weiterreichen (POST). */
async function mailLink(req: Request, action: string) {
  const cfg = config();
  if (!cfg) return new NextResponse("Gerade nicht erreichbar. Bitte später erneut versuchen.", { status: 503 });
  const token = new URL(req.url).searchParams.get("t") ?? "";
  try {
    const r = await fetch(`${cfg.base}/${action}?t=${encodeURIComponent(token)}`, {
      method: req.method,
      headers: { Authorization: `Bearer ${cfg.secret}`, "X-Lead-Ip": clientIp(req) },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    return new NextResponse(await r.text(), {
      status: r.status,
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
    });
  } catch (e) {
    console.error("[leads] Lead-Dienst nicht erreichbar:", e);
    return new NextResponse("Gerade nicht erreichbar. Bitte später erneut versuchen.", { status: 502 });
  }
}

const MAIL_LINKS = ["bestaetigen", "abmelden"];

export async function GET(req: Request, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params;
  if (!MAIL_LINKS.includes(action)) return NextResponse.json({ error: "not found" }, { status: 404 });
  return mailLink(req, action);
}

export async function POST(req: Request, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params;
  if (MAIL_LINKS.includes(action)) return mailLink(req, action);
  if (action !== "subscribe" && action !== "answer") {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const cfg = config();
  if (!cfg) return NextResponse.json({ error: "config" }, { status: 503 });
  const { base, secret } = cfg;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "json" }, { status: 400 });
  }

  let payload: Record<string, string>;
  if (action === "subscribe") {
    // Honeypot: Menschen sehen dieses Feld nicht, Bots füllen es aus.
    if (str(body.website, 200)) return NextResponse.json({ ok: true, ref: "" });
    const guide = GUIDES.find((g) => g.slug === body.guide);
    if (!guide) return NextResponse.json({ error: "guide" }, { status: 400 });
    payload = {
      email: str(body.email, 254),
      name: str(body.name, 80),
      company: str(body.company, 120),
      guide: guide.slug,
      guideTitle: guide.title,
      consentText: CONSENT_TEXT,
      ip: clientIp(req),
      ua: str(req.headers.get("user-agent"), 300),
    };
  } else {
    payload = { ref: str(body.ref, 64), answer: str(body.answer, 500) };
  }

  try {
    const r = await fetch(`${base}/${action}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    const data = await r.json().catch(() => ({}));
    return NextResponse.json(data, { status: r.status });
  } catch (e) {
    console.error("[leads] Lead-Dienst nicht erreichbar:", e);
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}
