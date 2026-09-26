export const STORES = [
  { id: 'ALL', code: 'ALL', name: 'Todas las Sedes (Consolidado)', district: 'Lima Metropolitana', format: 'CONSOLIDATED' },
  { id: '1', code: 'TB-101', name: 'Tambo Miraflores Shell', district: 'Miraflores', format: 'FLAGSHIP' },
  { id: '2', code: 'TB-102', name: 'Tambo San Isidro Corp', district: 'San Isidro', format: 'EXPRESS' },
  { id: '3', code: 'TB-103', name: 'Tambo Surco Primavera', district: 'Santiago de Surco', format: 'CONVENIENCE' },
  { id: '4', code: 'TB-104', name: 'Tambo San Miguel Plaza', district: 'San Miguel', format: 'CONVENIENCE' }
];

export const CATEGORIES = [
  { id: 'ALL', name: 'Todas las Categorías' },
  { id: '1', name: 'Lácteos & Derivados' },
  { id: '2', name: 'Panadería & Embutidos' },
  { id: '3', name: 'Comidas Listas / Calientes' },
  { id: '4', name: 'Bebidas & Gaseosas' }
];

export const FEFO_ALERTS = [
  {
    storeId: '1',
    storeCode: 'TB-101',
    storeName: 'Tambo Miraflores Shell',
    productName: 'Yogurt Fresa 1L Gloria',
    categoryId: '1',
    categoryName: 'Lácteos & Derivados',
    batchCode: 'LOTE-YOG-01',
    currentQty: 18,
    unitCost: 4.20,
    retailPrice: 6.90,
    daysLeft: 2,
    exposureCost: 75.60,
    potentialRevenue: 124.20,
    actionPlan: 'HIGH ALERT: EXPIRING IN <= 48H (50% MARKDOWN)',
    statusSeverity: 'danger',
    rotationRank: 1
  },
  {
    storeId: '1',
    storeCode: 'TB-101',
    storeName: 'Tambo Miraflores Shell',
    productName: 'Pan de Molde Blanco Bimbo 480g',
    categoryId: '2',
    categoryName: 'Panadería & Embutidos',
    batchCode: 'LOTE-PAN-01',
    currentQty: 12,
    unitCost: 5.10,
    retailPrice: 7.80,
    daysLeft: 3,
    exposureCost: 61.20,
    potentialRevenue: 93.60,
    actionPlan: 'MEDIUM ALERT: EXPIRING THIS WEEK (20% PROMO)',
    statusSeverity: 'warning',
    rotationRank: 2
  },
  {
    storeId: '2',
    storeCode: 'TB-102',
    storeName: 'Tambo San Isidro Corp',
    productName: 'Empanada de Carne Tradicional',
    categoryId: '3',
    categoryName: 'Comidas Listas / Calientes',
    batchCode: 'LOTE-EMP-01',
    currentQty: 30,
    unitCost: 2.30,
    retailPrice: 4.90,
    daysLeft: 1,
    exposureCost: 69.00,
    potentialRevenue: 147.00,
    actionPlan: 'HIGH ALERT: CONSUMPTION SHELF 24H (COMBO EXPRESS)',
    statusSeverity: 'danger',
    rotationRank: 1
  },
  {
    storeId: '1',
    storeCode: 'TB-101',
    storeName: 'Tambo Miraflores Shell',
    productName: 'Leche Fresca UHT 1L Gloria',
    categoryId: '1',
    categoryName: 'Lácteos & Derivados',
    batchCode: 'LOTE-LECHE-01',
    currentQty: 42,
    unitCost: 3.80,
    retailPrice: 5.50,
    daysLeft: 35,
    exposureCost: 159.60,
    potentialRevenue: 231.00,
    actionPlan: 'NORMAL: HEALTHY SHELF LIFE',
    statusSeverity: 'success',
    rotationRank: 3
  }
];

