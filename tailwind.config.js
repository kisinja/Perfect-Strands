import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000", // Black
        secondary: "#f2f2f2", // Light Gray
        accent: "#c0a98e", // Champagne Beige
        highlight: "#ffb6c1", // Soft Pink
        lilac: "#d5b8e5", // Optional secondary accent
        darkText: "#1a1a1a", // For body text
      },
      fontFamily: {
        elegant: ['"Playfair Display"', "serif"],
        modern: ['"Poppins"', "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            table: {
              borderCollapse: "collapse",
              borderSpacing: 0,
              width: "100%",
              border: "1px solid #e5e7eb", // light gray border
            },
            "thead th": {
              backgroundColor: "#f9fafb",
              fontWeight: "600",
              padding: "0.75rem",
              border: "1px solid #e5e7eb",
            },
            "tbody td": {
              padding: "0.75rem",
              border: "1px solid #e5e7eb",
            },
            "tbody tr:nth-child(even)": {
              backgroundColor: "#f3f4f6", // zebra striping
            },
          },
        },
      },/* 
      animation:{
        roll:"roll 24s linear infinite"
      },
      keyframes:{
        roll:{
          "0%":{transform:"translateX(100%)"},
          "100%":{transform:"translateX(-100%)"}
        }
      } */
    },
  },
  plugins: [typography()],
};

module.exports = config;
