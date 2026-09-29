/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#0F0F0F',
        surface: '#161616',
        primary: '#FF5722',
      }
    },
  },
  plugins: [],
}