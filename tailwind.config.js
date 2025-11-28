/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'], // This adds the premium fonts we used
        mono: ['Space Grotesk', 'monospace'],
      },
    },
  },
  plugins: [],
}