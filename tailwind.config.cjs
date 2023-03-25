/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./routes/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./main.jsx",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        main: "#E49393",
        support: "#B9E0FF",
        dark: "#010014",
      },
      flex: {
        center: "flex flex-row justify-center items-center",
      },
    },
  },
  plugins: [],
};