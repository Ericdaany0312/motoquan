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
        canvas:   "#F5F6FA",
        surface:  "#FFFFFF",
        line:     "#E4E6EF",
        heading:  "#1A1A2E",
        body:     "#6B7280",
        muted:    "#9CA3AF",
        primary:  "#0A84FF",
        secondary:"#FF6B35",
        green:    "#00A6A6",
        purple:   "#7C5CFC",
        rose:     "#F43F5E",
      },
      boxShadow: {
        card:  "0 2px 12px rgba(26, 31, 46, 0.06)",
        float: "0 8px 28px rgba(26, 31, 46, 0.10)",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
      }
    }
  },
  plugins: []
};

export default config;
