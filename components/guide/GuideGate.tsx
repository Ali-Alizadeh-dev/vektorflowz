"use client";

import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Check, Lock } from "lucide-react";
import { CONSENT_LABEL, INTEREST_OPTIONS, UNLOCK_KEY } from "@/lib/leads";

/**
 * Sperrt den Rest eines Guides hinter einer E-Mail-Anmeldung.
 *
 * Der gesperrte Inhalt steht trotzdem vollständig im HTML (für Google) und ist
 * nur optisch abgeschnitten. Das JSON-LD sagt Suchmaschinen, dass es sich um
 * Inhalt hinter einer Anmeldung handelt, und nicht um verstecktes Cloaking.
 *
 * Eine Anmeldung schaltet alle Guides frei (localStorage).
 */
export default function GuideGate({
  guide,
  title,
  description,
  url,
  booking,
  children,
}: {
  /** Slug aus lib/guides/index.ts */
  guide: string;
  title: string;
  description: string;
  url: string;
  booking: string;
  children: ReactNode;
}) {
  // ready: erst nach dem Lesen des localStorage Formular zeigen, sonst blitzt es bei Wiederkehrern kurz auf
  const [ready, setReady] = useState(false);
  const [locked, setLocked] = useState(true);
  const [done, setDone] = useState<{ email: string; ref: string; confirmed: boolean } | null>(null);

  const remember = () => {
    try {
      localStorage.setItem(UNLOCK_KEY, new Date().toISOString());
    } catch {}
  };

  useEffect(() => {
    let known = false;
    try {
      known = Boolean(localStorage.getItem(UNLOCK_KEY));
    } catch {}
    if (known) {
      setLocked(false);
      setReady(true);
      return;
    }
    // Link aus der Mail (?freigabe=…): schaltet auch auf einem anderen Gerät frei
    const url = new URL(window.location.href);
    const token = url.searchParams.get("freigabe");
    if (!token) return setReady(true);
    url.searchParams.delete("freigabe");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    fetch(`/api/leads/freigabe?t=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) {
          remember();
          setLocked(false);
        }
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  const unlock = (email: string, ref: string, confirmed: boolean) => {
    remember();
    setDone({ email, ref, confirmed });
    setLocked(false);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    author: { "@type": "Person", name: "Ali Alizadeh" },
    isAccessibleForFree: false,
    hasPart: { "@type": "WebPageElement", isAccessibleForFree: false, cssSelector: ".guide-locked" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {done && <ThankYou email={done.email} answerRef={done.ref} confirmed={done.confirmed} booking={booking} />}

      <div className="relative">
        <div
          className={locked ? "guide-locked max-h-[300px] select-none overflow-hidden" : "guide-locked"}
          inert={locked}
          aria-hidden={locked || undefined}
        >
          {children}
        </div>
        {locked && <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-bg" />}
      </div>

      {locked && ready && <GateForm guide={guide} onUnlock={unlock} />}
    </>
  );
}

const INPUT =
  "h-11 w-full rounded-[10px] border border-line-2 bg-bg px-3.5 text-[15px] text-fg outline-none transition-colors placeholder:text-muted-2 focus:border-accent";

function GateForm({ guide, onUnlock }: { guide: string; onUnlock: (email: string, ref: string, confirmed: boolean) => void }) {
  const id = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/leads/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guide,
          email,
          website: f.get("website"),
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok) return onUnlock(email, data.ref ?? "", data.confirmed === true);
      setError(
        data.error === "email"
          ? "Bitte prüfen Sie die E-Mail-Adresse."
          : data.error === "rate"
            ? "Zu viele Versuche. Bitte in ein paar Minuten noch einmal."
            : "Das hat gerade nicht geklappt. Bitte noch einmal versuchen oder kurz an ali.alizadeh@solvomind.de schreiben.",
      );
    } catch {
      setError("Keine Verbindung. Bitte noch einmal versuchen.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      aria-labelledby={`${id}-h`}
      className="relative -mt-6 overflow-hidden rounded-[18px] border border-line-2 bg-surface px-5 py-6 md:px-7 md:py-7"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_100%_at_0%_0%,rgba(164,230,58,0.10),transparent_60%)]" />
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
          <Lock size={12} aria-hidden /> Kostenlos
        </span>
        <h2 id={`${id}-h`} className="mt-3 text-[22px] font-bold leading-tight tracking-[-0.025em]">
          Den ganzen Guide sofort lesen
        </h2>
        <p className="mt-2 text-[15px] leading-[1.6] text-muted">
          E-Mail eintragen und den kompletten Guide sofort lesen. Kein Spam, nur Inhalte, die Ihnen wirklich weiterhelfen.
        </p>

        <form onSubmit={submit} className="mt-5">
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <label htmlFor={`${id}-email`} className="sr-only">E-Mail</label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={254}
              placeholder="name@firma.de"
              className={INPUT}
            />
            <button type="submit" disabled={busy} className="btn btn-primary h-11 flex-none disabled:opacity-60">
              {busy ? "Einen Moment …" : "Guide freischalten"}
              {!busy && <ArrowRight size={16} aria-hidden />}
            </button>
          </div>
          {/* Honeypot gegen Bots: für Menschen unsichtbar */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label>
              Website <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div>
            <p role="alert" aria-live="polite" className="mt-3 text-[14px] text-[#F5A524] empty:hidden">
              {error}
            </p>
            <p className="mt-3 text-[12px] leading-[1.55] text-muted-2">
              {CONSENT_LABEL}{" "}
              <a href="/de/datenschutz" className="underline underline-offset-2 hover:text-muted">
                Datenschutz
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function ThankYou({ email, answerRef, confirmed, booking }: { email: string; answerRef: string; confirmed: boolean; booking: string }) {
  const id = useId();
  const [pick, setPick] = useState("");
  const [other, setOther] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "sent">("idle");

  async function send(e: FormEvent) {
    e.preventDefault();
    const answer = [pick, other.trim()].filter(Boolean).join(" – ");
    if (!answer || !answerRef) return setState("sent");
    setState("busy");
    try {
      await fetch("/api/leads/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: answerRef, answer }),
      });
    } catch {}
    setState("sent");
  }

  return (
    <section
      aria-live="polite"
      className="mb-2 mt-14 rounded-[18px] border border-[rgba(164,230,58,0.35)] bg-[linear-gradient(135deg,rgba(164,230,58,0.08),transparent_60%)] px-5 py-6 md:px-7"
    >
      <p className="flex items-center gap-2 text-[17px] font-semibold">
        <Check size={18} className="text-accent" aria-hidden /> {confirmed ? "Willkommen zurück. Viel Spaß beim Lesen." : "Freigeschaltet. Viel Spaß beim Lesen."}
      </p>
      {!confirmed && (
        <p className="mt-1.5 text-[14.5px] leading-[1.6] text-muted">
          Bitte bestätigen Sie noch kurz die Mail, die gerade an <b className="text-fg">{email}</b> gegangen ist.
        </p>
      )}

      {state === "sent" ? (
        <p className="mt-5 text-[14.5px] text-muted">Danke, das hilft mir weiter.</p>
      ) : (
        <form onSubmit={send} className="mt-5 border-t border-line pt-5">
          <p id={`${id}-q`} className="text-[15px] font-medium">
            Eine Frage, ganz freiwillig: Was möchten Sie als Erstes automatisieren?
          </p>
          <div role="radiogroup" aria-labelledby={`${id}-q`} className="mt-3 flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((o) => (
              <button
                key={o}
                type="button"
                role="radio"
                aria-checked={pick === o}
                onClick={() => setPick(pick === o ? "" : o)}
                className={`rounded-full border px-3.5 py-1.5 text-[13.5px] transition-colors ${
                  pick === o ? "border-accent bg-accent-soft text-fg" : "border-line-2 text-muted hover:text-fg"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              value={other}
              onChange={(e) => setOther(e.target.value)}
              maxLength={300}
              placeholder="Oder in eigenen Worten …"
              aria-label="Vorhaben in eigenen Worten"
              className={INPUT}
            />
            <button type="submit" disabled={state === "busy" || (!pick && !other.trim())} className="btn btn-ghost btn-sm h-11 flex-none disabled:opacity-50">
              Senden
            </button>
          </div>
        </form>
      )}

      <p className="mt-5 text-[14px] text-muted">
        Lieber direkt sprechen?{" "}
        <a href={booking} className="font-medium text-fg underline decoration-line-2 underline-offset-4 hover:decoration-accent">
          Kostenloses Erstgespräch buchen
        </a>
      </p>
    </section>
  );
}
