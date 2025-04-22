# Demo de FarmaciaDescuento

Esta carpeta contiene una demostración web del diseño y funcionalidades principales de la plataforma FarmaciaDescuento.

## Contenido

- `index.html`: Página principal con todas las secciones de la aplicación
- `styles.css`: Estilos CSS con diseño responsivo
- `script.js`: Funcionalidades básicas de interacción

## Características implementadas

1. **Interfaz principal para exploración de productos**
   - Navegación intuitiva con breadcrumbs para mejor orientación
   - Búsqueda y filtrado de productos por múltiples criterios
   - Visualización de productos por categorías con información clara

2. **Sistema de categorización flexible**
   - Navegación por uso terapéutico (analgésicos, antiinflamatorios, etc.)
   - Navegación por compuesto genérico (paracetamol, ibuprofeno, etc.)
   - Navegación por forma farmacéutica (comprimidos, jarabes, etc.)
   - Filtros combinados para búsquedas más precisas

3. **Disponibilidad en múltiples farmacias**
   - Productos disponibles en diferentes farmacias con distintos precios
   - Visualización del precio más bajo disponible en tarjetas de producto (formato "desde $XXXX")
   - Indicación clara del número de farmacias donde está disponible cada producto
   - Botón "Ver Ofertas" que lleva a la página de detalle del producto
   - En la página de producto:
     * Lista completa de todas las farmacias que ofrecen el producto
     * Precio específico en cada farmacia
     * Selección de farmacia mediante radio buttons
     * Información detallada por farmacia:
       - Stock disponible en cada farmacia
       - Laboratorio fabricante del medicamento
       - Distancia desde la ubicación del usuario

4. **Carrito de compras lateral**
   - Carrito desplegable desde el lateral derecho
   - Agregar productos solo después de seleccionar farmacia específica
   - Visualización clara de productos, cantidades y precios
   - Actualización en tiempo real del contador de productos
   - Notificación visual al agregar productos
   - Opción para eliminar productos del carrito
   - Cálculo automático del total de la compra
   - Botón para generar ticket de descuento

5. **Galería de imágenes de productos**
   - Imagen principal del producto con alta calidad
   - Miniaturas para ver diferentes ángulos del producto
   - Funcionalidad interactiva para cambiar la imagen principal

6. **Información detallada de productos**
   - Pestañas organizadas con información relevante:
     * Descripción detallada del producto
     * Modo de uso y dosificación
     * Advertencias y precauciones
   - Fecha de vencimiento claramente indicada
   - Categorías del producto con iconos intuitivos

7. **Diseño responsivo**
   - Adaptable a dispositivos móviles, tablets y escritorio
   - Interfaz consistente en todas las plataformas
   - Optimizado para diferentes tamaños de pantalla

## Paleta de colores

- Color primario: Verde menta (#4ECDC4) - Usado en botones principales, encabezados y elementos destacados
- Color secundario: Azul oscuro (#1A535C) - Usado en textos importantes, pies de página y elementos secundarios
- Color de acento: Rojo (#FF6B6B) - Usado en badges de descuento, alertas y elementos que requieren atención
- Fondo claro: (#F7FFF7) - Usado como fondo principal para mejor legibilidad
- Gris claro: (#F1F1F1) - Usado para separadores y fondos alternativos
- Gris oscuro: (#555555) - Usado para textos secundarios

## Componentes principales

1. **Tarjetas de producto**
   - Badge de descuento en esquina superior
   - Imagen del producto
   - Título con enlace a la página de detalle
   - Indicador de disponibilidad en farmacias
   - Precios (original y con descuento)
   - Fecha de vencimiento
   - Etiquetas de categoría
   - Botón "Ver Ofertas"

2. **Selector de farmacia**
   - Opciones de radio para selección única
   - Nombre y dirección de la farmacia
   - Precio específico en cada farmacia
   - Información de distancia, stock y laboratorio
   - Diseño que facilita la comparación

3. **Carrito lateral**
   - Encabezado con título y botón de cierre
   - Lista de productos agregados
   - Información de cantidad y precio por producto
   - Botón para eliminar productos
   - Resumen del total
   - Botón para generar ticket
   - Mensaje cuando el carrito está vacío

4. **Navegación**
   - Barra superior con logo, búsqueda y menú
   - Breadcrumbs para orientación
   - Menú de categorías
   - Iconos intuitivos

## Cómo usar la demo

1. Abrir el archivo `index.html` en un navegador web
2. Explorar las diferentes secciones de la aplicación
3. Probar la funcionalidad del carrito agregando productos
4. Verificar la visualización en diferentes tamaños de pantalla

Esta demo sirve como prototipo visual y funcional para validar el diseño y la experiencia de usuario antes de implementar la versión completa con Nuxt.js.
