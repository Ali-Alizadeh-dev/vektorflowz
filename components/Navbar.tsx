"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { X } from "lucide-react";
import { LogoMark } from "./Logo";

const links = [
  { href: "#leistungen", label: "Lösungen" },
  { href: "#ablauf", label: "Ablauf" },
  { href: "#showcase", label: "Automatisierung" },
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
];

const Wordmark = ({ className = "" }: { className?: string }) => (
  <span className="inline-flex items-center gap-2.5">
    <LogoMark className="w-7 h-7" />
    <span className={`font-semibold tracking-tight ${className}`}>
      solvomind<span className="text-accent">.</span>
    </span>
  </span>
);

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Entrance animation
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

  // Scroll border
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

  // GSAP slide-in / slide-out for the drawer
  useEffect(() => {
    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;
    if (!drawer || !backdrop) return;

    if (open) {
      // prevent page scroll while drawer is open
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        backdrop,
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "auto", duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        drawer,
        { x: "100%" },
        { x: "0%", duration: 0.45, ease: "power3.out" }
      );
      // stagger links in
      gsap.fromTo(
        drawer.querySelectorAll("[data-nav-link]"),
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power3.out", delay: 0.2 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(backdrop, { opacity: 0, pointerEvents: "none", duration: 0.25, ease: "power2.in" });
      gsap.to(drawer, { x: "100%", duration: 0.35, ease: "power3.in" });
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        ref={ref}
        className="fixed top-2 sm:top-3 lg:top-4 inset-x-0 z-50 px-3 sm:px-5"
      >
        <nav className="mx-auto max-w-5xl h-14 flex items-center justify-between gap-4 pl-5 pr-2 rounded-full bg-surface/80 backdrop-blur-md border border-line shadow-card">
          <a href="#home" className="text-lg inline-flex items-center">
            <Wordmark />
          </a>

          <ul className="hidden md:flex items-center gap-7 text-[0.95rem] text-muted">
            {links.slice(0, -1).map((l) => (
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
              className="hidden md:inline-flex items-center gap-2 pl-4 pr-2 py-1.5 rounded-full bg-accent text-white text-[0.95rem] font-medium hover:bg-accent/90 transition-colors"
            >
              Kontakt
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20">
                →
              </span>
            </a>

            {/* Burger — mobile only */}
            <button
              aria-label="Menü öffnen"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="md:hidden flex flex-col gap-[5px] w-10 h-10 items-center justify-center rounded-full border border-line bg-surface"
            >
              <span className="block w-4 h-px bg-fg" />
              <span className="block w-4 h-px bg-fg" />
            </button>
          </div>
        </nav>
      </header>

      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={() => setOpen(false)}
        className="md:hidden fixed inset-0 z-[60] bg-bg/60 backdrop-blur-sm opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Slide-in drawer */}
      <div
        ref={drawerRef}
        className="md:hidden fixed top-0 right-0 bottom-0 z-[70] w-[78vw] max-w-[320px] bg-surface border-l border-line flex flex-col translate-x-full"
        style={{ willChange: "transform" }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-line shrink-0">
          <Wordmark className="text-base" />
          <button
            aria-label="Menü schließen"
            onClick={() => setOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-line hover:bg-fg/[0.05] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href} data-nav-link>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 py-3.5 text-xl font-medium text-fg/80 hover:text-fg border-b border-line/50 transition-colors"
                >
                  <span className="text-accent text-sm font-normal">→</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA at bottom */}
        <div className="px-6 py-6 border-t border-line shrink-0">
          <a
            href="#kontakt"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-accent text-bg text-base font-medium hover:bg-accent/90"
          >
            Unverbindlich austauschen →
          </a>
        </div>
      </div>
    </>
  );
}
