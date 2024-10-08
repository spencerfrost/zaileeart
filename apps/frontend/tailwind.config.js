/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'memphis-yellow': '#FFD300',
        'memphis-pink': '#FF6B6B',
        'memphis-blue': '#4ECDC4',
        'memphis-black': '#2F2F2F',
      },
      fontFamily: {
        'memphis': ['Comic Sans MS', 'Comic Sans', 'cursive'], // A playful font that fits the Memphis style
      },
      borderRadius: {
        'memphis': '2.5rem', // Exaggerated border radius for that Memphis feel
      },
    },
  },
  plugins: [],
}