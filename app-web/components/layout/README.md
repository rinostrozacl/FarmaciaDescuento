# Componentes de Layout

Esta carpeta contiene los componentes estructurales principales de la aplicación.

## Componentes disponibles

- `AppHeader.vue`: Encabezado principal de la aplicación
- `AppFooter.vue`: Pie de página principal de la aplicación

## Importante

**NO duplicar estos componentes en la carpeta `components` raíz.**

Estos componentes deben permanecer en esta carpeta y ser importados desde aquí para evitar duplicados y confusión en el proyecto.

## Uso

Estos componentes se importan automáticamente en `plugins/components.js` y se utilizan en el layout principal `layouts/default.vue`.
