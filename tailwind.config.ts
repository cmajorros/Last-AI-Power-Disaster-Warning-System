import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          ink: "#162033",
          mist: "#eef3f7",
          line: "#d7e0e8"
        },
        severity: {
          normal: "#16834a",
          watch: "#d4a012",
          warning: "#d96c18",
          emergency: "#c4272f"
        }
      },
      boxShadow: {
        panel: "0 16px 35px rgba(22, 32, 51, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
