# SEO y Rendimiento - FarmaciaDescuento

## Índice

1. [Estrategia SEO](#estrategia-seo)
2. [Estrategia de Rendimiento](#estrategia-de-rendimiento)
3. [Accesibilidad (WCAG)](#accesibilidad-wcag)
4. [Monitoreo y Análisis](#monitoreo-y-análisis)

---

Este documento define la estrategia de SEO (Search Engine Optimization) y rendimiento para el proyecto FarmaciaDescuento, con el objetivo de maximizar la visibilidad en buscadores y proporcionar una experiencia de usuario óptima.

## 1. Estrategia de SEO

### Metadatos

#### Títulos de Página

Cada página debe tener un título único y descriptivo siguiendo esta estructura:

```javascript
// Estructura de títulos
const titleTemplate = '%s | FarmaciaDescuento';

// Ejemplos:
// Página principal: "Medicamentos con descuento cerca de ti | FarmaciaDescuento"
// Página de producto: "Paracetamol 500mg con 40% descuento | FarmaciaDescuento"
// Categoría: "Analgésicos con descuento | FarmaciaDescuento"
```

Implementación en Nuxt 3:

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s | FarmaciaDescuento',
      title: 'Medicamentos con descuento cerca de ti'
    }
  }
})

// En componentes/páginas
useHead({
  title: 'Paracetamol 500mg con 40% descuento'
})
```

#### Meta Descripciones

Cada página debe tener una meta descripción única y persuasiva:

```javascript
// Estructura de meta descripciones
// - Longitud: 120-158 caracteres
// - Incluir palabras clave relevantes
// - Incluir llamada a la acción cuando sea apropiado

