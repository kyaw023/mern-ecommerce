/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Define your colors for light mode
        primary: "#5c6ac4",
        secondary: "#ecc94b",
        dark: {
          background: "#1a202c",
          text: "#f7fafc",
          card: "#2d3748",
          accent: "#4a5568",
        },
        light: {
          background: "#f7fafc",
          text: "#1a202c",
          card: "#ffffff",
          accent: "#e2e8f0",
        },
      },
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate", "@tailwindcss/forms", "@tailwindcss/aspect-ratio"),
  ],
};
