import React, { useMemo } from 'react';
import { ChevronDown, Inbox } from 'lucide-react';
import {
  CATEGORIES,
  FEFO_ALERTS,
  STOCK_VELOCITY,
  STORES,
  SUPPLIER_DISCREPANCIES,
  WASTE_INTENSITY,
} from '../data/inventoryData';
import { Figure, Meter, Rule, Section, Tag } from './primitives';
import {
  PRESS, fmtDec, fmtInt, fmtPEN, fmtPct, severityByDays, severityOf,
} from '../lib/ui';

/* ---------------------------------------------------------------------------
   Filter control
   ---------------------------------------------------------------------------
   A native <select> keeps the mobile picker and the keyboard behaviour. Only
   the chrome is restyled; the chevron is decorative and the border carries the
   3:1 non-text contrast a form control needs.
   --------------------------------------------------------------------------- */
function Selector({ id, label, value, onChange, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="label">{label}</label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full appearance-none rounded-sm border border-rule-field bg-paper py-2 pl-3 pr-9 text-sm text-ink hover:bg-paper-2 ${PRESS}`}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Empty state
   --------------------------------------------------------------------------- */
function Empty({ title, hint }) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
      <Inbox className="h-6 w-6 text-ink-3" strokeWidth={1.5} aria-hidden="true" />
      <p className="font-display text-xl text-ink">{title}</p>
      <p className="max-w-sm text-[0.8125rem] leading-relaxed text-ink-2">{hint}</p>
    </div>
  );
}

export default function ExecutiveDashboard({
  selectedStore, setSelectedStore, selectedCategory, setSelectedCategory,
}) {
  const filteredFefo = useMemo(
    () => FEFO_ALERTS.filter((item) => {
      const matchStore = selectedStore === 'ALL' || item.storeId === selectedStore;
      const matchCategory = selectedCategory === 'ALL' || item.categoryId === selectedCategory;
      return matchStore && matchCategory;
    }),
    [selectedStore, selectedCategory],
  );

  const velocity = useMemo(
    () => selectedStore === 'ALL'
      ? STOCK_VELOCITY
      : STOCK_VELOCITY.filter((row) => {
          const store = STORES.find((s) => s.id === selectedStore);
          return store ? row.storeCode === store.code : true;
        }),
    [selectedStore],
  );

  const waste = useMemo(
    () => selectedStore === 'ALL'
      ? WASTE_INTENSITY
      : WASTE_INTENSITY.filter((row) => row.storeId === selectedStore),
    [selectedStore],
  );

  const kpis = useMemo(() => {
    const exposure = filteredFefo
      .filter((item) => item.daysLeft <= 5)
      .reduce((sum, item) => sum + item.exposureCost, 0);

    const critical = filteredFefo.filter((item) => item.daysLeft <= 2).length;
    const stockoutRisk = velocity.filter((row) => row.dsiDays <= 1).length;

    const dispatched = SUPPLIER_DISCREPANCIES.reduce((s, r) => s + r.dispatchedQty, 0);
    const accepted = SUPPLIER_DISCREPANCIES.reduce((s, r) => s + r.acceptedQty, 0);
    const fillRate = dispatched > 0 ? (accepted / dispatched) * 100 : 0;
    const shortValue = SUPPLIER_DISCREPANCIES.reduce((s, r) => s + r.lossAmountPEN, 0);

    const worstWaste = waste.reduce(
      (worst, row) => (!worst || row.wasteRatioPct > worst.wasteRatioPct ? row : worst),
      null,
    );

    return { exposure, critical, stockoutRisk, fillRate, shortValue, worstWaste, dispatched, accepted };
  }, [filteredFefo, velocity, waste]);

  const maxWasteRatio = Math.max(1, ...WASTE_INTENSITY.map((r) => r.wasteRatioPct));
  const storeLabel = STORES.find((s) => s.id === selectedStore)?.name ?? 'Consolidado';

  return (
    <div className="space-y-14">
      {/* ===================================================================
          LEDE — the headline reading of the report
          =================================================================== */}
      <section>
        <div className="enter enter-1 max-w-3xl">
          <p className="label">Resumen ejecutivo</p>
          <h2 className="mt-3 font-display text-head leading-[1.06] tracking-tight text-ink sm:text-head-lg">
            Tres cuartos de la pérdida es{' '}
            <span className="italic text-loss">vencimiento</span>, y el
            vencimiento se previene rotando.
          </h2>
          <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-2">
            La merma por caducidad es la única categoría que una regla
            determinista de rotación puede evitar de raíz. Esta vista prioriza
            los lotes cuyo capital aún es recuperable con rebaja, no los que ya
            se perdieron.
          </p>
        </div>

        {/* Headline figures, separated by hairlines rather than boxed in
            identical cards. */}
        <div className="enter enter-2 mt-10 grid grid-cols-1 gap-x-8 gap-y-8 border-t border-rule pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-rule">
          <div className="lg:pr-8">
            <Figure
              label={"Exposición ≤ 5 días"}
              value={fmtPEN(kpis.exposure)}
              severity={kpis.exposure > 0 ? 'danger' : 'healthy'}
              note="Capital en lotes activos aún recuperable con rebaja dinámica."
            />
          </div>
          <div className="lg:px-8">
            <Figure
              label={"Lotes críticos ≤ 48 h"}
              value={fmtInt(kpis.critical)}
              unit="lotes"
              severity={kpis.critical > 0 ? 'danger' : 'healthy'}
              note="Prioridad 1 en góndola según la regla FEFO."
            />
          </div>
          <div className="lg:px-8">
            <Figure
              label="SKU en riesgo de quiebre"
              value={fmtInt(kpis.stockoutRisk)}
              unit="SKU"
              severity={kpis.stockoutRisk > 0 ? 'warning' : 'healthy'}
              note="Días de inventario ≤ 1,0: reposición urgente."
            />
          </div>
          <div className="lg:pl-8">
            <Figure
              label="Fill rate proveedores"
              value={fmtPct(kpis.fillRate)}
              severity={kpis.fillRate >= 95 ? 'healthy' : 'warning'}
              note={`${fmtPEN(kpis.shortValue)} no recibidos pero facturables.`}
            />
          </div>
        </div>
      </section>

      {/* ===================================================================
          FILTERS
          =================================================================== */}
      <section className="enter enter-3">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Selector id="filter-store" label="Sede" value={selectedStore} onChange={setSelectedStore}>
            {STORES.map((store) => (
              <option key={store.id} value={store.id}>{store.name}</option>
            ))}
          </Selector>

          <Selector id="filter-category" label="Categoría" value={selectedCategory} onChange={setSelectedCategory}>
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </Selector>

          <div className="hidden items-end lg:col-span-2 lg:flex">
            <p className="pb-2 font-mono text-[0.6875rem] leading-relaxed text-ink-3">
              Ámbito activo: {storeLabel} ·{' '}
              {filteredFefo.length === 1 ? '1 lote' : `${filteredFefo.length} lotes`} en matriz FEFO
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================
          FEFO MATRIX
          =================================================================== */}
      <Section
        className="enter enter-4"
        number="01"
        title="Matriz de rotación FEFO"
        lede="Lotes activos ordenados por cercanía de vencimiento. El rango de prioridad proviene de un DENSE_RANK por sede y categoría."
        meta={<Tag>Query 1</Tag>}
      >
        {filteredFefo.length === 0 ? (
          <Empty
            title="Sin lotes en el ámbito seleccionado"
            hint="Ninguna combinación de sede y categoría coincide. Amplía el filtro para ver los lotes activos."
          />
        ) : (
          <div className="scroll-x -mx-5 px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[56rem] border-collapse text-left">
              <caption className="sr-only">
                Lotes activos con riesgo de vencimiento, costo expuesto y acción recomendada
              </caption>
              <thead>
                <tr className="border-b border-rule">
                  <th scope="col" className="label pb-2.5 pl-3 pr-4 font-normal">Sede</th>
                  <th scope="col" className="label pb-2.5 pr-4 font-normal">Producto y lote</th>
                  <th scope="col" className="label pb-2.5 pr-4 text-right font-normal">Stock</th>
                  <th scope="col" className="label pb-2.5 pr-4 text-right font-normal">Vence</th>
                  <th scope="col" className="label whitespace-nowrap pb-2.5 pr-6 text-right font-normal">Costo expuesto</th>
                  <th scope="col" className="label pb-2.5 pr-4 font-normal">Acción del motor</th>
                  <th scope="col" className="label pb-2.5 pr-3 text-right font-normal">Rango</th>
                </tr>
              </thead>
              <tbody>
                {filteredFefo.map((item) => {
                  const level = severityByDays(item.daysLeft);
                  const tone = severityOf(level);
                  // The action string is a machine-emitted code; show the
                  // detail after the colon and keep the severity as the Tag.
                  const detail = item.actionPlan.includes(':')
                    ? item.actionPlan.split(':').slice(1).join(':').trim()
                    : item.actionPlan;

                  return (
                    <tr
                      key={`${item.storeCode}-${item.batchCode}`}
                      className="group border-b border-rule-soft transition-[background-color] duration-150 ease-out hover:bg-paper-2"
                    >
                      {/* A 2px severity bar on the row edge: the status is
                          legible before reading a single word. */}
                      <td className="relative py-3.5 pl-3 align-top">
                        <span
                          aria-hidden="true"
                          className={`absolute inset-y-2 left-0 w-0.5 rounded-xs ${tone.bg}`}
                        />
                        <span className="block text-sm text-ink">{item.storeName}</span>
                        <span className="mt-0.5 block font-mono text-[0.6875rem] text-ink-3">
                          {item.storeCode}
                        </span>
                      </td>

                      <td className="py-3.5 pr-4 align-top">
                        <span className="block text-sm text-ink">{item.productName}</span>
                        <span className="mt-0.5 block font-mono text-[0.6875rem] text-ink-3">
                          {item.batchCode} · {item.categoryName}
                        </span>
                      </td>

                      <td className="py-3.5 pr-4 text-right align-top font-mono text-sm text-ink">
                        {fmtInt(item.currentQty)}
                        <span className="ml-1 text-ink-3">und</span>
                      </td>

                      <td className="py-3.5 pr-4 text-right align-top">
                        <span className={`whitespace-nowrap font-mono text-sm font-medium ${tone.ink}`}>
                          {item.daysLeft === 1 ? '1 día' : `${item.daysLeft} días`}
                        </span>
                      </td>

                      <td className="py-3.5 pr-4 text-right align-top font-mono text-sm text-ink">
                        {fmtPEN(item.exposureCost)}
                      </td>

                      <td className="max-w-[18rem] py-3.5 pr-4 align-top">
                        <Tag severity={level}>{tone.label}</Tag>
                        <span className="mt-1 block font-mono text-[0.6875rem] leading-snug text-ink-3">
                          {detail}
                        </span>
                      </td>

                      <td className="py-3.5 pr-3 text-right align-top font-mono text-sm text-ink-2">
                        {item.rotationRank}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      {/* ===================================================================
          WASTE INTENSITY
          =================================================================== */}
      <Section
        number="02"
        title="Intensidad de merma por sede"
        lede="Pérdida monetaria como porcentaje de la venta bruta. La dispersión entre sedes es lo accionable: señala formato y tamaño de pedido, no disciplina del personal."
        meta={<Tag>Query 3</Tag>}
      >
        {waste.length === 0 ? (
          <Empty
            title="Sin registros de merma"
            hint="La sede seleccionada no tiene mermas registradas en el periodo."
          />
        ) : (
          <div className="grid grid-cols-1 gap-x-12 gap-y-7 lg:grid-cols-2">
            {waste.map((row) => {
              const level = row.wasteRatioPct >= 5 ? 'danger'
                : row.wasteRatioPct >= 3 ? 'warning' : 'healthy';
              const tone = severityOf(level);
              return (
                <div key={`${row.storeCode}-${row.categoryName}`}>
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm text-ink">{row.storeName}</p>
                      <p className="mt-0.5 font-mono text-[0.6875rem] text-ink-3">
                        {row.storeCode} · {row.categoryName}
                      </p>
                    </div>
                    <p className={`font-display text-fig-sm ${tone.ink}`}>
                      {fmtPct(row.wasteRatioPct, 2)}
                    </p>
                  </div>
                  <Meter
                    value={row.wasteRatioPct}
                    max={maxWasteRatio}
                    severity={level}
                    className="mt-3"
                  />
                  <p className="mt-2 font-mono text-[0.6875rem] text-ink-3">
                    Merma {fmtPEN(row.wasteAmountPEN)} sobre venta {fmtPEN(row.grossSalesPEN)}
                    {' · '}
                    {fmtPct(row.wasteContributionPct, 0)} de la pérdida de la sede
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </Section>

      {/* ===================================================================
          VELOCITY + SUPPLIERS
          =================================================================== */}
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-12">
        <Section
          number="03"
          title="Velocidad y días de inventario"
          lede="Stock actual contra la media móvil de venta diaria. Detecta sobrestock perecible y quiebre inminente."
          meta={<Tag>Query 4</Tag>}
        >
          {velocity.length === 0 ? (
            <Empty title="Sin SKU en el ámbito" hint="La sede seleccionada no tiene SKU con historial de rotación." />
          ) : (
            <ul className="space-y-0">
              {velocity.map((row, index) => {
                const tone = severityOf(row.severity);
                const headline = row.healthStatus.split(':')[0].trim();
                const detail = row.healthStatus.includes(':')
                  ? row.healthStatus.split(':').slice(1).join(':').trim()
                  : null;
                return (
                  <li key={`${row.sku}-${row.storeCode}`}>
                    {index > 0 ? <Rule soft /> : null}
                    <div className="flex items-start justify-between gap-5 py-4">
                      <div className="min-w-0">
                        <p className="text-sm text-ink">{row.name}</p>
                        <p className="mt-0.5 font-mono text-[0.6875rem] text-ink-3">
                          {row.sku} · {row.storeCode} · stock {fmtInt(row.stockOnHand)} und
                          {' · '}rotación {fmtDec(row.dailyVelocity)}/día
                        </p>
                        <p className={`mt-1.5 font-mono text-[0.6875rem] uppercase tracking-wider ${tone.ink}`}>
                          {headline}
                        </p>
                        {detail ? (
                          <p className="mt-0.5 text-[0.75rem] leading-snug text-ink-2">{detail}</p>
                        ) : null}
                      </div>
                      <div className="shrink-0 text-right">
                        <p className={`font-display text-fig-sm ${tone.ink}`}>{fmtDec(row.dsiDays)}</p>
                        <p className="label mt-0.5">días DSI</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Section>

        <Section
          number="04"
          title="Recepciones contra guía de despacho"
          lede="Diferencia entre lo despachado por el proveedor y el conteo físico en tienda. Sostiene la nota de crédito antes del pago."
          meta={<Tag>Query 2</Tag>}
        >
          <ul className="space-y-0">
            {SUPPLIER_DISCREPANCIES.map((supplier, index) => {
              const hasGap = supplier.discrepancyQty > 0;
              const level = hasGap ? 'danger' : 'healthy';
              const tone = severityOf(level);
              return (
                <li key={supplier.ruc}>
                  {index > 0 ? <Rule soft /> : null}
                  <div className="py-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm text-ink">{supplier.supplier}</p>
                        <p className="mt-0.5 font-mono text-[0.6875rem] text-ink-3">
                          RUC {supplier.ruc} · despachado {fmtInt(supplier.dispatchedQty)}
                          {' · '}conforme {fmtInt(supplier.acceptedQty)}
                        </p>
                      </div>
                      <p className={`font-display text-fig-sm ${tone.ink}`}>
                        {fmtPct(supplier.fillRatePct, 1)}
                      </p>
                    </div>
                    <Meter
                      value={supplier.fillRatePct}
                      severity={level}
                      className="mt-3"
                    />
                    <p className="mt-2 text-[0.75rem] text-ink-2">
                      {hasGap ? (
                        <>
                          <span className={tone.ink}>
                            −{fmtInt(supplier.discrepancyQty)} und ·{' '}
                            {fmtPEN(supplier.lossAmountPEN)}
                          </span>{' '}
                          reclamables
                        </>
                      ) : (
                        'Recepción conforme, sin diferencia que reclamar.'
                      )}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <Rule className="mt-2" />
          <p className="mt-4 font-mono text-[0.6875rem] leading-relaxed text-ink-3">
            Total red: {fmtInt(kpis.accepted)} de {fmtInt(kpis.dispatched)} und conformes
            {' · '}fill rate {fmtPct(kpis.fillRate)}
          </p>
        </Section>
      </div>
    </div>
  );
}
