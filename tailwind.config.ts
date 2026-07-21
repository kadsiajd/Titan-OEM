import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecf7f6',
          100: '#d1eeec',
          500: '#00b9ae',
          600: '#00b2ad',
          700: '#115e6e',
          900: '#0a3540',
        },
      },
    },
  },
  plugins: [],
};

export default config;
