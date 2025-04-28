# Lógica de Negocio - FarmaciaDescuento

Este documento define los algoritmos y reglas de negocio clave para el funcionamiento de la aplicación FarmaciaDescuento.

## 1. Sistema de Descuentos

### Cálculo de Descuentos

```javascript
/**
 * Calcula el precio con descuento
 * @param {number} originalPrice - Precio original en pesos chilenos
 * @param {number} discountPercentage - Porcentaje de descuento (0-100)
 * @param {Date} expirationDate - Fecha de vencimiento del producto
 * @returns {Object} Precio con descuento y descuento adicional
 */
function calculateDiscountedPrice(originalPrice, discountPercentage, expirationDate) {
  // Descuento base
  let finalDiscountPercentage = discountPercentage;
  let additionalDiscount = 0;
  
  // Descuento adicional por proximidad a vencimiento
  const today = new Date();
  const daysToExpiration = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));
  
  if (daysToExpiration <= 7) {
    // Productos a menos de 7 días de vencer reciben 10% adicional
    additionalDiscount = 10;
  } else if (daysToExpiration <= 15) {
    // Productos a menos de 15 días de vencer reciben 5% adicional
    additionalDiscount = 5;
  }
  
  finalDiscountPercentage = Math.min(finalDiscountPercentage + additionalDiscount, 90);
  
  // Calcular precio final
  const discountAmount = Math.round(originalPrice * (finalDiscountPercentage / 100));
  const discountedPrice = originalPrice - discountAmount;
  
  return {
    discountedPrice,
    finalDiscountPercentage,
    additionalDiscount
  };
}
```

### Reglas de Descuentos

1. **Descuento Máximo**: 90% del precio original
2. **Descuento Mínimo**: 10% del precio original
3. **Descuento por Vencimiento**:
   - 5% adicional para productos a menos de 15 días de vencer
   - 10% adicional para productos a menos de 7 días de vencer
4. **Redondeo**: Todos los precios se redondean a enteros

## 2. Sistema de Búsqueda y Filtrado

### Algoritmo de Relevancia

```javascript
/**
 * Calcula la puntuación de relevancia de un producto
 * @param {Object} product - Producto con sus metadatos
 * @param {Object} userPreferences - Preferencias del usuario
 * @param {Object} searchParams - Parámetros de búsqueda
 * @returns {number} Puntuación de relevancia (0-100)
 */
function calculateRelevanceScore(product, userPreferences, searchParams) {
  let score = 0;
  
  // Relevancia por descuento (0-40 puntos)
  const discountScore = Math.min(product.discountPercentage * 0.4, 40);
  
  // Relevancia por proximidad (0-30 puntos)
  let proximityScore = 0;
  if (searchParams.coordinates && product.coordinates) {
    const distance = calculateDistance(
      searchParams.coordinates.latitude,
      searchParams.coordinates.longitude,
      product.coordinates.latitude,
      product.coordinates.longitude
    );
    
    // Máxima puntuación para distancias menores a 1km, decrece linealmente hasta maxDistance
    const maxDistance = searchParams.maxDistance || 10;
    proximityScore = Math.max(0, 30 * (1 - (distance / maxDistance)));
  }
  
  // Relevancia por tiempo hasta vencimiento (0-20 puntos)
  let expirationScore = 0;
  if (product.expirationDate) {
    const today = new Date();
    const daysToExpiration = Math.ceil((product.expirationDate - today) / (1000 * 60 * 60 * 24));
    
    // Productos más cercanos a vencer (pero no vencidos) tienen mayor puntuación
    if (daysToExpiration > 0) {
      expirationScore = Math.max(0, 20 * (1 - (daysToExpiration / 60)));
    }
  }
  
  // Relevancia por coincidencia con preferencias del usuario (0-10 puntos)
  let preferenceScore = 0;
  if (userPreferences && userPreferences.categories) {
    if (product.categories.some(cat => userPreferences.categories.includes(cat))) {
      preferenceScore += 5;
    }
    
    if (product.discountPercentage >= (userPreferences.minDiscount || 0)) {
      preferenceScore += 5;
    }
  }
  
  // Puntuación final
  score = discountScore + proximityScore + expirationScore + preferenceScore;
  
  return score;
}
```

### Filtros Combinados

1. **Filtro por Categoría**: Productos en la categoría seleccionada o sus subcategorías
2. **Filtro por Distancia**: Productos en farmacias dentro del radio seleccionado
3. **Filtro por Descuento**: Productos con descuento mínimo seleccionado
4. **Filtro por Vencimiento**: Productos que vencen dentro del rango seleccionado
5. **Filtro por Disponibilidad**: Productos con stock mayor a cero

## 3. Sistema de Tickets

### Ciclo de Vida del Ticket

