# Pruebas y Despliegue - FarmaciaDescuento

## Índice

1. [Estrategia de Pruebas](#estrategia-de-pruebas)
2. [Pipeline de CI/CD](#pipeline-de-cicd)
3. [Configuración de Hosting](#configuración-de-hosting)
4. [Monitoreo y Seguridad](#monitoreo-y-seguridad)

---

Este documento define la estrategia de pruebas y el proceso de despliegue para el proyecto FarmaciaDescuento.

## 1. Estrategia de Pruebas

### Tipos de Pruebas

#### 1.1 Pruebas Unitarias

Las pruebas unitarias verifican el correcto funcionamiento de componentes y funciones individuales.

**Herramientas**:
- **Vitest**: Framework de pruebas unitarias compatible con Nuxt 3
- **Vue Test Utils**: Utilidades para probar componentes Vue

**Configuración**:

```javascript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'test/', '**/*.d.ts', '**/*.test.ts', '**/*.spec.ts']
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
```

**Ejemplo de Prueba Unitaria**:

```javascript
// tests/composables/useDiscount.test.ts
import { describe, it, expect } from 'vitest';
import { useDiscount } from '@/composables/useDiscount';

describe('useDiscount', () => {
  it('calcula correctamente el precio con descuento', () => {
    const { calculateDiscountedPrice } = useDiscount();
    
    const result = calculateDiscountedPrice(5990, 40, new Date('2025-05-24'));
    
    expect(result.discountedPrice).toBe(3594);
    expect(result.finalDiscountPercentage).toBe(40);
  });
  
  it('aplica descuento adicional para productos próximos a vencer', () => {
    const { calculateDiscountedPrice } = useDiscount();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const result = calculateDiscountedPrice(5990, 40, tomorrow);
    
    expect(result.finalDiscountPercentage).toBe(50); // 40% + 10% adicional
    expect(result.additionalDiscount).toBe(10);
  });
});
```

#### 1.2 Pruebas de Integración

Las pruebas de integración verifican la correcta interacción entre múltiples componentes o servicios.

**Herramientas**:
- **Vitest**: Para pruebas de integración de componentes
- **Firebase Emulators**: Para pruebas con Firestore, Auth y Functions

**Configuración de Firebase Emulators**:

```javascript
// firebase.json
{
  "emulators": {
    "auth": {
      "port": 9099
    },
    "functions": {
      "port": 5001
    },
    "firestore": {
      "port": 8080
    },
    "storage": {
      "port": 9199
    },
    "ui": {
      "enabled": true,
      "port": 4000
    }
  }
}
```

**Ejemplo de Prueba de Integración**:

```javascript
// tests/integration/auth.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { useAuth } from '@/composables/useAuth';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-farmaciadescuento',
    firestore: {
      host: 'localhost',
      port: 8080
    }
  });
  
  const auth = getAuth();
  connectAuthEmulator(auth, 'http://localhost:9099');
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe('Autenticación', () => {
  it('registra un nuevo usuario correctamente', async () => {
    const { register } = useAuth();
    
    const result = await register({
      email: 'test@example.com',
      password: 'Test123!',
      displayName: 'Usuario Test',
      type: 'client'
    });
    
    expect(result.user).toBeDefined();
    expect(result.user.email).toBe('test@example.com');
    
    // Verificar que se creó el documento en Firestore
    const userDoc = await testEnv.firestore()
      .collection('users')
      .doc(result.user.uid)
      .get();
    
    expect(userDoc.exists).toBe(true);
    expect(userDoc.data().type).toBe('client');
  });
});
```

#### 1.3 Pruebas End-to-End (E2E)

Las pruebas E2E verifican el funcionamiento completo de la aplicación simulando interacciones de usuario reales.

**Herramientas**:
- **Cypress**: Framework de pruebas E2E
- **Firebase Emulators**: Para simular el backend

**Configuración**:

```javascript
// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    experimentalStudio: true
  },
  env: {
    apiUrl: 'http://localhost:5001/farmaciadescuento/us-central1'
  }
});
```

**Ejemplo de Prueba E2E**:

```javascript
// cypress/e2e/checkout.cy.ts
describe('Proceso de checkout', () => {
  beforeEach(() => {
    // Iniciar sesión antes de cada prueba
    cy.login('cliente@example.com', 'password123');
    
    // Limpiar carrito
    cy.clearCart();
  });
  
  it('permite crear un ticket de descuento', () => {
    // Navegar a página de producto
    cy.visit('/producto/paracetamol-500mg');
    
    // Seleccionar farmacia
    cy.get('[data-test="pharmacy-option"]').first().click();
    
    // Añadir al carrito
    cy.get('[data-test="add-to-cart"]').click();
    
    // Verificar que se agregó al carrito
    cy.get('[data-test="cart-count"]').should('contain', '1');
    
    // Abrir carrito
    cy.get('[data-test="cart-toggle"]').click();
    
    // Proceder al checkout
    cy.get('[data-test="checkout-button"]').click();
    
    // Confirmar creación de ticket
    cy.get('[data-test="confirm-ticket"]').click();
    
    // Verificar que se creó el ticket
    cy.get('[data-test="success-message"]').should('be.visible');
    cy.get('[data-test="ticket-code"]').should('be.visible');
    
    // Verificar que se redirige a la página de tickets
    cy.url().should('include', '/mis-tickets');
  });
});
```

#### 1.4 Pruebas de Rendimiento

Las pruebas de rendimiento evalúan la velocidad, capacidad de respuesta y estabilidad de la aplicación.

**Herramientas**:
- **Lighthouse CI**: Para métricas de rendimiento web
- **Firebase Performance Monitoring**: Para monitoreo en producción

**Configuración de Lighthouse CI**:

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/', 'http://localhost:3000/categoria/analgesicos'],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop'
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', {minScore: 0.8}],
        'categories:accessibility': ['error', {minScore: 0.9}],
        'first-contentful-paint': ['warn', {maxNumericValue: 2000}],
        'interactive': ['warn', {maxNumericValue: 3500}],
        'max-potential-fid': ['warn', {maxNumericValue: 100}]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
```

### Cobertura de Pruebas

Se establece un objetivo mínimo de cobertura de pruebas:

- **Pruebas Unitarias**: 80% de cobertura para funciones y composables críticos
- **Pruebas de Integración**: 70% de cobertura para flujos principales
- **Pruebas E2E**: Cobertura de todos los flujos críticos de usuario

### Automatización de Pruebas

Las pruebas se ejecutarán automáticamente en diferentes etapas:

1. **Pre-commit**: Pruebas unitarias y de linting
2. **CI/CD**: Pruebas unitarias, de integración y E2E
3. **Pre-despliegue**: Pruebas de rendimiento y accesibilidad

## 2. Pipeline de CI/CD

### 2.1 Configuración de GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      - run: npm ci
      - name: Start Firebase Emulators
        run: npx firebase emulators:start --only auth,firestore,functions,storage &
      - run: npm run test:unit
      - run: npm run test:integration
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  e2e:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      - run: npm ci
      - name: Start Firebase Emulators
        run: npx firebase emulators:start --only auth,firestore,functions,storage &
      - name: Build
        run: npm run build
      - name: Start Preview Server
        run: npm run preview &
      - name: Run Cypress
        uses: cypress-io/github-action@v5
        with:
          browser: chrome
          headed: false
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: cypress-screenshots
          path: cypress/screenshots

  lighthouse:
    runs-on: ubuntu-latest
    needs: e2e
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      - run: npm ci
      - name: Build
        run: npm run build
      - name: Start Preview Server
        run: npm run preview &
      - name: Run Lighthouse CI
        run: npx lhci autorun
```

### 2.2 Configuración de Despliegue

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test:unit
      
      - name: Build
        run: npm run build
        env:
          FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
          FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
          FIREBASE_STORAGE_BUCKET: ${{ secrets.FIREBASE_STORAGE_BUCKET }}
          FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.FIREBASE_MESSAGING_SENDER_ID }}
          FIREBASE_APP_ID: ${{ secrets.FIREBASE_APP_ID }}
          GOOGLE_MAPS_API_KEY: ${{ secrets.GOOGLE_MAPS_API_KEY }}
          RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
          SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
      
      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: farmaciadescuento
      
      - name: Deploy Firebase Functions
        run: npx firebase deploy --only functions
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

## 3. Entornos de Despliegue

### 3.1 Entorno de Desarrollo

- **URL**: https://dev.farmaciadescuento.cl
- **Propósito**: Pruebas de desarrollo y QA interno
- **Origen de datos**: Firebase Emulators o proyecto de desarrollo
- **Despliegue**: Automático desde la rama `develop`

### 3.2 Entorno de Staging

- **URL**: https://staging.farmaciadescuento.cl
- **Propósito**: Pruebas de aceptación de usuario (UAT)
- **Origen de datos**: Proyecto de staging con datos de prueba
- **Despliegue**: Manual o automático desde rama `release/*`

### 3.3 Entorno de Producción

- **URL**: https://farmaciadescuento.cl
- **Propósito**: Aplicación en vivo para usuarios finales
- **Origen de datos**: Proyecto de producción
- **Despliegue**: Manual desde rama `main` después de aprobación

## 4. Configuración de Firebase Hosting

### 4.1 Configuración de firebase.json

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
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
    ],
    "cleanUrls": true,
    "trailingSlash": false
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

### 4.2 Configuración de Dominios Personalizados

1. **Verificación de dominio**:
   - Agregar registro TXT en DNS
   - Verificar propiedad en Firebase Console

2. **Configuración de DNS**:
   - Agregar registros A para el dominio principal
   - Agregar registros CNAME para subdominios

3. **Configuración de SSL**:
   - Usar certificados provistos por Firebase
   - Renovación automática

## 5. Monitoreo y Análisis

### 5.1 Firebase Performance Monitoring

Configuración para monitorear métricas clave:

```javascript
// plugins/firebase-performance.ts
import { defineNuxtPlugin } from '#app';
import { getApp } from 'firebase/app';
import { getPerformance, trace } from 'firebase/performance';

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseApp = getApp();
  const perf = getPerformance(firebaseApp);
  
  // Crear trace para navegación entre páginas
  nuxtApp.hook('page:start', () => {
    const pageTrace = trace(perf, 'page_load');
    pageTrace.start();
    
    nuxtApp.hook('page:finish', () => {
      pageTrace.stop();
    });
  });
  
  // Crear trace para operaciones críticas
  const startTrace = (name) => {
    const customTrace = trace(perf, name);
    customTrace.start();
    return customTrace;
  };
  
  const stopTrace = (customTrace) => {
    customTrace.stop();
  };
  
  return {
    provide: {
      startTrace,
      stopTrace
    }
  };
});
```

### 5.2 Firebase Crashlytics

Configuración para monitoreo de errores:

```javascript
// plugins/error-tracking.ts
import { defineNuxtPlugin } from '#app';
import * as Sentry from '@sentry/vue';
import { logEvent } from 'firebase/analytics';
import { getAnalytics } from 'firebase/analytics';

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp;
  const config = useRuntimeConfig();
  
  if (config.public.sentryDsn) {
    Sentry.init({
      app: vueApp,
      dsn: config.public.sentryDsn,
      environment: config.public.environment || 'development',
      integrations: [
        new Sentry.BrowserTracing({
          routingInstrumentation: Sentry.vueRouterInstrumentation(nuxtApp.$router)
        })
      ],
      tracesSampleRate: 1.0
    });
  }
  
  // Capturar errores no manejados
  window.addEventListener('error', (event) => {
    const analytics = getAnalytics();
    logEvent(analytics, 'exception', {
      description: event.message,
      fatal: true
    });
  });
});
```

### 5.3 Alertas y Notificaciones

Configuración de alertas para:

1. **Errores críticos**:
   - Umbral: >1% de sesiones afectadas
   - Notificación: Email y Slack

2. **Degradación de rendimiento**:
   - Umbral: >20% de aumento en tiempo de carga
   - Notificación: Email

3. **Disponibilidad**:
   - Umbral: <99.9% de disponibilidad
   - Notificación: Email, SMS y Slack

## 6. Estrategia de Rollback

### 6.1 Rollback Automático

Configuración para rollback automático en caso de errores críticos:

```yaml
# .github/workflows/deploy.yml (fragmento)
- name: Deploy to Firebase Hosting
  id: deploy
  uses: FirebaseExtended/action-hosting-deploy@v0
  with:
    repoToken: ${{ secrets.GITHUB_TOKEN }}
    firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
    channelId: live
    projectId: farmaciadescuento

- name: Monitor Deployment
  run: |
    sleep 300 # Esperar 5 minutos
    ERROR_RATE=$(curl -s "https://api.sentry.io/projects/farmaciadescuento/stats/?stat=events&resolution=1h" \
      -H "Authorization: Bearer ${{ secrets.SENTRY_API_TOKEN }}" | jq '.groups[0].totals["24h"]')
    
    if [ $ERROR_RATE -gt 100 ]; then
      echo "Error rate too high, rolling back..."
      exit 1
    fi
  
- name: Rollback on Failure
  if: failure() && steps.deploy.outcome == 'success'
  run: |
    npx firebase hosting:clone farmaciadescuento:live farmaciadescuento:live --token ${{ secrets.FIREBASE_TOKEN }} --expires 1d
```

### 6.2 Rollback Manual

Procedimiento para rollback manual:

1. **Identificar la versión estable anterior**:
   ```bash
   firebase hosting:versions:list -p farmaciadescuento
   ```

2. **Realizar el rollback**:
   ```bash
   firebase hosting:clone VERSION_ID farmaciadescuento:live -p farmaciadescuento
   ```

## 7. Documentación de Despliegue

### 7.1 Checklist de Despliegue

- [ ] Ejecutar todas las pruebas en entorno local
- [ ] Verificar que todas las variables de entorno están configuradas
- [ ] Realizar build de producción y verificar que no hay errores
- [ ] Desplegar a entorno de staging y realizar pruebas de aceptación
- [ ] Obtener aprobación para despliegue a producción
- [ ] Realizar despliegue a producción
- [ ] Verificar funcionalidad en producción
- [ ] Monitorear métricas de rendimiento y errores

### 7.2 Registro de Cambios

Mantener un registro de cambios (CHANGELOG.md) siguiendo el formato de [Keep a Changelog](https://keepachangelog.com/):

```markdown
# Changelog
Todos los cambios notables en este proyecto serán documentados en este archivo.

## [1.0.0] - 2025-05-01
### Añadido
- Funcionalidad de búsqueda por geolocalización
- Integración con pasarela de pagos Transbank

### Cambiado
- Mejora en el rendimiento de carga de imágenes
- Actualización del diseño de la página de producto

### Corregido
- Error al validar tickets en dispositivos iOS
- Problema de visualización en navegadores Safari
```

## 8. Consideraciones de Seguridad

### 8.1 Escaneo de Vulnerabilidades

Integración de escaneo de vulnerabilidades en el pipeline de CI/CD:

```yaml
# .github/workflows/security.yml
name: Security Scan

on:
  schedule:
    - cron: '0 0 * * 0'  # Cada domingo a medianoche
  workflow_dispatch:

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run npm audit
        run: npm audit --audit-level=high
      
      - name: Run OWASP ZAP Scan
        uses: zaproxy/action-baseline@v0.7.0
        with:
          target: 'https://staging.farmaciadescuento.cl'
      
      - name: Run Snyk
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

### 8.2 Revisión de Seguridad Pre-Despliegue

Checklist de seguridad antes de cada despliegue a producción:

- [ ] Verificar que no hay secretos en el código
- [ ] Confirmar que las reglas de Firestore y Storage son restrictivas
- [ ] Validar que todas las APIs requieren autenticación apropiada
- [ ] Comprobar que las dependencias no tienen vulnerabilidades conocidas
- [ ] Verificar la implementación de protección contra CSRF y XSS

## 9. Implementación en Nuxt 3

### 9.1 Configuración de Scripts

```json
// package.json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "preview": "nuxt preview",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "test:unit": "vitest run",
    "test:unit:watch": "vitest",
    "test:integration": "vitest run -c vitest.integration.config.ts",
    "test:e2e": "cypress run",
    "test:e2e:open": "cypress open",
    "emulators": "firebase emulators:start",
    "deploy:dev": "firebase deploy --only hosting:dev",
    "deploy:staging": "firebase deploy --only hosting:staging",
    "deploy:prod": "firebase deploy --only hosting:prod",
    "deploy:functions": "firebase deploy --only functions"
  }
}
```

### 9.2 Configuración de Nuxt para Entornos

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  // ...
  
  // Configuración específica por entorno
  runtimeConfig: {
    public: {
      environment: process.env.NODE_ENV || 'development',
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:5001/farmaciadescuento/us-central1',
      firebaseConfig: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      },
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      sentryDsn: process.env.SENTRY_DSN
    }
  }
})
```

## Checklist de Implementación

### Pruebas
- [ ] Configurar pruebas unitarias con Vitest
- [ ] Configurar pruebas de integración con Firebase Emulators
- [ ] Configurar pruebas E2E con Cypress
- [ ] Implementar pruebas de rendimiento con Lighthouse CI
- [ ] Definir objetivos de cobertura de pruebas

### CI/CD
- [ ] Configurar GitHub Actions para CI
- [ ] Configurar GitHub Actions para despliegue
- [ ] Configurar entornos de desarrollo, staging y producción
- [ ] Implementar estrategia de rollback
- [ ] Configurar monitoreo y alertas

### Seguridad
- [ ] Implementar escaneo de vulnerabilidades
- [ ] Configurar revisión de seguridad pre-despliegue
- [ ] Asegurar protección de secretos y credenciales
- [ ] Verificar reglas de seguridad de Firebase
