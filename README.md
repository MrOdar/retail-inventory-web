# RetailOps 3NF — Retail Inventory & Operations Dashboard

> 🚀 **Demo en Vivo en Vercel:** [https://retail-inventory-web.vercel.app/](https://retail-inventory-web.vercel.app/)  
> 🗄️ **Motor de Base de Datos & SQL Core:** [`MrOdar/retail-inventory-analytics-3nf`](https://github.com/MrOdar/retail-inventory-analytics-3nf)

[![Live Demo](https://img.shields.io/badge/Demo_en_Vivo-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://retail-inventory-web.vercel.app/)
[![React](https://img.shields.io/badge/Frontend-React_18_·_Vite-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Estilos-Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/Database_Engine-PostgreSQL_3NF-336791?style=flat&logo=postgresql&logoColor=white)](https://github.com/MrOdar/retail-inventory-analytics-3nf)

Dashboard analítico interactivo diseñado para operaciones retail y auditoría de inventarios perecibles. Conecta directamente la lógica de negocio y las consultas complejas de PostgreSQL (CTEs, Window Functions `DENSE_RANK`, cálculo de DSI y matriz de riesgo FEFO) en una interfaz ejecutiva moderna y reactiva.

---

## 🌟 Características Principales

### 1. Pestaña Ejecutiva (Simulación Operativa en Tiendas)
- **Filtros Dinámicos:** Segmentación en tiempo real por sede (*Miraflores Shell, San Isidro Corp, Surco Primavera, etc.*) y categoría de productos (*Lácteos, Panadería, Comidas Calientes*).
- **Matriz de Riesgo FEFO:** Monitoreo de lotes críticos (<48 horas), valor monetario en riesgo y recomendación de rebaja dinámica (markdowns) para evitar pérdida por merma.
- **DSI & Stockout Risk Velocity:** Comparación entre stock actual y velocidad diaria de ventas en ventana móvil de 14 días.
- **Auditoría de Recepciones GRN:** Detección de discrepancias en entregas de proveedores contra guías de despacho.

### 2. Pestaña de Data Architecture (Ingeniería de Datos & SQL)
- **Inspector de Consultas SQL:** Visualizador interactivo de las 4 consultas analíticas avanzadas de PostgreSQL con syntax highlighting y botón para copiar código.
- **Diccionario del Esquema 3NF:** Visualización de las 9 entidades relacionales, claves primarias (PK), foráneas (FK) y restricciones de integridad.

---

## 🛠️ Tecnologías

- **Vite + React:** Compilación ultrarrápida y componentes modulares.
- **Tailwind CSS:** Diseño empresarial Dark Mode de alto contraste (sin dependencias superfluas).
- **Lucide Icons:** Iconografía técnica y visual limpia.
- **Despliegue Serverless en Vercel:** $0.00 de costo, alta disponibilidad y carga instantánea en CDN.

---

**Autor:** Odar Javier Alcocer Vásquez (UPC)  
**Portafolio Oficial:** [odaralcocer.pages.dev](https://odaralcocer.pages.dev)
