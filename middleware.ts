import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["de", "en"];

/**
 * Leitet alle Pfade ohne Sprachpräfix auf /de/… oder /en/… um.
 * Grundlage ist die Browsersprache, Standard ist Deutsch.
 * Alte Links wie /impressum landen so automatisch auf /de/impressum.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }
  const accept = req.headers.get("accept-language") ?? "";
  const first = accept.split(",")[0]?.trim().toLowerCase() ?? "";
  const locale = first.startsWith("de") || !first ? "de" : first.startsWith("en") ? "en" : "de";
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Alles außer Next-Interna und Dateien mit Endung (icon.svg, Bilder …)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
