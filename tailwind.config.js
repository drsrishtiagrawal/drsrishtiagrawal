/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        forest: {
          50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7',
          400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857',
          800: '#065f46', 900: '#064e3b', 950: '#031f0d',
        },
        cyanx: { 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2' },
      },
      boxShadow: {
        'glow-emerald': '0 0 0 1px rgba(16,185,129,0.22), 0 12px 40px -12px rgba(16,185,129,0.40)',
        'glow-cyan': '0 0 0 1px rgba(6,182,212,0.22), 0 12px 40px -12px rgba(6,182,212,0.40)',
        card: '0 1px 3px 0 rgba(0,0,0,0.30), 0 10px 30px -12px rgba(0,0,0,0.50)',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'pulse-dot': { '0%,100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '0.5', transform: 'scale(0.85)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both',
        'pulse-dot': 'pulse-dot 1.8s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};
