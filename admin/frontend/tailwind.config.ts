import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'media', // システム設定に従うダークモード
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
