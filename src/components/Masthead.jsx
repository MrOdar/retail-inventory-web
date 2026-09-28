import React from 'react';
import { ArrowUpRight, BarChart3, Moon, Sun, Table2 } from 'lucide-react';
import { Tabs } from './primitives';
import { PRESS } from '../lib/ui';

const REPO_URL = 'https://github.com/MrOdar/retail-inventory-analytics-3nf';
const PORTFOLIO_URL = 'https://odaralcocer.pages.dev';

const VIEWS = [
  { id: 'executive', label: 'Informe operativo', icon: BarChart3 },
  { id: 'sql',       label: 'Modelo y SQL',      icon: Table2 },
];

/* ---------------------------------------------------------------------------
   Theme toggle
   ---------------------------------------------------------------------------
   The icons cross-fade with the same exact values as every other contextual
   icon swap: scale 0.25 -> 1, opacity 0 -> 1, blur 4px -> 0, 300ms on
   cubic-bezier(0.2, 0, 0, 1). `aria-pressed` and the label carry the state
   without relying on the motion.
   --------------------------------------------------------------------------- */
function ThemeToggle({ theme, onToggle }) {
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={dark}
      title={dark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      className={`grid w-8 h-8 place-items-center rounded-sm border border-rule text-ink-2 hover:text-ink hover:bg-paper-2 ${PRESS}`}
    >
      <span className="sr-only">{dark ? 'Tema oscuro activo' : 'Tema claro activo'}</span>
      {[
        { on: !dark, Icon: Sun },
        { on: dark, Icon: Moon },
      ].map(({ on, Icon }, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="col-start-1 row-start-1 transition-[opacity,scale,filter] duration-300 ease-emphasis motion-reduce:transition-[opacity]"
          style={{
            opacity: on ? 1 : 0,
            scale: on ? '1' : '0.25',
            filter: on ? 'blur(0px)' : 'blur(4px)',
          }}
        >
          <Icon className="w-4 h-4" strokeWidth={1.5} />
        </span>
      ))}
    </button>
  );
}

export default function Masthead({ activeTab, setActiveTab, theme, onToggleTheme }) {
  return (
    <header className="bg-paper">
      {/* --- Masthead proper: editorial, not a sticky app bar ------------- */}
      <div className="mx-auto w-full max-w-[82rem] px-5 sm:px-8">
        <div className="flex flex-col gap-6 pt-8 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="label">Odar Javier Alcocer Vásquez · UPC</p>
            <h1 className="mt-2 font-display text-[2rem] sm:text-[2.6rem] leading-[1.04] tracking-tight text-ink font-bold">
              RetailOps&nbsp;<span className="text-ink-2 font-mono text-[1.8rem] sm:text-[2.2rem]">3NF</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-2">
              Informe operativo de rotación FEFO, exposición financiera por
              vencimiento y auditoría de recepciones sobre un modelo relacional
              normalizado en PostgreSQL.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:pt-1">
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center px-2.5 py-1.5 rounded-sm border border-rule text-xs font-mono text-ink-2 hover:text-ink hover:bg-paper-2 ${PRESS}`}
            >
              Portafolio
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border border-rule text-xs font-mono text-ink-2 hover:text-ink hover:bg-paper-2 ${PRESS}`}
            >
              <span>Repositorio</span>
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />
            </a>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      </div>

      {/* --- Sticky view switcher -----------------------------------------
          Structure stays on a hairline border rather than a blurred panel.
          The border is the divider between chrome and content, so it is a
          border and not a shadow.                                          */}
      <div className="sticky top-0 z-40 border-y border-rule bg-paper">
        <div className="mx-auto w-full max-w-[82rem] px-5 sm:px-8">
          <div className="flex items-center justify-between gap-6 pt-3">
            <Tabs items={VIEWS} value={activeTab} onChange={setActiveTab} idPrefix="view" />
            <p className="hidden pb-2.5 font-mono text-[0.6875rem] text-ink-3 md:block">
              Datos de demostración · 4 sedes · Lima
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
