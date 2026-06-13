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
  metadataBase: new URL("https://vektorflowz.de"),
  title: "Vektorflowz — KI-Automatisierungen für Unternehmen",
  description:
    "Ich automatisiere wiederkehrende Aufgaben mit KI – damit Ihr Unternehmen Zeit spart, Fehler vermeidet und sich aufs Wesentliche konzentriert. Persönlich, praxisnah, DSGVO-konform. Aus Hamburg, deutschlandweit.",
  keywords: [
    "KI-Automatisierung",
    "Prozessautomatisierung",
    "KI-Assistenten",
    "Vektorflowz",
    "Hamburg",
  ],
  authors: [{ name: "Ali Alizadeh" }],
  icons: {
    icon: [
      { url: "/logo/vektorflowz-favicon.svg", type: "image/svg+xml" },
      { url: "/logo/png/vektorflowz-favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/logo/png/vektorflowz-favicon-180.png", sizes: "180x180" },
  },
  openGraph: {
    title: "Vektorflowz — KI-Automatisierungen für Unternehmen",
    description:
      "Ich automatisiere wiederkehrende Aufgaben mit KI – damit Ihr Unternehmen Zeit spart und sich aufs Wesentliche konzentriert. Persönlich, praxisnah, DSGVO-konform.",
    images: ["/logo/png/vektorflowz-mark-512.png"],
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
