import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b", // Zinc 950
        surface: "#18181b", // Zinc 900
        primary: {
          DEFAULT: "#9333ea", // Purple 600
          gradientStart: "#7c3aed",
          gradientEnd: "#db2777", // Pink 600
        }
      },
    },
  },
  plugins: [],
};
export default config;
