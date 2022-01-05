module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        visionTheme: {
          primary: "#fe932f",
          "primary-focus": "#fa810f",
          "primary-content": "#ffffff",
          secondary: "#fab700",
          "secondary-focus": "#eba800",
          "secondary-content": "#ffffff",
          accent: "#fab700",
          "accent-focus": "#eba800",
          "accent-content": "#ffffff",
          neutral: "#3d4451",
          "neutral-focus": "#2a2e37",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#d1d5db",
          "base-content": "#1f2937",
          info: "#2094f3",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",
        },
      },
      'dark'
    ],
  },
};
