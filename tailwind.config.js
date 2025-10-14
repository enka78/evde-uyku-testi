/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // .dark class ile kontrol edilecek
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        whatsapp: "rgb(var(--whatsapp) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
