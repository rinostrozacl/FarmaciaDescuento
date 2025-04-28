# Integración con Servicios Externos - FarmaciaDescuento

Este documento detalla la configuración e integración de servicios externos para el proyecto FarmaciaDescuento.

## 1. Google Maps Platform

### Configuración y Credenciales

1. **Obtención de API Key**:
   - Crear proyecto en [Google Cloud Console](https://console.cloud.google.com/)
   - Habilitar APIs: Maps JavaScript API, Geocoding API, Places API
   - Crear credenciales de API Key con restricciones por dominio y referencia
   - Almacenar la API Key en variables de entorno

```bash
# .env.local
GOOGLE_MAPS_API_KEY=AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6
```

2. **Restricciones de Seguridad**:
   - Restringir la API Key por dominio
   - Limitar a las APIs necesarias
   - Configurar cuotas de uso
   - Monitorear uso para detectar anomalías

### Integración en Nuxt 3

1. **Instalación de Dependencias**:

```bash
npm install @googlemaps/js-api-loader vue3-google-map
```

2. **Configuración del Plugin**:

```typescript
// plugins/google-maps.ts
import { defineNuxtPlugin } from '#app'
import { Loader } from '@googlemaps/js-api-loader'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  const loader = new Loader({
    apiKey: config.public.googleMapsApiKey,
    version: 'weekly',
    libraries: ['places']
  })
  
  nuxtApp.provide('googleMapsLoader', loader)
})
```

3. **Componente de Mapa**:

```vue
<!-- components/GoogleMap.vue -->
<template>
  <div class="google-map-container" ref="mapContainer"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  center: {
    type: Object,
    default: () => ({ lat: -33.4489, lng: -70.6693 }) // Santiago, Chile
  },
  zoom: {
    type: Number,
    default: 13
  },
  markers: {
    type: Array,
    default: () => []
  }
})

const { $googleMapsLoader } = useNuxtApp()
const mapContainer = ref(null)
const map = ref(null)
const googleMarkers = ref([])

onMounted(async () => {
  try {
    const google = await $googleMapsLoader.load()
    
    map.value = new google.maps.Map(mapContainer.value, {
      center: props.center,
      zoom: props.zoom,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      styles: [
        // Estilos personalizados del mapa
      ]
    })
    
    // Agregar marcadores
    addMarkers()
  } catch (error) {
    console.error('Error cargando Google Maps:', error)
  }
})

const addMarkers = () => {
  // Limpiar marcadores existentes
  googleMarkers.value.forEach(marker => marker.setMap(null))
  googleMarkers.value = []
  
  // Agregar nuevos marcadores
  props.markers.forEach(markerData => {
    const marker = new google.maps.Marker({
      position: { lat: markerData.lat, lng: markerData.lng },
      map: map.value,
      title: markerData.title,
      icon: markerData.icon || null
    })
    
    // Agregar infowindow si hay contenido
    if (markerData.content) {
      const infowindow = new google.maps.InfoWindow({
        content: markerData.content
      })
      
      marker.addListener('click', () => {
        infowindow.open(map.value, marker)
      })
    }
    
    googleMarkers.value.push(marker)
  })
}
</script>

<style scoped>
.google-map-container {
  width: 100%;
  height: 400px;
  border-radius: var(--border-radius);
}
</style>
```

### Funcionalidades Implementadas

1. **Geocodificación**:
   - Convertir direcciones a coordenadas
   - Autocompletar direcciones
   - Validar direcciones ingresadas

2. **Búsqueda por Proximidad**:
   - Filtrar farmacias por distancia
   - Mostrar productos disponibles cerca del usuario
   - Calcular rutas a farmacias

3. **Visualización de Datos**:
   - Mapa de farmacias con marcadores personalizados
   - Clustering para múltiples farmacias
   - Infowindows con detalles de farmacia

## 2. Resend (Email Transaccional)

### Configuración y Credenciales

1. **Creación de Cuenta y API Key**:
   - Registrarse en [Resend](https://resend.com)
   - Verificar dominio `farmaciadescuento.cl`
   - Crear API Key y almacenarla en variables de entorno

```bash
# .env.local
RESEND_API_KEY=re_1234567890abcdefghijklmnopqrstuvwxyz
```

2. **Configuración de Dominio**:
   - Configurar registros DNS para verificación de dominio
   - Configurar DKIM, SPF y DMARC para mejorar entregabilidad
   - Configurar dirección de remitente: `no-reply@farmaciadescuento.cl`

### Integración en Firebase Functions

1. **Instalación de Dependencias**:

```bash
cd functions
npm install resend
```

2. **Servicio de Email**:

```typescript
// functions/src/services/email.ts
import { Resend } from 'resend';
import * as functions from 'firebase-functions';

const resend = new Resend(functions.config().resend.api_key);

interface EmailData {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
  }>;
}

export async function sendEmail(data: EmailData) {
  try {
    const response = await resend.emails.send({
      from: 'FarmaciaDescuento <no-reply@farmaciadescuento.cl>',
      to: data.to,
      subject: data.subject,
      html: data.html,
      text: data.text,
      cc: data.cc,
      bcc: data.bcc,
      reply_to: data.replyTo,
      attachments: data.attachments
    });
    
    return response;
  } catch (error) {
    console.error('Error enviando email:', error);
    throw error;
  }
}
```

### Plantillas de Email

1. **Plantilla Base**:

```typescript
// functions/src/templates/base.ts
export function baseTemplate(content: string, title: string = 'FarmaciaDescuento') {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #4ECDC4;
          padding: 20px;
          text-align: center;
        }
        .logo {
          max-width: 150px;
        }
        .content {
          padding: 20px;
          background-color: #ffffff;
        }
        .footer {
          background-color: #f4f4f4;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #888888;
        }
        .button {
          display: inline-block;
          background-color: #4ECDC4;
          color: #ffffff;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 4px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://storage.googleapis.com/farmaciadescuento.appspot.com/branding/logo.png" alt="FarmaciaDescuento" class="logo">
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} FarmaciaDescuento. Todos los derechos reservados.</p>
          <p>Si no deseas recibir más correos, <a href="{{unsubscribe_url}}">haz clic aquí</a>.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
```

2. **Plantillas Específicas**:

```typescript
// functions/src/templates/ticket.ts
import { baseTemplate } from './base';

export function ticketCreatedTemplate(data: {
  userName: string;
  ticketCode: string;
  ticketUrl: string;
  expirationDate: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  pharmacyName: string;
  pharmacyAddress: string;
}) {
  const itemsList = data.items.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toLocaleString('es-CL')}</td>
      <td>$${(item.quantity * item.price).toLocaleString('es-CL')}</td>
    </tr>
  `).join('');
  
  const content = `
    <h2>¡Ticket Creado Exitosamente!</h2>
    <p>Hola ${data.userName},</p>
    <p>Tu ticket de descuento ha sido generado correctamente. Aquí están los detalles:</p>
    
    <p><strong>Código:</strong> ${data.ticketCode}</p>
    <p><strong>Farmacia:</strong> ${data.pharmacyName}</p>
    <p><strong>Dirección:</strong> ${data.pharmacyAddress}</p>
    <p><strong>Fecha de Expiración:</strong> ${data.expirationDate}</p>
    
    <h3>Productos:</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="text-align: left; border-bottom: 1px solid #ddd; padding: 8px;">Producto</th>
          <th style="text-align: left; border-bottom: 1px solid #ddd; padding: 8px;">Cantidad</th>
          <th style="text-align: left; border-bottom: 1px solid #ddd; padding: 8px;">Precio</th>
          <th style="text-align: left; border-bottom: 1px solid #ddd; padding: 8px;">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${itemsList}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="text-align: right; padding: 8px;"><strong>Total:</strong></td>
          <td style="padding: 8px;"><strong>$${data.total.toLocaleString('es-CL')}</strong></td>
        </tr>
      </tfoot>
    </table>
    
    <p>Presenta este ticket en la farmacia seleccionada antes de la fecha de expiración para obtener tus productos con descuento.</p>
    
    <a href="${data.ticketUrl}" class="button">Ver Ticket</a>
    
    <p>¡Gracias por usar FarmaciaDescuento!</p>
  `;
  
  return baseTemplate(content, 'Tu Ticket de Descuento - FarmaciaDescuento');
}
```

### Tipos de Emails

1. **Emails Transaccionales**:
   - Confirmación de registro
   - Verificación de email
   - Restablecimiento de contraseña
   - Creación de ticket
   - Recordatorio de ticket por vencer
   - Confirmación de ticket canjeado

2. **Emails de Marketing** (opcional):
   - Nuevos productos con descuento
   - Promociones especiales
   - Newsletter mensual

## 3. Pasarelas de Pago (Opcional)

Si se implementa una versión premium o pagos para farmacias:

### Integración con Transbank (Chile)

1. **Configuración**:
   - Crear cuenta en [Transbank](https://www.transbank.cl/)
   - Obtener credenciales de integración
   - Configurar ambiente de desarrollo/producción

2. **Implementación Webpay Plus**:

```typescript
// functions/src/services/payment.ts
import WebpayPlus from 'transbank-sdk/lib/webpay_plus';
import { Options, IntegrationApiKeys, Environment } from 'transbank-sdk';
import * as functions from 'firebase-functions';

