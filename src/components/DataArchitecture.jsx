import React, { useMemo, useState } from 'react';
import { KeyRound, Link2 } from 'lucide-react';
import { SCHEMA_TABLES, SQL_QUERIES } from '../data/inventoryData';
import { CopyButton, Rule, Section, Tag } from './primitives';
import { PRESS } from '../lib/ui';

/* ---------------------------------------------------------------------------
   Minimal SQL highlighter
   ---------------------------------------------------------------------------
   Tokenises comments, strings, numbers and keywords with a single pass so the
   ordering is unambiguous (a keyword inside a comment stays a comment). The
   palette is the report's own ink and signal tokens, not a borrowed editor
   theme, so the code block belongs to the page.
   --------------------------------------------------------------------------- */
const KEYWORDS = [
  'WITH', 'SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING', 'JOIN',
  'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL JOIN', 'CROSS JOIN', 'ON',
  'AS', 'AND', 'OR', 'NOT', 'IN', 'IS', 'NULL', 'CASE', 'WHEN', 'THEN', 'ELSE',
  'END', 'OVER', 'PARTITION BY', 'DENSE_RANK', 'ROW_NUMBER', 'RANK', 'SUM',
  'COUNT', 'AVG', 'MIN', 'MAX', 'ROUND', 'COALESCE', 'NULLIF', 'CAST',
  'INTERVAL', 'CURRENT_DATE', 'CURRENT_TIMESTAMP', 'DATE_TRUNC', 'EXTRACT',
  'FILTER', 'DISTINCT', 'LIMIT', 'DESC', 'ASC', 'UNION ALL', 'UNION', 'BETWEEN',
  'EXISTS', 'LATERAL', 'RETURNING', 'INSERT', 'UPDATE', 'DELETE', 'VALUES',
];

// Longest keywords first so `LEFT JOIN` wins over `JOIN`.
const KEYWORD_PATTERN = KEYWORDS
  .slice()
  .sort((a, b) => b.length - a.length)
  .map((word) => word.replace(/ /g, '\\s+'))
  .join('|');

const TOKEN_RE = new RegExp(
  `(--[^\\n]*)` +                       // 1: line comment
  `|('(?:[^']|'')*')` +                 // 2: single-quoted literal
  `|(\\b\\d+(?:\\.\\d+)?\\b)` +         // 3: number
  `|(\\b(?:${KEYWORD_PATTERN})\\b)`,    // 4: keyword
  'gi',
);

const TOKEN_CLASS = {
  1: 'text-ink-3 italic',
  2: 'text-healthy',
  3: 'text-loss',
  4: 'text-ink font-medium',
};

function highlight(sql) {
  const out = [];
  let cursor = 0;
  let match;

  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(sql)) !== null) {
    if (match.index > cursor) {
      out.push(sql.slice(cursor, match.index));
    }
    const group = [1, 2, 3, 4].find((index) => match[index] !== undefined);
    out.push(
      <span key={`${match.index}-${group}`} className={TOKEN_CLASS[group]}>
        {match[group]}
      </span>,
    );
    cursor = match.index + match[0].length;
  }
  if (cursor < sql.length) out.push(sql.slice(cursor));
  return out;
}

/* ---------------------------------------------------------------------------
   Schema column rendering
   --------------------------------------------------------------------------- */
function Column({ definition }) {
  const isPk = definition.includes('(PK)');
  const isFk = definition.includes('(FK)');
  const isUk = definition.includes('(UK)');
  const name = definition.replace(/\s*\((PK|FK|UK)\)\s*/g, '');

  const Icon = isPk ? KeyRound : isFk ? Link2 : null;
  const tone = isPk ? 'text-caution' : isFk ? 'text-accent' : 'text-ink-2';

  return (
    <li className="flex items-baseline gap-2 py-0.5">
      <span className="grid w-3 shrink-0 place-items-center pt-px">
        {Icon ? (
          <Icon className={`h-3 w-3 ${tone}`} strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-rule" />
        )}
      </span>
      <span className={`font-mono text-[0.75rem] ${isPk || isFk ? tone : 'text-ink-2'}`}>
        {name}
      </span>
      {isUk ? (
        <span className="font-mono text-[0.625rem] uppercase tracking-wider text-ink-3">
          único
        </span>
      ) : null}
    </li>
  );
}

