import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'media', // システム設定に従うダークモード
  theme: {
    extend: {},
  },
  plugins: [typography],
};

export default config;
