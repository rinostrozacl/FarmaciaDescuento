# Guía de Estilos - FarmaciaDescuento

## Índice

1. [Principios Generales](#principios-generales)
2. [Paleta de Colores](#paleta-de-colores)
3. [Tipografía](#tipografía)
4. [Componentes UI](#componentes-ui)
5. [Ejemplos Visuales](#ejemplos-visuales)

---

## 1. Paleta de Colores

### Colores Principales
- **Primario (`--primary-color`)**: #4ECDC4 - Turquesa/Aqua - Usado para elementos principales, botones y acentos
- **Primario Oscuro (`--primary-dark`)**: #36B5AC - Turquesa más oscuro - Para estados hover de elementos primarios
- **Secundario (`--secondary-color`)**: #1A535C - Azul verdoso oscuro - Para encabezados, textos importantes
- **Acento (`--accent-color`)**: #FF6B6B - Coral/Rojo suave - Para precios con descuento, badges y llamadas a la acción secundarias

### Colores Neutros
- **Claro (`--light-color`)**: #F7FFF7 - Blanco verdoso muy suave - Fondo principal
- **Gris Claro (`--gray-light`)**: #F4F4F4 - Usado para fondos alternos, breadcrumbs
- **Gris (`--gray`)**: #E0E0E0 - Bordes, separadores
- **Gris Oscuro (`--gray-dark`)**: #888888 - Textos secundarios, iconos
- **Color de Texto (`--text-color`)**: #333333 - Texto principal

## 2. Tipografía

### Fuentes
- **Títulos y Encabezados**: 'Montserrat', sans-serif (400, 500, 600, 700)
- **Cuerpo de Texto**: 'Roboto', sans-serif (300, 400, 500)

### Jerarquía de Texto
- **H1**: 2.5rem, Montserrat 600, color secundario
- **H2**: 2rem, Montserrat 600, color secundario
- **H3**: 1.5rem, Montserrat 600, color secundario
- **Texto de párrafo**: 1rem, Roboto 400, color de texto
- **Texto pequeño**: 0.9rem, Roboto 400, gris oscuro
- **Texto muy pequeño**: 0.85rem, Roboto 400, gris oscuro

## 3. Componentes UI

### Botones
- **Botón Primario**: Fondo turquesa (#4ECDC4), texto blanco, border-radius 8px, padding 10px 20px
- **Botón Secundario**: Fondo blanco, borde #1A535C, texto #1A535C, border-radius 8px
- **Botón Filtro**: Fondo #1A535C, texto blanco, padding más pequeño (8px 16px)
- **Botón Cargar Más**: Transparente con borde #1A535C, padding 12px 24px
- **Botón Añadir al Carrito**: Fondo turquesa, texto blanco, ancho 100%
- **Botón Ver Ofertas**: Fondo blanco, borde #1A535C, texto #1A535C, ancho 100%

### Tarjetas
- **Tarjeta de Producto**: 
  - Fondo blanco
  - Border-radius 8px
  - Sombra suave (0 2px 10px rgba(0, 0, 0, 0.1))
  - Padding interno 15px
  - Badge de descuento en esquina superior
  - Imagen de producto centrada
  - Información en la parte inferior

- **Tarjeta de Categoría**:
  - Fondo con imagen o color
  - Border-radius 8px
  - Overlay semitransparente
  - Icono y título centrados
  - Efecto hover con escala

### Formularios
- **Campos de entrada**: 
  - Border-radius 8px
  - Borde gris (#E0E0E0)
  - Padding 10px 15px
  - Focus con borde turquesa

- **Selectores**:
  - Estilo similar a los campos de entrada
  - Icono de flecha para indicar desplegable

### Navegación
- **Menú Principal**: 
  - Enlaces con padding 5px 0
  - Estado activo con subrayado turquesa
  - Transición suave en hover

- **Breadcrumbs**:
  - Fondo gris claro (#F5F5F5)
  - Separadores con icono de flecha
  - Último elemento en color acento

- **Pestañas**:
  - Botones con padding 10px 20px
  - Estado activo con borde inferior turquesa
  - Transición suave entre estados

### Componentes Específicos
- **Carrito Lateral**:
  - Despliega desde la derecha
  - Fondo blanco
  - Ancho 380px
  - Encabezado con título y botón cerrar
  - Lista de productos con opción de eliminar
  - Footer con total y botón de acción

- **Selector de Farmacia**:
  - Opciones en lista vertical
  - Estado seleccionado con borde izquierdo turquesa y fondo más claro
  - Muestra nombre, precio, dirección y detalles adicionales

- **Galería de Producto**:
  - Imagen principal grande
  - Miniaturas en fila inferior
  - Miniatura activa con borde turquesa

## 4. Iconografía
- **Biblioteca**: Font Awesome 6
- **Uso**: Iconos para mejorar la usabilidad y estética
- **Tamaños**:
  - Pequeño: 0.85rem (en detalles)
  - Normal: 1rem (en botones y texto)
  - Grande: 1.2-1.5rem (en encabezados y características)

## 5. Espaciado y Layout

### Variables de Espaciado
- **Pequeño**: 5px-10px (entre elementos relacionados)
- **Medio**: 15px-20px (separación estándar entre componentes)
- **Grande**: 30px-40px (separación entre secciones)

### Contenedores
- **Ancho máximo**: 1200px
- **Padding lateral**: 20px
- **Estructura**: Diseño responsive con flexbox y grid

### Grid System
- **Productos**: Grid de 3-4 columnas en desktop, 2 en tablet, 1 en móvil
- **Categorías**: Grid de 6-7 columnas en desktop, adaptativo en otros dispositivos

## 6. Efectos y Animaciones

### Transiciones
- **Duración**: 0.3s
- **Timing**: ease o ease-out
- **Elementos**: Botones, enlaces, tarjetas, modales

### Animaciones Específicas
- **Notificación Carrito**: Slide-in desde la derecha
- **Carrito Lateral**: Slide-in desde la derecha
- **Modal**: Fade-in con ligero scale-up

## 7. Responsive Design

### Breakpoints
- **Móvil**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adaptaciones
- Menú colapsable en móvil
- Grids adaptativos según dispositivo
- Tamaños de fuente ajustados
- Carrito a pantalla completa en móvil

## 8. Elementos de Marca

### Logo
- Texto "FarmaciaDescuento" en color turquesa (#4ECDC4)
- Fuente Montserrat Bold
- Tamaño 1.5rem

### Mensajes Clave
- "Medicamentos con descuento, cerca de ti"
- "Conectamos farmacias y clientes para reducir mermas por vencimiento y ofrecer productos a precios accesibles"

## 9. Componentes de Estado

### Badges
- **Descuento**: Fondo coral (#FF6B6B), texto blanco, posición absoluta en esquina superior

### Estados de Producto
- **Disponibilidad**: Texto que indica número de farmacias
- **Precio Original**: Tachado, color gris
- **Precio con Descuento**: Color coral (#FF6B6B), prefijo "desde"
- **Vencimiento**: Fecha en formato DD/MM/YYYY
- **Categorías**: Tags con fondo gris claro, texto gris oscuro

## 10. Páginas Principales y Componentes

### Página de Inicio
- Hero con mensaje principal y llamadas a la acción
- Navegación por categorías con tabs (Por Uso, Por Compuesto, Por Forma)
- Sección de productos con descuento cercanos
- Filtros de búsqueda (Distancia, Descuento, Vencimiento)
- Sección "Cómo Funciona"

### Página de Categoría
- Breadcrumbs para navegación
- Filtros laterales
- Grid de productos
- Opción de ordenar resultados
- Paginación o carga infinita

### Página de Producto
- Galería de imágenes
- Información detallada del producto
- Selector de farmacias con precios
- Información de disponibilidad y stock
- Selector de cantidad
- Botón de añadir al carrito
- Productos similares

### Página de Mis Tickets
- Lista de tickets generados
- Estado de cada ticket
- Opción para ver detalles
- Historial de compras

### Componentes Globales
- Header con logo, búsqueda, navegación y acciones de usuario
- Carrito lateral
- Footer con información de contacto y enlaces
- Modales de login/registro
