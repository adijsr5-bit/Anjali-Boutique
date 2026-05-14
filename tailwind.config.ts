import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B1E3F',
        secondary: '#F8EDEB',
        accent: '#D4A373',
        text: '#1E1E1E',
        background: '#FFFFFF'
      },
      boxShadow: {
        premium: '0 20px 45px rgba(0,0,0,0.12)'
      }
    }
  },
  plugins: []
};

export default config;
