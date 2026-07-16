import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: "var(--ink)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        line: "var(--line)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        "on-accent": "var(--on-accent)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        // Montserrat — reserved for the wordmark so the logo stays its own mark.
        brand: ["var(--font-brand)", "var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      boxShadow: {
        // Dark theme: shadows carry more black, and elevation is reinforced
        // by the --line hairline rather than by shadow alone.
        card: "0 1px 2px rgba(0,0,0,0.28), 0 6px 16px -8px rgba(0,0,0,0.45), 0 16px 40px -20px rgba(0,0,0,0.6)",
        "card-lg":
          "0 2px 4px rgba(0,0,0,0.3), 0 12px 28px -12px rgba(0,0,0,0.5), 0 40px 80px -32px rgba(0,0,0,0.7)",
        frame:
          "0 4px 12px rgba(0,0,0,0.35), 0 24px 60px -20px rgba(0,0,0,0.55), 0 60px 120px -60px rgba(164,230,58,0.18)",
        "accent-glow": "0 10px 34px -8px rgba(164,230,58,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
