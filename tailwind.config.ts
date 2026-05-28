import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#08111f",
        mist: "#d7f9ff",
        aqua: "#58f0d1",
        limeglass: "#b6f36a",
        violetglass: "#9a7cff"
      },
      boxShadow: {
        glass: "0 24px 80px rgba(0, 0, 0, 0.36)",
        glow: "0 0 40px rgba(88, 240, 209, 0.18)"
      },
      backgroundImage: {
        "fine-grid":
          "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
