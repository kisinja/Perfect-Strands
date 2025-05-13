// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000', // Black
        secondary: '#f2f2f2', // Light Gray
        accent: '#c0a98e', // Champagne Beige
        highlight: '#ffb6c1', // Soft Pink
        lilac: '#d5b8e5', // Optional secondary accent
        darkText: '#1a1a1a', // For body text
      },
      fontFamily: {
        elegant: ['"Playfair Display"', 'serif'],
        modern: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config;