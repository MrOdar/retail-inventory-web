/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: ['class', ':root[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: 'var(--paper)',
          2: 'var(--paper-2)',
          3: 'var(--paper-3)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          2: 'var(--ink-2)',
          3: 'var(--ink-3)',
        },
        rule: {
          DEFAULT: 'var(--rule)',
          soft: 'var(--rule-soft)',
          field: 'var(--field-line)',
        },
        loss: {
          DEFAULT: 'var(--loss)',
          soft: 'var(--loss-soft)',
          line: 'var(--loss-line)',
        },
        caution: {
          DEFAULT: 'var(--caution)',
          soft: 'var(--caution-soft)',
          line: 'var(--caution-line)',
        },
        healthy: {
          DEFAULT: 'var(--healthy)',
          soft: 'var(--healthy-soft)',
          line: 'var(--healthy-line)',
        },
        accent: 'var(--accent)',
      },
      borderRadius: {
        xs: 'var(--r-xs)',
        sm: 'var(--r-sm)',
        md: 'var(--r-md)',
        lg: 'var(--r-lg)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', '"SF Mono"', 'Menlo', 'Consolas', '"Liberation Mono"', 'monospace'],
      },
      fontSize: {
        'fig-sm': ['1.6rem', { lineHeight: '1.05', fontWeight: '600' }],
        'fig':    ['2.25rem',  { lineHeight: '1.0', fontWeight: '700' }],
        'fig-lg': ['3.25rem',  { lineHeight: '0.96', fontWeight: '700' }],
        'head':   ['2.25rem', { lineHeight: '1.1', fontWeight: '700' }],
        'head-lg':['3.25rem', { lineHeight: '1.05', fontWeight: '700' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hover', '@media (hover: hover) { &:hover }');
    }),
  ],
};
