/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      sm: { max: "480px" },
      md: { max: "768px" },
      lg: "976px",
      xl: "1280px",
    },
    colors: {
      "primary-color": "rgba(29, 155, 240, 1)",
      "secondary-color": "#93c5fd",
      "light-primary-color": "#dbeafe",
    },
  },
  plugins: [],
};
