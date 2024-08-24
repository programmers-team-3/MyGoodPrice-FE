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
      padding: {
        footer: "8vh",
      },
      width: {
        th: "30%",
        like: "10%",
      },
      blur: {
        xs: "2px",
      },
      animation: {
        ping: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};
