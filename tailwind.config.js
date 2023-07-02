/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {},
    screens: {
      sm: { max: "670px" },
      md: { max: "800px" },
      lg: { max: "1050px" },
      xl: { max: "1300px" },
    },
    colors: {
      "primary-color": "rgba(29, 155, 240, 1)",
      "secondary-color": "#93c5fd",
      "light-primary-color": "#dbeafe",
      "white-color": "#ffff",
      "black-color": "#000000",
      "dark-navbar": "rgba(41,78,101,.8)",
      "dark-primary": "#305973",
      "dark-secondary": "#153243",
    },
  },
  plugins: [],
};
