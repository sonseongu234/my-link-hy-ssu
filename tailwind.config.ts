import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
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
        campaign: ["'Bebas Neue'", "Impact", "sans-serif"],
        sans: ["'Inter'", "Helvetica Neue", "Arial", "sans-serif"],
      },
      spacing: {
        section: "48px",
      },
    },
  },
  plugins: [],
} satisfies Config;
