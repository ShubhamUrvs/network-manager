/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        panel: '#1e293b',
        accent: '#22c55e',
      }
    },
  },
  plugins: [],
}
