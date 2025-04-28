# Módulo de Farmacias

Este módulo gestiona todas las funcionalidades relacionadas con las farmacias participantes en la plataforma FarmaciaDescuento, permitiéndoles publicar productos con descuento y gestionar sus ventas.

## Funcionalidades Principales

1. **Registro y Autenticación**
   - Registro de nuevas farmacias
   - Validación de licencias y permisos
   - Inicio de sesión
   - Recuperación de contraseña
   - Gestión de roles (administrador, empleado)

2. **Perfil de Farmacia**
   - Gestión de datos de la farmacia
   - Gestión de sucursales
   - Horarios de atención
   - Configuración de métodos de pago
   - Configuración de notificaciones

3. **Gestión de Productos**
   - Carga de productos próximos a vencer
   - Establecimiento de porcentajes de descuento
   - Definición de fechas límite de disponibilidad
   - Gestión de inventario
   - Carga de imágenes de productos

4. **Gestión de Ventas**
   - Visualización de tickets generados
   - Validación de tickets
   - Registro de ventas realizadas
   - Historial de transacciones

5. **Reportes y Estadísticas**
   - Visualización de productos vendidos
   - Estadísticas de reducción de mermas
   - Análisis de productos más vendidos
   - Tendencias de ventas por período

6. **Notificaciones**
   - Alertas sobre tickets generados
   - Notificaciones sobre productos próximos a vencer
   - Recordatorios de actualización de inventario

## Interfaces de Usuario

### 1. Dashboard de Farmacia
- **Propósito**: Proporcionar una visión general del estado de la farmacia en la plataforma.
- **Componentes**:
  - Resumen de ventas recientes
  - Productos próximos a vencer
  - Tickets pendientes de validación
  - Gráficos de rendimiento
  - Acceso rápido a funciones principales

### 2. Gestión de Productos
- **Propósito**: Administrar el catálogo de productos con descuento.
- **Componentes**:
  - Listado de productos publicados
  - Formulario de carga de nuevos productos
  - Editor de productos existentes
  - Gestor de imágenes
  - Filtros y búsqueda

### 3. Gestión de Inventario
- **Propósito**: Controlar el stock de productos disponibles.
- **Componentes**:
  - Listado de inventario
  - Actualización de cantidades
  - Alertas de stock bajo
  - Historial de cambios de inventario

### 4. Validación de Tickets
- **Propósito**: Verificar y procesar tickets de descuento presentados por clientes.
- **Componentes**:
  - Escáner de códigos QR/barcode
  - Verificación manual de códigos
  - Confirmación de venta
  - Historial de tickets procesados

### 5. Reportes
- **Propósito**: Analizar el rendimiento y las ventas.
- **Componentes**:
  - Selección de período
  - Gráficos de ventas
  - Estadísticas de reducción de mermas
  - Productos más vendidos
  - Exportación de datos

### 6. Configuración de Farmacia
- **Propósito**: Gestionar información y preferencias de la farmacia.
- **Componentes**:
  - Datos generales
  - Gestión de sucursales
  - Horarios de atención
  - Configuración de usuarios y roles
  - Preferencias de notificaciones

## Flujos de Usuario

### Publicación de Productos
1. Farmacia inicia sesión en su cuenta
2. Accede a "Gestión de Productos"
3. Selecciona "Añadir Nuevo Producto"
4. Completa información del producto (nombre, descripción, categorías)
5. Establece precio original y porcentaje de descuento
6. Define fecha de vencimiento y disponibilidad
7. Carga imágenes del producto
8. Establece cantidad disponible
9. Publica el producto

### Validación de Tickets
1. Cliente presenta ticket en farmacia
2. Empleado accede a "Validación de Tickets"
3. Escanea código QR o ingresa código manualmente
4. Sistema verifica validez del ticket
5. Muestra detalles de la compra (productos, cantidades, precios)
6. Empleado confirma la entrega
7. Sistema actualiza inventario y marca ticket como utilizado

### Gestión de Inventario
1. Farmacia accede a "Gestión de Inventario"
2. Visualiza productos con stock bajo
3. Actualiza cantidades disponibles
4. Sistema notifica si algún producto ya no está disponible
5. Farmacia puede retirar productos agotados o actualizar su disponibilidad

## Integración con Firebase

### Autenticación
- Utiliza Firebase Authentication para gestión de usuarios de farmacias
- Roles y permisos gestionados con reglas de seguridad de Firestore

### Base de Datos
- Colecciones en Firestore:
  - `pharmacies`: Información de farmacias
  - `branches`: Sucursales de farmacias
  - `products`: Productos publicados
  - `inventory`: Control de stock por sucursal
  - `sales`: Registro de ventas realizadas

### Almacenamiento
- Utiliza Firebase Storage para:
  - Imágenes de productos
  - Documentación de farmacias (licencias, permisos)
  - Logos e imágenes de sucursales

## Wireframes y Mockups

Ver carpeta [wireframes](./wireframes) para visualizar las interfaces de usuario propuestas para este módulo.
