import React, { useCallback, useEffect, useState } from 'react';
import Masthead from './components/Masthead';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import DataArchitecture from './components/DataArchitecture';
import { Rule } from './components/primitives';

const THEME_KEY = 'retailops-theme';

/* ---------------------------------------------------------------------------
   Theme state
   ---------------------------------------------------------------------------
   The initial value is read from the DOM, not recomputed: the inline script in
   index.html already resolved it before first paint, so re-deriving it here
   would risk a mismatch.
   --------------------------------------------------------------------------- */
function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  );

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;

      // Kill every transition for one frame while the tokens swap. Without
      // this, each color transition on the page fires simultaneously and the
      // theme change reads as a smear instead of a cut.
      root.classList.add('theme-sync');
      root.dataset.theme = next;

      // Force a style flush so the class and the new tokens land together.
      void root.offsetHeight;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => root.classList.remove('theme-sync'));
      });

      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        // Storage blocked (private mode): the theme still applies for this
        // session, it just will not be remembered.
      }

      return next;
    });
  }, []);

  return [theme, toggle];
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [activeTab, setActiveTab] = useState('executive');
  const [selectedStore, setSelectedStore] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Follow the OS preference as long as the visitor has not chosen a theme.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event) => {
      let stored = null;
      try {
        stored = localStorage.getItem(THEME_KEY);
      } catch {
        stored = null;
      }
      if (stored === 'light' || stored === 'dark') return;
      document.documentElement.dataset.theme = event.matches ? 'dark' : 'light';
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <a
        href="#report"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:border focus:border-rule focus:bg-paper focus:px-3 focus:py-2 focus:text-sm"
      >
        Saltar al contenido
      </a>

      <Masthead
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main id="report" className="mx-auto w-full max-w-[82rem] flex-1 px-5 pb-20 pt-10 sm:px-8">
        {/* `key` remounts the panel on every view change, so the staged
            entrance replays. The sequence runs once per mount and never needs
            to reverse, which is the one case keyframes are right for. */}
        <div
          key={activeTab}
          id={`view-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`view-tab-${activeTab}`}
          tabIndex={-1}
        >
          {activeTab === 'executive' ? (
            <ExecutiveDashboard
              selectedStore={selectedStore}
              setSelectedStore={setSelectedStore}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          ) : (
            <DataArchitecture />
          )}
        </div>
      </main>

      <footer className="bg-paper">
        <Rule />
        <div className="mx-auto flex w-full max-w-[82rem] flex-col gap-4 px-5 py-8 text-xs text-ink-2 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            <span className="font-display text-sm text-ink">RetailOps 3NF</span>
            <span className="mx-2 text-ink-3">·</span>
            Odar Javier Alcocer Vásquez, Ingeniería de Sistemas de Información (UPC)
          </p>
          <nav className="flex items-center gap-5 font-mono">
            <a
              href="https://odaralcocer.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-2 underline decoration-rule decoration-1 underline-offset-4 transition-[color,text-decoration-color] duration-150 ease-out hover:text-ink hover:decoration-ink"
            >
              Portafolio
            </a>
            <a
              href="https://github.com/MrOdar/retail-inventory-analytics-3nf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-2 underline decoration-rule decoration-1 underline-offset-4 transition-[color,text-decoration-color] duration-150 ease-out hover:text-ink hover:decoration-ink"
            >
              Backend
            </a>
            <a
              href="https://github.com/MrOdar/retail-inventory-web"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-2 underline decoration-rule decoration-1 underline-offset-4 transition-[color,text-decoration-color] duration-150 ease-out hover:text-ink hover:decoration-ink"
            >
              Frontend
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
