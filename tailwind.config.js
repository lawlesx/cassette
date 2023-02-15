/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#07030F',
        vibrant: '#DA00CE',
        teal: '#059EA0',
        primary: '#F2F0FF',
        secondary: '#A09CBC',
      },
      fontFamily: {
        sans: ['var(--font-gopher)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
