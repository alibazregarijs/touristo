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
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
