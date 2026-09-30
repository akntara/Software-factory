module.exports = {
  content: ["./index.html", "./frontend/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#202722",
        muted: "#818981",
        canvas: "#f7f8f6",
        line: "#e9ece8",
        forest: "#2f654e",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 28px rgba(27, 44, 34, 0.045)",
      },
    },
  },
  plugins: [],
};
