# Wireframe: Gestión de Productos (Farmacia)

```
+----------------------------------------------------------------------+
|                                                                      |
| [LOGO] Farmacia Cruz Verde                         [Mi Cuenta ▼]     |
|                                                    [Cerrar Sesión]    |
+----------------------------------------------------------------------+
|                                                                      |
| +-------------+  +--------------------------------------------------+ |
| | Dashboard   |  | Dashboard > Productos                            | |
| | Productos   |  +--------------------------------------------------+ |
| | Inventario  |  |                                                  | |
| | Tickets     |  | Gestión de Productos                             | |
| | Ventas      |  |                                                  | |
| | Reportes    |  | [+ Añadir Nuevo Producto]  [Importar]            | |
| | Sucursales  |  |                                                  | |
| | Configuración|  | Buscar: [                    ] [Buscar]         | |
| |             |  |                                                  | |
| |             |  | Filtrar por:                                     | |
| |             |  | [Categoría ▼] [Descuento ▼] [Vencimiento ▼]      | |
| |             |  |                                                  | |
| |             |  | +------------------------------------------+     | |
| |             |  | | Producto    | Categ. | Vence   | Desc. | Stock | |
| |             |  | |-------------|--------|---------|-------|-------| |
| |             |  | | Paracetamol | Analg. | 15/05/25| 40%   | 15    | |
| |             |  | | [Ver] [Editar] [Eliminar]                |     | |
| |             |  | |-------------|--------|---------|-------|-------| |
| |             |  | | Ibuprofeno  | Antiin.| 22/05/25| 35%   | 8     | |
| |             |  | | [Ver] [Editar] [Eliminar]                |     | |
| |             |  | |-------------|--------|---------|-------|-------| |
| |             |  | | Loratadina  | Antial.| 10/05/25| 50%   | 12    | |
| |             |  | | [Ver] [Editar] [Eliminar]                |     | |
| |             |  | |-------------|--------|---------|-------|-------| |
| |             |  | | Omeprazol   | Antiác.| 18/05/25| 45%   | 10    | |
| |             |  | | [Ver] [Editar] [Eliminar]                |     | |
| |             |  | |-------------|--------|---------|-------|-------| |
| |             |  | | Amoxicilina | Antib. | 05/05/25| 30%   | 5     | |
| |             |  | | [Ver] [Editar] [Eliminar]                |     | |
| |             |  | +------------------------------------------+     | |
| |             |  |                                                  | |
| |             |  | Mostrando 1-5 de 24 productos                    | |
| |             |  | [< Anterior] [1] [2] [3] [4] [5] [Siguiente >]   | |
| |             |  |                                                  | |
| +-------------+  +--------------------------------------------------+ |
|                                                                      |
+----------------------------------------------------------------------+
|                                                                      |
| © 2025 FarmaciaDescuento | Términos y Condiciones | Privacidad       |
|                                                                      |
+----------------------------------------------------------------------+

+----------------------------------------------------------------------+
|                                                                      |
|                 MODAL: AÑADIR/EDITAR PRODUCTO                        |
|                                                                      |
| +------------------------------------------------------------------+ |
| | Añadir Nuevo Producto                               [X] Cerrar   | |
| +------------------------------------------------------------------+ |
| |                                                                  | |
| | Información General                                              | |
| | +--------------------------------------------------------------+ | |
| | | Nombre del Producto:                                         | | |
| | | [                                                          ] | | |
| | |                                                              | | |
| | | Descripción:                                                 | | |
| | | [                                                          ] | | |
| | | [                                                          ] | | |
| | |                                                              | | |
| | | Categoría:                                                   | | |
| | | [Seleccionar ▼]                                              | | |
| | |                                                              | | |
| | | Laboratorio Fabricante:                                      | | |
| | | [                                                          ] | | |
| | |                                                              | | |
| | | Modo de Uso:                                                 | | |
| | | [                                                          ] | | |
| | | [                                                          ] | | |
| | |                                                              | | |
| | | Advertencias:                                                | | |
| | | [                                                          ] | | |
| | | [                                                          ] | | |
| | +--------------------------------------------------------------+ | |
| |                                                                  | |
| | Precios y Descuentos                                             | |
| | +--------------------------------------------------------------+ | |
| | | Precio Original:                                             | | |
| | | [$                  ]                                         | | |
| | |                                                              | | |
| | | Porcentaje de Descuento:                                     | | |
| | | [         ]%                                                 | | |
| | |                                                              | | |
| | | Precio con Descuento: $3.590 (calculado automáticamente)     | | |
| | +--------------------------------------------------------------+ | |
| |                                                                  | |
| | Disponibilidad                                                   | |
| | +--------------------------------------------------------------+ | |
| | | Fecha de Vencimiento:                                        | | |
| | | [DD/MM/AAAA]                                                 | | |
| | |                                                              | | |
| | | Stock Disponible:                                            | | |
| | | [         ] unidades                                         | | |
| | |                                                              | | |
| | | Sucursal:                                                    | | |
| | | [Seleccionar ▼]                                              | | |
| | +--------------------------------------------------------------+ | |
| |                                                                  | |
| | Imágenes                                                         | |
| | +--------------------------------------------------------------+ | |
| | | Imagen Principal:                                            | | |
| | | [Seleccionar Archivo] o [Arrastrar y Soltar]                 | | |
| | |                                                              | | |
| | | Imágenes Adicionales:                                        | | |
| | | [+ Añadir Imagen]                                            | | |
| | +--------------------------------------------------------------+ | |
| |                                                                  | |
| | [CANCELAR]                          [GUARDAR PRODUCTO]           | |
| |                                                                  | |
| +------------------------------------------------------------------+ |
|                                                                      |
+----------------------------------------------------------------------+
```

## Notas Adicionales

### Componentes Principales
1. **Barra Superior**: Logo, nombre de la farmacia y opciones de cuenta
2. **Menú Lateral**: Navegación principal del panel de farmacia
3. **Breadcrumbs**: Navegación jerárquica para ubicar al usuario
4. **Barra de Acciones**: Botones para añadir o importar productos
5. **Buscador y Filtros**: Herramientas para encontrar productos específicos
6. **Tabla de Productos**: Listado de productos con opciones de gestión
7. **Paginación**: Navegación entre páginas de resultados
8. **Modal de Producto**: Formulario para añadir o editar productos

### Secciones del Formulario
- **Información General**: Datos básicos del producto
- **Precios y Descuentos**: Configuración de precios y porcentaje de descuento
- **Disponibilidad**: Fecha de vencimiento, stock y sucursal
- **Imágenes**: Carga de imágenes del producto

### Interacciones
- El botón "Añadir Nuevo Producto" abre el modal con el formulario vacío
- El botón "Editar" abre el modal con los datos del producto seleccionado
- Los filtros permiten refinar la lista de productos mostrados
- La paginación permite navegar entre diferentes páginas de resultados
- El porcentaje de descuento calcula automáticamente el precio final

### Responsive
- En dispositivos móviles, el menú lateral se colapsará
- La tabla se ajustará para mostrar menos columnas o permitir scroll horizontal
- El modal de producto se adaptará para ocupar toda la pantalla en móvil