// Ejemplos:
// Página principal: "Encuentra medicamentos con descuento cerca de ti. Conectamos farmacias y clientes para ofrecer productos próximos a vencer a precios accesibles. ¡Ahorra hoy!"
// Página de producto: "Paracetamol 500mg con 40% de descuento en farmacias cercanas. Alivia dolores y reduce la fiebre. Reserva ahora y recoge en la farmacia de tu elección."
```

Implementación en Nuxt 3:

```javascript
// En componentes/páginas
useHead({
  meta: [
    {
      name: 'description',
      content: 'Encuentra medicamentos con descuento cerca de ti. Conectamos farmacias y clientes para ofrecer productos próximos a vencer a precios accesibles. ¡Ahorra hoy!'
    }
  ]
})
```

#### Open Graph y Twitter Cards

Para mejorar la presentación en redes sociales:

```javascript
// Implementación en Nuxt 3
useHead({
  meta: [
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://farmaciadescuento.cl/producto/paracetamol-500mg' },
    { property: 'og:title', content: 'Paracetamol 500mg con 40% descuento' },
    { property: 'og:description', content: 'Alivia dolores y reduce la fiebre. Reserva ahora y recoge en la farmacia de tu elección.' },
    { property: 'og:image', content: 'https://farmaciadescuento.cl/images/productos/paracetamol.jpg' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Paracetamol 500mg con 40% descuento' },
    { name: 'twitter:description', content: 'Alivia dolores y reduce la fiebre. Reserva ahora y recoge en la farmacia de tu elección.' },
    { name: 'twitter:image', content: 'https://farmaciadescuento.cl/images/productos/paracetamol.jpg' }
  ]
})
```

### URLs Amigables

Estructura de URLs semánticas y legibles:

```
// Estructura general
https://farmaciadescuento.cl/[tipo]/[identificador-slug]

// Ejemplos:
https://farmaciadescuento.cl/categoria/analgesicos
https://farmaciadescuento.cl/producto/paracetamol-500mg
https://farmaciadescuento.cl/farmacia/cruz-verde-providencia
```

Implementación en Nuxt 3:

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  router: {
    options: {
      trailingSlash: false
    }
  }
})

// Estructura de directorios en /pages
// /pages/categoria/[slug].vue
// /pages/producto/[slug].vue
// /pages/farmacia/[slug].vue
```

### Datos Estructurados (Schema.org)

Implementación de datos estructurados para mejorar los rich snippets:

```javascript
// Ejemplo para producto
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Paracetamol 500mg',
  description: 'Analgésico y antipirético para aliviar el dolor leve a moderado y reducir la fiebre.',
  image: 'https://farmaciadescuento.cl/images/productos/paracetamol.jpg',
  sku: 'PARA500MG',
  brand: {
    '@type': 'Brand',
    name: 'Laboratorio Chile'
  },
  offers: {
    '@type': 'Offer',
    url: 'https://farmaciadescuento.cl/producto/paracetamol-500mg',
    priceCurrency: 'CLP',
    price: '3590',
    priceValidUntil: '2025-05-24',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'Farmacia Cruz Verde'
    }
  }
};

// Implementación en Nuxt 3
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(productSchema)
    }
  ]
})
```

### Sitemap XML

Generación automática de sitemap:

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    hostname: 'https://farmaciadescuento.cl',
    gzip: true,
    exclude: [
      '/admin/**',
      '/farmacia/dashboard/**'
    ],
    routes: async () => {
      // Obtener rutas dinámicas desde Firestore
      // Ejemplo: productos, categorías, farmacias
    }
  }
})
```

### Optimización para Búsquedas Locales

Para mejorar la visibilidad en búsquedas locales:

1. **Implementar datos estructurados LocalBusiness**:
   ```javascript
   const pharmacySchema = {
     '@context': 'https://schema.org',
     '@type': 'Pharmacy',
     name: 'Farmacia Cruz Verde - Providencia',
     image: 'https://farmaciadescuento.cl/images/farmacias/cruz-verde-providencia.jpg',
     '@id': 'https://farmaciadescuento.cl/farmacia/cruz-verde-providencia',
     url: 'https://farmaciadescuento.cl/farmacia/cruz-verde-providencia',
     telephone: '+56912345678',
     address: {
       '@type': 'PostalAddress',
       streetAddress: 'Av. Providencia 1234',
       addressLocality: 'Providencia',
       addressRegion: 'Región Metropolitana',
       postalCode: '7500000',
       addressCountry: 'CL'
     },
     geo: {
       '@type': 'GeoCoordinates',
       latitude: -33.4267,
       longitude: -70.6167
     },
     openingHoursSpecification: [
       {
         '@type': 'OpeningHoursSpecification',
         dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
         opens: '09:00',
         closes: '20:00'
       },
       {
         '@type': 'OpeningHoursSpecification',
         dayOfWeek: ['Saturday'],
         opens: '10:00',
         closes: '14:00'
       }
     ]
   };
   ```

2. **Optimizar para términos de búsqueda locales**:
   - Incluir nombres de comunas y regiones en títulos y descripciones
   - Crear páginas específicas por ubicación (ej. `/farmacias/providencia`)

## 2. Estrategia de Rendimiento

### Core Web Vitals

Optimización para métricas clave de Core Web Vitals:

#### Largest Contentful Paint (LCP)

Para mejorar el LCP (objetivo < 2.5 segundos):

1. **Optimización de imágenes**:
   ```javascript
   // nuxt.config.ts
   export default defineNuxtConfig({
     image: {
       provider: 'ipx',
       domains: ['storage.googleapis.com'],
       format: ['webp', 'avif', 'jpg'],
       densities: [1, 2],
       quality: 80,
       screens: {
         xs: 320,
         sm: 640,
         md: 768,
         lg: 1024,
         xl: 1280,
         xxl: 1536
       }
     }
   })
   
   // Uso en componentes
   <nuxt-img
     src="/images/productos/paracetamol.jpg"
     format="webp"
     width="400"
     height="300"
     loading="eager"
     fetchpriority="high"
     alt="Paracetamol 500mg"
   />
   ```

2. **Priorización de recursos críticos**:
   ```html
   <link rel="preload" href="/fonts/montserrat-v25-latin-regular.woff2" as="font" type="font/woff2" crossorigin>
   <link rel="preconnect" href="https://storage.googleapis.com">
   ```

#### First Input Delay (FID) / Interaction to Next Paint (INP)

Para mejorar el FID/INP (objetivo < 100ms):

1. **Minimizar JavaScript**:
   ```javascript
   // nuxt.config.ts
   export default defineNuxtConfig({
     build: {
       transpile: ['vue-toastification'],
       extractCSS: true,
       optimization: {
         splitChunks: {
           chunks: 'all',
           automaticNameDelimiter: '.',
           maxSize: 244000
         }
       }
     }
   })
   ```

2. **Uso de componentes ligeros**:
   ```javascript
   // Lazy loading de componentes pesados
   const ProductGallery = defineAsyncComponent(() => 
     import('@/components/product/ProductGallery.vue')
   )
   ```

#### Cumulative Layout Shift (CLS)

Para minimizar el CLS (objetivo < 0.1):

1. **Reservar espacio para imágenes y anuncios**:
   ```html
   <div style="aspect-ratio: 16/9; width: 100%;">
     <nuxt-img src="/images/hero.jpg" alt="Hero" />
   </div>
   ```

2. **Prevenir cambios de layout**:
   ```css
   /* Fuentes con font-display: swap */
   @font-face {
     font-family: 'Montserrat';
     font-style: normal;
     font-weight: 400;
     font-display: swap;
     src: url('/fonts/montserrat-v25-latin-regular.woff2') format('woff2');
   }
   ```

### Estrategia de Carga

#### Lazy Loading

1. **Imágenes**:
   ```html
   <nuxt-img
     src="/images/productos/secundaria.jpg"
     loading="lazy"
     width="200"
     height="150"
     alt="Imagen secundaria"
   />
   ```

2. **Componentes**:
   ```javascript
   // Lazy loading de componentes no críticos
   const SimilarProducts = defineAsyncComponent(() => 
     import('@/components/product/SimilarProducts.vue')
   )
   
   // Lazy loading de componentes de ruta
   // nuxt.config.ts
   export default defineNuxtConfig({
     router: {
       options: {
         scrollBehaviorType: 'smooth'
       }
     }
   })
   ```

#### Code Splitting

División automática de código por rutas y componentes:

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
            'maps': ['@googlemaps/js-api-loader'],
            'ui': ['vue-toastification', 'vue3-carousel']
          }
        }
      }
    }
  }
})
```

