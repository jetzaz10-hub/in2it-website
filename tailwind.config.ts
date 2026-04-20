import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue:         "#4A32FF",   /* Electric Indigo — Primary Base */
          "blue-dark":  "#2E1FCC",   /* darker shade for hover */
          indigo:       "#3B3BE8",   /* legacy/logo indigo */
          purple:       "#7B2FBE",
          orange:       "#FF6600",   /* Safety Orange — Secondary Base */
          red:          "#FF3366",   /* Cherry Red — Accent/Action */
          teal:         "#00BFA6",
          "teal-light": "#C8F0EC",
          cyan:         "#6CE8FD",   /* CTA button end color */
        },
        dark: {
          DEFAULT: "#000000",
          navy:    "#080818",
          card:    "#0C1643",
          surface: "#111D58",
        },
      },
      fontFamily: {
        sans:   ["var(--font-poppins)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        chiron: ["'Chiron GoRound TC'", "var(--font-poppins)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        countUp: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        marquee:  "marquee 28s linear infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
      },
      backgroundImage: {
        /* Figma hero: radial black-to-#4634F8 diagonal */
        "hero-gradient":
          "linear-gradient(135deg, #000000 0%, #0a0520 40%, #4634F8 100%)",
        /* Figma Contact Us button: #4634F8 → #6CE8FD (blue-to-cyan) */
        "cta-gradient":
          "linear-gradient(135deg, #4634F8 0%, #6CE8FD 100%)",
        /* Cherry Red → Safety Orange for accented actions */
        "action-gradient":
          "linear-gradient(90deg, #FF3366 0%, #FF6600 100%)",
        "stats-gradient":
          "linear-gradient(90deg, #2E1FCC 0%, #4A32FF 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(12,22,67,0.95) 0%, rgba(17,29,88,0.8) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
