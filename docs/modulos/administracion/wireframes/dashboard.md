# Wireframe: Dashboard de Administración

```
+----------------------------------------------------------------------+
|                                                                      |
| [LOGO] Panel de Administración                    [Mi Cuenta ▼]      |
|                                                   [Cerrar Sesión]     |
+----------------------------------------------------------------------+
|                                                                      |
| +-------------+  +--------------------------------------------------+ |
| | Dashboard   |  | Dashboard > Resumen                              | |
| | Usuarios    |  +--------------------------------------------------+ |
| | Farmacias   |  |                                                  | |
| | Productos   |  | Bienvenido, Administrador                        | |
| | Categorías  |  |                                                  | |
| | Reportes    |  | Resumen de Actividad                             | |
| | Moderación  |  |                                                  | |
| | Soporte     |  | +----------------+ +----------------+ +--------+ | |
| | Configuración|  | | Usuarios       | | Farmacias      | | Tickets| | |
| |             |  | | Activos        | | Registradas    | | Hoy    | | |
| |             |  | |                | |                | |        | | |
| |             |  | | 1,245          | | 28             | | 145    | | |
| |             |  | | +5% vs ayer    | | +2 nuevas      | | +15%   | | |
| |             |  | +----------------+ +----------------+ +--------+ | |
| |             |  |                                                  | |
| |             |  | +----------------+ +----------------+ +--------+ | |
| |             |  | | Ventas         | | Productos      | | Merma  | | |
| |             |  | | Totales        | | Publicados     | | Evitada| | |
| |             |  | |                | |                | |        | | |
| |             |  | | $1.5M          | | 845            | | $2.8M  | | |
| |             |  | | +8% vs ayer    | | +12 nuevos     | | +10%   | | |
| |             |  | +----------------+ +----------------+ +--------+ | |
| |             |  |                                                  | |
| |             |  | Actividad Reciente                               | |
| |             |  |                                                  | |
| |             |  | +------------------------------------------+     | |
| |             |  | | Hora     | Usuario  | Actividad          |     | |
| |             |  | |----------|----------|-------------------|     | |
| |             |  | | 14:30    | F. Cruz  | Validó ticket #12345    | |
| |             |  | | 14:15    | F. Ahum. | Publicó 3 productos     | |
| |             |  | | 13:45    | Juan P.  | Generó ticket #12345    | |
| |             |  | | 13:30    | F. Salco | Actualizó inventario    | |
| |             |  | | 13:15    | Admin2   | Verificó farmacia nueva | |
| |             |  | +------------------------------------------+     | |
| |             |  |                                                  | |
| |             |  | [Ver Toda la Actividad]                          | |
| |             |  |                                                  | |
| |             |  | Farmacias Pendientes de Verificación             | |
| |             |  |                                                  | |
| |             |  | +------------------------------------------+     | |
| |             |  | | Farmacia        | Fecha     | Documentos |     | |
| |             |  | |-----------------|-----------|------------|     | |
| |             |  | | Farmacia Nueva  | 24/04/25  | 3 docs     |     | |
| |             |  | | [Ver] [Aprobar] [Rechazar]             |      | |
| |             |  | +------------------------------------------+     | |
| |             |  |                                                  | |
| |             |  | Rendimiento de la Plataforma                     | |
| |             |  |                                                  | |
| |             |  | +------------------------------------------+     | |
| |             |  | |                                          |     | |
| |             |  | |            [GRÁFICO DE MÉTRICAS]         |     | |
| |             |  | |                                          |     | |
| |             |  | |                                          |     | |
| |             |  | |                                          |     | |
| |             |  | +------------------------------------------+     | |
| |             |  |                                                  | |
| |             |  | [Ver Reportes Detallados]                        | |
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
1. **Barra Superior**: Logo, título del panel y opciones de cuenta
2. **Menú Lateral**: Navegación principal del panel de administración
3. **Breadcrumbs**: Navegación jerárquica para ubicar al usuario
4. **Tarjetas de Resumen**: Métricas clave de la plataforma
5. **Actividad Reciente**: Registro de acciones recientes en la plataforma
6. **Farmacias Pendientes**: Farmacias que requieren verificación
7. **Gráfico de Rendimiento**: Visualización de métricas clave

### Secciones Principales
- **Resumen de Actividad**: Métricas clave para monitoreo rápido
- **Actividad Reciente**: Registro de las últimas acciones en la plataforma
- **Farmacias Pendientes**: Solicitudes de registro que requieren verificación
- **Rendimiento de la Plataforma**: Gráficos con métricas de uso y rendimiento

### Interacciones
- El menú lateral permite navegar entre las diferentes secciones del panel
- Los botones "Ver" llevan a las páginas detalladas de cada sección
- Las tarjetas de resumen muestran comparativas con períodos anteriores
- Los botones "Aprobar" y "Rechazar" permiten gestionar solicitudes de farmacias

### Responsive
- En dispositivos móviles, el menú lateral se colapsará en un icono de hamburguesa
- Las tarjetas de resumen se apilarán verticalmente
- Las tablas se ajustarán para mostrar menos columnas o permitir scroll horizontal
