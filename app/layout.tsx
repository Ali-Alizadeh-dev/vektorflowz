import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vektorflowz — KI-Automatisierungen für Unternehmen",
  description:
    "Vektorflowz baut KI-Automatisierungen, die Zeit und Geld sparen. Klare Prozesse, messbarer Mehrwert, schnelle Umsetzung.",
  openGraph: {
    title: "Vektorflowz — KI-Automatisierungen",
    description:
      "KI-Automatisierungen, die Zeit und Geld sparen. Klare Prozesse, messbarer Mehrwert.",
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
