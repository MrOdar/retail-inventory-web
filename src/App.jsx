import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import DataArchitecture from './components/DataArchitecture';
import { ExternalLink, Database, Layers, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('executive');
  const [selectedStore, setSelectedStore] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Subheader banner */}
        <div className="mb-6 pb-4 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
              <span>Retail Inventory & Waste Analytics Engine</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Plataforma de optimización de cadena de frío, auditoría de discrepancias GRN y rotación de stock perecible con PostgreSQL.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Online & Audited</span>
            </span>
          </div>
        </div>

        {/* Dynamic Tab Views */}
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
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-300">RetailOps 3NF</span>
            <span>·</span>
            <span>Diseñado por <strong>Odar Javier Alcocer Vásquez</strong> (UPC)</span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://odaralcocer.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center space-x-1"
            >
              <span>Portafolio Oficial</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/MrOdar/retail-inventory-analytics-3nf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
