/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': 'rgb(42, 42, 42)',
      },
      boxShadow: {
        'custom-shadow': '0 0 12px 158px rgb(0 0 0)',
      },
    },
  },
  plugins: [],
}