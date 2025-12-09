/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        "dark-primary": "#f5f5f5",
        "dark-text": "#333333",
        "dark-secondary": "#666666",
        "dark-tertiary": "#e0e0e0",
        "dark-black-100": "#d1d1d1",
        "dark-black-200": "#c0c0c0",
        "dark-white-100": "#666666",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/herobg.png')",
        "hero-pattern-dark": "url('/herobg.png')", 
      },
    },
  },
  plugins: [],
};