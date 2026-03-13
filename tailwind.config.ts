import type { Config } from 'tailwindcss'

const config: Config = {
  safelist: [
    { pattern: /^(bg|text|border|ring)-brand-(primary|secondary|accent|dark)(\/\d+)?$/ },
  ],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#00d596',
          secondary: '#00b884',
          accent: '#ffd166',
          dark: '#1a1a2e',
        }
      },
      fontFamily: {
        heebo: ['var(--font-heebo)', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'blink': 'blink 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
export default config
