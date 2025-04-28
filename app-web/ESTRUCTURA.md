# Estructura del Proyecto FarmaciaDescuento

Este documento describe la estructura general del proyecto y establece buenas prácticas para mantener la consistencia del código.

## Organización de Carpetas

### Componentes

- `/components`: Componentes reutilizables generales
  - `/components/layout`: **Componentes estructurales principales como AppHeader y AppFooter**
  - `/components/ui`: Componentes de interfaz reutilizables (botones, tarjetas, etc.)
  - `/components/forms`: Componentes relacionados con formularios
  - `/components/product`: Componentes específicos para productos
  - `/components/cart`: Componentes relacionados con el carrito

### Páginas y Enrutamiento

- `/pages`: Archivos para el enrutamiento basado en archivos
- `/layouts`: Layouts de la aplicación (default.vue, etc.)
- `/middleware`: Middlewares para enrutamiento y autenticación

### Estado

- `/stores`: Stores de Pinia para la gestión del estado

### Otros

- `/assets`: Recursos como CSS, imágenes, etc.
- `/plugins`: Plugins para extender la funcionalidad de Vue/Nuxt
- `/utils`: Funciones de utilidad
- `/composables`: Composables reutilizables para la lógica de negocio

## Buenas Prácticas

### Evitar Duplicación de Componentes

- **NO crear componentes con el mismo nombre en diferentes carpetas**
- Si necesitas refactorizar un componente, actualiza sus referencias pero no dupliques

### Convenciones de Nomenclatura

- Componentes: PascalCase (ej. `ProductCard.vue`)
- Composables: camelCase con prefijo 'use' (ej. `useCart.js`)
- Stores: camelCase (ej. `cart.js`)

### Layout vs Componentes

- Los componentes en `/components/layout` son estructurales y deben ser únicos
- Los componentes en otras subcarpetas de `/components` deben ser reutilizables

### Proceso de Desarrollo

1. Primero verifica si un componente similar ya existe
2. Si necesitas modificar un componente existente, asegúrate de que los cambios no romperán su uso en otros lugares
3. Para nuevos componentes, colócalos en la carpeta adecuada según su propósito

## Solución de Problemas Comunes

### Componentes Duplicados

Si descubres componentes duplicados:

1. Identifica cuál es usado por la aplicación (revisa los imports)
2. Elimina la versión no utilizada
3. Documenta la situación para evitar futuros problemas
