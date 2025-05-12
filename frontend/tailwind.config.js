/** @type {import('tailwindcss').Config} */
import textShadow from 'tailwindcss-textshadow';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
         textShadow: {
        sm: '1px 1px 2px rgba(0,0,0,0.25)',
        DEFAULT: '2px 2px 4px rgba(0,0,0,0.45)',
        lg: '3px 3px 6px rgba(0,0,0,0.55)',
        none: 'none',
      },
    },
  },
  plugins: [textShadow],
}
