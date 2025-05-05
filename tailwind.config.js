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
        amber: "#FF7F11",
        burnt: "#D72638",
        vintageRed: "red",
        deepBrown: "#2B2B2B",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        serif: ['var(--font-domine)', 'serif']
      },
    },
  },
  plugins: [],
}

