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
      colors: {
        MAIN: "#1BB2ED",
      },
      fontFamily: {
        sans: ["Inter var", "Sarasa Gothic", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