// Configuración según ambiente
const environment = functions.config().environment.mode === 'production' 
  ? Environment.Production 
  : Environment.Integration;

// Credenciales
const commerceCode = functions.config().transbank.commerce_code;
const apiKey = functions.config().transbank.api_key;

// Configurar SDK
const options = new Options(commerceCode, apiKey, environment);
WebpayPlus.configureForIntegration(IntegrationApiKeys.WEBPAY);

export async function createTransaction(amount: number, buyOrder: string, returnUrl: string, sessionId: string) {
  try {
    const response = await WebpayPlus.Transaction.create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    );
    
    return {
      url: response.url,
      token: response.token
    };
  } catch (error) {
    console.error('Error creando transacción:', error);
    throw error;
  }
}

export async function commitTransaction(token: string) {
  try {
    const response = await WebpayPlus.Transaction.commit(token);
    return response;
  } catch (error) {
    console.error('Error confirmando transacción:', error);
    throw error;
  }
}
```

## 4. Firebase Cloud Messaging (FCM)

### Configuración para Notificaciones Push

1. **Configuración en Firebase Console**:
   - Habilitar Firebase Cloud Messaging
   - Configurar certificados para iOS (si aplica)
   - Configurar proyecto para Android (si aplica)

2. **Service Worker para Web**:

```javascript
// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6",
  authDomain: "farmaciadescuento.firebaseapp.com",
  projectId: "farmaciadescuento",
  storageBucket: "farmaciadescuento.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:a1b2c3d4e5f6g7h8i9j0"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Recibido mensaje en background:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    data: payload.data
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Manejar clic en notificación
self.addEventListener('notificationclick', (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();
  
  // Navegar a URL específica al hacer clic
  if (event.notification.data && event.notification.data.url) {
    const urlToOpen = new URL(event.notification.data.url, self.location.origin);
    
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(windowClients => {
        // Verificar si ya hay una ventana abierta y navegar a la URL
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          if (client.url === urlToOpen.href && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Si no hay ventana abierta, abrir una nueva
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen.href);
        }
      })
    );
  }
});
```

3. **Servicio de Notificaciones**:

```typescript
// functions/src/services/notifications.ts
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

