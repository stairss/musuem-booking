module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    themeVariants: ['light', 'darken', 'inverted'],
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-multi-theme'),
  ],
}
