import React from 'react';
import { 
  AlertTriangle, 
  TrendingDown, 
  PackageCheck, 
  Clock, 
  Building2, 
  Filter, 
  Truck, 
  Flame, 
  ArrowUpRight 
} from 'lucide-react';
import { STORES, CATEGORIES, FEFO_ALERTS, SUPPLIER_DISCREPANCIES, WASTE_INTENSITY, STOCK_VELOCITY } from '../data/inventoryData';

export default function ExecutiveDashboard({ selectedStore, setSelectedStore, selectedCategory, setSelectedCategory }) {
  // Filter FEFO alerts based on store & category
  const filteredFefo = FEFO_ALERTS.filter(item => {
    const matchStore = selectedStore === 'ALL' || item.storeId === selectedStore;
    const matchCat = selectedCategory === 'ALL' || item.categoryId === selectedCategory;
    return matchStore && matchCat;
  });

  // Calculate dynamic KPIs
  const totalExposureCost = filteredFefo.reduce((sum, item) => sum + (item.daysLeft <= 5 ? item.exposureCost : 0), 0);
  const criticalBatchesCount = filteredFefo.filter(item => item.daysLeft <= 2).length;
  const highRiskDsiCount = STOCK_VELOCITY.filter(item => item.dsiDays <= 1.0).length;

  return (
    <div className="space-y-6">
      {/* Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-slate-300">
          <Filter className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Filtros Operativos:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Store Selector */}
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-slate-400" />
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              {STORES.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.format})
                </option>
              ))}
            </select>
          </div>

          {/* Category Selector */}
          <div className="flex items-center space-x-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Exposición Financiera */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Exposición Vencimiento FEFO</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-100 font-mono">S/ {totalExposureCost.toFixed(2)}</span>
            <span className="text-xs text-rose-400 font-medium font-mono">&lt;= 5 días</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Riesgo monetario mitigable con rebaja dinámica.</p>
        </div>

        {/* KPI 2: Lotes en Alerta Roja */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Lotes Críticos (&lt;= 48h)</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-100 font-mono">{criticalBatchesCount}</span>
            <span className="text-xs text-amber-400 font-medium">Acción Inmediata</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Prioridad 1 en góndola según regla FEFO.</p>
        </div>

        {/* KPI 3: Riesgo de Quiebre (DSI) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">SKUs con DSI Crítico</span>
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-100 font-mono">{highRiskDsiCount}</span>
            <span className="text-xs text-sky-400 font-medium">Stockout Warning</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Días de inventario &lt;= 1.0 (reorden urgente).</p>
        </div>

        {/* KPI 4: Auditoría de Recepciones */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Fill-Rate Promedio Proveedores</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-100 font-mono">95.0%</span>
            <span className="text-xs text-emerald-400 font-medium">Auditado GRN</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Discrepancias bloqueadas antes de pago.</p>
        </div>
      </div>

      {/* Main Grid: FEFO Alert Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Matriz Operativa FEFO: Exposición y Alertas de Rotación</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Consultas SQL analíticas ejecutadas sobre lotes activos de PostgreSQL (Query 1).
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {filteredFefo.length} lotes encontrados
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 font-mono uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4">Sede / Tienda</th>
                <th className="py-3 px-4">Producto & Lote</th>
                <th className="py-3 px-4">Stock Actual</th>
                <th className="py-3 px-4">Vence en</th>
                <th className="py-3 px-4">Costo en Riesgo</th>
                <th className="py-3 px-4">Plan de Acción Recomendado</th>
                <th className="py-3 px-4 text-center">Prioridad FEFO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredFefo.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-200">{item.storeName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{item.storeCode}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-100">{item.productName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{item.batchCode} · {item.categoryName}</div>
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-200">
                    {item.currentQty} und.
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                      item.daysLeft <= 1 ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                      item.daysLeft <= 3 ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                      'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}>
                      {item.daysLeft} días
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-200">
                    S/ {item.exposureCost.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[11px] text-slate-300 font-medium">
                      {item.actionPlan}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-200">
                    #{item.rotationRank}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Section: DSI Stockout Velocity & Supplier Discrepancies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: DSI Velocity & Reorder Alerts */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
                <TrendingDown className="w-4 h-4 text-sky-400" />
                <span>Velocidad de Ventas & Días de Inventario (DSI)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Detección de sobrestock y riesgo de quiebre (Query 4).</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {STOCK_VELOCITY.map((stock, i) => (
              <div key={i} className="p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-200">{stock.name}</div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Stock: {stock.stockOnHand} und. | Rotación: {stock.dailyVelocity}/día
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-slate-200">
                    {stock.dsiDays} días DSI
                  </div>
                  <span className={`text-[10px] font-semibold uppercase ${
                    stock.severity === 'danger' ? 'text-rose-400' :
                    stock.severity === 'warning' ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {stock.healthStatus.split(':')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Supplier Discrepancies Audit */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Auditoría de Recepciones vs Guías de Despacho (GRN)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Control de mermas de origen y sobrepago a proveedores (Query 2).</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {SUPPLIER_DISCREPANCIES.map((sup, idx) => (
              <div key={idx} className="p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-200">{sup.supplier}</div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    RUC: {sup.ruc} · Despachadas: {sup.dispatchedQty} | Conformes: {sup.acceptedQty}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-slate-200">
                    {sup.fillRatePct.toFixed(1)}% Fill Rate
                  </div>
                  <div className={`text-[10px] font-semibold ${
                    sup.discrepancyQty > 0 ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {sup.discrepancyQty > 0 ? `-${sup.discrepancyQty} und. dañadas (S/ ${sup.lossAmountPEN.toFixed(2)})` : 'Sin discrepancias'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
