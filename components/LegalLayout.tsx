import Link from "next/link";
import Footer from "./Footer";
import { LogoLockup } from "./Logo";

export default function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-line bg-bg/70 backdrop-blur-md sticky top-0 z-10">
        <div className="mx-auto max-w-3xl px-5 md:px-8 h-16 flex items-center justify-between text-sm">
          <Link
            href="/"
            className="text-muted hover:text-fg transition-colors inline-flex items-center gap-2"
          >
            <span aria-hidden>←</span> Zurück
          </Link>
          <LogoLockup />
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-5 md:px-8 py-20 md:py-24">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent text-on-accent text-xs font-medium">
          Rechtliches
        </span>
        <h1 className="mt-6 text-4xl md:text-6xl font-medium tracking-tightest leading-[1.05]">
          {title}
        </h1>
        <div className="hairline mt-10" />
        <div className="mt-10 space-y-6 text-fg/85 leading-relaxed [&_h2]:text-xl [&_h2]:font-medium [&_h2]:mt-12 [&_h2]:text-fg [&_h2]:tracking-tight [&_a]:text-accent [&_a:hover]:underline [&_strong]:text-fg [&_ul]:my-2">
          {children}
        </div>
      </article>

      <Footer />
    </main>
  );
}
