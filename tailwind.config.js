// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0d0c22', // Adjust this to the exact dark background
        'brand-purple': {
          DEFAULT: '#6d28d9', // Primary purple for buttons, highlights
          light: '#8b5cf6',   // Lighter purple accent
          dark: '#4c1d95',    // Darker purple shade
        },
        'brand-gray': {
          light: '#d1d5db', // Light gray text
          DEFAULT: '#9ca3af', // Default gray text
          dark: '#374151',   // Darker gray for elements
          'extradark': '#1f2937', // Even darker for card backgrounds etc.
        }
      },
      backgroundImage: {
        // Example for adding a subtle pattern later if needed
        // 'grid-pattern': "url('/path/to/your/grid-pattern.svg')",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        nura: ['Nura', 'sans-serif'], // Example: Add Inter font
      },
    },
  },
  plugins: [],
}