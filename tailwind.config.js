/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#171515',
        secondary: '#292526',
        muted: '#6E6767',
        canvas: {
          DEFAULT: '#FFFFFF',
          secondary: '#FCFAF9',
          tertiary: '#F8F5F4',
        },
        blush: {
          soft: '#F4F6EE',
          mid: '#E8ECE0',
          deep: '#D0D9C0',
          dark: '#6B7C52',
        },
        olive: {
          50: '#F4F6EE',
          100: '#E8ECE0',
          200: '#D0D9C0',
          300: '#A9B990',
          400: '#8A9D6A',
          500: '#6B7C52',
          600: '#556340',
          700: '#424E31',
          800: '#2F3723',
          900: '#1F2417',
        },
        border: {
          light: '#ECE7E6',
          dark: '#D4CDCC',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      aspectRatio: {
        '3/4': '3 / 4',
        '4/5': '4 / 5',
        '16/9': '16 / 9',
      },
    },
  },
  plugins: [],
};
