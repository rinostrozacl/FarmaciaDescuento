# Configuración Técnica de Firebase - FarmaciaDescuento

Este documento detalla la configuración técnica necesaria para implementar Firebase en el proyecto FarmaciaDescuento.

## Configuración del Proyecto Firebase

### 1. Creación del Proyecto

1. Acceder a la [Consola de Firebase](https://console.firebase.google.com/)
2. Crear un nuevo proyecto con el nombre "FarmaciaDescuento"
3. Configurar Google Analytics (opcional pero recomendado)
4. Seleccionar la cuenta de Google Analytics
5. Aceptar los términos y condiciones

### 2. Configuración de la Aplicación Web

1. En la consola de Firebase, hacer clic en "Agregar aplicación" y seleccionar el icono web
2. Registrar la aplicación con el nombre "FarmaciaDescuento Web"
3. Marcar la opción "Configurar también Firebase Hosting"
4. Copiar la configuración generada (apiKey, authDomain, etc.)

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8TiGob4wdub_gTYb6A2knN6c_O_RtYhI",
  authDomain: "descuentofarmacia.firebaseapp.com",
  projectId: "descuentofarmacia",
  storageBucket: "descuentofarmacia.firebasestorage.app",
  messagingSenderId: "865406384720",
  appId: "1:865406384720:web:73e0b19d242df247a96f55",
  measurementId: "G-GBGS31NF50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```

## Servicios de Firebase a Configurar

### 1. Firebase Authentication

#### Métodos de Autenticación a Habilitar

- Email/Contraseña
- Google
- Teléfono (para verificación en dos pasos)

#### Configuración de Plantillas de Email

1. Personalizar las plantillas para:
   - Verificación de email
   - Restablecimiento de contraseña
   - Cambio de email
   - Verificación de inicio de sesión

#### Configuración de Dominios Autorizados

1. Agregar los dominios desde los cuales se permitirá la autenticación:
   - `localhost` (desarrollo)
   - `farmaciadescuento.web.app` (producción)
   - Dominio personalizado (cuando se configure)

### 2. Firestore Database

#### Configuración Inicial

1. Crear una base de datos en modo producción
2. Seleccionar la ubicación más cercana a Chile (us-east1 o southamerica-east1)
3. Iniciar con las reglas de seguridad básicas

#### Reglas de Seguridad

Implementar las reglas definidas en el documento de estructura de datos:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Las reglas detalladas se encuentran en el documento de estructura de datos
  }
}
```

#### Índices Compuestos

Crear los índices compuestos recomendados en el documento de estructura de datos:

1. Productos por Categoría y Descuento
2. Productos por Ubicación
3. Inventario por Fecha de Vencimiento
4. Tickets por Usuario y Estado
5. Tickets por Farmacia y Estado

### 3. Firebase Storage

#### Configuración Inicial

1. Inicializar Firebase Storage
2. Seleccionar la misma ubicación que Firestore

#### Estructura de Carpetas

```
farmaciadescuento-storage/
├── users/
│   └── {userId}/
│       ├── profile.jpg
│       └── documents/
├── pharmacies/
│   └── {pharmacyId}/
│       ├── logo.jpg
│       ├── cover.jpg
│       └── verification/
├── products/
│   └── {productId}/
│       ├── main.jpg
│       └── gallery/
├── categories/
│   └── {categoryId}.jpg
├── tickets/
│   └── {ticketId}/
│       └── qr.png
└── reports/
    └── {reportId}.pdf
