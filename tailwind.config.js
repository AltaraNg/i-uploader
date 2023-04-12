/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.js",
    "./components/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/forms'),
    require("@tailwindcss/typography")
  ],
  daisyui: {
    themes: ["winter"],
  },
};
