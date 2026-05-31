"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Mounts once at the root. Refreshes ScrollTrigger after fonts load so
 * measurements are accurate, and ensures triggers see the final layout.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
    });
    return () => ctx.revert();
  }, []);
  return null;
}
