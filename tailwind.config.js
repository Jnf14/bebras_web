/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cod-gray": {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#0b0b0b",
        },
        thunderbird: {
          50: "#fef3f2",
          100: "#ffe4e1",
          200: "#ffcfc9",
          300: "#feada3",
          400: "#fc7d6d",
          500: "#f4533f",
          600: "#e13721",
          700: "#c02b18",
          800: "#9c2718",
          900: "#82261a",
          950: "#470f08",
        },
      },
    },
  },
  plugins: [],
};