```javascript
/**
 * Estados del ciclo de vida de un ticket
 */
const TicketStatus = {
  ACTIVE: 'active',       // Creado y pendiente de canje
  REDEEMED: 'redeemed',   // Canjeado en farmacia
  EXPIRED: 'expired',     // Expirado sin canjear
  CANCELLED: 'cancelled'  // Cancelado por usuario o sistema
};

/**
 * Transiciones de estado permitidas
 */
const allowedTransitions = {
  [TicketStatus.ACTIVE]: [TicketStatus.REDEEMED, TicketStatus.EXPIRED, TicketStatus.CANCELLED],
  [TicketStatus.REDEEMED]: [],
  [TicketStatus.EXPIRED]: [],
  [TicketStatus.CANCELLED]: []
};

/**
 * Valida si una transición de estado es permitida
 * @param {string} currentStatus - Estado actual del ticket
 * @param {string} newStatus - Nuevo estado del ticket
 * @returns {boolean} Si la transición es válida
 */
function isValidStatusTransition(currentStatus, newStatus) {
  return allowedTransitions[currentStatus]?.includes(newStatus) || false;
}
```

### Reglas de Tickets

1. **Duración**: Los tickets expiran 48 horas después de su creación
2. **Reserva de Stock**: Al crear un ticket, se reserva el stock correspondiente
3. **Validación**: Solo puede ser validado por la farmacia especificada
4. **Unicidad**: Cada ticket tiene un código QR único para validación
5. **No Transferible**: Los tickets son personales y no transferibles

## 4. Sistema de Geolocalización

### Cálculo de Distancia

```javascript
/**
 * Calcula la distancia entre dos puntos geográficos usando la fórmula de Haversine
 * @param {number} lat1 - Latitud del punto 1
 * @param {number} lon1 - Longitud del punto 1
 * @param {number} lat2 - Latitud del punto 2
 * @param {number} lon2 - Longitud del punto 2
 * @returns {number} Distancia en kilómetros
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radio de la Tierra en km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return distance;
}

function toRadians(degrees) {
  return degrees * (Math.PI/180);
}
```

### Búsqueda por Proximidad

1. **Geohash**: Uso de geohash para indexar ubicaciones en Firestore
2. **Radio de Búsqueda**: Configurable por el usuario (1-50km)
3. **Ordenamiento**: Resultados ordenados por distancia o relevancia
4. **Caché**: Resultados de ubicaciones cercanas se almacenan en caché local

## 5. Sistema de Notificaciones

### Tipos de Notificaciones

1. **Recordatorios de Tickets**: 24 horas antes de expirar
2. **Nuevos Productos**: Productos nuevos en categorías de interés
3. **Cambios de Precio**: Descuentos adicionales en productos guardados
4. **Validación de Tickets**: Confirmación de ticket canjeado
5. **Alertas de Inventario**: Para farmacias con productos próximos a vencer

### Canales de Notificación

```javascript
/**
 * Envía una notificación a través de múltiples canales
 * @param {Object} notification - Datos de la notificación
 * @param {string[]} channels - Canales a utilizar
 */
async function sendNotification(notification, channels) {
  const results = {};
  
  if (channels.includes('push') && notification.userId) {
    // Enviar notificación push via Firebase Cloud Messaging
    results.push = await sendPushNotification(notification);
  }
  
  if (channels.includes('email') && notification.email) {
    // Enviar email via Resend
    results.email = await sendEmailNotification(notification);
  }
  
  if (channels.includes('in-app')) {
    // Guardar notificación en Firestore
    results.inApp = await saveNotificationToFirestore(notification);
  }
  
  return results;
}
```

## 6. Sistema de Reportes y Estadísticas

### Métricas Clave

1. **Merma Evitada**: Valor monetario de productos que habrían vencido
2. **Tickets Generados**: Cantidad y valor de tickets generados
3. **Tickets Canjeados**: Tasa de conversión de tickets
4. **Productos Populares**: Productos más solicitados
5. **Farmacias Activas**: Farmacias con mayor participación

### Cálculo de Merma Evitada

```javascript
/**
 * Calcula la merma evitada por la venta de productos con descuento
 * @param {Object[]} redeemedTickets - Tickets canjeados en el período
 * @returns {Object} Estadísticas de merma evitada
 */
function calculateWasteReduction(redeemedTickets) {
  let totalWasteReduction = 0;
  let productCount = 0;
  const productStats = {};
  
  for (const ticket of redeemedTickets) {
    for (const item of ticket.items) {
      // Valor del producto que se habría perdido
      const wasteValue = item.unitPrice * item.quantity;
      totalWasteReduction += wasteValue;
      productCount += item.quantity;
      
      // Estadísticas por producto
      if (!productStats[item.productId]) {
        productStats[item.productId] = {
          name: item.name,
          quantity: 0,
          value: 0
        };
      }
      
      productStats[item.productId].quantity += item.quantity;
      productStats[item.productId].value += wasteValue;
    }
  }
  
  return {
    totalWasteReduction,
    productCount,
    productStats
  };
}
```

## 7. Políticas de Caché

### Estrategia de Caché

1. **Caché de Productos**: 5 minutos para listados, 1 hora para detalles
2. **Caché de Categorías**: 24 horas (estructura estable)
3. **Caché de Ubicación**: 1 hora para resultados de geolocalización
4. **Sin Caché**: Tickets, inventario (datos críticos en tiempo real)

