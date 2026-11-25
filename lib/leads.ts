/**
 * Lead-Erfassung für die Guides.
 * Die Website leitet Anmeldungen über /api/leads/… an den Lead-Dienst auf dem
 * VPS weiter (Ordner leads-service/). Dort liegen die Daten, dort werden die
 * Bestätigungsmails verschickt.
 */

/**
 * Text der Einwilligung unter dem Formular. Wird bei jeder Anmeldung
 * mitgespeichert, damit nachweisbar ist, worin eingewilligt wurde.
 * Bei inhaltlichen Änderungen die Version am Anfang hochzählen.
 */
export const CONSENT_TEXT =
  "[v3] Ab und zu schicken wir Ihnen dazu Praxis-Tipps zu KI-Automatisierung. Abmeldung jederzeit mit einem Klick.";

/** Sichtbarer Teil des Einwilligungstexts (ohne Versionskennung). */
export const CONSENT_LABEL = CONSENT_TEXT.replace(/^\[v\d+\]\s*/, "");

/** localStorage-Schlüssel: einmal angemeldet = alle Guides frei. */
export const UNLOCK_KEY = "solvomind-guides-unlocked";

/** Antwortmöglichkeiten für die freiwillige Frage nach der Anmeldung. */
export const INTEREST_OPTIONS = [
  "Belege & Buchhaltung",
  "E-Mails & Kundenanfragen",
  "Angebote & Dokumente",
  "Daten zwischen Tools übertragen",
  "Weiß ich noch nicht",
];
