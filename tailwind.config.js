/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#d4af37',
          dark: '#c4981f',
        },
        secondary: {
          DEFAULT: '#2c2c2c',
          light: '#3c3c3c',
        },
      },
    },
  },
  plugins: [],
}
