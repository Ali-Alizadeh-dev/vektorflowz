type Props = {
  className?: string;
  /** "tile" = lime rounded square with charcoal arrow (default).
   *  "mono" = arrow only, inherits currentColor. */
  variant?: "tile" | "mono";
};

/**
 * solvomind mark — a north-east "growth" arrow: one diagonal plus a
 * right-angle head, drawn with square caps and miter joins so it stays
 * geometric at every size. Geometry matches the brand sheet (a 72px glyph
 * centred in a 132px tile), scaled down to a 48 viewBox.
 */
export function LogoMark({ className = "w-8 h-8", variant = "tile" }: Props) {
  const isTile = variant === "tile";
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {isTile && <rect width="48" height="48" rx="11" fill="var(--accent)" />}
      <path
        d="M18.2 29.8 L29.8 18.2 M29.8 18.2 H21.8 M29.8 18.2 V26.2"
        stroke={isTile ? "var(--on-accent)" : "currentColor"}
        strokeWidth="3.3"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
    </svg>
  );
}

/** Full lockup: mark + wordmark. */
export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="w-7 h-7" />
      <span className="font-brand font-extrabold tracking-[-0.01em] text-xl text-accent">
        solvomind
      </span>
    </span>
  );
}
