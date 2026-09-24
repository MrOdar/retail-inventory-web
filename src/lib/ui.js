/* ===========================================================================
   Shared non-component UI values.
   ---------------------------------------------------------------------------
   Kept out of primitives.jsx so that file exports components only: a module
   mixing components with constants breaks React Fast Refresh, which silently
   forces a full reload on every edit during development.
   =========================================================================== */

/* ---------------------------------------------------------------------------
   SEVERITY
   ---------------------------------------------------------------------------
   One mapping, used everywhere. Each level carries a color AND a word, so no
   state ever depends on hue alone.
   --------------------------------------------------------------------------- */
export const SEVERITY = {
  danger: {
    ink: 'text-loss', bg: 'bg-loss', soft: 'bg-loss-soft',
    border: 'border-loss-line', label: 'Crítico',
  },
  warning: {
    ink: 'text-caution', bg: 'bg-caution', soft: 'bg-caution-soft',
    border: 'border-caution-line', label: 'Atención',
  },
  healthy: {
    ink: 'text-healthy', bg: 'bg-healthy', soft: 'bg-healthy-soft',
    border: 'border-healthy-line', label: 'Estable',
  },
};

export const severityOf = (key) => SEVERITY[key] ?? SEVERITY.healthy;

/** Severity from days remaining before expiry (FEFO thresholds). */
export const severityByDays = (days) =>
  days <= 1 ? 'danger' : days <= 3 ? 'warning' : 'healthy';

/* ---------------------------------------------------------------------------
   FORMATTERS — Peruvian locale, tabular output
   --------------------------------------------------------------------------- */
const pen = new Intl.NumberFormat('es-PE', {
  style: 'currency', currency: 'PEN', minimumFractionDigits: 2,
});
const dec = new Intl.NumberFormat('es-PE', {
  minimumFractionDigits: 1, maximumFractionDigits: 1,
});
const int = new Intl.NumberFormat('es-PE');

export const fmtPEN = (n) => pen.format(n);
export const fmtDec = (n) => dec.format(n);
export const fmtInt = (n) => int.format(n);
export const fmtPct = (n, digits = 1) => `${n.toFixed(digits)} %`;

/* ---------------------------------------------------------------------------
   PRESS — shared interactive press behaviour
   ---------------------------------------------------------------------------
   Press scales to 0.96 over 150ms with ease-out. Only transform and the three
   colors transition; never `all`. A disabled control never scales, and the
   scale itself is gated behind the reduced-motion preference.
   --------------------------------------------------------------------------- */
export const PRESS =
  'transition-[transform,background-color,color,border-color] duration-150 ease-out ' +
  'motion-safe:enabled:active:scale-[0.96] disabled:opacity-50 disabled:cursor-not-allowed';
