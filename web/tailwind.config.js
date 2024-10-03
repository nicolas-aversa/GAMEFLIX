/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      display: ["Inter", "sans-serif"]
    },
    extend: {
      //Colores usados en el proyecto
      colors: {
        primary: "3A0453",
        secondary: "C93DEC",
        background: "#220447"
      },
    },
  },
  plugins: [],
};
