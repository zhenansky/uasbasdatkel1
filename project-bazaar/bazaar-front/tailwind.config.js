/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/app.jsx'],
  theme: {
    extend: {
      colors:{
        beige:'#FAF7F0',
        biru:'#2148C0'
      },
      backgroundImage:{
        'home-illustration': "url('/src/data/img/bro.svg')"
      }
    },
  },
  plugins: [],
};
