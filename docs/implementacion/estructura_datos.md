# Estructura de Datos - FarmaciaDescuento

## Índice

1. [Introducción](#introducción)
2. [Colecciones Principales](#colecciones-principales)
3. [Ejemplos de Documentos](#ejemplos-de-documentos)
4. [Reglas de Validación y Seguridad](#reglas-de-validación-y-seguridad)
5. [Consideraciones Finales](#consideraciones-finales)

---

## Introducción

Este documento define la estructura de datos para la aplicación FarmaciaDescuento utilizando Firebase Firestore como base de datos principal.

---

## Colecciones Principales

### 1. `users` - Usuarios de la plataforma

```javascript
{
  id: "user123", // ID generado por Firebase Authentication
  type: "client", // Enum: "client", "pharmacy", "admin"
  email: "usuario@ejemplo.com",
  displayName: "Juan Pérez",
  phoneNumber: "+56912345678",
  profilePicture: "https://storage.googleapis.com/farmacia-descuento.appspot.com/users/user123/profile.jpg",
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastLoginAt: Timestamp,
  status: "active", // Enum: "active", "suspended", "pending", "inactive"
  preferences: {
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    categories: ["analgesicos", "antialergicos"], // Categorías de interés
    maxDistance: 5, // Distancia máxima en km
    minDiscount: 30 // Descuento mínimo en porcentaje
  },
  // Campos específicos para clientes
  clientData: {
    savedAddresses: [
      {
        id: "addr1",
        name: "Casa",
        address: "Av. Principal 123",
        city: "Puerto Montt",
        region: "Los Lagos",
        coordinates: {
          latitude: -41.4693,
          longitude: -72.9411
        },
        isDefault: true
      }
    ],
    favoritePharmacies: ["pharmacy1", "pharmacy2"]
  },
  // Campos específicos para farmacias
  pharmacyData: {
    pharmacyId: "pharmacy1", // Referencia a la colección pharmacies
    role: "admin", // Enum: "admin", "employee"
    permissions: ["manage_products", "validate_tickets", "view_reports"]
  },
  // Campos específicos para administradores
  adminData: {
    role: "super_admin", // Enum: "super_admin", "content_moderator", "support"
    permissions: ["manage_users", "manage_pharmacies", "manage_categories"]
  },
  fcmTokens: ["token1", "token2"] // Tokens para notificaciones push
}
```

### 2. `pharmacies` - Farmacias registradas

```javascript
{
  id: "pharmacy1",
  name: "Farmacia Cruz Verde",
  legalName: "Cruz Verde S.A.",
  taxId: "76.124.062-5",
  email: "contacto@cruzverde.cl",
  phoneNumber: "+56912345678",
  website: "https://www.cruzverde.cl",
  logo: "https://storage.googleapis.com/farmacia-descuento.appspot.com/pharmacies/pharmacy1/logo.jpg",
  coverImage: "https://storage.googleapis.com/farmacia-descuento.appspot.com/pharmacies/pharmacy1/cover.jpg",
  createdAt: Timestamp,
  updatedAt: Timestamp,
  status: "active", // Enum: "active", "suspended", "pending", "inactive"
  verificationStatus: "verified", // Enum: "pending", "verified", "rejected"
  verificationDocuments: [
    {
      type: "license", // Enum: "license", "permit", "tax_certificate", "other"
      url: "https://storage.googleapis.com/farmacia-descuento.appspot.com/pharmacies/pharmacy1/license.pdf",
      uploadedAt: Timestamp,
      status: "approved" // Enum: "pending", "approved", "rejected"
    }
  ],
  settings: {
    commissionRate: 5.0, // Porcentaje de comisión
    autoApproveProducts: false,
    notificationPreferences: {
      newTickets: true,
      lowStock: true,
      expiringProducts: true
    },
    paymentMethods: ["cash", "credit_card", "debit_card"]
  },
  statistics: {
    totalSales: 1500000,
    totalTickets: 245,
    averageRating: 4.7,
    wasteReduction: 2800000 // Merma evitada en pesos
  }
}
```

### 3. `branches` - Sucursales de farmacias

```javascript
{
  id: "branch1",
  pharmacyId: "pharmacy1", // Referencia a la farmacia principal
  name: "Cruz Verde - Centro",
  address: "Av. Principal 123",
  city: "Puerto Montt",
  region: "Los Lagos",
  coordinates: {
    latitude: -41.4693,
    longitude: -72.9411
  },
  phoneNumber: "+56912345678",
  email: "centro@cruzverde.cl",
  createdAt: Timestamp,
  updatedAt: Timestamp,
  status: "active", // Enum: "active", "inactive", "closed"
  openingHours: [
    {
      day: 1, // 0: domingo, 1: lunes, ..., 6: sábado
      open: "09:00",
      close: "19:00",
      isClosed: false
    },
    // ... resto de días
  ],
  features: ["parking", "wheelchair_access", "drive_thru"],
  manager: {
    name: "Ana López",
    email: "ana.lopez@cruzverde.cl",
    phoneNumber: "+56987654321"
  }
}
```

### 4. `products` - Productos publicados

```javascript
{
  id: "product1",
  pharmacyId: "pharmacy1", // Farmacia que publica el producto
  name: "Paracetamol 500mg",
  description: "Analgésico y antipirético para aliviar el dolor leve a moderado y reducir la fiebre.",
  activeIngredient: "Paracetamol",
  dosage: "500mg",
  laboratory: "Laboratorio Chile",
  presentation: "Comprimidos",
  quantity: 16, // Cantidad por envase
  categories: ["analgesicos", "antifebriles"],
  tags: ["dolor_cabeza", "fiebre", "resfriado"],
  images: [
    {
      url: "https://storage.googleapis.com/farmacia-descuento.appspot.com/products/product1/main.jpg",
      isMain: true,
      order: 1
    },
    {
      url: "https://storage.googleapis.com/farmacia-descuento.appspot.com/products/product1/secondary.jpg",
      isMain: false,
      order: 2
    }
  ],
  usage: "Tomar 1 comprimido cada 6-8 horas según sea necesario, con un máximo de 4 comprimidos al día.",
  warnings: "No exceder la dosis recomendada. Consultar al médico si los síntomas persisten por más de 3 días.",
  contraindications: "Hipersensibilidad al paracetamol. Insuficiencia hepática grave.",
  requiresPrescription: false,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  status: "active", // Enum: "pending", "active", "rejected", "expired"
  moderationStatus: "approved", // Enum: "pending", "approved", "rejected"
  moderationNotes: "",
  searchKeywords: ["paracetamol", "analgesico", "dolor", "fiebre", "500mg", "comprimidos"]
}
```

### 5. `inventory` - Inventario por sucursal

```javascript
{
  id: "inv1",
  productId: "product1",
  branchId: "branch1",
  pharmacyId: "pharmacy1",
  originalPrice: 5990, // Precio original en pesos chilenos (sin puntos ni comas)
  discountPercentage: 40, // Porcentaje de descuento
  discountedPrice: 3590, // Precio con descuento (calculado)
  stock: 15, // Unidades disponibles
  expirationDate: Timestamp, // Fecha de vencimiento
  batchNumber: "LOT123456",
  createdAt: Timestamp,
  updatedAt: Timestamp,
  status: "active", // Enum: "active", "out_of_stock", "expired", "removed"
  availableUntil: Timestamp, // Fecha límite de disponibilidad
  salesCount: 5, // Cantidad vendida
  isHighlighted: false // Destacado en búsquedas
}
```

### 6. `tickets` - Tickets de descuento

```javascript
{
  id: "ticket1",
  userId: "user123",
  pharmacyId: "pharmacy1",
  branchId: "branch1",
  code: "TKT12345", // Código único para el ticket
  qrCode: "https://storage.googleapis.com/farmacia-descuento.appspot.com/tickets/ticket1/qr.png",
  createdAt: Timestamp,
  expiresAt: Timestamp,
  redeemedAt: Timestamp, // null si no ha sido canjeado
  status: "active", // Enum: "active", "redeemed", "expired", "cancelled"
  items: [
    {
      productId: "product1",
      inventoryId: "inv1",
      name: "Paracetamol 500mg",
      quantity: 1,
      unitPrice: 3590,
      subtotal: 3590
    },
    {
      productId: "product2",
      inventoryId: "inv2",
      name: "Ibuprofeno 400mg",
      quantity: 2,
      unitPrice: 4220,
      subtotal: 8440
    }
  ],
  total: 12030,
  paymentMethod: "cash", // Registrado al canjear
  notes: "", // Notas adicionales
  redeemedBy: "employee1", // ID del empleado que validó el ticket
  deviceInfo: {
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0...",
    location: {
      latitude: -41.4693,
      longitude: -72.9411
    }
  }
}
```

### 7. `categories` - Categorías de productos

```javascript
{
  id: "analgesicos",
  name: "Analgésicos",
  description: "Medicamentos para aliviar el dolor",
  parentId: "medicamentos", // null si es categoría raíz
  level: 1, // 0: raíz, 1: primer nivel, 2: segundo nivel, etc.
  path: ["medicamentos", "analgesicos"], // Ruta completa para facilitar consultas
  icon: "pill", // Nombre del icono en Font Awesome
  image: "https://storage.googleapis.com/farmacia-descuento.appspot.com/categories/analgesicos.jpg",
  createdAt: Timestamp,
  updatedAt: Timestamp,
  status: "active", // Enum: "active", "inactive"
  displayOrder: 1, // Orden de visualización
  showInNavigation: true,
  filters: ["laboratory", "price", "discount", "expiration"],
  metadata: {
    seoTitle: "Analgésicos con descuento | FarmaciaDescuento",
    seoDescription: "Encuentra analgésicos con descuento cerca de ti. Ahorra en medicamentos para el dolor.",
    seoKeywords: ["analgesicos", "descuento", "dolor", "medicamentos"]
  }
}
```

### 8. `reports` - Reportes y estadísticas

```javascript
{
  id: "report1",
  type: "daily", // Enum: "daily", "weekly", "monthly", "custom"
  startDate: Timestamp,
  endDate: Timestamp,
  createdAt: Timestamp,
  pharmacyId: "pharmacy1", // null para reportes globales
  data: {
    sales: {
      total: 1500000,
      ticketCount: 145,
      averageTicket: 10345
    },
    products: {
      topSelling: [
        { productId: "product1", name: "Paracetamol 500mg", quantity: 50, total: 179500 }
      ],
      topDiscounted: [
        { productId: "product3", name: "Vitamina C 1000mg", discountPercentage: 60 }
      ]
    },
    wasteReduction: {
      total: 2800000,
      productCount: 245
    },
    users: {
      newUsers: 15,
      activeUsers: 120
    }
  },
  status: "completed", // Enum: "pending", "processing", "completed", "failed"
  format: "json", // Enum: "json", "csv", "pdf"
  url: "https://storage.googleapis.com/farmacia-descuento.appspot.com/reports/report1.pdf" // URL del reporte generado
}
```

### 9. `notifications` - Notificaciones a usuarios

```javascript
{
  id: "notif1",
  userId: "user123", // Destinatario
  type: "ticket_expiring", // Enum: "new_product", "ticket_expiring", "price_drop", etc.
  title: "Tu ticket está por vencer",
  body: "Tu ticket #12345 vence en 24 horas. ¡No olvides canjearlo!",
  data: {
    ticketId: "ticket1",
    pharmacyId: "pharmacy1",
    expiresAt: Timestamp
  },
  createdAt: Timestamp,
  sentAt: Timestamp,
  readAt: Timestamp, // null si no ha sido leída
  status: "sent", // Enum: "pending", "sent", "delivered", "read", "failed"
  channels: ["push", "email"], // Canales por los que se envió
  action: {
    type: "open_ticket", // Enum: "open_ticket", "open_product", "open_pharmacy", etc.
    payload: { ticketId: "ticket1" }
  }
}
```

### 10. `support_tickets` - Tickets de soporte

```javascript
{
  id: "support1",
  userId: "user123", // Usuario que creó el ticket
  subject: "Problema con ticket de descuento",
  description: "No puedo canjear mi ticket #12345 en la farmacia",
  category: "tickets", // Enum: "tickets", "account", "pharmacy", "products", "other"
  priority: "medium", // Enum: "low", "medium", "high", "urgent"
  status: "open", // Enum: "open", "in_progress", "resolved", "closed"
  createdAt: Timestamp,
  updatedAt: Timestamp,
  resolvedAt: Timestamp,
  assignedTo: "admin1", // ID del administrador asignado
  relatedEntities: [
    { type: "ticket", id: "ticket1" }
  ],
  messages: [
    {
      id: "msg1",
      userId: "user123",
      content: "No puedo canjear mi ticket en la farmacia",
      createdAt: Timestamp,
      attachments: []
    },
    {
      id: "msg2",
      userId: "admin1",
      content: "Estamos revisando su caso",
      createdAt: Timestamp,
      isInternal: false, // true para notas internas solo visibles para administradores
      attachments: []
    }
  ],
  resolution: {
    type: "solved", // Enum: "solved", "cannot_reproduce", "not_a_bug", "duplicate"
    description: "Se ha solucionado el problema con el ticket",
    resolvedBy: "admin1"
  }
}
```

## Relaciones entre Entidades

### Diagrama de Relaciones

```
users (clientes) 1 ----* tickets
       |
       |
       *
pharmacies 1 ----* branches
       |           |
       |           |
       *           *
    products 1 ----* inventory
       |               |
       *               *
    categories     tickets
```

### Descripciones de Relaciones

1. **Usuarios y Tickets**:
   - Un usuario puede generar múltiples tickets
   - Cada ticket pertenece a un único usuario

2. **Farmacias y Sucursales**:
   - Una farmacia puede tener múltiples sucursales
   - Cada sucursal pertenece a una única farmacia

3. **Farmacias y Productos**:
   - Una farmacia puede publicar múltiples productos
   - Cada producto es publicado por una única farmacia

4. **Productos y Categorías**:
   - Un producto puede pertenecer a múltiples categorías
   - Una categoría puede contener múltiples productos

5. **Productos e Inventario**:
   - Un producto puede tener múltiples registros de inventario (en diferentes sucursales)
   - Cada registro de inventario corresponde a un único producto en una sucursal específica

6. **Sucursales e Inventario**:
   - Una sucursal puede tener múltiples registros de inventario
   - Cada registro de inventario pertenece a una única sucursal

7. **Inventario y Tickets**:
   - Un registro de inventario puede estar en múltiples tickets
   - Un ticket puede contener múltiples productos de inventario

## Reglas de Seguridad de Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Funciones de utilidad
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.type == 'admin';
    }
    
    function isPharmacy() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.type == 'pharmacy';
    }
    
    function isClient() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.type == 'client';
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isPharmacyOwner(pharmacyId) {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.pharmacyData.pharmacyId == pharmacyId;
    }
    
    // Reglas para usuarios
    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow create: if isAuthenticated();
      allow update: if isOwner(userId) || isAdmin();
      allow delete: if isAdmin();
    }
    
    // Reglas para farmacias
    match /pharmacies/{pharmacyId} {
      allow read: if true; // Información pública
      allow create: if isAuthenticated();
      allow update: if isPharmacyOwner(pharmacyId) || isAdmin();
      allow delete: if isAdmin();
    }
    
    // Reglas para sucursales
    match /branches/{branchId} {
      allow read: if true; // Información pública
      allow create: if isPharmacy() || isAdmin();
      allow update: if isPharmacyOwner(resource.data.pharmacyId) || isAdmin();
      allow delete: if isAdmin();
    }
    
    // Reglas para productos
    match /products/{productId} {
      allow read: if true; // Información pública
      allow create: if isPharmacy() || isAdmin();
      allow update: if isPharmacyOwner(resource.data.pharmacyId) || isAdmin();
      allow delete: if isPharmacyOwner(resource.data.pharmacyId) || isAdmin();
    }
    
    // Reglas para inventario
    match /inventory/{inventoryId} {
      allow read: if true; // Información pública
      allow create: if isPharmacy() || isAdmin();
      allow update: if isPharmacyOwner(resource.data.pharmacyId) || isAdmin();
      allow delete: if isPharmacyOwner(resource.data.pharmacyId) || isAdmin();
    }
    
    // Reglas para tickets
    match /tickets/{ticketId} {
      allow read: if isOwner(resource.data.userId) || 
                   isPharmacyOwner(resource.data.pharmacyId) || 
                   isAdmin();
      allow create: if isClient();
      allow update: if isPharmacyOwner(resource.data.pharmacyId) || isAdmin();
      allow delete: if isAdmin();
    }
    
    // Reglas para categorías
    match /categories/{categoryId} {
      allow read: if true; // Información pública
      allow write: if isAdmin();
    }
    
    // Reglas para reportes
    match /reports/{reportId} {
      allow read: if isPharmacyOwner(resource.data.pharmacyId) || isAdmin();
      allow create: if isAdmin();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
    
    // Reglas para notificaciones
    match /notifications/{notificationId} {
      allow read: if isOwner(resource.data.userId);
      allow create: if isAdmin();
      allow update: if isOwner(resource.data.userId) || isAdmin();
      allow delete: if isOwner(resource.data.userId) || isAdmin();
    }
    
    // Reglas para tickets de soporte
    match /support_tickets/{ticketId} {
      allow read: if isOwner(resource.data.userId) || isAdmin();
      allow create: if isAuthenticated();
      allow update: if isOwner(resource.data.userId) || isAdmin();
      allow delete: if isAdmin();
    }
  }
}
```

## Índices Compuestos

Para optimizar las consultas más frecuentes, se recomienda crear los siguientes índices compuestos en Firestore:

1. **Productos por Categoría y Descuento**:
   - Colección: `inventory`
   - Campos: `productId` ASC, `discountPercentage` DESC

2. **Productos por Ubicación**:
   - Colección: `branches`
   - Campos: `coordinates` (geohash), `status` ASC

3. **Inventario por Fecha de Vencimiento**:
   - Colección: `inventory`
   - Campos: `pharmacyId` ASC, `expirationDate` ASC, `status` ASC

4. **Tickets por Usuario y Estado**:
   - Colección: `tickets`
   - Campos: `userId` ASC, `status` ASC, `createdAt` DESC

5. **Tickets por Farmacia y Estado**:
   - Colección: `tickets`
   - Campos: `pharmacyId` ASC, `status` ASC, `createdAt` DESC

## Validación de Datos

Para garantizar la integridad de los datos, se implementarán las siguientes reglas de validación:

1. **Validación de Usuarios**:
   - Email debe ser único y válido
   - Tipo de usuario debe ser uno de los valores permitidos
   - Número de teléfono debe tener formato válido para Chile

2. **Validación de Farmacias**:
   - Nombre y RUT deben ser únicos
   - Documentos de verificación obligatorios
   - Coordenadas geográficas válidas

3. **Validación de Productos**:
   - Nombre y descripción obligatorios
   - Al menos una categoría asignada
   - Al menos una imagen principal

4. **Validación de Inventario**:
   - Precio original debe ser mayor a cero
   - Descuento entre 0 y 100%
   - Fecha de vencimiento debe ser futura al momento de creación

5. **Validación de Tickets**:
   - Al menos un producto en el ticket
   - Total debe coincidir con la suma de subtotales
   - Fecha de expiración no mayor a 48 horas desde creación

## Consideraciones de Escalabilidad

1. **Colecciones vs. Subcolecciones**:
   - Se han diseñado como colecciones principales para facilitar consultas globales
   - Para datos muy relacionados y de gran volumen, considerar subcolecciones en el futuro

2. **Denormalización Estratégica**:
   - Se duplican algunos datos (como nombres) para reducir lecturas
   - Los campos calculados (como precios con descuento) se almacenan para evitar cálculos repetitivos

3. **Límites de Firestore**:
   - Documentos limitados a 1MB
   - Máximo 20,000 entidades en consultas compuestas
   - Considerar paginación para resultados grandes

4. **Estrategia de Particiones**:
   - Para datos de alta frecuencia (como tickets), considerar particiones por fecha
   - Para datos geográficos, utilizar geohash para optimizar consultas por ubicación
