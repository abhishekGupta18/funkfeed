/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "rgba(29, 155, 240, 1)",
        "secondary-color": "#4338ca",
        "light-primary-color": "#dbeafe",
      },
    },
  },
  plugins: [],
};
