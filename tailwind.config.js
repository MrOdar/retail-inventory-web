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
      // Every color resolves to a CSS custom property, so the dark theme is a
      // single `data-theme` swap on <html> with no duplicated utility classes.
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
        sans: ["'Inter Tight'", 'system-ui', '-apple-system', 'sans-serif'],
        display: ["'Instrument Serif'", 'Georgia', 'serif'],
        mono: ["'IBM Plex Mono'", 'ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Editorial display sizes for headline figures.
        'fig-sm': ['1.75rem', { lineHeight: '1.05' }],
        'fig':    ['2.5rem',  { lineHeight: '1.0' }],
        'fig-lg': ['3.5rem',  { lineHeight: '0.96' }],
        'head':   ['2.75rem', { lineHeight: '1.06' }],
        'head-lg':['4rem',    { lineHeight: '1.02' }],
      },
      transitionTimingFunction: {
        // The emphasised curve used for icon cross-fades.
        emphasis: 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  plugins: [
    // Tailwind 3's `hover:` variant compiles to a bare `:hover`, which latches
    // after a tap on touch devices and reads as a stuck selected state.
    // Tailwind 4 gates it behind this query by default; this backports it.
    plugin(function hoverOnlyOnCapablePointers({ addVariant }) {
      addVariant('hover', '@media (hover: hover) { &:hover }');
      addVariant('group-hover', '@media (hover: hover) { :merge(.group):hover & }');
    }),
  ],
}
