# Análisis de la Demo - FarmaciaDescuento

Este documento analiza la estructura, componentes y flujos de usuario presentes en la demo de FarmaciaDescuento para servir como referencia en la implementación de la aplicación web con Nuxt 3.

## Estructura de Páginas

La demo incluye las siguientes páginas principales:

1. **Página de Inicio (`index.html`)**
   - Presentación del concepto
   - Navegación por categorías
   - Listado de productos con descuento

2. **Página de Categoría (`categoria.html`)**
   - Listado filtrado de productos por categoría
   - Filtros laterales
   - Grid de productos

3. **Página de Producto (`producto.html`)**
   - Detalle completo del producto
   - Galería de imágenes
   - Selector de farmacias
   - Información de precios y disponibilidad
   - Funcionalidad de añadir al carrito

4. **Página de Mis Tickets (`mis-tickets.html`)**
   - Listado de tickets generados
   - Estado de cada ticket
   - Historial de compras

## Componentes Principales

### Header
- Logo de la aplicación
- Barra de búsqueda
- Menú de navegación principal
- Acciones de usuario (login/registro)
- Icono del carrito con contador

### Footer
- Enlaces a secciones importantes
- Información de contacto
- Enlaces a redes sociales
- Información legal

### Carrito Lateral
- Se despliega desde la derecha
- Lista de productos añadidos
- Opción para eliminar productos
- Cálculo del total
- Botón para finalizar compra

### Tarjetas de Producto
- Imagen del producto
- Badge de descuento
- Nombre del producto
- Disponibilidad en farmacias
- Precios (original y con descuento)
- Fecha de vencimiento
- Categorías del producto
- Botón "Ver Ofertas"

### Tarjetas de Categoría
- Icono representativo
- Imagen de fondo
- Título de la categoría
- Efecto hover

### Filtros
- Filtro de distancia
- Filtro de porcentaje de descuento
- Filtro de fecha de vencimiento
- Botón para aplicar filtros

### Selector de Farmacia
- Lista de farmacias disponibles
- Precio en cada farmacia
- Dirección de la farmacia
- Distancia desde ubicación del usuario
- Stock disponible
- Laboratorio fabricante

### Galería de Producto
- Imagen principal
- Miniaturas para cambiar la imagen principal
- Navegación entre imágenes

### Modales
- Modal de login/registro
- Notificaciones de carrito

## Flujos de Usuario

### Exploración de Productos
1. Usuario llega a la página de inicio
2. Navega por categorías o utiliza la búsqueda
3. Filtra resultados según preferencias
4. Visualiza productos disponibles

### Compra de Producto
1. Usuario selecciona un producto
2. Visualiza detalles y compara precios entre farmacias
3. Selecciona una farmacia específica
4. Ajusta la cantidad
5. Añade al carrito
6. Recibe notificación de confirmación
7. Puede seguir comprando o finalizar la compra

### Gestión del Carrito
1. Usuario abre el carrito lateral
2. Revisa productos añadidos
3. Puede eliminar productos
4. Visualiza el total
5. Procede a generar ticket de descuento

### Generación de Ticket
1. Usuario finaliza la compra desde el carrito
2. Se genera un ticket de descuento
3. El ticket se añade a "Mis Tickets"
4. Usuario puede presentar el ticket en la farmacia seleccionada

## Interacciones y Comportamientos

### Navegación por Categorías
- Tabs para cambiar entre vistas (Por Uso, Por Compuesto, Por Forma)
- Grid de categorías con efectos hover

### Filtrado de Productos
- Selectores desplegables para filtros
- Aplicación inmediata de filtros al hacer clic en botón

### Selección de Farmacia
- Radio buttons para seleccionar una farmacia
- Cambio visual al seleccionar una opción
- Muestra información relevante de cada farmacia

### Gestión de Cantidad
- Botones +/- para ajustar cantidad
- Actualización en tiempo real del contador

### Añadir al Carrito
- Animación de notificación al añadir producto
- Actualización del contador de productos en el icono del carrito
- Apertura automática del carrito lateral

## Elementos de Diseño Destacables

### Uso de Colores
- Turquesa (#4ECDC4) como color principal
- Coral (#FF6B6B) para precios con descuento y badges
- Azul verdoso oscuro (#1A535C) para textos importantes

### Consistencia Visual
- Mismos estilos de botones en toda la aplicación
- Tarjetas de producto con estructura uniforme
- Sistema de espaciado coherente

### Elementos Interactivos
- Efectos hover en botones y tarjetas
- Animaciones suaves en modales y carrito
- Feedback visual en acciones del usuario

## Consideraciones para la Implementación en Nuxt 3

### Componentes Vue
- Crear componentes reutilizables para tarjetas de producto, filtros, selector de farmacia, etc.
- Implementar composables para lógica compartida (carrito, autenticación, filtros)

### Routing
- Definir estructura de rutas similar a la demo:
  - `/` - Página de inicio
  - `/categorias/:id` - Página de categoría
  - `/productos/:id` - Página de producto
  - `/mis-tickets` - Página de tickets

### Estado Global
- Utilizar Pinia para gestionar:
  - Estado del carrito
  - Filtros seleccionados
  - Autenticación de usuario
  - Productos y categorías

### Integración con Firebase
- Firestore para almacenar:
  - Productos
  - Categorías
  - Farmacias
  - Usuarios
  - Tickets

### Optimizaciones
- Implementar carga lazy de imágenes
- Paginación o scroll infinito para listas de productos
- Caché de datos frecuentes con Nuxt 3
