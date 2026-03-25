import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B9D',
          light: '#FF8FAD',
          dark: '#FF4785',
        },
        secondary: {
          DEFAULT: '#C084FC',
          light: '#D4A5FF',
          dark: '#A864E8',
        },
        accent: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
        },
        background: '#FFF7ED',
        surface: '#FFFFFF',
      },
      borderRadius: {
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'full': '9999px',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 12px rgba(0, 0, 0, 0.06)',
        'glow': '0 4px 16px rgba(255, 107, 157, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