### Caché y Service Worker

Implementación de estrategias de caché con Workbox:

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  pwa: {
    workbox: {
      cachingExtensions: '@/plugins/workbox-cache.js',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/storage\.googleapis\.com\/.*\/images\/.*/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30 // 30 días
            }
          }
        },
        {
          urlPattern: /^https:\/\/us-central1-farmaciadescuento\.cloudfunctions\.net\/api\/.*/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 5 // 5 minutos
            }
          }
        }
      ]
    }
  }
})
```

### Optimización de Fuentes

Estrategia para carga eficiente de fuentes:

```css
/* assets/css/fonts.css */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/montserrat-v25-latin-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/montserrat-v25-latin-700.woff2') format('woff2');
}
```

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'preload',
          href: '/fonts/montserrat-v25-latin-regular.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        }
      ]
    }
  }
})
```

## 3. Accesibilidad (WCAG)

Implementación de estándares WCAG 2.1 nivel AA:

### Semántica HTML

Uso correcto de elementos semánticos:

```html
<header>
  <nav aria-label="Principal">
    <ul>
      <li><a href="/">Inicio</a></li>
      <li><a href="/categorias">Categorías</a></li>
    </ul>
  </nav>
</header>

<main>
  <h1>Paracetamol 500mg</h1>
  
  <section aria-labelledby="descripcion-titulo">
    <h2 id="descripcion-titulo">Descripción</h2>
    <p>Analgésico y antipirético para aliviar el dolor...</p>
  </section>
</main>

<footer>
  <p>&copy; 2025 FarmaciaDescuento</p>
</footer>
```

### Contraste de Color

Asegurar ratios de contraste adecuados:

```css
:root {
  /* Colores principales con buen contraste */
  --primary-color: #4ECDC4; /* Contraste 4.5:1 con texto blanco */
  --secondary-color: #1A535C; /* Contraste 7:1 con texto blanco */
  --text-color: #333333; /* Contraste 12:1 con fondo blanco */
}
```

### Navegación por Teclado

Implementación de navegación por teclado:

```javascript
// components/FocusTrap.vue
export default defineComponent({
  mounted() {
    this.$el.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    this.$el.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    handleKeyDown(e) {
      if (e.key === 'Tab') {
        // Lógica para mantener el foco dentro del componente
      }
    }
  }
})
```

```css
/* Estilo para focus visible */
:focus-visible {
  outline: 3px solid var(--primary-color);
  outline-offset: 2px;
}
```

### ARIA y Roles

Implementación de atributos ARIA:

```html
<button 
  aria-expanded="false"
  aria-controls="dropdown-menu"
  @click="toggleMenu"
>
  Categorías
</button>

<div 
  id="dropdown-menu" 
  role="menu" 
  aria-hidden="true"
  v-show="isMenuOpen"
>
  <!-- Contenido del menú -->
</div>
```

