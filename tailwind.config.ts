import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
        leaf: {
          50: "#f3fce8",
          100: "#e3fad0",
          200: "#c6f5a6",
          300: "#a3eb74",
          400: "#82dd4d",
          500: "#62c52e",
          600: "#4a9e21",
          700: "#3b7c1b",
        },
        primary: {
          DEFAULT: "#38bdf8",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#82dd4d",
          foreground: "#0b3d0b",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      backgroundImage: {
        "bodeum-gradient":
          "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 40%, #e3fad0 100%)",
        "bodeum-gradient-dark":
          "linear-gradient(135deg, #0c1a24 0%, #0f1f17 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
