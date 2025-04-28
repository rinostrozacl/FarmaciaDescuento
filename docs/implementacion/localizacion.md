# Localización - FarmaciaDescuento

Este documento define la estrategia de localización para el proyecto FarmaciaDescuento.

## Idioma Único: Español (Chile)

La aplicación FarmaciaDescuento está diseñada para operar exclusivamente en español, con enfoque en el mercado chileno. Esta decisión se basa en:

1. **Mercado objetivo**: El sistema está dirigido específicamente al mercado chileno, donde el español es el idioma oficial.
2. **Simplificación de desarrollo**: Mantener un solo idioma reduce la complejidad del desarrollo y mantenimiento.
3. **Coherencia de la experiencia**: Garantiza una experiencia de usuario coherente y sin inconsistencias de traducción.

## Configuración Regional

Aunque la aplicación está en un solo idioma, se implementan configuraciones regionales específicas para Chile:

### 1. Formato de Moneda

```javascript
// Configuración para formatear moneda chilena (CLP)
export function formatCurrency(amount) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Ejemplo de uso
// formatCurrency(5990) => "$5.990"
```

### 2. Formato de Fecha y Hora

```javascript
// Configuración para formatear fechas en formato chileno
export function formatDate(date) {
  return new Intl.DateTimeFormat('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

// Configuración para formatear horas en formato chileno
export function formatTime(date) {
  return new Intl.DateTimeFormat('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(new Date(date));
}

// Ejemplo de uso
// formatDate('2025-04-24') => "24 de abril de 2025"
// formatTime('2025-04-24T15:30:00') => "15:30"
```

### 3. Dirección y Ubicación

```javascript
// Configuración para formatear direcciones en formato chileno
export function formatAddress(address) {
  const { street, number, commune, city, region } = address;
  return `${street} ${number}, ${commune}, ${city}, ${region}`;
}

// Ejemplo de uso
// formatAddress({
//   street: 'Av. Providencia',
//   number: '1234',
//   commune: 'Providencia',
//   city: 'Santiago',
//   region: 'Región Metropolitana'
// }) => "Av. Providencia 1234, Providencia, Santiago, Región Metropolitana"
```

## Términos Específicos del Contexto

La aplicación utiliza términos específicos del contexto chileno para farmacias y medicamentos:

1. **Términos farmacéuticos locales**:
   - "Receta magistral"
   - "Bioequivalente"
   - "ISP" (Instituto de Salud Pública)

2. **Divisiones administrativas**:
   - "Comuna" en lugar de "Distrito" o "Municipio"
   - "Región" en lugar de "Estado" o "Provincia"

## Configuración en Nuxt 3

### Configuración de Locale

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  i18n: {
    defaultLocale: 'es-CL',
    locales: [
      {
        code: 'es-CL',
        name: 'Español (Chile)',
        file: 'es-CL.json'
      }
    ],
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: 'es-CL'
    }
  }
})
```

### Configuración de Fecha y Hora

```javascript
// plugins/date-time.ts
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('formatDate', (date) => {
    return new Intl.DateTimeFormat('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  });
  
  nuxtApp.provide('formatTime', (date) => {
    return new Intl.DateTimeFormat('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(new Date(date));
  });
  
  nuxtApp.provide('formatCurrency', (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  });
});
```

## Consideraciones Futuras

Si en el futuro se decide expandir la aplicación a otros mercados, se recomienda:

1. **Implementar i18n desde el inicio**: Aunque actualmente solo se use español, estructurar el código para facilitar la internacionalización futura.
2. **Separar textos en archivos de traducción**: Mantener los textos en archivos separados para facilitar la traducción.
3. **Considerar diferencias regionales**: Tener en cuenta las diferencias en terminología farmacéutica entre países hispanohablantes.

## Implementación Actual

Para la versión actual del proyecto, se implementará:

1. **Configuración regional para Chile**: Formatos de fecha, hora y moneda específicos.
2. **Terminología contextual**: Uso de términos específicos del contexto farmacéutico chileno.
3. **Estructura preparada para expansión**: Aunque no se implementen múltiples idiomas, el código estará estructurado para facilitar una posible expansión futura.
