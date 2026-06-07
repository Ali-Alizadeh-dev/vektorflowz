"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

/**
 * The plain "V" mark — used in Navbar & Footer.
 * Inline SVG so Tailwind can size it (`w-7 h-7` etc.) and it inherits
 * crisp rendering at every density.
 */
export function LogoMark({ className = "w-7 h-7" }: { className?: string }) {
  const id = "vfBlade"; // stable id is fine — same gradient everywhere
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4deeea" />
          <stop offset="1" stopColor="#2bb6b3" />
        </linearGradient>
      </defs>
      <path
        d="M16 22 H40 L60 78 L80 22 H104 L72 98 H48 Z"
        fill={`url(#${id})`}
      />
      <path
        d="M16 22 H40 L60 78 L80 22 H104"
        stroke="#bafffd"
        strokeWidth="1.2"
        opacity=".5"
        fill="none"
      />
    </svg>
  );
}

/**
 * The "flow updraft" mark — the V with rising flow streams behind it.
 * The shipped animated SVG had empty CSS classes (no keyframes), so we
 * inline the paths here and drive the streams with GSAP — same look,
 * fully under our control, fits the rest of the motion language.
 */
export function LogoFlow({ className = "w-24 h-24" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const streams =
        ref.current?.querySelectorAll<SVGPathElement>("[data-stream]");
      if (!streams) return;

      streams.forEach((s, i) => {
        const length = s.getTotalLength();
        gsap.set(s, {
          strokeDasharray: `${length * 0.35} ${length}`,
          strokeDashoffset: length,
        });
        gsap.to(s, {
          strokeDashoffset: -length,
          duration: 3.2 + i * 0.45,
          repeat: -1,
          ease: "none",
        });
      });
    },
    { scope: ref as React.RefObject<Element> }
  );

  return (
    <svg
      ref={ref}
      viewBox="28 14 104 112"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vfUp" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4deeea" />
          <stop offset="1" stopColor="#2bb6b3" />
        </linearGradient>
      </defs>

      {/* Animated flow streams behind the V */}
      <g
        style={{ mixBlendMode: "screen" }}
        stroke="#4deeea"
        fill="none"
        strokeLinecap="round"
      >
        <path
          data-stream
          d="M64 118 C58 84 72 60 60 22"
          strokeWidth="2.4"
          opacity="0.8"
        />
        <path
          data-stream
          d="M80 118 C86 84 72 60 84 22"
          strokeWidth="2.4"
          opacity="0.8"
        />
        <path
          data-stream
          d="M96 118 C90 84 104 60 92 22"
          strokeWidth="2.4"
          opacity="0.8"
        />
        <path
          data-stream
          d="M52 118 C58 84 44 60 56 22"
          strokeWidth="1.4"
          opacity="0.4"
        />
        <path
          data-stream
          d="M108 118 C102 84 116 60 104 22"
          strokeWidth="1.4"
          opacity="0.4"
        />
      </g>

      {/* The V mark on top */}
      <path
        d="M36 42 H60 L80 98 L100 42 H124 L92 118 H68 Z"
        fill="url(#vfUp)"
      />
      <path
        d="M36 42 H60 L80 98 L100 42 H124"
        stroke="#bafffd"
        strokeWidth="1.2"
        opacity="0.5"
        fill="none"
      />
    </svg>
  );
}
