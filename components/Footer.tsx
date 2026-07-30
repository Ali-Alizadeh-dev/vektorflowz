import Link from "next/link";
import { Instagram } from "lucide-react";
import { LogoLockup } from "./Logo";

const nav = [
  { href: "#leistungen", label: "Lösungen" },
  { href: "#ablauf", label: "Ablauf" },
  { href: "#rechner", label: "Kosten-Rechner" },
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="px-2 sm:px-3 lg:px-4 pt-3 lg:pt-4 pb-2 sm:pb-3 lg:pb-4">
      <div className="bg-ink text-fg/70 rounded-[1.5rem] md:rounded-[2.25rem] border border-line">
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-14 md:py-20">
          {/* Columns */}
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <Link href="#home" className="inline-flex items-center">
                <LogoLockup />
              </Link>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
                KI-Automatisierungen für Unternehmen – persönlich entwickelt,
                praxisnah umgesetzt und DSGVO-konform.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/solvomind/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="solvomind auf Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg/70 hover:text-accent hover:border-accent/40 transition-colors"
                >
                  <Instagram size={18} strokeWidth={1.75} />
                </a>
              </div>
            </div>

            <div className="md:col-span-3">
              <p className="text-sm uppercase tracking-[0.2em] text-muted">
                Navigation
              </p>
              <ul className="mt-4 space-y-2.5">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      className="text-base text-fg/70 hover:text-accent transition-colors"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4">
              <p className="text-sm uppercase tracking-[0.2em] text-muted">
                Kontakt
              </p>
              <ul className="mt-4 space-y-2.5 text-base">
                <li>
                  <a
                    href="mailto:ali.alizadeh@solvomind.de"
                    className="text-fg/70 hover:text-accent transition-colors break-all"
                  >
                    ali.alizadeh@solvomind.de
                  </a>
                </li>
                <li className="text-muted">Hamburg, Deutschland</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-line flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-muted">
            <span>© {new Date().getFullYear()} Ali Alizadeh · solvomind</span>
            <nav className="flex items-center gap-6">
              <Link href="/impressum" className="hover:text-accent transition-colors">
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="hover:text-accent transition-colors"
              >
                Datenschutz
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
