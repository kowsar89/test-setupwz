/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wordpress: {
          blue: '#0073aa',
          'blue-dark': '#005a87',
          'blue-light': '#0085ba',
          gray: '#23282d',
          'gray-light': '#32373c',
          'gray-lighter': '#f1f1f1',
        }
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'sans-serif'],
      }
    },
  },
  plugins: [],
}