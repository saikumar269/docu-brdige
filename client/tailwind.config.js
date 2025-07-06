/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ this includes all your components/pages
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
