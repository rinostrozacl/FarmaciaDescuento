# Módulo de Clientes

Este módulo gestiona toda la experiencia del usuario final (cliente) en la plataforma FarmaciaDescuento, desde el registro hasta la compra de productos con descuento.

## Funcionalidades Principales

1. **Registro y Autenticación**
   - Registro de nuevos usuarios
   - Inicio de sesión
   - Recuperación de contraseña
   - Autenticación con proveedores externos (Google, Facebook)

2. **Perfil de Usuario**
   - Gestión de datos personales
   - Gestión de direcciones
   - Preferencias de notificaciones
   - Historial de compras

3. **Exploración de Productos**
   - Búsqueda de productos
   - Filtrado por categorías
   - Filtrado por ubicación, descuento y fecha de vencimiento
   - Visualización de productos disponibles

4. **Detalle de Producto**
   - Información completa del producto
   - Galería de imágenes
   - Comparación de precios entre farmacias
   - Información de stock y laboratorio fabricante
   - Selección de farmacia específica

5. **Carrito de Compra**
   - Agregar productos al carrito
   - Gestionar cantidades
   - Eliminar productos
   - Cálculo del total

6. **Generación de Tickets**
   - Creación de tickets de descuento
   - Visualización de tickets generados
   - Estado de tickets (vigente, utilizado, vencido)
   - Historial de tickets

7. **Notificaciones**
   - Alertas sobre nuevos productos con descuento
   - Notificaciones sobre productos próximos a vencer
   - Recordatorios de compras anteriores

## Interfaces de Usuario

### 1. Página de Inicio
- **Propósito**: Presentar la plataforma y facilitar la navegación a productos con descuento.
- **Componentes**:
  - Hero con mensaje principal y llamadas a la acción
  - Navegación por categorías
  - Listado de productos con descuento cercanos
  - Filtros de búsqueda (Distancia, Descuento, Vencimiento)
  - Sección "Cómo Funciona"

### 2. Página de Categoría
- **Propósito**: Mostrar productos filtrados por categoría.
- **Componentes**:
  - Breadcrumbs para navegación
  - Filtros laterales
  - Grid de productos
  - Opción de ordenar resultados
  - Paginación o carga infinita

### 3. Página de Producto
- **Propósito**: Mostrar información detallada de un producto y permitir su compra.
- **Componentes**:
  - Galería de imágenes
  - Información detallada del producto
  - Selector de farmacias con precios
  - Información de disponibilidad y stock
  - Selector de cantidad
  - Botón de añadir al carrito
  - Productos similares

### 4. Carrito
- **Propósito**: Gestionar productos seleccionados para compra.
- **Componentes**:
  - Lista de productos añadidos
  - Opción para eliminar productos
  - Cálculo del total
  - Botón para finalizar compra

### 5. Página de Mis Tickets
- **Propósito**: Gestionar tickets de descuento generados.
- **Componentes**:
  - Lista de tickets generados
  - Estado de cada ticket
  - Opción para ver detalles
  - Código QR o barcode para presentar en farmacia
  - Historial de compras

### 6. Perfil de Usuario
- **Propósito**: Gestionar información personal y preferencias.
- **Componentes**:
  - Formulario de datos personales
  - Gestión de direcciones
  - Preferencias de notificaciones
  - Historial de compras
  - Opciones de seguridad

## Flujos de Usuario

### Exploración y Compra
1. Usuario llega a la página de inicio
2. Navega por categorías o utiliza la búsqueda
3. Filtra resultados según preferencias
4. Selecciona un producto
5. Visualiza detalles y compara precios entre farmacias
6. Selecciona una farmacia específica
7. Ajusta la cantidad
8. Añade al carrito
9. Puede seguir comprando o finalizar la compra
10. Genera ticket de descuento
11. Presenta el ticket en la farmacia seleccionada

### Gestión de Tickets
1. Usuario accede a "Mis Tickets"
2. Visualiza todos sus tickets
3. Puede filtrar por estado (vigente, utilizado, vencido)
4. Selecciona un ticket para ver detalles
5. Presenta el ticket en la farmacia mediante código QR o barcode

## Integración con Firebase

### Autenticación
- Utiliza Firebase Authentication para gestión de usuarios
- Métodos de autenticación: Email/Password, Google, Facebook

### Base de Datos
- Colecciones en Firestore:
  - `users`: Información de usuarios
  - `addresses`: Direcciones de usuarios
  - `tickets`: Tickets generados por usuarios
  - `cart_items`: Elementos en el carrito de cada usuario

### Notificaciones
- Utiliza Firebase Cloud Messaging para envío de notificaciones
- Tópicos de suscripción basados en preferencias y ubicación

## Wireframes y Mockups

Ver carpeta [wireframes](./wireframes) para visualizar las interfaces de usuario propuestas para este módulo.
