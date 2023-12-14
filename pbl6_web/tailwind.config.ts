import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('/assets/images/bg-hero.png')",
      },
      colors: {
        primary: "#FE724C",
        white: "#fff",
        black: "#000"
      },
      backgroundColor: {
        primary: "#FE724C",
        white: "#fff",
        black: "#000"
      }
    },
    fontFamily: {
      'pacifico': ['Pacifico', 'cursive'],
    },
  },
  plugins: [],
}
export default config
