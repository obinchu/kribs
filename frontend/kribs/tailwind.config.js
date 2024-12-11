/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#16423C",
        secondary: "#6A9C89",
        tertiary: "#C4DAD2",
        other: "#E9EFEC",
        other1: "#f6fff8"
      },
    },
  },
  plugins: [],
}
