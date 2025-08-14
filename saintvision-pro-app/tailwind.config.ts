import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0a0a0a",
        fg: "#f5f5f5"
      },
      maxWidth: {
        "7xl": "80rem"
      }
    }
  },
  plugins: []
};
export default config;
