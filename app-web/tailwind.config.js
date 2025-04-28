/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#28A745",
          light: "#4BBF5E",
          dark: "#1F8C3B",
        },
        secondary: {
          DEFAULT: "#6C757D",
          light: "#8C949A",
          dark: "#565D63",
        },
        accent: {
          DEFAULT: "#17A2B8",
          light: "#3DBDCF",
          dark: "#118594",
        },
        success: "#28A745",
        info: "#17A7B8",
        warning: "#FFC107",
        danger: "#DC3545",
        light: "#F7FFF7",
        gray: {
          light: "#F4F4F4",
          DEFAULT: "#E0E0E0",
          dark: "#888888",
        },
        text: "#333333",
      },
      boxShadow: {
        DEFAULT: "0 2px 10px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        DEFAULT: "8px",
      },
      transitionProperty: {
        DEFAULT: "all",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
