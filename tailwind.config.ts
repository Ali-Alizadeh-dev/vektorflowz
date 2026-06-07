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
        sans: ["var(--font-roboto)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,19,22,0.04), 0 8px 24px -10px rgba(16,19,22,0.1)",
        "card-lg":
          "0 1px 2px rgba(16,19,22,0.04), 0 24px 48px -16px rgba(16,19,22,0.16)",
        "accent-glow": "0 8px 30px -6px rgba(13,148,136,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
