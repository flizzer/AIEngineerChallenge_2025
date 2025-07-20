/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // UNC Tar Heels colors
        'unc-blue': '#4B9CD3',
        'unc-navy': '#13294B',
        'unc-white': '#FFFFFF',
        'unc-gray': '#F8F9FA',
        'unc-dark-gray': '#6C757D',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 