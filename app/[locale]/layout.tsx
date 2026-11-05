import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Plus_Jakarta_Sans, Montserrat } from "next/font/google";
import "../globals.css";
import { LOCALES, getDict, isLocale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import ConsentBanner from "@/components/site/ConsentBanner";

// Selbst gehostet über next/font – keine Anfrage an Google-Server (DSGVO).
// Eine Schrift für alles (Headlines + Text), eng gesetzt.
// Variable Font (200–800) – erlaubt auch Zwischenstärken wie 450.
const sans = Plus_Jakarta_Sans({ variable: "--font-sans", display: "swap", subsets: ["latin"] });
const brand = Montserrat({ weight: ["800"], variable: "--font-brand", display: "swap", preload: false });

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return {
    metadataBase: new URL(SITE.url),
    title: t.meta.title,
    description: t.meta.description,
    authors: [{ name: "Ali Alizadeh" }],
    alternates: {
      canonical: `/${locale}`,
      languages: { de: "/de", en: "/en", "x-default": "/de" },
    },
    icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }], apple: [{ url: "/icon.svg" }] },
    openGraph: { title: t.meta.title, description: t.meta.description, locale: t.meta.ogLocale, type: "website" },
  };
}

export const viewport: Viewport = { themeColor: "#0b0c0e" };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} className={`${sans.variable} ${brand.variable}`}>
      <body>
        {children}
        <ConsentBanner t={getDict(locale).consent} locale={locale} />
      </body>
    </html>
  );
}
