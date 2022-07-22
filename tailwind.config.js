module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        blurple: "#7289DA",
        dark: "#23272A"
      }
    }
  },
  variants: {
    extend: {
      animation: ["hover", "focus"]
    }
  },
  daisyui: {
    themes: [
      {
        imageing: {
          primary: "#c274d8",
          secondary: "#748ad8",
          accent: "#eb459e",
          neutral: "#9074d8",
          "base-100": "#23272A",
          "base-200": "#1c1f24",
          "base-300": "#17191d",
          "base-400": "#0e0f11",
          info: "#5865F2",
          success: "#4b5bab",
          warning: "#f2a65e",
          error: "#b0305c"
        }
      }
    ]
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")]
};
