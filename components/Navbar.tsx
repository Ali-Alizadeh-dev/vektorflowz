"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const links = [
  { href: "#home", label: "Home" },
  { href: "#leistungen", label: "Leistungen" },
  { href: "#ablauf", label: "Ablauf" },
  { href: "#ueber-mich", label: "Über mich" },
];

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      gsap.from(ref.current, {
        y: -16,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: ref }
  );

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      el.dataset.scrolled = window.scrollY > 12 ? "true" : "false";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={ref}
      data-scrolled="false"
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300 data-[scrolled=true]:bg-bg/75 data-[scrolled=true]:backdrop-blur-md data-[scrolled=true]:border-b data-[scrolled=true]:border-line"
    >
      <nav className="mx-auto max-w-7xl px-5 md:px-8 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="text-base font-medium tracking-tight inline-flex items-center gap-2.5"
        >
          <span className="relative inline-block w-7 h-7">
            <span className="absolute inset-0 rounded-lg bg-accent" />
            <span className="absolute inset-0 flex items-center justify-center text-[12px] font-bold text-bg">
              V
            </span>
          </span>
          Vektorflowz
        </a>

        <ul className="hidden md:flex items-center gap-8 text-base text-muted">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-fg transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#kontakt"
            className="hidden sm:inline-flex items-center gap-2 pl-5 pr-3 py-2 rounded-full bg-accent text-bg text-base font-medium hover:bg-accent/90"
          >
            Kontakt
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-bg/15">
              →
            </span>
          </a>
          <button
            aria-label="Menü"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="md:hidden flex flex-col gap-1.5 w-9 h-9 items-center justify-center rounded-full border border-line"
          >
            <span
              className={`block w-4 h-px bg-fg transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`block w-4 h-px bg-fg transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-5 pb-6 pt-2 flex flex-col gap-3 text-base">
          {[...links, { href: "#kontakt", label: "Kontakt" }].map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-1.5 text-muted hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
