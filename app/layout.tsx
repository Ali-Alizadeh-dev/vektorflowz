import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans, Montserrat } from "next/font/google";
import "./globals.css";

// Self-hosted via next/font (no request to Google servers — keeps the
// DSGVO promise on the Datenschutz page intact).
// Space Grotesk = distinctive tech/AI display face for headlines.
const display = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
  preload: false,
});

// DM Sans = clean, warm body face.
const sans = DM_Sans({
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

// Montserrat = wordmark only (single weight keeps the payload small).
const brand = Montserrat({
  weight: ["800"],
  variable: "--font-brand",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://solvomind.de"),
  title: "solvomind — KI-Automatisierungen für Unternehmen",
  description:
    "Wir automatisieren wiederkehrende Aufgaben mit KI – damit Ihr Unternehmen Zeit spart, Fehler vermeidet und sich aufs Wesentliche konzentriert. Persönlich, praxisnah, DSGVO-konform. Aus Hamburg, deutschlandweit.",
  keywords: [
    "KI-Automatisierung",
    "Prozessautomatisierung",
    "KI-Assistenten",
    "solvomind",
    "Hamburg",
  ],
  authors: [{ name: "Ali Alizadeh" }],
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
  },
  openGraph: {
    title: "solvomind — KI-Automatisierungen für Unternehmen",
    description:
      "Wir automatisieren wiederkehrende Aufgaben mit KI – damit Ihr Unternehmen Zeit spart und sich aufs Wesentliche konzentriert. Persönlich, praxisnah, DSGVO-konform.",
    locale: "de_DE",
    type: "website",
  },
};

export const viewport: Viewport = {
  // Matches --canvas so mobile browser chrome blends into the dark page.
  themeColor: "#1b2128",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${display.variable} ${sans.variable} ${brand.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
