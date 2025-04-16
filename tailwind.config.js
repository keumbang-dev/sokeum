/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D95204",
        background: "#110703",
        textColor: "#FFFFFF",
        grayColor: "#737373",
        redColor: "#DC2626",
        blueColor: "#25AFFE",
        orangeCircle: "#FE5F01",
        blueCircle: "#194585",
        grayCircle: "#737373",
      },
      fontFamily: {
        raleway: ["var(--font-raleway)"],
        pretendard: ["var(--font-pretendard)"],
      },
      backgroundImage: {
        "card-gradient": "linear-gradient(to bottom, #000000 0%, #FFFFFF 100%)",
        "button-gradient": "linear-gradient(to bottom, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 100%)",
        "stroke-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
      },
    },
  },
  plugins: [],
};
