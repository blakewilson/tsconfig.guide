import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      animation: {
        fade: 'fadeOut 2.5s ease-in-out'
      },

      keyframes: theme => ({
        fadeOut: {
          '0%': { backgroundColor: '#30404d' },
          '100%': { backgroundColor: theme('colors.transparent') },
        }
      })
    },
  },
  plugins: [],
};
export default config;
