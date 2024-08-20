/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainDarkColor: "#0B52A9",
        mainColor: "#366CF0",

        mainBrightColor: "#EDEFF4",
        mainBrighterColor: "#F5F6F9",

        subColor: "#CDCED1",
        subDarkColor: "#A5A6A9",
      },
      margin: {
        header: "8vh",
      },
      blur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
