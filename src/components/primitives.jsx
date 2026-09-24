import React, { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { PRESS, severityOf } from '../lib/ui';

/* ===========================================================================
   RULE — a hairline divider
   =========================================================================== */

export function Rule({ className = '', soft = false }) {
  return (
    <hr
      className={`border-0 border-t h-0 ${soft ? 'border-rule-soft' : 'border-rule'} ${className}`}
    />
  );
}

/* ===========================================================================
   FIGURE — an editorial headline statistic
   ---------------------------------------------------------------------------
   Deliberately not a card: no box, no tinted icon chip. The label sits above
   in a machine voice, the figure below in the display serif, and vertical
   hairlines (applied by the parent) separate one figure from the next.
   =========================================================================== */

export function Figure({ label, value, unit, note, severity, size = 'fig' }) {
  const tone = severity ? severityOf(severity).ink : 'text-ink';
  return (
    <div className="flex flex-col gap-1.5">
      {/* Reserve two lines so a one-line and a two-line label still put their
          figures on the same baseline across the row. */}
      <span className="label block min-h-[1.65rem]">{label}</span>
      <span className={`font-display ${size === 'fig-lg' ? 'text-fig-lg' : 'text-fig'} ${tone}`}>
        {value}
        {unit ? (
          <span className="font-mono text-base align-top ml-1 text-ink-3">{unit}</span>
        ) : null}
      </span>
      {note ? <span className="text-[0.8125rem] leading-snug text-ink-2">{note}</span> : null}
    </div>
  );
}

/* ===========================================================================
   METER — a precise horizontal bar
   ---------------------------------------------------------------------------
   Reads as a printed measurement against a ruled track, not a rounded pill.
   =========================================================================== */

export function Meter({ value, max = 100, severity = 'healthy', className = '' }) {
  const pctRaw = max > 0 ? (value / max) * 100 : 0;
  const pct = Math.max(0, Math.min(100, pctRaw));
  const tone = severityOf(severity);

  return (
    <div
      className={`relative h-1.5 w-full bg-paper-3 rounded-xs overflow-hidden ${className}`}
      role="img"
      aria-label={`${pct.toFixed(0)} por ciento`}
    >
      <div
        className={`absolute inset-y-0 left-0 rounded-xs ${tone.bg} transition-[width] duration-300 ease-out`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/* ===========================================================================
   TAG — a machine-voice status word
   ---------------------------------------------------------------------------
   A tinted word on a hairline, not a floating pill. `border` is always
   present so forced-colors mode still draws the boundary.
   =========================================================================== */

export function Tag({ children, severity, className = '' }) {
  const tone = severity ? severityOf(severity) : null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-xs border font-mono text-[0.6875rem] uppercase tracking-wider ${
        tone
          ? `${tone.soft} ${tone.ink} ${tone.border}`
          : 'bg-paper-2 text-ink-2 border-rule'
      } ${className}`}
    >
      {children}
    </span>
  );
}

/* ===========================================================================
   TABS — underlined, editorial
   =========================================================================== */

export function Tabs({ items, value, onChange, idPrefix }) {
  return (
    <div role="tablist" aria-label="Vistas del informe" className="flex items-end gap-6">
      {items.map((item) => {
        const active = item.id === value;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            id={`${idPrefix}-tab-${item.id}`}
            role="tab"
            type="button"
            aria-selected={active}
            aria-controls={`${idPrefix}-panel-${item.id}`}
            onClick={() => onChange(item.id)}
            className={`group relative flex items-center gap-2 pb-2.5 -mb-px text-sm ${PRESS} ${
              active ? 'text-ink font-medium' : 'text-ink-3 hover:text-ink-2'
            }`}
          >
            {Icon ? <Icon className="w-4 h-4" strokeWidth={active ? 2 : 1.5} aria-hidden="true" /> : null}
            <span>{item.label}</span>
            {/* Static cue for the selected tab: a 2px ink underline. */}
            <span
              aria-hidden="true"
              className={`absolute left-0 right-0 bottom-0 h-0.5 rounded-xs transition-[opacity,background-color] duration-150 ease-out ${
                active ? 'opacity-100 bg-ink' : 'opacity-0 bg-ink-3'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

/* ===========================================================================
   COPY BUTTON — contextual icon cross-fade
   ---------------------------------------------------------------------------
   Both icons stay mounted and cross-fade: scale 0.25 -> 1, opacity 0 -> 1,
   blur 4px -> 0, over 300ms on cubic-bezier(0.2, 0, 0, 1). Under reduced
   motion only the opacity cross-fade runs.
   The label changes too, so the state never rests on motion alone.
   =========================================================================== */

function CrossfadeIcon({ show, children }) {
  return (
    <span
      aria-hidden="true"
      className="col-start-1 row-start-1 transition-[opacity,scale,filter] duration-300 ease-emphasis motion-reduce:transition-[opacity]"
      style={{
        opacity: show ? 1 : 0,
        scale: show ? '1' : '0.25',
        filter: show ? 'blur(0px)' : 'blur(4px)',
      }}
    >
      {children}
    </span>
  );
}

export function CopyButton({ text, idleLabel = 'Copiar', doneLabel = 'Copiado' }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef(null);

  // A pending timeout must never fire into an unmounted component.
  useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = async () => {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(text);
      setFailed(false);
      setCopied(true);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is unavailable over plain HTTP or without permission.
      // Say so instead of showing a success state that did not happen.
      setFailed(true);
      timer.current = setTimeout(() => setFailed(false), 3000);
    }
  };

  const label = failed ? 'Copia bloqueada' : copied ? doneLabel : idleLabel;

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-sm border border-rule bg-paper text-ink-2 hover:text-ink hover:bg-paper-2 font-mono text-xs ${PRESS}`}
    >
      <span className="grid w-3.5 h-3.5 place-items-center">
        <CrossfadeIcon show={!copied}><Copy className="w-3.5 h-3.5" strokeWidth={1.5} /></CrossfadeIcon>
        <CrossfadeIcon show={copied}><Check className="w-3.5 h-3.5" strokeWidth={2} /></CrossfadeIcon>
      </span>
      <span className="tabular-nums">{label}</span>
    </button>
  );
}

/* ===========================================================================
   SECTION — a titled band of the report
   =========================================================================== */

export function Section({ number, title, lede, meta, children, className = '' }) {
  return (
    <section className={className}>
      <header className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-[1.6rem] leading-tight text-ink flex items-baseline gap-3">
            {number ? (
              <span className="font-mono text-xs text-ink-3 tracking-widest pt-1.5">
                {number}
              </span>
            ) : null}
            <span>{title}</span>
          </h2>
          {lede ? (
            <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-2">{lede}</p>
          ) : null}
        </div>
        {meta ? <div className="shrink-0">{meta}</div> : null}
      </header>
      <Rule className="mt-4 mb-5" />
      {children}
    </section>
  );
}
