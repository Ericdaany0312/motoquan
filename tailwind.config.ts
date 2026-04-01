import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F5F6FA",
        surface: "#FFFFFF",
        line: "#E6EAF2",
        primary: "#0A84FF",
        primarySoft: "#E7F2FF",
        secondary: "#FF6B35",
        secondarySoft: "#FFF0EA",
        heading: "#1A1A2E",
        body: "#6B7280"
      },
      boxShadow: {
        card: "0 18px 40px rgba(20, 31, 56, 0.08)",
        float: "0 26px 60px rgba(10, 132, 255, 0.12)"
      },
      backgroundImage: {
        "speed-lines":
          "linear-gradient(125deg, rgba(10,132,255,0.08) 0%, rgba(10,132,255,0.08) 12%, transparent 12%, transparent 100%)",
        "track-grid":
          "linear-gradient(rgba(26,26,46,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,46,0.04) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
