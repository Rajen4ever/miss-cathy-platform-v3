import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050816",
        panel: "#0d1324",
        line: "rgba(255,255,255,0.08)",
        accent: "#7dd3fc",
        accent2: "#c084fc"
      },
      boxShadow: {
        panel: "0 24px 80px rgba(0,0,0,0.24)"
      }
    }
  },
  plugins: []
};

export default config;
