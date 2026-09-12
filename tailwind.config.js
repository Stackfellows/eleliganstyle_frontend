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
          soft: '#F8E8EA',
          mid: '#F3DDE0',
          deep: '#E9C9CE',
          dark: '#C58C97',
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