```

#### Reglas de Seguridad

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Regla por defecto: denegar todo
    match /{allPaths=**} {
      allow read, write: if false;
    }

    // Perfiles de usuario
    match /users/{userId}/{allImages=**} {
      allow read: if true; // Imágenes de perfil públicas
      allow write: if request.auth.uid == userId || isAdmin();
    }

    // Imágenes de farmacias
    match /pharmacies/{pharmacyId}/{allImages=**} {
      allow read: if true; // Imágenes de farmacias públicas
      allow write: if isPharmacyOwner(pharmacyId) || isAdmin();
    }

    // Imágenes de productos
    match /products/{productId}/{allImages=**} {
      allow read: if true; // Imágenes de productos públicas
      allow write: if isProductOwner(productId) || isAdmin();
    }

    // Imágenes de categorías
    match /categories/{anyImage=**} {
      allow read: if true; // Imágenes de categorías públicas
      allow write: if isAdmin();
    }

    // QR de tickets
    match /tickets/{ticketId}/{anyImage=**} {
      allow read: if isTicketOwner(ticketId) ||
                   isTicketPharmacy(ticketId) ||
                   isAdmin();
      allow write: if isAdmin();
    }

    // Reportes
    match /reports/{reportId=**} {
      allow read: if isReportOwner(reportId) || isAdmin();
      allow write: if isAdmin();
    }

    // Funciones de utilidad
    function isAdmin() {
      return request.auth != null &&
        firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.type == 'admin';
    }

    function isPharmacyOwner(pharmacyId) {
      return request.auth != null &&
        firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.pharmacyData.pharmacyId == pharmacyId;
    }

    function isProductOwner(productId) {
      let product = firestore.get(/databases/(default)/documents/products/$(productId));
      return request.auth != null &&
        firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.pharmacyData.pharmacyId == product.data.pharmacyId;
    }

    function isTicketOwner(ticketId) {
      let ticket = firestore.get(/databases/(default)/documents/tickets/$(ticketId));
      return request.auth != null && request.auth.uid == ticket.data.userId;
    }

    function isTicketPharmacy(ticketId) {
      let ticket = firestore.get(/databases/(default)/documents/tickets/$(ticketId));
      return request.auth != null &&
        firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.pharmacyData.pharmacyId == ticket.data.pharmacyId;
    }

    function isReportOwner(reportId) {
      let report = firestore.get(/databases/(default)/documents/reports/$(reportId));
      return request.auth != null &&
        (report.data.pharmacyId == null ||
         firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.pharmacyData.pharmacyId == report.data.pharmacyId);
    }
  }
}
```

### 4. Firebase Functions

#### Configuración Inicial

1. Inicializar Firebase Functions con TypeScript
2. Seleccionar la misma ubicación que Firestore

#### Funciones a Implementar

1. **Gestión de Tickets**:

   - `createTicket`: Crear un nuevo ticket y generar QR
   - `validateTicket`: Validar un ticket en farmacia
   - `expireTickets`: Función programada para expirar tickets antiguos

2. **Notificaciones**:

   - `sendTicketReminder`: Enviar recordatorio antes de expiración
   - `notifyNewProducts`: Notificar sobre nuevos productos de interés
   - `notifyPriceDrops`: Notificar sobre bajadas de precio

3. **Reportes**:

   - `generateDailyReport`: Generar reportes diarios
   - `generatePharmacyReport`: Generar reportes para farmacias

4. **Procesamiento de Imágenes**:

   - `resizeProductImage`: Redimensionar imágenes de productos
   - `generateThumbnails`: Generar miniaturas para galería

5. **Integración con Servicios Externos**:
   - `processPayment`: Integración con pasarelas de pago
   - `sendEmail`: Envío de correos transaccionales

#### Ejemplo de Función (TypeScript)

