/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      flexGrow: {
        2: '2'
      },
    },
    fontSize: {
      xl: [
        "30px",
        {
          lineHeight: "36px",
          letterSpacing: "-0.01em",
          fontWeight: "700",
        },
      ],

      lg: [
        "18px",
        {
          lineHeight: "28px",
          letterSpacing: "-0.01em",
          fontWeight: "700",
        },
      ],

      base: [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: "-0.01em",
          fontWeight: "400",
        },
      ],

      sm: [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: "-0.01em",
          fontWeight: "400",
        },
      ],

      "2xl": [
        "24px",
        {
          fontWeight: "600",
        },

      ],
    },
  },
  plugins: [],
};
