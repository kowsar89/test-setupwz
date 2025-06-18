/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,html}"
  ],
  theme: {
    extend: {
      colors: {
        'wp-blue': '#0073aa',
        'wp-blue-dark': '#005a87',
        'wp-gray': '#f1f1f1',
        'wp-gray-dark': '#ddd',
        'wp-text': '#23282d',
        'wp-text-light': '#646970'
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'sans-serif']
      }
    },
  },
  plugins: [],
}