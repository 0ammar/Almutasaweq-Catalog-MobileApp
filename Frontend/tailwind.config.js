/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./App.{js,jsx,ts,tsx}",
      "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          primary: "#E53935",
          secondary: "#F5F5F5",
          text: "#212121",
        },
        spacing: {
          base: 16,
          container: 24,
        },
        fontFamily: {
          main: ["MainFont"],
        },
      },
    },
    plugins: [],
  };
  