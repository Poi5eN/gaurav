/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#020608",
        surface: "#0A0F14",
        border: "#1A2332",
        "primary-accent": "#00D9FF",
        "secondary-accent": "#7B2FFF",
        accent: "#FF6B35",
        "text-primary": "#F0F4F8",
        "text-secondary": "#8BA3B8",
        success: "#00FF9D",
        secondary: "#8BA3B8",
        tertiary: "#0A0F14",
        "black-100": "#0A0F14",
        "black-200": "#020608",
        "white-100": "#F0F4F8",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #1A2332",
        neon: "0 0 20px rgba(0, 217, 255, 0.25)",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        sans: ["DM Sans", "sans-serif"],
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "none",
        "hero-pattern-dark": "none", 
      },
    },
  },
  plugins: [],
};