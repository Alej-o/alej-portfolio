/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./src/app/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sunset: "#FFF1E0",
        amber: "#D05B04",
        burnt: "#D72638",
        vintageRed: "#AC2801",
        deepBrown: "#2B2B2B",
        beige: "#FCF0D6",
        black: "#74070D",
        yellow: "#FB8C01",
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "monospace"],
        serif: ['var(--font-domine)', 'serif'],
        palmore: ["var(--font-palmore)", "serif"],
        'milk-honey': ["var(--font-milk-honey)", "serif"],
        sans: ['var(--font-inter)'],
        title: ['var(--font-caslon)'],
        'eb-garamond': ['var(--font-eb-garamond)']
      },
    },
  },
 
}

