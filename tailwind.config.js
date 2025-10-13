/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // include all React components
    "./public/index.html",         // include your HTML entry
  ],
  theme: {
    extend: {},                    // customize colors, fonts, etc.
  },
  plugins: [],
};
