import { getDict, type Locale } from "@/lib/i18n";
import { Footer } from "./site/Closing";
import { LogoLockup } from "./Logo";

export default function LegalLayout({
  title,
  locale,
  children,
}: {
  title: string;
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = getDict(locale);
  return (
    <>
      <main className="min-h-screen bg-bg">
        <header className="sticky top-0 z-10 border-b border-line bg-[rgba(18,22,27,0.8)] backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 text-sm md:px-8">
            <a href={`/${locale}`} className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
              <span aria-hidden>←</span> {t.legal.back}
            </a>
            <LogoLockup />
          </div>
        </header>

        <article lang="de" className="mx-auto max-w-3xl px-5 py-20 md:px-8 md:py-24">
          <span className="inline-flex items-center rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-on-accent">{t.legal.badge}</span>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-6xl">{title}</h1>
          {t.legal.germanOnly && <p lang={locale} className="mt-5 text-sm text-muted">{t.legal.germanOnly}</p>}
          <div className="mt-10 h-px bg-line" />
          <div className="legal mt-10 space-y-6 leading-relaxed text-fg/85">{children}</div>
        </article>
      </main>
      <Footer t={t.footer} locale={locale} />
    </>
  );
}