export const SUPPLIER_DISCREPANCIES = [
  {
    supplier: 'San Fernando S.A.',
    ruc: '20100108888',
    auditedGRN: 1,
    dispatchedQty: 100,
    acceptedQty: 85,
    discrepancyQty: 15,
    lossAmountPEN: 34.50,
    fillRatePct: 85.00,
    status: 'DISCREPANT (Dañado en transporte)'
  },
  {
    supplier: 'Gloria S.A.',
    ruc: '20100017491',
    auditedGRN: 1,
    dispatchedQty: 110,
    acceptedQty: 110,
    discrepancyQty: 0,
    lossAmountPEN: 0.00,
    fillRatePct: 100.00,
    status: 'CONFORME 100%'
  },
  {
    supplier: 'Bimbo del Perú S.A.',
    ruc: '20255998711',
    auditedGRN: 1,
    dispatchedQty: 40,
    acceptedQty: 40,
    discrepancyQty: 0,
    lossAmountPEN: 0.00,
    fillRatePct: 100.00,
    status: 'CONFORME 100%'
  }
];

export const WASTE_INTENSITY = [
  {
    storeId: '1',
    storeCode: 'TB-101',
    storeName: 'Tambo Miraflores Shell',
    categoryName: 'Comidas Listas / Calientes',
    grossSalesPEN: 395.20,
    wasteAmountPEN: 22.40,
    wasteRatioPct: 5.67,
    wasteContributionPct: 72.73
  },
  {
    storeId: '2',
    storeCode: 'TB-102',
    storeName: 'Tambo San Isidro Corp',
    categoryName: 'Comidas Listas / Calientes',
    grossSalesPEN: 269.50,
    wasteAmountPEN: 11.50,
    wasteRatioPct: 4.27,
    wasteContributionPct: 100.00
  },
  {
    storeId: '1',
    storeCode: 'TB-101',
    storeName: 'Tambo Miraflores Shell',
    categoryName: 'Lácteos & Derivados',
    grossSalesPEN: 320.80,
    wasteAmountPEN: 8.40,
    wasteRatioPct: 2.62,
    wasteContributionPct: 27.27
  }
];

export const STOCK_VELOCITY = [
  {
    sku: 'SKU-2002',
    name: 'Empanada de Carne Tradicional',
    category: 'Comidas Listas',
    storeCode: 'TB-102',
    safetyStock: 25,
    reorderPoint: 60,
    stockOnHand: 30,
    dailyVelocity: 55.0,
    dsiDays: 0.5,
    healthStatus: 'CRITICAL: STOCKOUT DANGER (ORDER NOW)',
    severity: 'danger'
  },
  {
    sku: 'SKU-1001',
    name: 'Yogurt Fresa 1L Gloria',
    category: 'Lácteos',
    storeCode: 'TB-101',
    safetyStock: 15,
    reorderPoint: 35,
    stockOnHand: 18,
    dailyVelocity: 10.7,
    dsiDays: 1.7,
    healthStatus: 'REORDER TRIGGER REACHED',
    severity: 'warning'
  },
  {
    sku: 'SKU-2001',
    name: 'Pan de Molde Blanco Bimbo 480g',
    category: 'Panadería',
    storeCode: 'TB-101',
    safetyStock: 12,
    reorderPoint: 30,
    stockOnHand: 12,
    dailyVelocity: 14.0,
    dsiDays: 0.9,
    healthStatus: 'CRITICAL: SAFETY STOCK HIT',
    severity: 'danger'
  },
  {
    sku: 'SKU-1002',
    name: 'Leche Fresca UHT 1L Gloria',
    category: 'Lácteos',
    storeCode: 'TB-101',
    safetyStock: 20,
    reorderPoint: 50,
    stockOnHand: 42,
    dailyVelocity: 6.0,
    dsiDays: 7.0,
    healthStatus: 'BALANCED INVENTORY',
    severity: 'success'
  }
];

