export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#06070A',
          900: '#0A0C11',
          850: '#0F1218',
          800: '#151922',
          750: '#1B202A',
          700: '#232936',
        },
        line: {
          DEFAULT: '#232936',
          soft: '#1A1F29',
          bright: '#333B4B',
        },
        mist: {
          DEFAULT: '#8C95A8',
          dim: '#646D7E',
          bright: '#C3CAD6',
        },
        brand: {
          red: '#E2223B',
          redDeep: '#A81129',
          blue: '#2F6BFF',
          blueDeep: '#1743A8',
          blush: '#FF7AA8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '0.75rem',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      maxWidth: {
        shell: '90rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 320ms cubic-bezier(0.23, 1, 0.32, 1) both',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
}
