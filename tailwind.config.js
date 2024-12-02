/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#F0C1E1',
        'primary-hover': '#f3d3e9',
        'secondary': '#FDDBBB',
        'tertiary': '#FFF9BF',
        'footerbg': '#E9967A',
        'profilebottom': '#CB9DF0',
        'loginprimary': '#97a2f1',
        'loginbg': '#b9c3fa',
      },
      screens: {
        'xs': '500px',
        'xxs': '400px',
      },
    },
  },
  plugins: [],
}