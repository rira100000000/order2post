/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/views/**/*.{html.erb,tsx}',
    './app/frontend/entrypoints/*.tsx',
    './app/frontend/**/*.tsx'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
