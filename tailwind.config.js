/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark background colors
        'brand-black': '#000000',
        'brand-card-dark': '#1A1A1A',

        // **FIX: Add missing dark colors**
        'brand-dark': '#0F0F0F', // A slightly lighter black for sections
        'brand-gray-extradark': '#1F2937', // Tailwind gray-900, used for panels/cards

        // Gray tones
        'brand-gray': {
          light: '#d1d5db', // Original
          DEFAULT: '#9ca3af', // Original
          dark: '#374151', // Original
          // Added a medium gray for some borders if needed, based on usage
          medium: '#4b5563', // Tailwind gray-600
        },
        'text-gray-light': '#E0E0E0', // Original
        'text-gray-medium': '#A0A0A0', // Original

        // Purple tones
        'brand-purple': {
          DEFAULT: '#6d28d9', // Original
          light: '#8b5cf6', // Original
          dark: '#4c1d95', // Original
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        nura: ['Nura', 'sans-serif'], // Ensure Nura is used if intended
        // Added Exo font as used in several places
        exo: ['Exo', 'sans-serif'], // Ensure Exo is used if intended
      },
      backgroundImage: {
        // Uncomment if needed later
        // 'grid-pattern': "url('/path/to/your/grid-pattern.svg')",

        // **FIX: Define the dark gradient**
        'dark-gradient': 'radial-gradient(circle at center, rgba(26, 26, 26, 0.5), rgba(0, 0, 0, 1))', // Example gradient
      },
      animation: {
        floating: 'floatBox 12s ease-in-out infinite',
        // Ensure scroll-left animation is defined if not in CSS directly
        // scroll-left is defined in index.css, so no need here unless moved
      },
      keyframes: {
        floatBox: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        // scroll-left keyframes are in index.css, keep them there or move them here
      },
    },
  },
  plugins: [],
}