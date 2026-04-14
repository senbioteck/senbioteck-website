import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0D9488', dark: '#0F766E', light: '#14B8A6' },
        secondary: { DEFAULT: '#6366F1', dark: '#4F46E5', light: '#818CF8' },
      },
    },
  },
  plugins: [],
}

export default config