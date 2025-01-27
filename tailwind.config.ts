import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './sanity/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '475px',
      },
      colors: {
        primary: {
          '50': '#E0F7FA',
          '100': '#B2EBF2',
          DEFAULT: '#00BCD4',
          '600': '#008C9E',
          '800': '#005662',
        },
        secondary: '#FFC107',
        black: {
          '100': '#333333',
          '200': '#141413',
          '300': '#7D8087',
          DEFAULT: '#000000',
        },
        white: {
          '100': '#F7F7F7',
          DEFAULT: '#FFFFFF',
        },
      },
      fontFamily: {
        'work-sans': ['var(--font-work-sans)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        100: '2px 2px 0px 0px rgb(0, 0, 0)',
        200: '2px 2px 0px 2px rgb(0, 0, 0)',
        300: '2px 2px 0px 2px rgb(0, 188, 212)',
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
};

export default config;
