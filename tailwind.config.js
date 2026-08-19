/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#12211F",
        petrolio: "#17635E",
        ottone: "#C98A3B",
        panna: "#F1EFE9",
      },
    },
  },
  plugins: [],
};
