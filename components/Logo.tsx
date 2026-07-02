type Props = {
  className?: string;
  /** "tile" = blue rounded square with white monogram (default).
   *  "mono" = monogram only, inherits currentColor. */
  variant?: "tile" | "mono";
};

/**
 * solvomind mark — an "s" monogram with a small node dot that echoes the
 * "." accent in the wordmark. Text-based so it stays crisp at every size;
 * the page font (Roboto) is inherited for a consistent look.
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
      {isTile && <rect width="48" height="48" rx="13" fill="#003DF0" />}
      <text
        x="24"
        y="34"
        textAnchor="middle"
        fontSize="30"
        fontWeight="600"
        fontFamily="var(--font-roboto), system-ui, sans-serif"
        fill={isTile ? "#ffffff" : "currentColor"}
      >
        s
      </text>
      <circle
        cx="34"
        cy="15"
        r="3.6"
        fill={isTile ? "#7aa0ff" : "#003DF0"}
      />
    </svg>
  );
}

/** Full lockup: mark + wordmark. */
export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="w-7 h-7" />
      <span className="font-semibold tracking-tight text-lg">
        solvomind<span className="text-accent">.</span>
      </span>
    </span>
  );
}
