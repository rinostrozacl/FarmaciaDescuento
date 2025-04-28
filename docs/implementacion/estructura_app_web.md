# Estructura de la Aplicación Web - Farmacia Descuento

## 1. Páginas Principales

### 1.1 Públicas

- `/` - Página de inicio

  - Carrusel de productos destacados
  - Categorías principales
  - Farmacias cercanas
  - Sección de beneficios

- `/productos` - Listado de productos

  - Filtros por categoría, precio, distancia
  - Búsqueda avanzada
  - Vista de lista/grilla
  - Ordenamiento

- `/productos/[id]` - Detalle de producto

  - Galería de imágenes
  - Información detallada
  - Farmacias disponibles
  - Botón de generar ticket

- `/farmacias` - Listado de farmacias

  - Mapa de ubicaciones
  - Filtros por zona
  - Información de contacto
  - Horarios

- `/farmacias/[id]` - Perfil de farmacia
  - Información general
  - Productos disponibles
  - Ubicación y horarios
  - Reseñas

### 1.2 Autenticación

- `/auth/login` - Inicio de sesión

  - Email/contraseña
  - Google
  - Teléfono

- `/auth/register` - Registro

  - Formulario de registro
  - Verificación de email
  - Términos y condiciones

- `/auth/forgot-password` - Recuperación de contraseña
- `/auth/verify-email` - Verificación de email

### 1.3 Cliente

- `/cliente/perfil` - Perfil de cliente

  - Información personal
  - Historial de tickets
  - Farmacias favoritas
  - Notificaciones

- `/cliente/tickets` - Historial de tickets

  - Listado de tickets
  - Estado de cada ticket
  - Detalles y QR

- `/cliente/favoritos` - Farmacias favoritas
  - Listado de farmacias
  - Notificaciones de descuentos

### 1.4 Farmacia

- `/farmacia/dashboard` - Panel de control

  - Métricas principales
  - Tickets pendientes
  - Productos próximos a vencer
  - Ventas del día

- `/farmacia/productos` - Gestión de productos

  - Listado de productos
  - Agregar/editar productos
  - Gestión de inventario
  - Descuentos

- `/farmacia/tickets` - Gestión de tickets
  - Tickets pendientes
  - Historial de tickets
  - Validación de tickets
  - Reportes

### 1.5 Administración

- `/admin/dashboard` - Panel de administración

  - Métricas globales
  - Usuarios activos
  - Farmacias registradas
  - Tickets generados

- `/admin/farmacias` - Gestión de farmacias

  - Listado de farmacias
  - Verificación de documentos
  - Planes y suscripciones
  - Reportes

- `/admin/usuarios` - Gestión de usuarios
  - Listado de usuarios
  - Roles y permisos
  - Actividad
  - Reportes

## 2. Componentes Principales

### 2.1 UI/UX

- `AppHeader` - Encabezado principal
- `AppFooter` - Pie de página
- `AppSidebar` - Menú lateral
- `AppModal` - Modal genérico
- `AppToast` - Notificaciones toast
- `AppLoading` - Indicador de carga
- `AppError` - Mensajes de error

### 2.2 Productos

- `ProductCard` - Tarjeta de producto
- `ProductGallery` - Galería de imágenes
- `ProductFilters` - Filtros de búsqueda
- `ProductList` - Listado de productos
- `ProductDetail` - Detalle de producto

### 2.3 Farmacias

- `PharmacyCard` - Tarjeta de farmacia
- `PharmacyMap` - Mapa de ubicaciones
- `PharmacyDetail` - Detalle de farmacia
- `PharmacyFilters` - Filtros de búsqueda

### 2.4 Tickets

- `TicketCard` - Tarjeta de ticket
- `TicketQR` - Generador de QR
- `TicketList` - Listado de tickets
- `TicketDetail` - Detalle de ticket

### 2.5 Autenticación

- `AuthForm` - Formulario de autenticación
- `AuthSocial` - Botones de redes sociales
- `AuthVerify` - Verificación de email/teléfono

## 3. Stores (Pinia)

### 3.1 Autenticación

- `useAuthStore`
  - Estado de autenticación
  - Métodos de login/logout
  - Perfil de usuario

### 3.2 Productos

- `useProductStore`
  - Listado de productos
  - Filtros y búsqueda
  - Detalles de producto

### 3.3 Farmacias

- `usePharmacyStore`
  - Listado de farmacias
  - Filtros y búsqueda
  - Detalles de farmacia

### 3.4 Tickets

- `useTicketStore`
  - Generación de tickets
  - Historial de tickets
  - Validación de tickets

### 3.5 UI

- `useUIStore`
  - Estado de modales
  - Notificaciones
  - Tema y configuración

## 4. Plugins

### 4.1 Firebase

- Autenticación
- Firestore
- Storage
- Functions
- Analytics

### 4.2 Google Maps

- Geocodificación
- Búsqueda de lugares
- Mapas y marcadores

### 4.3 Otros

- Sentry (monitoreo)
- Resend (emails)
- Analytics
- Transbank (pagos)

## 5. Middleware

### 5.1 Autenticación

- `auth` - Verifica autenticación
- `guest` - Solo para no autenticados
- `role` - Verifica roles

### 5.2 Otros

- `maintenance` - Modo mantenimiento
- `analytics` - Tracking
- `seo` - Metadatos

## 6. Utilidades

### 6.1 Helpers

- Formateo de fechas
- Formateo de moneda
- Validaciones
- Geolocalización

### 6.2 Constantes

- Roles y permisos
- Estados de tickets
- Configuración global

### 6.3 Tipos

- Interfaces TypeScript
- Tipos de datos
- Enums
