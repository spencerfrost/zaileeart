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
        'dutch-white': '#E8DCB9',
        'mimi-pink': '#F2CEE6',
        'air-blue': '#7798AB',
        'rich-black': '#0D1B1E',
      },
      fontFamily: {
        'memphis': ['Comic Sans MS', 'Comic Sans', 'cursive'], 
      },
      borderRadius: {
        'memphis': '2.5rem', 
      },
    },
  },
  plugins: [],
}