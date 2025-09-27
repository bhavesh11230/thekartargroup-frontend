/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'kartar': {
          50: '#fefdf8',
          100: '#fdf9e8',
          200: '#faf2c5',
          300: '#f6e898',
          400: '#f0d968',
          500: '#e8c547',
          600: '#d4a93a',
          700: '#b08a2f',
          800: '#8f6d2b',
          900: '#765a26',
          950: '#443212',
        },
        'kartar-gold': '#D4AF37',
        'kartar-dark': '#B8860B',
        'kartar-light': '#F5E6B3',
        'kartar-cream': '#FFFEF7',
        'kartar-accent': '#8B4513',
        'kartar-secondary': '#2F4F4F',
      }
    },
  },
  plugins: [],
};
