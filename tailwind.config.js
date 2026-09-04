/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myntra: {
          pink: '#ff3f6c',
          pinkHover: '#f0305e',
          pinkLight: '#fff0f4',
          charcoal: '#282c3f',
          body: '#535766',
          muted: '#94969f',
          border: '#eaeaec',
          bg: '#f5f6f8'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'soft': '0 2px 16px rgba(40, 44, 63, 0.06)',
        'medium': '0 4px 24px rgba(40, 44, 63, 0.08)',
        'elevated': '0 8px 32px rgba(40, 44, 63, 0.12)',
        'pink': '0 4px 14px rgba(255, 63, 108, 0.28)'
      }
    },
  },
  plugins: [],
}