interface NotificationData {
  userId: string;
  title: string;
  body: string;
  data?: Record<string, string>;
  imageUrl?: string;
}

export async function sendPushNotification(notification: NotificationData) {
  try {
    // Obtener tokens FCM del usuario
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(notification.userId)
      .get();
    
    if (!userDoc.exists) {
      throw new Error(`Usuario ${notification.userId} no encontrado`);
    }
    
    const userData = userDoc.data();
    const fcmTokens = userData.fcmTokens || [];
    
    if (fcmTokens.length === 0) {
      console.log(`Usuario ${notification.userId} no tiene tokens FCM registrados`);
      return { success: false, reason: 'no_tokens' };
    }
    
    // Construir mensaje
    const message = {
      notification: {
        title: notification.title,
        body: notification.body,
        imageUrl: notification.imageUrl
      },
      data: notification.data || {},
      tokens: fcmTokens
    };
    
    // Enviar mensaje
    const response = await admin.messaging().sendMulticast(message);
    
    // Limpiar tokens inválidos
    if (response.failureCount > 0) {
      const invalidTokens = [];
      
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          invalidTokens.push(fcmTokens[idx]);
        }
      });
      
      if (invalidTokens.length > 0) {
        // Actualizar tokens del usuario eliminando los inválidos
        const validTokens = fcmTokens.filter(token => !invalidTokens.includes(token));
        
        await admin.firestore()
          .collection('users')
          .doc(notification.userId)
          .update({
            fcmTokens: validTokens
          });
      }
    }
    
    return {
      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount
    };
  } catch (error) {
    console.error('Error enviando notificación push:', error);
    throw error;
  }
}
```

## 5. Integración con Sentry

### Configuración para Monitoreo de Errores

1. **Creación de Proyecto en Sentry**:
   - Registrarse en [Sentry](https://sentry.io)
   - Crear proyecto para JavaScript/Vue
   - Obtener DSN y configurar variables de entorno

```bash
# .env.local
SENTRY_DSN=https://abcdef1234567890@o123456.ingest.sentry.io/1234567
```

2. **Integración en Nuxt 3**:

```bash
npm install @sentry/vue @sentry/tracing
```

```typescript
// plugins/sentry.ts
import { defineNuxtPlugin } from '#app'
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const { vueApp } = nuxtApp
  
  if (config.public.sentryDsn) {
    Sentry.init({
      app: vueApp,
      dsn: config.public.sentryDsn,
      integrations: [
        new BrowserTracing({
          routingInstrumentation: Sentry.vueRouterInstrumentation(nuxtApp.$router),
          tracingOrigins: ['localhost', 'farmaciadescuento.cl', /^\//]
        })
      ],
      tracesSampleRate: 1.0,
      environment: config.public.environment || 'development',
      beforeSend(event) {
        // Sanitizar datos sensibles si es necesario
        return event;
      }
    })
  }
})
```

## 6. Integración con Google Analytics

### Configuración para Análisis de Uso

1. **Creación de Propiedad en Google Analytics**:
   - Crear cuenta/propiedad en [Google Analytics](https://analytics.google.com/)
   - Obtener ID de medición (G-XXXXXXXXXX)
   - Configurar variables de entorno

```bash
# .env.local
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