```javascript
/**
 * Política de caché para diferentes tipos de datos
 */
const cachePolicy = {
  products: {
    list: 5 * 60, // 5 minutos en segundos
    detail: 60 * 60 // 1 hora en segundos
  },
  categories: 24 * 60 * 60, // 24 horas en segundos
  pharmacies: {
    list: 60 * 60, // 1 hora en segundos
    detail: 12 * 60 * 60 // 12 horas en segundos
  },
  geolocation: 60 * 60, // 1 hora en segundos
  tickets: 0, // Sin caché
  inventory: 0 // Sin caché
};
```

## 8. Reglas de Validación de Datos

### Validación de Productos

```javascript
/**
 * Valida los datos de un producto antes de guardarlo
 * @param {Object} product - Datos del producto
 * @returns {Object} Resultado de validación
 */
function validateProduct(product) {
  const errors = {};
  
  // Validar campos obligatorios
  if (!product.name || product.name.trim().length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres';
  }
  
  if (!product.description || product.description.trim().length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres';
  }
  
  if (!product.categories || !Array.isArray(product.categories) || product.categories.length === 0) {
    errors.categories = 'Debe seleccionar al menos una categoría';
  }
  
  // Validar imágenes
  if (!product.images || !Array.isArray(product.images) || product.images.length === 0) {
    errors.images = 'Debe incluir al menos una imagen';
  } else {
    const hasMainImage = product.images.some(img => img.isMain);
    if (!hasMainImage) {
      errors.images = 'Debe designar una imagen principal';
    }
  }
  
  // Validar datos de laboratorio
  if (!product.laboratory || product.laboratory.trim().length < 2) {
    errors.laboratory = 'Debe especificar el laboratorio';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
```

## 9. Integración con Servicios Externos

### Google Maps

```javascript
/**
 * Obtiene la dirección formateada y coordenadas a partir de una dirección
 * @param {string} address - Dirección a geocodificar
 * @returns {Object} Dirección formateada y coordenadas
 */
async function geocodeAddress(address) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.status !== 'OK' || !data.results || data.results.length === 0) {
      throw new Error('No se pudo geocodificar la dirección');
    }
    
    const result = data.results[0];
    
    return {
      formattedAddress: result.formatted_address,
      coordinates: {
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng
      },
      placeId: result.place_id,
      components: result.address_components
    };
  } catch (error) {
    console.error('Error geocodificando dirección:', error);
    throw error;
  }
}
```

### Resend (Email)

```javascript
/**
 * Envía un correo electrónico usando Resend
 * @param {Object} emailData - Datos del correo
 * @returns {Object} Resultado del envío
 */
async function sendEmail(emailData) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'FarmaciaDescuento <no-reply@farmaciadescuento.cl>',
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al enviar el correo');
    }
    
    return data;
  } catch (error) {
    console.error('Error enviando correo:', error);
    throw error;
  }
}
```

## 10. Seguridad y Privacidad

### Sanitización de Datos

```javascript
/**
 * Sanitiza datos de entrada para prevenir inyecciones
 * @param {Object} data - Datos a sanitizar
 * @returns {Object} Datos sanitizados
 */
function sanitizeInput(data) {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Eliminar HTML y scripts
      sanitized[key] = value
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .trim();
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeInput(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}
```

### Verificación de Permisos

```javascript
/**
 * Verifica si un usuario tiene los permisos necesarios
 * @param {Object} user - Usuario actual
 * @param {string|string[]} requiredPermissions - Permisos requeridos
 * @returns {boolean} Si tiene los permisos
 */
function hasPermission(user, requiredPermissions) {
  if (!user || !user.type) return false;
  
  // Permisos por tipo de usuario
  const permissionsByType = {
    admin: [
      'manage_users', 'manage_pharmacies', 'manage_categories',
      'view_reports', 'moderate_content', 'manage_system'
    ],
    pharmacy: [
      'manage_products', 'validate_tickets', 'view_pharmacy_reports',
      'manage_inventory', 'manage_pharmacy_profile'
    ],
    client: [
      'create_tickets', 'view_products', 'manage_profile',
      'rate_products', 'save_favorites'
    ]
  };
  
  // Obtener permisos del usuario
  let userPermissions = [];
  
  // Permisos base por tipo
  if (permissionsByType[user.type]) {
    userPermissions = [...permissionsByType[user.type]];
  }
  
  // Permisos específicos del usuario
  if (user.permissions && Array.isArray(user.permissions)) {
    userPermissions = [...userPermissions, ...user.permissions];
  }
  
  // Verificar permisos
  if (Array.isArray(requiredPermissions)) {
    return requiredPermissions.every(permission => 
      userPermissions.includes(permission)
    );
  } else {
    return userPermissions.includes(requiredPermissions);
  }
}
```

## Implementación en el Proyecto

Estos algoritmos y reglas de negocio se implementarán en:

1. **Firebase Functions**: Para lógica de backend y validaciones
2. **Composables de Vue**: Para lógica reutilizable en el frontend
3. **Stores de Pinia**: Para gestión de estado y lógica compartida
4. **Middleware de Nuxt**: Para verificación de permisos y autenticación
