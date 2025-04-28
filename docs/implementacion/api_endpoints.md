# API Endpoints - FarmaciaDescuento

## Índice

1. [Introducción](#introducción)
2. [Endpoints por Grupo Funcional](#endpoints-por-grupo-funcional)
3. [Ejemplos de Request/Response](#ejemplos-de-requestresponse)
4. [Consideraciones de Seguridad](#consideraciones-de-seguridad)

---

## Introducción

Este documento define los principales endpoints de API implementados como Firebase Functions para el proyecto FarmaciaDescuento.

## Estructura General

Los endpoints se organizan en los siguientes grupos funcionales:

1. Autenticación y Usuarios
2. Productos y Categorías
3. Tickets y Transacciones
4. Farmacias y Sucursales
5. Notificaciones
6. Reportes y Estadísticas

## 1. Autenticación y Usuarios

### `auth/register`
- **Método**: POST
- **Descripción**: Registra un nuevo usuario en la plataforma
- **Parámetros**:
  - `email`: Correo electrónico
  - `password`: Contraseña
  - `displayName`: Nombre a mostrar
  - `type`: Tipo de usuario (client, pharmacy, admin)
  - `phoneNumber`: Número de teléfono (opcional)
  - Datos específicos según tipo de usuario

### `auth/login`
- **Método**: POST
- **Descripción**: Inicia sesión de usuario
- **Parámetros**:
  - `email`: Correo electrónico
  - `password`: Contraseña

### `users/update`
- **Método**: PUT
- **Descripción**: Actualiza información de perfil
- **Parámetros**:
  - `userId`: ID del usuario
  - `data`: Datos a actualizar

### `users/getProfile`
- **Método**: GET
- **Descripción**: Obtiene perfil de usuario
- **Parámetros**:
  - `userId`: ID del usuario (opcional, usa el token si no se proporciona)

## 2. Productos y Categorías

### `products/list`
- **Método**: GET
- **Descripción**: Lista productos con filtros
- **Parámetros**:
  - `categories`: Categorías (opcional)
  - `pharmacyId`: ID de farmacia (opcional)
  - `minDiscount`: Descuento mínimo (opcional)
  - `maxDistance`: Distancia máxima (opcional)
  - `coordinates`: Coordenadas del usuario (opcional)
  - `limit`: Límite de resultados (opcional)
  - `page`: Página (opcional)

### `products/get`
- **Método**: GET
- **Descripción**: Obtiene detalles de un producto
- **Parámetros**:
  - `productId`: ID del producto

### `products/create`
- **Método**: POST
- **Descripción**: Crea un nuevo producto (solo farmacias)
- **Parámetros**:
  - Datos del producto según modelo

### `products/update`
- **Método**: PUT
- **Descripción**: Actualiza un producto existente
- **Parámetros**:
  - `productId`: ID del producto
  - Datos a actualizar

### `categories/list`
- **Método**: GET
- **Descripción**: Lista categorías con estructura jerárquica
- **Parámetros**:
  - `parentId`: ID de categoría padre (opcional)

## 3. Tickets y Transacciones

### `tickets/create`
- **Método**: POST
- **Descripción**: Crea un nuevo ticket de descuento
- **Parámetros**:
  - `items`: Array de productos (inventoryId, quantity)
  - `pharmacyId`: ID de farmacia
  - `branchId`: ID de sucursal

### `tickets/validate`
- **Método**: POST
- **Descripción**: Valida un ticket en farmacia
- **Parámetros**:
  - `ticketId`: ID del ticket
  - `code`: Código del ticket
  - `paymentMethod`: Método de pago

### `tickets/list`
- **Método**: GET
- **Descripción**: Lista tickets del usuario o farmacia
- **Parámetros**:
  - `status`: Estado (opcional)
  - `startDate`: Fecha inicio (opcional)
  - `endDate`: Fecha fin (opcional)

### `tickets/get`
- **Método**: GET
- **Descripción**: Obtiene detalles de un ticket
- **Parámetros**:
  - `ticketId`: ID del ticket

## 4. Farmacias y Sucursales

### `pharmacies/list`
- **Método**: GET
- **Descripción**: Lista farmacias con filtros
- **Parámetros**:
  - `coordinates`: Coordenadas del usuario (opcional)
  - `maxDistance`: Distancia máxima (opcional)
  - `limit`: Límite de resultados (opcional)
  - `page`: Página (opcional)

### `pharmacies/get`
- **Método**: GET
- **Descripción**: Obtiene detalles de una farmacia
- **Parámetros**:
  - `pharmacyId`: ID de la farmacia

### `branches/list`
- **Método**: GET
- **Descripción**: Lista sucursales de una farmacia
- **Parámetros**:
  - `pharmacyId`: ID de la farmacia
  - `coordinates`: Coordenadas del usuario (opcional)
  - `maxDistance`: Distancia máxima (opcional)

### `inventory/update`
- **Método**: PUT
- **Descripción**: Actualiza inventario de productos
- **Parámetros**:
  - `inventoryId`: ID del inventario
  - Datos a actualizar (precio, descuento, stock, etc.)

## 5. Notificaciones

### `notifications/list`
- **Método**: GET
- **Descripción**: Lista notificaciones del usuario
- **Parámetros**:
  - `read`: Estado de lectura (opcional)
  - `limit`: Límite de resultados (opcional)
  - `page`: Página (opcional)

### `notifications/markAsRead`
- **Método**: PUT
- **Descripción**: Marca notificaciones como leídas
- **Parámetros**:
  - `notificationIds`: Array de IDs de notificaciones

### `notifications/subscribe`
- **Método**: POST
- **Descripción**: Suscribe a notificaciones push
- **Parámetros**:
  - `token`: Token FCM
  - `topics`: Temas de interés (opcional)

## 6. Reportes y Estadísticas

### `reports/generate`
- **Método**: POST
- **Descripción**: Genera un reporte personalizado
- **Parámetros**:
  - `type`: Tipo de reporte
  - `startDate`: Fecha inicio
  - `endDate`: Fecha fin
  - `pharmacyId`: ID de farmacia (opcional)
  - `format`: Formato (json, csv, pdf)

### `stats/dashboard`
- **Método**: GET
- **Descripción**: Obtiene estadísticas para dashboard
- **Parámetros**:
  - `period`: Periodo (day, week, month, year)
  - `pharmacyId`: ID de farmacia (opcional)

## Implementación en Firebase Functions

Ejemplo simplificado de implementación para el endpoint de creación de tickets:

```typescript
// Ejemplo simplificado - createTicket.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const createTicket = functions.https.onCall(async (data, context) => {
  // Verificar autenticación
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'El usuario debe estar autenticado'
    );
  }

  // Validar datos de entrada
  if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'El ticket debe contener al menos un producto'
    );
  }

  // Lógica de creación de ticket
  // ...

  return {
    success: true,
    ticketId: 'ticket123',
    code: 'TKT123456'
  };
});
```

## Seguridad y Validación

Todos los endpoints implementan:

1. **Validación de autenticación**: Verificación de token JWT
2. **Control de acceso basado en roles**: Verificación de permisos según tipo de usuario
3. **Validación de datos de entrada**: Esquemas de validación para parámetros
4. **Manejo de errores estructurado**: Códigos de error consistentes
5. **Rate limiting**: Limitación de solicitudes por usuario

## Documentación de la API

La documentación completa de la API estará disponible mediante:

1. **Swagger UI**: Interfaz interactiva para explorar la API
2. **Postman Collection**: Colección de ejemplos de solicitudes
3. **TypeScript Typings**: Definiciones de tipos para integración con frontend
