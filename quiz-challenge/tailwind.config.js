/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {  
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        bebas: ['Bebas Neue', 'cursive'], 
        sora: ['Sora', 'sans-serif'], 
      },
      screens: {
        'sm-custom': { 'max': '500px' }, 
      },
    },
  },
  plugins: [],
};
