/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  plugins: [],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: 'var(--border-radius)',
        lg: 'var(--border-radius-lg)',
        sm: 'var(--border-radius-sm)',
      },
      boxShadow: {
        DEFAULT: 'var(--box-shadow)',
        lg: 'var(--box-shadow-lg)',
        sm: 'var(--box-shadow-sm)',
      },
      colors: {
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        text: 'var(--color-text)',
      },
      fontSize: {
        '2xl': 'var(--font-size-2xl)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        sm: 'var(--font-size-sm)',
        xl: 'var(--font-size-xl)',
        xs: 'var(--font-size-xs)',
      },
      spacing: {
        lg: 'var(--spacing-lg)',
        md: 'var(--spacing-md)',
        sm: 'var(--spacing-sm)',
        xl: 'var(--spacing-xl)',
      },
    },
    fontFamily: {
      mono: ['var(--font-family-mono)'],
      sans: ['var(--font-family-sans)'],
      serif: ['var(--font-family-serif)'],
    },
  },
};
