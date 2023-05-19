/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        dbbg:'#0C134F', //dark blue background
        bbg:'#3E54AC',//blue background
        cbg:'#7286D3',//container background
        icon:'#BFDCE5',
        darkBg:'#1A120B',
      },
      width:{
        tc:'380px', //Task Container
      },
      fontSize:{
        xxs:'0.5rem',
        description:'0.605rem'
      }
    },
  },
  plugins: [],
}

