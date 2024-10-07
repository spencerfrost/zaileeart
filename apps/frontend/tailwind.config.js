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
      // backgroundImage: {
      //   'memphis-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      // },
    },
  },
  plugins: [],
}