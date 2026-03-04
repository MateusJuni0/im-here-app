/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nocturnal: {
          900: '#0a0a0a',
          800: '#171717',
          700: '#262626',
        },
        gold: {
          DEFAULT: '#d4af37',
          dark: '#aa8c2c',
          light: '#e6c85c',
        }
      },
      borderRadius: {
        'elite': '32px',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(145deg, rgba(20,20,20,0.8), rgba(0,0,0,0.9))',
      }
    },
  },
  plugins: [],
}