export const SQL_QUERIES = [
  {
    id: 'fefo-matrix',
    title: 'Query 1: Matriz de Exposición Financiera y Riesgo FEFO',
    description: 'Identifica lotes activos próximos a vencer (<= 5 días) para activar rebajas dinámicas antes de convertirse en 100% de pérdida por merma.',
    complexity: 'CTEs + Window Functions (DENSE_RANK)',
    businessValue: 'Mitigación proactiva de mermas y rotación óptima de inventario perecible.',
    sql: `-- ============================================================================
-- QUERY 1: FEFO EXPIRATION RISK MATRIX & FINANCIAL EXPOSURE ($)
-- ============================================================================
WITH active_batches_summary AS (
    SELECT 
        b.batch_id,
        b.batch_code,
        s.store_code,
        s.store_name,
        p.sku_code,
        p.product_name,
        c.category_name,
        b.current_qty,
        p.unit_cost,
        p.retail_price,
        b.expiration_date,
        (b.expiration_date - CURRENT_DATE) AS days_until_expiration,
        ROUND((b.current_qty * p.unit_cost)::NUMERIC, 2) AS total_financial_exposure_cost,
        ROUND((b.current_qty * p.retail_price)::NUMERIC, 2) AS potential_retail_revenue
    FROM inventory_batches b
    INNER JOIN products p ON b.product_id = p.product_id
    INNER JOIN product_categories c ON p.category_id = c.category_id
    INNER JOIN stores s ON b.store_id = s.store_id
    WHERE b.batch_status = 'ACTIVE' 
      AND b.current_qty > 0
)
SELECT 
    store_code,
    product_name,
    category_name,
    batch_code,
    current_qty,
    days_until_expiration,
    CASE 
        WHEN days_until_expiration < 0 THEN 'CRITICAL: ALREADY EXPIRED (LOG IMMEDIATE WASTE)'
        WHEN days_until_expiration <= 2 THEN 'HIGH ALERT: EXPIRING IN <= 48H (50% MARKDOWN)'
        WHEN days_until_expiration <= 5 THEN 'MEDIUM ALERT: EXPIRING THIS WEEK (20% PROMO)'
        ELSE 'NORMAL: HEALTHY SHELF LIFE'
    END AS operational_action_plan,
    total_financial_exposure_cost,
    potential_retail_revenue,
    DENSE_RANK() OVER (
        PARTITION BY store_code, category_name 
        ORDER BY days_until_expiration ASC
    ) AS priority_rotation_rank
FROM active_batches_summary
ORDER BY days_until_expiration ASC, total_financial_exposure_cost DESC;`
  },
  {
    id: 'grn-discrepancy',
    title: 'Query 2: Auditoría de Discrepancias en Recepción (GRN vs Guía)',
    description: 'Detecta mermas de origen en la entrega de proveedores y mercadería rota o faltante para evitar sobrepagos de facturas en compras institucionales.',
    complexity: 'Multi-table INNER JOIN + Aggregations + NULLIF',
    businessValue: 'Protección de caja y cálculo de Fill-Rate real de cumplimiento de proveedores.',
    sql: `-- ============================================================================
-- QUERY 2: GOODS RECEIPT NOTE (GRN) vs. DISPATCH DISCREPANCY AUDIT
-- ============================================================================
WITH grn_item_discrepancies AS (
    SELECT 
        h.grn_number,
        h.dispatch_guide_ref AS guia_remision,
        sup.company_name AS proveedor,
        s.store_name AS tienda_destino,
        h.received_timestamp::DATE AS fecha_recepcion,
        p.sku_code,
        p.product_name,
        i.qty_dispatched,
        i.qty_accepted,
        i.discrepancy_qty,
        i.unit_purchase_cost,
        ROUND((i.discrepancy_qty * i.unit_purchase_cost)::NUMERIC, 2) AS discrepancy_loss_amount
    FROM goods_receipt_items i
    INNER JOIN goods_receipt_headers h ON i.grn_id = h.grn_id
    INNER JOIN suppliers sup ON h.supplier_id = sup.supplier_id
    INNER JOIN stores s ON h.store_id = s.store_id
    INNER JOIN products p ON i.product_id = p.product_id
)
SELECT 
    proveedor,
    COUNT(DISTINCT grn_number) AS total_recepciones_auditadas,
    SUM(qty_dispatched) AS total_unidades_despachadas,
    SUM(qty_accepted) AS total_unidades_ingresadas_conforme,
    SUM(discrepancy_qty) AS total_unidades_faltantes_o_danadas,
    ROUND(SUM(discrepancy_loss_amount)::NUMERIC, 2) AS impacto_monetario_discrepancias_pen,
    ROUND((SUM(qty_accepted) / NULLIF(SUM(qty_dispatched), 0) * 100)::NUMERIC, 2) AS fill_rate_conforme_pct
FROM grn_item_discrepancies
GROUP BY proveedor
ORDER BY impacto_monetario_discrepancias_pen DESC;`
  },
  {
    id: 'waste-intensity',
    title: 'Query 3: Tasa de Intensidad de Merma sobre Ventas Brutas',
    description: 'Mide la eficiencia operativa calculando la relación de merma versus ventas y ranqueando tiendas y categorías mediante Window Functions.',
    complexity: 'CROSS JOIN + Multiple LEFT JOINs + SUM() OVER (PARTITION BY)',
    businessValue: 'Detección de puntos ciegos de refrigeración y control de calidad en tiendas clave.',
    sql: `-- ============================================================================
-- QUERY 3: WASTE INTENSITY RATIO (% LOSS OVER SALES) BY STORE & CATEGORY
-- ============================================================================
WITH store_waste_metrics AS (
    SELECT 
        w.store_id,
        p.category_id,
        SUM(w.total_loss_amount) AS total_waste_amount
    FROM waste_log w
    INNER JOIN products p ON w.product_id = p.product_id
    GROUP BY w.store_id, p.category_id
),
store_sales_metrics AS (
    SELECT 
        s.store_id,
        p.category_id,
        SUM(s.gross_revenue) AS total_gross_sales,
        SUM(s.cost_of_goods_sold) AS total_cogs
    FROM daily_sales s
    INNER JOIN products p ON s.product_id = p.product_id
    GROUP BY s.store_id, p.category_id
)
SELECT 
    st.store_code,
    st.store_name,
    cat.category_name,
    COALESCE(sm.total_gross_sales, 0) AS ventas_brutas_pen,
    COALESCE(wm.total_waste_amount, 0) AS merma_total_pen,
    ROUND(
        (COALESCE(wm.total_waste_amount, 0) / NULLIF(sm.total_gross_sales, 0) * 100)::NUMERIC, 
        2
    ) AS tasa_merma_sobre_ventas_pct,
    ROUND(
        (COALESCE(wm.total_waste_amount, 0) / 
         NULLIF(SUM(COALESCE(wm.total_waste_amount, 0)) OVER (PARTITION BY st.store_id), 0) * 100)::NUMERIC,
        2
    ) AS participacion_categoria_en_merma_tienda_pct
FROM stores st
CROSS JOIN product_categories cat
LEFT JOIN store_waste_metrics wm ON st.store_id = wm.store_id AND cat.category_id = wm.category_id
LEFT JOIN store_sales_metrics sm ON st.store_id = sm.store_id AND cat.category_id = sm.category_id
WHERE COALESCE(sm.total_gross_sales, 0) > 0 OR COALESCE(wm.total_waste_amount, 0) > 0
ORDER BY tasa_merma_sobre_ventas_pct DESC;`
  },
  {
    id: 'stock-velocity',
    title: 'Query 4: Días de Inventario Disponible (DSI) y Riesgo de Quiebre',
    description: 'Compara el stock actual contra la velocidad de ventas en ventana móvil de 14 días para clasificar sobrestock (riesgo de caducidad) y desabastecimiento.',
    complexity: 'Intervalos temporales + CASE WHEN + Agrupaciones condicionales',
    businessValue: 'Automatización de alertas de reposición antes de perder ventas.',
    sql: `-- ============================================================================
-- QUERY 4: DAYS SALES OF INVENTORY (DSI) & STOCKOUT RISK VELOCITY
-- ============================================================================
WITH current_active_stock AS (
    SELECT 
        store_id,
        product_id,
        SUM(current_qty) AS stock_on_hand
    FROM inventory_batches
    WHERE batch_status = 'ACTIVE'
    GROUP BY store_id, product_id
),
sales_velocity AS (
    SELECT 
        store_id,
        product_id,
        ROUND(AVG(units_sold)::NUMERIC, 2) AS avg_daily_sales_velocity
    FROM daily_sales
    WHERE sale_date >= CURRENT_DATE - INTERVAL '14 days'
    GROUP BY store_id, product_id
)
SELECT 
    st.store_code,
    p.sku_code,
    p.product_name,
    p.min_safety_stock,
    p.reorder_point,
    COALESCE(cs.stock_on_hand, 0) AS stock_actual_unidades,
    COALESCE(sv.avg_daily_sales_velocity, 0) AS venta_promedio_diaria,
    CASE 
        WHEN COALESCE(sv.avg_daily_sales_velocity, 0) = 0 THEN 999.00
        ELSE ROUND((COALESCE(cs.stock_on_hand, 0) / sv.avg_daily_sales_velocity)::NUMERIC, 1)
    END AS dias_inventario_disponible,
    CASE 
        WHEN COALESCE(cs.stock_on_hand, 0) <= p.min_safety_stock THEN 'CRITICAL: STOCKOUT DANGER (ORDER NOW)'
        WHEN COALESCE(cs.stock_on_hand, 0) <= p.reorder_point THEN 'REORDER TRIGGER REACHED'
        WHEN (COALESCE(cs.stock_on_hand, 0) / NULLIF(sv.avg_daily_sales_velocity, 0)) > 30 THEN 'OVERSTOCK WARNING (SPOILAGE RISK)'
        ELSE 'BALANCED INVENTORY'
    END AS stock_health_status
FROM products p
CROSS JOIN stores st
LEFT JOIN current_active_stock cs ON p.product_id = cs.product_id AND st.store_id = cs.store_id
LEFT JOIN sales_velocity sv ON p.product_id = sv.product_id AND st.store_id = sv.store_id
WHERE p.is_active = TRUE
ORDER BY dias_inventario_disponible ASC;`
  }
];

