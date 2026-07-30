"use client";

import { ReactNode, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

type Props = {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
};

/**
 * Altari-Stil Sektionskopf: kleines Uppercase-Eyebrow, große Headline
 * (Teile davon via <Accent> in Lime), gedämpfter Intro-Text darunter.
 * Reveal als leichter Block-Fade — performant auf Mobilgeräten.
 */
export default function SectionTitle({
  label,
  title,
  intro,
  align = "center",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = ref.current?.querySelectorAll("[data-st]");
      if (!items?.length) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from(items, {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        clearProps: "transform,opacity",
      });
      if (document.hidden) tl.progress(1);
    },
    { scope: ref }
  );

  const alignClass =
    align === "center" ? "text-center mx-auto items-center" : "text-left";

  return (
    <div ref={ref} className={`flex flex-col max-w-3xl ${alignClass}`}>
      <span
        data-st
        className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-accent/80"
      >
        {label}
      </span>
      <h2
        data-st
        className="mt-4 text-[2rem] md:text-4xl lg:text-[2.9rem] font-semibold tracking-tightest leading-[1.08]"
      >
        {title}
      </h2>
      {intro && (
        <p
          data-st
          className={`mt-4 text-base md:text-lg text-muted leading-relaxed ${
            align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/** Lime-Akzent innerhalb der Headline — analog zu Altaris Lavendel-Highlights. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-accent">{children}</span>;
}
