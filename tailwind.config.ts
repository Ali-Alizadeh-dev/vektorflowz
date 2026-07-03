import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        line: "var(--line)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,18,32,0.04), 0 6px 16px -8px rgba(11,18,32,0.08), 0 16px 40px -20px rgba(11,18,32,0.12)",
        "card-lg":
          "0 2px 4px rgba(11,18,32,0.04), 0 12px 28px -12px rgba(11,18,32,0.12), 0 40px 80px -32px rgba(11,18,32,0.22)",
        frame:
          "0 4px 12px rgba(11,18,32,0.05), 0 24px 60px -20px rgba(11,18,32,0.16), 0 60px 120px -60px rgba(0,61,240,0.22)",
        "accent-glow": "0 10px 34px -8px rgba(0,61,240,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
