const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["renogare", ...defaultTheme.fontFamily.sans],
        renogare: ["renogare"],
      },
    },
  },
  variants: {
    imageRendering: ["responsive"],
  },
  plugins: [require("tailwindcss-image-rendering")()],
};
