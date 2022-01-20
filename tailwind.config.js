const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["md:flex-row"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", "Sarasa Gothic", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};