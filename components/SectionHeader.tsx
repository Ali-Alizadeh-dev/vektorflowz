"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SplitWords from "./SplitWords";

type Props = {
  label: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  label,
  title,
  intro,
  align = "center",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from('[data-sec="pill"]', { y: 12, opacity: 0, duration: 0.7 })
        .from(
          '[data-sec="title"] .word-inner',
          { yPercent: 110, duration: 1, stagger: 0.05 },
          "-=0.4"
        )
        .from(
          '[data-sec="intro"] .word-inner',
          { yPercent: 110, duration: 0.7, stagger: 0.012 },
          "-=0.6"
        );
    },
    { scope: ref }
  );

  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div ref={ref} className={`max-w-3xl ${alignClass}`}>
      <span
        data-sec="pill"
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fg text-bg text-sm font-medium`}
      >
        {label}
      </span>
      <SplitWords
        as="h2"
        data-sec="title"
        text={title}
        className="mt-8 text-4xl md:text-5xl lg:text-6xl font-medium tracking-tightest leading-[1.05]"
      />
      {intro && (
        <SplitWords
          as="p"
          data-sec="intro"
          text={intro}
          className={`mt-6 text-lg md:text-xl text-muted leading-relaxed ${align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"}`}
        />
      )}
    </div>
  );
}
