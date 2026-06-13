"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 1 });
  // Mobile browsers fire a resize every time the address bar shows/hides
  // while scrolling. Without this, ScrollTrigger recalculates all triggers
  // on each of those events → janky scrolling on phones.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };
