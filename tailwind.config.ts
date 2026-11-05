import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nike: {
          ink: "#111111",
          canvas: "#ffffff",
          "soft-cloud": "#f5f5f5",
          hairline: "#cacacb",
          "hairline-soft": "#e5e5e5",
          charcoal: "#39393b",
          ash: "#4b4b4d",
          mute: "#707072",
          stone: "#9e9ea0",
          sale: "#d30005",
          "sale-deep": "#780700",
          success: "#007d48",
          info: "#1151ff",
        },
      },
      fontFamily: {
        campaign: ["var(--font-bebas)", "Bebas Neue", "Impact", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "Helvetica Now Text", "Helvetica Neue", "Arial", "sans-serif"],
      },
      spacing: {
        section: "48px",
      },
    },
  },
  plugins: [],
} satisfies Config;
