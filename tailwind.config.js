/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        retail: {
          dark: '#0b1120',
          card: '#131d33',
          border: '#1e293b',
          accent: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          sky: '#0284c7'
        }
      }
    },
  },
  plugins: [],
}