```typescript
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as QRCode from "qrcode";
import { Storage } from "@google-cloud/storage";

admin.initializeApp();
const db = admin.firestore();
const storage = new Storage();

export const createTicket = functions
  .region("southamerica-east1")
  .https.onCall(async (data, context) => {
    // Verificar autenticación
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "El usuario debe estar autenticado para crear un ticket."
      );
    }

    const userId = context.auth.uid;
    const { items, pharmacyId, branchId } = data;

    // Validar datos de entrada
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "El ticket debe contener al menos un producto."
      );
    }

    try {
      // Calcular total
      let total = 0;
      const ticketItems = [];

      for (const item of items) {
        // Obtener información del inventario
        const inventoryRef = db.collection("inventory").doc(item.inventoryId);
        const inventoryDoc = await inventoryRef.get();

        if (!inventoryDoc.exists) {
          throw new functions.https.HttpsError(
            "not-found",
            `Producto no encontrado: ${item.inventoryId}`
          );
        }

        const inventoryData = inventoryDoc.data();

        // Verificar stock
        if (inventoryData.stock < item.quantity) {
          throw new functions.https.HttpsError(
            "failed-precondition",
            `Stock insuficiente para ${inventoryData.productName}`
          );
        }

        // Agregar item al ticket
        const subtotal = inventoryData.discountedPrice * item.quantity;
        total += subtotal;

        ticketItems.push({
          productId: inventoryData.productId,
          inventoryId: item.inventoryId,
          name: inventoryData.productName,
          quantity: item.quantity,
          unitPrice: inventoryData.discountedPrice,
          subtotal,
        });

        // Actualizar stock
        await inventoryRef.update({
          stock: admin.firestore.FieldValue.increment(-item.quantity),
          salesCount: admin.firestore.FieldValue.increment(item.quantity),
        });
      }

      // Generar código único
      const ticketCode = `TKT${Date.now().toString().slice(-6)}${Math.floor(
        Math.random() * 1000
      )}`;

      // Crear ticket en Firestore
      const ticketRef = db.collection("tickets").doc();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 48); // Expira en 48 horas

      const ticketData = {
        id: ticketRef.id,
        userId,
        pharmacyId,
        branchId,
        code: ticketCode,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        expiresAt: admin.firestore.Timestamp.fromDate(expiresAt),
        redeemedAt: null,
        status: "active",
        items: ticketItems,
        total,
        deviceInfo: {
          ip: context.rawRequest.ip,
          userAgent: context.rawRequest.headers["user-agent"] || "",
        },
      };

      await ticketRef.set(ticketData);

      // Generar QR
      const qrData = JSON.stringify({
        ticketId: ticketRef.id,
        code: ticketCode,
        expiresAt: expiresAt.toISOString(),
      });

      const qrImage = await QRCode.toDataURL(qrData);
      const qrBuffer = Buffer.from(qrImage.split(",")[1], "base64");

      // Guardar QR en Storage
      const bucket = storage.bucket("farmaciadescuento.appspot.com");
      const file = bucket.file(`tickets/${ticketRef.id}/qr.png`);
      await file.save(qrBuffer, {
        metadata: {
          contentType: "image/png",
        },
      });

      // Obtener URL del QR
      const [url] = await file.getSignedUrl({
        action: "read",
        expires: "03-01-2500", // Fecha lejana
      });

      // Actualizar ticket con URL del QR
      await ticketRef.update({
        qrCode: url,
      });

      // Programar notificación de recordatorio
      const reminderTime = new Date();
      reminderTime.setHours(reminderTime.getHours() + 24); // 24 horas antes de expirar

      await db.collection("notifications").add({
        userId,
        type: "ticket_expiring",
        title: "Tu ticket está por vencer",
        body: `Tu ticket #${ticketCode} vence en 24 horas. ¡No olvides canjearlo!`,
        data: {
          ticketId: ticketRef.id,
          pharmacyId,
          expiresAt: admin.firestore.Timestamp.fromDate(expiresAt),
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        sentAt: null,
        readAt: null,
        status: "pending",
        channels: ["push", "email"],
        action: {
          type: "open_ticket",
          payload: { ticketId: ticketRef.id },
        },
        scheduledFor: admin.firestore.Timestamp.fromDate(reminderTime),
      });

      return {
        success: true,
        ticketId: ticketRef.id,
        code: ticketCode,
        expiresAt: expiresAt.toISOString(),
        qrCode: url,
      };
    } catch (error) {
      console.error("Error al crear ticket:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Error al crear el ticket. Por favor, inténtalo de nuevo."
      );
    }
  });
```

### 5. Firebase Hosting

#### Configuración Inicial

1. Inicializar Firebase Hosting
2. Configurar el directorio público como `dist` (directorio de salida de Nuxt)

#### Configuración de firebase.json

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=604800"
          }
        ]
      }
    ]
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "storage": {
    "rules": "storage.rules"
  },
  "functions": {
    "predeploy": [
      "npm --prefix \"$RESOURCE_DIR\" run lint",
      "npm --prefix \"$RESOURCE_DIR\" run build"
    ],
    "source": "functions"
  }
}
```

### 6. Firebase Cloud Messaging (FCM)

#### Configuración Inicial

1. Habilitar Firebase Cloud Messaging
2. Configurar las credenciales del servidor (VAPID key)

#### Integración con Service Worker

```javascript
// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6",
  authDomain: "farmaciadescuento.firebaseapp.com",
  projectId: "farmaciadescuento",
  storageBucket: "farmaciadescuento.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:a1b2c3d4e5f6g7h8i9j0",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Recibido mensaje en background:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon-192x192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
```

### 7. Firebase Analytics

#### Configuración Inicial

1. Habilitar Google Analytics para Firebase
2. Configurar eventos personalizados

#### Eventos a Rastrear

- `view_product`: Visualización de productos
- `add_to_cart`: Adición de productos al carrito
- `create_ticket`: Creación de tickets
- `redeem_ticket`: Canje de tickets
- `search`: Búsquedas realizadas
- `filter_products`: Filtrado de productos
- `login`: Inicios de sesión
- `signup`: Registros de usuario
- `view_category`: Visualización de categorías

## Variables de Entorno

### Archivos de Configuración

#### .env.development

```
# Firebase
FIREBASE_API_KEY=AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6
FIREBASE_AUTH_DOMAIN=farmaciadescuento.firebaseapp.com
FIREBASE_PROJECT_ID=farmaciadescuento
FIREBASE_STORAGE_BUCKET=farmaciadescuento.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789012
FIREBASE_APP_ID=1:123456789012:web:a1b2c3d4e5f6g7h8i9j0
FIREBASE_MEASUREMENT_ID=G-ABC123DEF45

# API Keys
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
SENTRY_DSN=your_sentry_dsn

# Configuración
API_BASE_URL=http://localhost:5001/farmaciadescuento/us-central1
MAX_FILE_SIZE=5242880
DEBUG=true
```

#### .env.production