### Textos Alternativos

Implementación consistente de textos alternativos:

```html
<nuxt-img 
  src="/images/productos/paracetamol.jpg"
  alt="Caja de Paracetamol 500mg, 16 comprimidos, Laboratorio Chile"
  width="400"
  height="300"
/>

<!-- Para imágenes decorativas -->
<nuxt-img 
  src="/images/decorative/background-pattern.jpg"
  alt=""
  role="presentation"
  width="1200"
  height="400"
/>
```

## 4. Monitoreo y Análisis

### Herramientas de Monitoreo

1. **Google Lighthouse**:
   - Auditorías programadas semanales
   - Integración en CI/CD para prevenir regresiones

2. **Google Analytics**:
   - Seguimiento de métricas de rendimiento real
   - Configuración de eventos personalizados para interacciones clave

3. **Sentry Performance**:
   - Monitoreo de rendimiento en producción
   - Alertas para degradaciones significativas

### Plan de Mejora Continua

1. **Análisis trimestral**:
   - Revisión de métricas de Core Web Vitals
   - Identificación de oportunidades de mejora
   - Priorización basada en impacto al usuario

2. **Proceso de optimización**:
   - Medición de línea base
   - Implementación de mejoras
   - Validación con pruebas A/B cuando sea apropiado
   - Medición de resultados

## Implementación en Nuxt 3

### Configuración General

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  // SEO
  app: {
    head: {
      titleTemplate: '%s | FarmaciaDescuento',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://storage.googleapis.com' }
      ]
    }
  },
  
  // Rendimiento
  nitro: {
    compressPublicAssets: true,
    minify: true
  },
  
  // Optimización de imágenes
  image: {
    provider: 'ipx',
    quality: 80,
    format: ['webp', 'jpg']
  },
  
  // Módulos
  modules: [
    '@nuxtjs/sitemap',
    '@nuxt/image',
    '@nuxtjs/pwa',
    '@nuxtjs/seo'
  ],
  
  // Configuración de PWA
  pwa: {
    manifest: {
      name: 'FarmaciaDescuento',
      short_name: 'FarmaciaDesc',
      theme_color: '#4ECDC4',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait'
    }
  },
  
  // Optimización de build
  build: {
    transpile: ['vue-toastification'],
    extractCSS: true
  },
  
  // Configuración de Vite
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/variables.scss";'
        }
      }
    },
    optimizeDeps: {
      include: ['firebase/app', 'firebase/auth']
    }
  }
})
```

### Plugin de SEO

```javascript
// plugins/seo.ts
export default defineNuxtPlugin(() => {
  const generateMeta = (page) => {
    const baseUrl = 'https://farmaciadescuento.cl';
    const defaultImage = `${baseUrl}/images/og-default.jpg`;
    
    return {
      title: page.title,
      meta: [
        { name: 'description', content: page.description },
        // Open Graph
        { property: 'og:title', content: page.title },
        { property: 'og:description', content: page.description },
        { property: 'og:image', content: page.image || defaultImage },
        { property: 'og:url', content: `${baseUrl}${page.path}` },
        { property: 'og:type', content: page.type || 'website' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: page.title },
        { name: 'twitter:description', content: page.description },
        { name: 'twitter:image', content: page.image || defaultImage }
      ],
      link: [
        { rel: 'canonical', href: `${baseUrl}${page.path}` }
      ]
    };
  };
  
  return {
    provide: {
      generateMeta
    }
  };
})
```

## Checklist de Implementación

### SEO
- [ ] Implementar metadatos en todas las páginas
- [ ] Configurar URLs amigables
- [ ] Implementar datos estructurados
- [ ] Generar sitemap.xml
- [ ] Optimizar para búsquedas locales

### Rendimiento
- [ ] Optimizar imágenes con formatos modernos
- [ ] Implementar lazy loading
- [ ] Configurar code splitting
- [ ] Implementar estrategias de caché
- [ ] Optimizar carga de fuentes

### Accesibilidad
- [ ] Usar HTML semántico
- [ ] Asegurar contraste de color adecuado
- [ ] Implementar navegación por teclado
- [ ] Usar atributos ARIA correctamente
- [ ] Proporcionar textos alternativos para imágenes

### Monitoreo
- [ ] Configurar Google Analytics
- [ ] Implementar Sentry Performance
- [ ] Establecer auditorías programadas
- [ ] Definir proceso de mejora continua
