/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'marine': '#1e3a5f',
        'marine-light': '#2d4a6f',
        'marine-dark': '#152a4a',
        'orange': '#ff6b35',
        'orange-light': '#ff8c5a',
        'orange-dark': '#e55a2b',
      },
    },
  },
  plugins: [],
}

