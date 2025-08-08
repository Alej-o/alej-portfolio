/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1680px",
      "3xl": "1920px",
    },
    extend: {
      colors: {
        beige: "#FCF0D6",
        black: "#74070D",
      },
      fontFamily: {
        title: ["var(--font-caslon)"],
        "eb-garamond": ["var(--font-eb-garamond)"],
      },
    },
  },
}
