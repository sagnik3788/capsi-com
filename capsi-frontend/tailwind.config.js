/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-linear":
          "linear-gradient(to right, var(--tw-gradient-stops))",
      }),
      colors: {
        primary: "#000000",
        secondary: " #6B6B6B",
        tertiary: "#9393930f",
        "gradient-start": "#6B23D1",
        "gradient-end": "#FFC043",
        "gradient-left": "#F3F0FF",
        "gradient-right": "#FFF7ED",
      },
    },
  },
  plugins: [],
};
