import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // rice paper / nón lá background tones
        rice: {
          50: '#FFFCF5',
          100: '#FBF5E9',
          200: '#F4EAD5',
          300: '#E9DBBE',
        },
        // banana leaf greens
        leaf: {
          50: '#EEF5EC',
          100: '#DCEBD8',
          200: '#B5D3AE',
          400: '#4F8A4B',
          500: '#2F6B3A',
          600: '#24552E',
          700: '#1B4123',
          800: '#14301A',
          900: '#0E2213',
        },
        // grill fire / chili
        chili: {
          400: '#E0583A',
          500: '#C8371D',
          600: '#A82B15',
        },
        // Huế royal purple, used sparingly
        hue: {
          100: '#EFE4F3',
          500: '#5B2A6E',
        },
        turmeric: '#E0A526',
        ink: '#2A1E14',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-be-vietnam)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}
export default config
