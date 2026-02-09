/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
        },
        gold: {
          light: 'var(--color-gold-light)',
          DEFAULT: 'var(--color-gold)',
          dark: 'var(--color-gold-dark)',
        },
        teal: {
          light: 'var(--color-teal-light)',
          DEFAULT: 'var(--color-teal)',
          dark: 'var(--color-teal-dark)',
        },
        manuscript: {
          DEFAULT: 'var(--color-manuscript)',
          dark: 'var(--color-manuscript-dark)',
        }
      },
      fontFamily: {
        urdu: ['Nastaleeq', 'Noto Nastaliq Urdu', 'system-ui', 'sans-serif'],
        arabic: ['Scheherazade', 'Amiri', 'Traditional Arabic', 'serif'],
        'arabic-heading': ['Amiri', 'Traditional Arabic', 'serif'],
        persian: ['Vazirmatn', 'IranSans', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