export default function DataArchitecture() {
  const [activeId, setActiveId] = useState(SQL_QUERIES[0].id);
  const activeQuery = useMemo(
    () => SQL_QUERIES.find((query) => query.id === activeId) ?? SQL_QUERIES[0],
    [activeId],
  );

  const relationCount = useMemo(
    () => SCHEMA_TABLES.reduce(
      (total, table) => total + table.columns.filter((c) => c.includes('(FK)')).length,
      0,
    ),
    [],
  );

  return (
    <div className="space-y-14">
      {/* ===================================================================
          LEDE
          =================================================================== */}
      <section className="enter enter-1">
        <div className="max-w-3xl">
          <p className="label">Modelo relacional</p>
          <h2 className="mt-3 font-display text-head leading-[1.06] tracking-tight text-ink sm:text-head-lg">
            Tercera forma normal, para que la anomalía sea{' '}
            <span className="text-ink font-semibold">imposible</span> y no sólo
            improbable.
          </h2>
          <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-2">
            El esquema elimina anomalías de inserción, actualización y borrado;
            la integridad de dominio vive en restricciones <span className="font-mono text-[0.875rem]">CHECK</span>,
            columnas generadas e índices parciales, no en código de aplicación.
          </p>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-rule pt-8 sm:grid-cols-4 lg:divide-x lg:divide-rule">
          {[
            { k: 'Tablas', v: SCHEMA_TABLES.length, n: 'Entidades normalizadas' },
            { k: 'Claves foráneas', v: relationCount, n: 'Relaciones con integridad referencial' },
            { k: 'Consultas', v: SQL_QUERIES.length, n: 'CTE y funciones de ventana' },
            { k: 'Motor', v: '15', n: 'PostgreSQL, compatible 14+' },
          ].map((item, index, all) => (
            <div
              key={item.k}
              className={
                index === 0 ? 'lg:pr-8'
                  : index === all.length - 1 ? 'lg:pl-8'
                  : 'lg:px-8'
              }
            >
              <dt className="label">{item.k}</dt>
              <dd className="mt-1.5 font-display text-fig text-ink">{item.v}</dd>
              <dd className="mt-1 text-[0.8125rem] leading-snug text-ink-2">{item.n}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ===================================================================
          SQL EXPLORER
          =================================================================== */}
      <Section
        className="enter enter-2"
        number="01"
        title="Consultas analíticas"
        lede="Las cuatro consultas que sostienen el informe operativo, tal como se ejecutan en PostgreSQL."
        meta={<CopyButton text={activeQuery.sql} idleLabel="Copiar SQL" doneLabel="Copiado" />}
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10">
          {/* --- Query index: numbered list, not a pill row --------------- */}
          <nav aria-label="Índice de consultas">
            <ul>
              {SQL_QUERIES.map((query, index) => {
                const active = query.id === activeQuery.id;
                return (
                  <li key={query.id}>
                    {index > 0 ? <Rule soft /> : null}
                    <button
                      type="button"
                      onClick={() => setActiveId(query.id)}
                      aria-current={active ? 'true' : undefined}
                      className={`group relative flex w-full items-baseline gap-3 py-3 pl-3 pr-2 text-left ${PRESS} ${
                        active ? 'text-ink' : 'text-ink-2 hover:text-ink'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute inset-y-2 left-0 w-0.5 rounded-xs transition-[opacity,background-color] duration-150 ease-out ${
                          active ? 'bg-ink opacity-100' : 'bg-ink-3 opacity-0'
                        }`}
                      />
                      <span className="font-mono text-[0.6875rem] tracking-widest text-ink-3">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0">
                        <span className={`block text-[0.8125rem] leading-snug ${active ? 'font-medium' : ''}`}>
                          {query.title.replace(/^Query\s*\d+:\s*/i, '')}
                        </span>
                        <span className="mt-1 block font-mono text-[0.625rem] uppercase tracking-wider text-ink-3">
                          {query.complexity}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* --- Active query ------------------------------------------- */}
          <div className="min-w-0">
            <h3 className="font-display text-[1.45rem] leading-tight text-ink">
              {activeQuery.title.replace(/^Query\s*\d+:\s*/i, '')}
            </h3>
            <p className="mt-2 max-w-2xl text-[0.8125rem] leading-relaxed text-ink-2">
              {activeQuery.description}
            </p>

            <dl className="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-8">
              <div>
                <dt className="label">Técnica</dt>
                <dd className="mt-1 font-mono text-[0.75rem] text-ink">{activeQuery.complexity}</dd>
              </div>
              <div className="max-w-md">
                <dt className="label">Valor de negocio</dt>
                <dd className="mt-1 text-[0.8125rem] leading-snug text-ink-2">
                  {activeQuery.businessValue}
                </dd>
              </div>
            </dl>

            {/* Concentric radius: the inner <pre> is rounded-sm (4px) and sits
                on 12px of padding, so the outer frame takes 4 + 12 + 1px
                border = 17px, which is the `lg` token (11px) plus the gap it
                cannot express — so the frame uses an explicit 17px. */}
            <figure className="mt-6 rounded-[17px] border border-rule bg-paper-2 p-3">
              <pre className="scroll-x max-h-[32rem] overflow-y-auto rounded-sm bg-paper p-4 font-mono text-[0.75rem] leading-[1.7] text-ink-2 [overscroll-behavior:contain]">
                <code>{highlight(activeQuery.sql)}</code>
              </pre>
              <figcaption className="flex flex-wrap items-center justify-between gap-2 px-1 pt-3">
                <span className="font-mono text-[0.625rem] uppercase tracking-wider text-ink-3">
                  PostgreSQL 15 · sql/03_analytical_queries.sql
                </span>
                <Tag>Sólo lectura</Tag>
              </figcaption>
            </figure>
          </div>
        </div>
      </Section>

      {/* ===================================================================
          SCHEMA DICTIONARY
          =================================================================== */}
      <Section
        number="02"
        title="Diccionario del esquema"
        lede="Entidades, claves primarias y foráneas del modelo en tercera forma normal."
        meta={
          <span className="font-mono text-[0.6875rem] text-ink-3">
            sql/01_schema_ddl_3nf.sql
          </span>
        }
      >
        {/* Legend: the icons mean nothing until they are named once. */}
        <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="flex items-center gap-1.5 font-mono text-[0.6875rem] text-ink-3">
            <KeyRound className="h-3 w-3 text-caution" strokeWidth={1.5} aria-hidden="true" />
            Clave primaria
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[0.6875rem] text-ink-3">
            <Link2 className="h-3 w-3 text-accent" strokeWidth={1.5} aria-hidden="true" />
            Clave foránea
          </span>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
          {SCHEMA_TABLES.map((table) => (
            <div key={table.name} className="border-t border-rule pt-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-mono text-[0.8125rem] font-medium text-ink">
                  {table.name}
                </h3>
                <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-wider text-ink-3">
                  {table.type}
                </span>
              </div>
              <ul className="mt-2.5">
                {table.columns.map((column) => (
                  <Column key={column} definition={column} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
