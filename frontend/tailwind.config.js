/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%": { transform: "translateY(-80px)", opacity: 0, zIndex: "50" },
          "5%": { transform: "translateY(-80px)", opacity: 1, zIndex: "50" },
          "20%": {},
          "40%": { transform: "translateY(0)", opacity: 1, zIndex: "0" },
          "60%": { transform: "translateY(12px)", opacity: 1, zIndex: "-10" },
          "80%": { transform: "translateY(24px)", opacity: 1, zIndex: "-20" },
          "100%": { transform: "translateY(36px)", opacity: 0, zIndex: "-50" },
        },
      },
      animation: {
        "coin-1": "float 1500ms ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("tailwindcss-animation-delay"),
  ],
};
