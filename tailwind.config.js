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

        // Gray tones
        'brand-gray': {
          light: '#d1d5db',
          DEFAULT: '#9ca3af',
          dark: '#374151',
        },
        'text-gray-light': '#E0E0E0',
        'text-gray-medium': '#A0A0A0',

        // Purple tones
        'brand-purple': {
          DEFAULT: '#6d28d9',
          light: '#8b5cf6',
          dark: '#4c1d95',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        nura: ['Nura', 'sans-serif'],
      },
      backgroundImage: {
        // Uncomment if needed later
        // 'grid-pattern': "url('/path/to/your/grid-pattern.svg')",
      },
      animation: {
        floating: 'floatBox 12s ease-in-out infinite',
      },
      keyframes: {
        floatBox: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
}
