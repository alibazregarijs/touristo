import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        lsm: { min: '320px', max: '639px' },
      },

      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'], // external
        vazir: ['var(--font-vazir)', 'sans-serif'], // local
      },
      colors: {
        'black-1': '#19191c',
        'pink-1': '#70243c',
        'pink-2': '#fd366e',
        'pink-3': '#2c1b24',
        'white-1': '#c3c3c6',
        'white-2': '#7F7E83',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
