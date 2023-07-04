/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        background : 'rgba(0,0,0,0.6)',
        headerBg: 'rgba(30, 30, 30, 0.89)',
        buttonBg:'#0F6E83',
        hoverCardBg:'rgb(174, 174, 174, 0.4) ',
        genreBg: 'rgb(2, 132, 199, 0.2 );'
        },
    },
  },
  plugins: [],
}