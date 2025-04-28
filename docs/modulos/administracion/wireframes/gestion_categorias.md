# Wireframe: Gestión de Categorías (Administración)

```
+----------------------------------------------------------------------+
|                                                                      |
| [LOGO] Panel de Administración                    [Mi Cuenta ▼]      |
|                                                   [Cerrar Sesión]     |
+----------------------------------------------------------------------+
|                                                                      |
| +-------------+  +--------------------------------------------------+ |
| | Dashboard   |  | Dashboard > Categorías                           | |
| | Usuarios    |  +--------------------------------------------------+ |
| | Farmacias   |  |                                                  | |
| | Productos   |  | Gestión de Categorías                            | |
| | Categorías  |  |                                                  | |
| | Reportes    |  | [+ Añadir Nueva Categoría]                       | |
| | Moderación  |  |                                                  | |
| | Soporte     |  | Buscar: [                    ] [Buscar]          | |
| | Configuración|  |                                                  | |
| |             |  | Vista: [Árbol] [Lista]                           | |
| |             |  |                                                  | |
| |             |  | +------------------------------------------+     | |
| |             |  | |                                          |     | |
| |             |  | | ▼ Medicamentos                           |     | |
| |             |  | |   ├─ ▼ Analgésicos                       |     | |
| |             |  | |   │   ├─ Paracetamol                     |     | |
| |             |  | |   │   ├─ Ibuprofeno                      |     | |
| |             |  | |   │   └─ Aspirina                        |     | |
| |             |  | |   ├─ ▼ Antiinflamatorios                 |     | |
| |             |  | |   │   ├─ Ibuprofeno                      |     | |
| |             |  | |   │   ├─ Naproxeno                       |     | |
| |             |  | |   │   └─ Diclofenaco                     |     | |
| |             |  | |   ├─ ▼ Antialérgicos                     |     | |
| |             |  | |   │   ├─ Loratadina                      |     | |
| |             |  | |   │   ├─ Cetirizina                      |     | |
| |             |  | |   │   └─ Desloratadina                   |     | |
| |             |  | |   ├─ ▼ Antiácidos                        |     | |
| |             |  | |   │   ├─ Omeprazol                       |     | |
| |             |  | |   │   ├─ Ranitidina                      |     | |
| |             |  | |   │   └─ Esomeprazol                     |     | |
| |             |  | |   └─ ▼ Antibióticos                      |     | |
| |             |  | |       ├─ Amoxicilina                     |     | |
| |             |  | |       ├─ Azitromicina                    |     | |
| |             |  | |       └─ Ciprofloxacino                  |     | |
| |             |  | |                                          |     | |
| |             |  | | ▼ Cuidado Personal                       |     | |
| |             |  | |   ├─ Higiene Bucal                       |     | |
| |             |  | |   ├─ Cuidado Capilar                     |     | |
| |             |  | |   └─ Cuidado Corporal                    |     | |
| |             |  | |                                          |     | |
| |             |  | | ▼ Vitaminas y Suplementos                |     | |
| |             |  | |   ├─ Vitaminas                           |     | |
| |             |  | |   ├─ Minerales                           |     | |
| |             |  | |   └─ Suplementos Deportivos              |     | |
| |             |  | |                                          |     | |
| |             |  | +------------------------------------------+     | |
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
|                 MODAL: AÑADIR/EDITAR CATEGORÍA                       |
|                                                                      |
| +------------------------------------------------------------------+ |
| | Añadir Nueva Categoría                              [X] Cerrar   | |
| +------------------------------------------------------------------+ |
| |                                                                  | |
| | Información General                                              | |
| | +--------------------------------------------------------------+ | |
| | | Nombre de la Categoría:                                      | | |
| | | [                                                          ] | | |
| | |                                                              | | |
| | | Descripción:                                                 | | |
| | | [                                                          ] | | |
| | | [                                                          ] | | |
| | |                                                              | | |
| | | Categoría Padre:                                             | | |
| | | [Seleccionar ▼]                                              | | |
| | |                                                              | | |
| | | Icono:                                                       | | |
| | | [Seleccionar Icono ▼]                                        | | |
| | |                                                              | | |
| | | Imagen de Fondo (opcional):                                  | | |
| | | [Seleccionar Archivo]                                        | | |
| | |                                                              | | |
| | | Mostrar en Navegación Principal:                             | | |
| | | ○ Sí  ○ No                                                   | | |
| | |                                                              | | |
| | | Orden de Visualización:                                      | | |
| | | [      ]                                                     | | |
| | +--------------------------------------------------------------+ | |
| |                                                                  | |
| | Filtros Asociados                                                | |
| | +--------------------------------------------------------------+ | |
| | | Seleccione los filtros aplicables a esta categoría:          | | |
| | |                                                              | | |
| | | ☑ Descuento                                                  | | |
| | | ☑ Vencimiento                                                | | |
| | | ☑ Laboratorio                                                | | |
| | | ☑ Precio                                                     | | |
| | | ☐ Receta Requerida                                           | | |
| | | ☐ Uso Pediátrico                                             | | |
| | |                                                              | | |
| | | [+ Añadir Filtro Personalizado]                              | | |
| | +--------------------------------------------------------------+ | |
| |                                                                  | |
| | [CANCELAR]                          [GUARDAR CATEGORÍA]          | |
| |                                                                  | |
| +------------------------------------------------------------------+ |
|                                                                      |
+----------------------------------------------------------------------+
```

## Notas Adicionales

### Componentes Principales
1. **Barra Superior**: Logo, título del panel y opciones de cuenta
2. **Menú Lateral**: Navegación principal del panel de administración
3. **Breadcrumbs**: Navegación jerárquica para ubicar al usuario
4. **Barra de Acciones**: Botón para añadir nueva categoría
5. **Buscador**: Campo para buscar categorías específicas
6. **Selector de Vista**: Opciones para ver categorías en árbol o lista
7. **Árbol de Categorías**: Visualización jerárquica de categorías
8. **Modal de Categoría**: Formulario para añadir o editar categorías

### Secciones del Formulario
- **Información General**: Datos básicos de la categoría
- **Filtros Asociados**: Configuración de filtros aplicables a la categoría

### Interacciones
- El botón "Añadir Nueva Categoría" abre el modal con el formulario vacío
- Los triángulos ▼ permiten expandir o colapsar las categorías en la vista de árbol
- El selector de vista permite cambiar entre visualización de árbol y lista
- Las categorías pueden ser reorganizadas mediante drag and drop (no mostrado en el wireframe)
- Al hacer clic en una categoría, se muestran opciones para editar o eliminar

### Organización de Categorías
- **Por Uso**: Medicamentos organizados según su aplicación (analgésicos, antiinflamatorios, etc.)
- **Por Compuesto**: Organización según el principio activo (no mostrado en el wireframe)
- **Por Forma**: Organización según la forma farmacéutica (tabletas, jarabes, etc.) (no mostrado en el wireframe)

### Responsive
- En dispositivos móviles, el menú lateral se colapsará
- La vista de árbol se ajustará para ser más compacta
- El modal de categoría ocupará toda la pantalla en dispositivos pequeños
