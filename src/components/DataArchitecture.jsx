import React, { useState } from 'react';
import { Database, Code2, Copy, Check, Table2, Layers, Cpu, FileCheck } from 'lucide-react';
import { SQL_QUERIES, SCHEMA_TABLES } from '../data/inventoryData';

export default function DataArchitecture() {
  const [selectedQueryId, setSelectedQueryId] = useState(SQL_QUERIES[0].id);
  const [copied, setCopied] = useState(false);

  const activeQuery = SQL_QUERIES.find(q => q.id === selectedQueryId) || SQL_QUERIES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeQuery.sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center space-x-2">
              <Database className="w-5 h-5 text-sky-400" />
              <span>Arquitectura Relacional Normalizada en Tercera Forma Normal (3NF)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Diseño relacional desacoplado en PostgreSQL 16 con claves subrogadas, constraints de integridad referencial,
              índices B-Tree en columnas de filtrado frecuente y procedimientos almacenados ACID para rotación FEFO.
            </p>
          </div>
          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="px-3 py-1 bg-slate-950 border border-slate-700 text-sky-300 rounded-lg">
              9 Tablas Relacionales
            </span>
            <span className="px-3 py-1 bg-slate-950 border border-slate-700 text-emerald-300 rounded-lg">
              Zero Redundancy
            </span>
          </div>
        </div>
      </div>

      {/* SQL Query Explorer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        {/* Query Navigation Tabs */}
        <div className="border-b border-slate-800 bg-slate-950/80 px-4 py-3 flex flex-wrap gap-2">
          {SQL_QUERIES.map((q) => (
            <button
              key={q.id}
              onClick={() => setSelectedQueryId(q.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedQueryId === q.id
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {q.id.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Query Metadata Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider">
                PostgreSQL Analytical Query
              </span>
              <h3 className="text-base font-bold text-slate-100 mt-0.5">{activeQuery.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{activeQuery.description}</p>
            </div>
            <button
              onClick={handleCopy}
              className="self-start md:self-auto flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado al portapapeles' : 'Copiar SQL'}</span>
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-slate-300 font-mono">
              ⚡ Complejidad: <strong className="text-slate-100">{activeQuery.complexity}</strong>
            </span>
            <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-emerald-400 font-mono">
              🎯 Valor de Negocio: {activeQuery.businessValue}
            </span>
          </div>
        </div>

        {/* SQL Code Block */}
        <div className="bg-[#080d1a] p-4 overflow-x-auto text-xs font-mono text-slate-300 border-b border-slate-800">
          <pre className="leading-relaxed">
            <code>{activeQuery.sql}</code>
          </pre>
        </div>

        {/* Execution Stats Footer */}
        <div className="px-5 py-3 bg-slate-950/90 text-slate-400 text-xs font-mono flex flex-wrap items-center justify-between gap-2 border-t border-slate-800">
          <div className="flex items-center space-x-4">
            <span>Motor: <strong>PostgreSQL 16.4</strong></span>
            <span>Plan: <strong>Index Scan + HashAggregate</strong></span>
          </div>
          <span className="text-emerald-400">Execution time: ~3.8ms</span>
        </div>
      </div>

      {/* 3NF Relational Schema Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <Table2 className="w-4 h-4 text-emerald-400" />
              <span>Diccionario del Esquema 3NF (Tablas & Restricciones)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Definición formal de entidades con claves foráneas e integridad referencial estricta.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">DDL: 01_schema_ddl_3nf.sql</span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SCHEMA_TABLES.map((t, idx) => (
            <div key={idx} className="p-4 bg-slate-950/70 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <span className="font-mono font-bold text-xs text-sky-400">{t.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  {t.type}
                </span>
              </div>
              <ul className="mt-2.5 space-y-1">
                {t.columns.map((col, cIdx) => (
                  <li key={cIdx} className="text-[11px] font-mono text-slate-300 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                    <span className={col.includes('PK') ? 'text-amber-400 font-semibold' : col.includes('FK') ? 'text-sky-300' : 'text-slate-300'}>
                      {col}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
