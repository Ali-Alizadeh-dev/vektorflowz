import Link from "next/link";
import { LogoMark } from "./Logo";

const nav = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#ablauf", label: "Ablauf" },
  { href: "#ueber-mich", label: "Über mich" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer className="mt-20 md:mt-28 border-t border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand + claim */}
          <div className="md:col-span-5">
            <Link
              href="#home"
              className="inline-flex items-center gap-2.5 text-base font-medium"
            >
              <LogoMark className="w-7 h-7" />
              Vektorflowz
            </Link>
            <p className="mt-4 max-w-sm text-base text-muted leading-relaxed">
              KI-Automatisierungen, die wiederkehrende Aufgaben übernehmen –
              persönlich umgesetzt, praxisnah und DSGVO-konform.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="text-sm uppercase tracking-[0.2em] text-muted">
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-base text-fg/80 hover:text-accent transition-colors"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <p className="text-sm uppercase tracking-[0.2em] text-muted">
              Kontakt
            </p>
            <ul className="mt-4 space-y-2.5 text-base">
              <li>
                <a
                  href="mailto:ali.alizadeh@vektorflowz.de"
                  className="text-fg/80 hover:text-accent transition-colors break-all"
                >
                  ali.alizadeh@vektorflowz.de
                </a>
              </li>
              <li>
                <a
                  href="tel:+491794392400"
                  className="text-fg/80 hover:text-accent transition-colors"
                >
                  0179 4392400
                </a>
              </li>
              <li className="text-muted">Hamburg, Deutschland</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-line flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-muted">
          <span>© {new Date().getFullYear()} Ali Alizadeh · Vektorflowz</span>
          <nav className="flex items-center gap-6">
            <Link href="/impressum" className="hover:text-fg transition-colors">
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="hover:text-fg transition-colors"
            >
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