export const SCHEMA_TABLES = [
  {
    name: 'stores',
    type: 'Dimension / Master',
    pk: 'store_id',
    columns: ['store_id (PK)', 'store_code (UK)', 'store_name', 'store_format', 'district', 'square_meters', 'is_active']
  },
  {
    name: 'suppliers',
    type: 'Dimension / Master',
    pk: 'supplier_id',
    columns: ['supplier_id (PK)', 'supplier_code (UK)', 'tax_id_ruc (UK)', 'company_name', 'payment_terms_days', 'lead_time_days']
  },
  {
    name: 'product_categories',
    type: 'Dimension / Master',
    pk: 'category_id',
    columns: ['category_id (PK)', 'category_code (UK)', 'category_name', 'storage_temp_type', 'parent_category_id (FK)']
  },
  {
    name: 'products',
    type: 'Master / Relational (3NF)',
    pk: 'product_id',
    columns: ['product_id (PK)', 'sku_code (UK)', 'barcode_ean13', 'product_name', 'category_id (FK)', 'unit_cost', 'retail_price', 'min_safety_stock', 'reorder_point', 'shelf_life_days', 'is_perishable']
  },
  {
    name: 'waste_reasons',
    type: 'Classification / Audit',
    pk: 'waste_reason_id',
    columns: ['waste_reason_id (PK)', 'reason_code (UK)', 'reason_description', 'loss_classification']
  },

  {
    name: 'goods_receipt_headers',
    type: 'Transaction / Ingestion',
    pk: 'grn_id',
    columns: ['grn_id (PK)', 'grn_number (UK)', 'store_id (FK)', 'supplier_id (FK)', 'dispatch_guide_ref', 'received_timestamp', 'status']
  },
  {
    name: 'goods_receipt_items',
    type: 'Transaction / Line Items',
    pk: 'item_id',
    columns: ['item_id (PK)', 'grn_id (FK)', 'product_id (FK)', 'qty_dispatched', 'qty_accepted', 'discrepancy_qty', 'unit_purchase_cost', 'temperature_celsius']
  },
  {
    name: 'inventory_batches',
    type: 'Core Inventory (FEFO)',
    pk: 'batch_id',
    columns: ['batch_id (PK)', 'batch_code', 'store_id (FK)', 'product_id (FK)', 'grn_item_id (FK)', 'initial_qty', 'current_qty', 'manufacturing_date', 'expiration_date', 'batch_status']
  },
  {
    name: 'waste_log',
    type: 'Auditing / Loss Accounting',
    pk: 'waste_id',
    columns: ['waste_id (PK)', 'waste_code (UK)', 'store_id (FK)', 'product_id (FK)', 'batch_id (FK)', 'waste_reason_id (FK)', 'qty_discarded', 'unit_cost_at_loss', 'total_loss_amount', 'logged_timestamp']
  },
  {
    name: 'daily_sales',
    type: 'Sales Fact Table',
    pk: 'sale_id',
    columns: ['sale_id (PK)', 'store_id (FK)', 'product_id (FK)', 'sale_date', 'units_sold', 'gross_revenue', 'cost_of_goods_sold']
  }
];
