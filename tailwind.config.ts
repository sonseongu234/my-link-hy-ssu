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
        background: "var(--background)",
        foreground: "var(--foreground)",
        neo: {
          bg: "#FFFDF5",
          paper: "#FAF7EE",
          yellow: "#FFE600",
          lime: "#A3E635",
          pink: "#FF6EA7",
          cyan: "#38BDF8",
          purple: "#C084FC",
          orange: "#FB923C",
          red: "#F87171",
        },
      },
      boxShadow: {
        neo: "4px 4px 0px 0px #000000",
        "neo-sm": "2px 2px 0px 0px #000000",
        "neo-md": "5px 5px 0px 0px #000000",
        "neo-lg": "6px 6px 0px 0px #000000",
        "neo-xl": "8px 8px 0px 0px #000000",
      },
    },
  },
  plugins: [],
} satisfies Config;
