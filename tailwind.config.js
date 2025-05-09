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
        serif: ['var(--font-domine)', 'serif'],
        palmore: ["var(--font-palmore)", "serif"],
        'milk-honey': ["var(--font-milk-honey)", "serif"],
      },
    },
  },
  plugins: [function ({ addUtilities }) {
    addUtilities({
      '.text-stroke': {
        '-webkit-text-stroke-width': '1px',
        '-webkit-text-stroke-color': '#FFF1E0',
      },
      '.text-stroke-2': {
        '-webkit-text-stroke-width': '2px',
        '-webkit-text-stroke-color': '#FFF1E0',
      },
      '.text-outline': {
        'text-shadow':
          '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
      },
      '.text-hollow': {
          color: 'transparent',
          '-webkit-text-stroke-width': '1px',
          '-webkit-text-stroke-color': 'red',
        },
    })
  },],
}

