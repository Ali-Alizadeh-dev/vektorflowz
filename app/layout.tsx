import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

// preload: false lets us omit `subsets` while next/font still self-hosts
// the font (no request to Google servers — keeps the DSGVO promise on
// the Datenschutz page intact).
const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={roboto.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
