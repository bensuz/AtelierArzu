import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        burgundy: {
          DEFAULT: "#741616",
          deep: "#4a0f0f",
          soft: "#8f2d2d",
          tint: "#f3e4e2"
        },
        rosewood: {
          DEFAULT: "#6f4a46",
          deep: "#5c3b38"
        },
        ivory: "#fdf9f2",
        cream: "#f6eee2",
        sand: "#eadfd0",
        taupe: {
          DEFAULT: "#a8978a",
          dark: "#6f6057"
        },
        charcoal: "#2b2523",
        // Legacy aliases kept so older utilities keep rendering in-palette
        linen: "#f6eee2",
        shell: "#fdf9f2",
        oat: "#eadfd0",
        clay: "#8f2d2d",
        olive: {
          DEFAULT: "#66705a",
          deep: "#4f5846"
        },
        ink: "#2b2523",
        brass: "#a8783f"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(43, 37, 35, 0.10)",
        lift: "0 10px 30px rgba(74, 15, 15, 0.12)"
      },
      maxWidth: {
        prose: "68ch"
      }
    }
  },
  plugins: [typography]
};

export default config;
