# Wireframe: Dashboard de Farmacia

```
+----------------------------------------------------------------------+
|                                                                      |
| [LOGO] Farmacia Cruz Verde                         [Mi Cuenta ▼]     |
|                                                    [Cerrar Sesión]    |
+----------------------------------------------------------------------+
|                                                                      |
| +-------------+  +--------------------------------------------------+ |
| | Dashboard   |  | Dashboard > Resumen                              | |
| | Productos   |  +--------------------------------------------------+ |
| | Inventario  |  |                                                  | |
| | Tickets     |  | Bienvenido, Farmacia Cruz Verde                  | |
| | Ventas      |  |                                                  | |
| | Reportes    |  | Resumen de Actividad                             | |
| | Sucursales  |  |                                                  | |
| | Configuración|  | +----------------+ +----------------+ +--------+ | |
| |             |  | | Tickets         | | Ventas         | | Merma  | | |
| |             |  | | Pendientes      | | Realizadas     | | Evitada| | |
| |             |  | |                 | |                | |        | | |
| |             |  | | 12              | | 45             | | $245K  | | |
| |             |  | | +10% vs ayer    | | +5% vs ayer    | | +8%    | | |
| |             |  | +----------------+ +----------------+ +--------+ | |
| |             |  |                                                  | |
| |             |  | Productos Próximos a Vencer                      | |
| |             |  |                                                  | |
| |             |  | +------------------------------------------+     | |
| |             |  | | Producto       | Stock | Vence   | Desc. |     | |
| |             |  | |----------------|-------|---------|-------|     | |
| |             |  | | Paracetamol 500| 15    | 15/05/25| 40%   |     | |
| |             |  | | Ibuprofeno 400 | 8     | 22/05/25| 35%   |     | |
| |             |  | | Loratadina 10  | 12    | 10/05/25| 50%   |     | |
| |             |  | | Omeprazol 20   | 10    | 18/05/25| 45%   |     | |
| |             |  | | Amoxicilina 500| 5     | 05/05/25| 30%   |     | |
| |             |  | +------------------------------------------+     | |
| |             |  |                                                  | |
| |             |  | [Ver Todos los Productos]                        | |
| |             |  |                                                  | |
| |             |  | Tickets Pendientes de Validación                 | |
| |             |  |                                                  | |
| |             |  | +------------------------------------------+     | |
| |             |  | | Ticket   | Cliente    | Productos | Total |    | |
| |             |  | |----------|------------|-----------|-------|    | |
| |             |  | | #12345   | Juan Pérez | 2         | $12K  |    | |
| |             |  | | #12346   | Ana López  | 1         | $4K   |    | |
| |             |  | | #12347   | Carlos R.  | 3         | $15K  |    | |
| |             |  | +------------------------------------------+     | |
| |             |  |                                                  | |
| |             |  | [Ver Todos los Tickets]                          | |
| |             |  |                                                  | |
| |             |  | Rendimiento de Ventas                            | |
| |             |  |                                                  | |
| |             |  | +------------------------------------------+     | |
| |             |  | |                                          |     | |
| |             |  | |            [GRÁFICO DE VENTAS]           |     | |
| |             |  | |                                          |     | |
| |             |  | |                                          |     | |
| |             |  | |                                          |     | |
| |             |  | +------------------------------------------+     | |
| |             |  |                                                  | |
| |             |  | [Ver Reporte Completo]                           | |
| |             |  |                                                  | |
| +-------------+  +--------------------------------------------------+ |
|                                                                      |
+----------------------------------------------------------------------+
|                                                                      |
| © 2025 FarmaciaDescuento | Términos y Condiciones | Privacidad       |
|                                                                      |
+----------------------------------------------------------------------+
```

## Notas Adicionales

### Componentes Principales
1. **Barra Superior**: Logo, nombre de la farmacia y opciones de cuenta
2. **Menú Lateral**: Navegación principal del panel de farmacia
3. **Breadcrumbs**: Navegación jerárquica para ubicar al usuario
4. **Tarjetas de Resumen**: Métricas clave (tickets pendientes, ventas, merma evitada)
5. **Tabla de Productos**: Listado de productos próximos a vencer
6. **Tabla de Tickets**: Listado de tickets pendientes de validación
7. **Gráfico de Ventas**: Visualización del rendimiento de ventas

### Secciones Principales
- **Resumen de Actividad**: Métricas clave para monitoreo rápido
- **Productos Próximos a Vencer**: Alerta sobre productos que requieren atención
- **Tickets Pendientes**: Tickets generados por clientes que aún no han sido validados
- **Rendimiento de Ventas**: Gráfico con tendencias de ventas recientes

### Interacciones
- El menú lateral permite navegar entre las diferentes secciones del panel
- Los botones "Ver Todos" llevan a las páginas detalladas de cada sección
- Las tarjetas de resumen muestran comparativas con períodos anteriores
- El gráfico de ventas puede ser interactivo para mostrar diferentes períodos

### Responsive
- En dispositivos móviles, el menú lateral se colapsará en un icono de hamburguesa
- Las tablas se ajustarán para mostrar menos columnas o permitir scroll horizontal
- Las tarjetas de resumen se apilarán verticalmente
