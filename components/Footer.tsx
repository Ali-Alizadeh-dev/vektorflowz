import Link from "next/link";
import { LogoMark } from "./Logo";

const nav = [
  { href: "#leistungen", label: "Lösungen" },
  { href: "#ablauf", label: "So arbeiten wir" },
  { href: "#showcase", label: "Automatisierung" },
  { href: "#warum-solvomind", label: "Warum solvomind" },
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="px-2 sm:px-3 lg:px-4 pt-3 lg:pt-4 pb-2 sm:pb-3 lg:pb-4">
      <div className="bg-[#0b1220] text-white/70 rounded-[1.5rem] md:rounded-[2.25rem]">
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-14 md:py-20">
          {/* Columns */}
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <Link
                href="#home"
                className="inline-flex items-center gap-2.5 text-lg text-white"
              >
                <LogoMark className="w-7 h-7" />
                <span className="font-semibold tracking-tight">
                  solvomind<span className="text-accent">.</span>
                </span>
              </Link>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-white/55">
                KI-Automatisierungen für Unternehmen – persönlich entwickelt,
                praxisnah umgesetzt und DSGVO-konform.
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="text-sm uppercase tracking-[0.2em] text-white/40">
                Navigation
              </p>
              <ul className="mt-4 space-y-2.5">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      className="text-base text-white/70 hover:text-white transition-colors"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4">
              <p className="text-sm uppercase tracking-[0.2em] text-white/40">
                Kontakt
              </p>
              <ul className="mt-4 space-y-2.5 text-base">
                <li>
                  <a
                    href="mailto:ali.alizadeh@solvomind.de"
                    className="text-white/70 hover:text-white transition-colors break-all"
                  >
                    ali.alizadeh@solvomind.de
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+491794392400"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    0179 4392400
                  </a>
                </li>
                <li className="text-white/55">Hamburg, Deutschland</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-white/45">
            <span>© {new Date().getFullYear()} Ali Alizadeh · solvomind</span>
            <nav className="flex items-center gap-6">
              <Link href="/impressum" className="hover:text-white transition-colors">
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="hover:text-white transition-colors"
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