```
# Firebase
FIREBASE_API_KEY=AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6
FIREBASE_AUTH_DOMAIN=farmaciadescuento.firebaseapp.com
FIREBASE_PROJECT_ID=farmaciadescuento
FIREBASE_STORAGE_BUCKET=farmaciadescuento.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789012
FIREBASE_APP_ID=1:123456789012:web:a1b2c3d4e5f6g7h8i9j0
FIREBASE_MEASUREMENT_ID=G-ABC123DEF45

# API Keys
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
SENTRY_DSN=your_sentry_dsn

# Configuración
API_BASE_URL=https://us-central1-farmaciadescuento.cloudfunctions.net
MAX_FILE_SIZE=5242880
DEBUG=false
```

## Seguridad y Buenas Prácticas

### 1. Protección de Claves API

- Nunca incluir claves API directamente en el código
- Utilizar variables de entorno para todas las claves
- Para el frontend, usar Firebase App Check

### 2. Autenticación y Autorización

- Implementar autenticación multifactor para cuentas sensibles
- Utilizar tokens JWT con tiempo de expiración corto
- Validar permisos tanto en el cliente como en el servidor

### 3. Protección de Datos

- Cifrar datos sensibles antes de almacenarlos
- Implementar reglas de validación estrictas
- Realizar copias de seguridad regulares

### 4. Monitoreo y Logging

- Configurar Firebase Crashlytics
- Implementar logging detallado en Firebase Functions
- Configurar alertas para comportamientos anómalos

## Integración con Google Cloud Platform (GCP)

### 1. Google Cloud Run

Para servicios backend adicionales que requieran más recursos:

```bash
# Ejemplo de despliegue de un servicio en Cloud Run
gcloud builds submit --tag gcr.io/farmaciadescuento/api-service
gcloud run deploy api-service --image gcr.io/farmaciadescuento/api-service --platform managed
```

### 2. Google Cloud Storage

Para almacenamiento de archivos grandes o backups:

```javascript
// Ejemplo de configuración para backups automáticos
const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
const bucket = storage.bucket("farmaciadescuento-backups");

// Función para crear backup diario de Firestore
exports.createFirestoreBackup = functions.pubsub
  .schedule("0 0 * * *")
  .onRun(async () => {
    const projectId = process.env.GCP_PROJECT || "farmaciadescuento";
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = `gs://farmaciadescuento-backups/firestore/${timestamp}`;

    try {
      await firestore.runCommand(
        "projects/" + projectId + "/databases/(default):exportDocuments",
        {
          outputUriPrefix: backupPath,
          collectionIds: [], // Vacío para exportar todas las colecciones
        }
      );

      console.log(`Backup creado en: ${backupPath}`);
      return null;
    } catch (error) {
      console.error("Error al crear backup:", error);
      throw error;
    }
  });
```

### 3. Google Cloud Scheduler

Para tareas programadas:

```bash
# Ejemplo de configuración de una tarea programada
gcloud scheduler jobs create http expire-tickets \
  --schedule="0 0 * * *" \
  --uri="https://us-central1-farmaciadescuento.cloudfunctions.net/expireTickets" \
  --http-method=POST \
  --headers="Content-Type=application/json" \
  --message-body='{"secretKey": "your-secret-key"}'
```

## Despliegue y CI/CD

### 1. Configuración de GitHub Actions

Crear archivo `.github/workflows/firebase-deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches:
      - main
      - production

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "16"

      - name: Install Dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build
        env:
          FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
          FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
          FIREBASE_STORAGE_BUCKET: ${{ secrets.FIREBASE_STORAGE_BUCKET }}
          FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.FIREBASE_MESSAGING_SENDER_ID }}
          FIREBASE_APP_ID: ${{ secrets.FIREBASE_APP_ID }}
          FIREBASE_MEASUREMENT_ID: ${{ secrets.FIREBASE_MEASUREMENT_ID }}
          GOOGLE_MAPS_API_KEY: ${{ secrets.GOOGLE_MAPS_API_KEY }}
          SENTRY_DSN: ${{ secrets.SENTRY_DSN }}

      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: farmaciadescuento
```

### 2. Configuración de Firebase CLI

```bash
# Instalación global de Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicialización del proyecto
firebase init

# Despliegue manual
firebase deploy
```

## Recursos y Documentación

- [Documentación oficial de Firebase](https://firebase.google.com/docs)
- [Guía de Firebase para Nuxt.js](https://firebase.nuxtjs.org/)
- [Mejores prácticas de seguridad de Firebase](https://firebase.google.com/docs/rules/basics#best_practices)
- [Documentación de Google Cloud Platform](https://cloud.google.com/docs)
- [Firebase Extensions](https://firebase.google.com/products/extensions) - Soluciones preconfiguradas para casos de uso comunes