2. **Integración en Nuxt 3**:

```bash
npm install @nuxtjs/google-analytics
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/google-analytics'
  ],
  
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID
  }
})
```

## Consideraciones de Seguridad

### Protección de Claves API

1. **Variables de Entorno**:
   - Nunca incluir claves API directamente en el código
   - Utilizar variables de entorno para todas las claves
   - Diferentes valores para desarrollo y producción

2. **Restricciones de API**:
   - Limitar por dominio/IP cuando sea posible
   - Configurar cuotas de uso
   - Monitorear uso para detectar anomalías

3. **Rotación de Claves**:
   - Programar rotación periódica de claves
   - Procedimiento para actualización de emergencia

### Manejo de Datos Sensibles

1. **Sanitización de Datos**:
   - Sanitizar datos antes de enviarlos a servicios externos
   - No incluir información personal identificable (PII) en logs

2. **Encriptación**:
   - Utilizar HTTPS para todas las comunicaciones
   - Encriptar datos sensibles antes de almacenarlos

## Implementación y Despliegue

### Configuración en CI/CD

1. **Variables de Entorno en GitHub Actions**:
   - Configurar secretos para todas las claves API
   - Diferentes valores para staging y producción

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches:
      - main
      - production

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      # ...
      - name: Set Environment Variables
        run: |
          echo "GOOGLE_MAPS_API_KEY=${{ secrets.GOOGLE_MAPS_API_KEY }}" >> .env
          echo "RESEND_API_KEY=${{ secrets.RESEND_API_KEY }}" >> .env
          echo "SENTRY_DSN=${{ secrets.SENTRY_DSN }}" >> .env
          echo "GOOGLE_ANALYTICS_ID=${{ secrets.GOOGLE_ANALYTICS_ID }}" >> .env
      # ...
```

### Documentación para Desarrolladores

1. **Guía de Integración**:
   - Documentación detallada para cada servicio
   - Ejemplos de uso
   - Procedimientos de solución de problemas

2. **Monitoreo y Alertas**:
   - Configuración de alertas para errores
   - Dashboard de uso de servicios externos
   - Procedimientos de escalamiento
