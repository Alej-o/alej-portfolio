/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./src/app/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: "#FCF0D6",
        black: "#74070D",
      },
      fontFamily: {
        title: ['var(--font-caslon)'],
        'eb-garamond': ['var(--font-eb-garamond)']
      },
    },
  },
 
}

