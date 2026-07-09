import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090f",
        card: "rgba(255,255,255,0.08)",
        gold: "#d4af37",
        softGold: "#f1d98b",
      },
      backgroundImage: {
        heroGlow:
          "radial-gradient(circle at top, rgba(212,175,55,0.20), transparent 35%), radial-gradient(circle at bottom right, rgba(255,255,255,0.08), transparent 25%), linear-gradient(135deg, #0a0a12 0%, #111122 48%, #1d1531 100%)",
      },
      boxShadow: {
        glass: "0 10px 40px rgba(0, 0, 0, 0.35)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseSlow: "pulseSlow 2.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.85" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
