# Estructura de Directorios - Aplicación Web Nuxt.js

Este documento describe la estructura de directorios recomendada para la aplicación web de FarmaciaDescuento desarrollada con Nuxt.js.

## Estructura General

```
app-web/
├── .nuxt/                    # Directorio generado por Nuxt (no editar manualmente)
├── assets/                   # Archivos estáticos que serán procesados por webpack
│   ├── css/                  # Estilos globales
│   ├── fonts/                # Fuentes personalizadas
│   └── images/               # Imágenes del proyecto
├── components/               # Componentes Vue reutilizables
│   ├── common/               # Componentes comunes (botones, inputs, etc.)
│   ├── layout/               # Componentes de layout (header, footer, etc.)
│   ├── admin/                # Componentes específicos para administradores
│   ├── pharmacy/             # Componentes específicos para farmacias
│   └── customer/             # Componentes específicos para clientes
├── composables/              # Composables de Vue 3 (lógica reutilizable)
│   ├── useAuth.js            # Lógica de autenticación
│   ├── useTickets.js         # Lógica de gestión de tickets
│   └── useCategories.js      # Lógica de categorías
├── layouts/                  # Layouts de la aplicación
│   ├── default.vue           # Layout por defecto
│   ├── admin.vue             # Layout para administradores
│   ├── pharmacy.vue          # Layout para farmacias
│   └── customer.vue          # Layout para clientes
├── middleware/               # Middleware de Nuxt
│   ├── auth.js               # Middleware de autenticación
│   └── role.js               # Middleware de verificación de roles
├── pages/                    # Páginas de la aplicación (rutas automáticas)
│   ├── index.vue             # Página principal
│   ├── login.vue             # Página de inicio de sesión
│   ├── register/             # Páginas de registro
│   │   ├── index.vue         # Selección de tipo de registro
│   │   ├── customer.vue      # Registro de cliente
│   │   └── pharmacy.vue      # Registro de farmacia
│   ├── admin/                # Páginas de administrador
│   │   ├── index.vue         # Dashboard de administrador
│   │   ├── pharmacies/       # Gestión de farmacias
│   │   ├── users/            # Gestión de usuarios
│   │   ├── categories/       # Gestión de categorías
│   │   ├── reports/          # Reportes y estadísticas
│   │   └── invoices/         # Facturación
│   ├── pharmacy/             # Páginas de farmacia
│   │   ├── index.vue         # Dashboard de farmacia
│   │   ├── profile/          # Perfil de farmacia
│   │   ├── products/         # Gestión de productos
│   │   ├── tickets/          # Gestión de tickets
│   │   └── reports/          # Reportes
│   └── customer/             # Páginas de cliente
│       ├── index.vue         # Dashboard de cliente
│       ├── profile/          # Perfil de usuario
│       ├── search/           # Búsqueda de productos
│       ├── categories/       # Exploración por categorías
│       ├── cart/             # Carrito de compras
│       └── tickets/          # Tickets generados
├── plugins/                  # Plugins de Nuxt
│   ├── apollo.js             # Configuración de Apollo Client
│   ├── vuelidate.js          # Validación de formularios
│   └── notifications.js      # Sistema de notificaciones
├── public/                   # Archivos estáticos públicos
│   ├── favicon.ico           # Favicon
│   └── robots.txt            # Archivo robots.txt
├── server/                   # Código del servidor (API, middleware)
│   ├── api/                  # Endpoints de API
│   └── middleware/           # Middleware del servidor
├── store/                    # Store de Vuex (si se usa)
│   ├── index.js              # Store principal
│   ├── auth.js               # Store de autenticación
│   └── cart.js               # Store del carrito
├── utils/                    # Utilidades y helpers
│   ├── formatters.js         # Funciones de formato
│   ├── validators.js         # Funciones de validación
│   └── constants.js          # Constantes de la aplicación
├── .env                      # Variables de entorno (desarrollo)
├── .env.production           # Variables de entorno (producción)
├── .gitignore                # Archivos ignorados por Git
├── nuxt.config.js            # Configuración de Nuxt
├── tailwind.config.js        # Configuración de Tailwind CSS
├── package.json              # Dependencias y scripts
└── README.md                 # Documentación del proyecto
```

## Descripción de Directorios Principales

### components/

Contiene componentes Vue reutilizables organizados por funcionalidad:

```
components/
├── common/                   # Componentes comunes
│   ├── Button.vue            # Botón personalizado
│   ├── Input.vue             # Input personalizado
│   ├── Modal.vue             # Ventana modal
│   ├── Dropdown.vue          # Menú desplegable
│   ├── Card.vue              # Tarjeta de contenido
│   ├── Alert.vue             # Alertas y notificaciones
│   └── Loader.vue            # Indicador de carga
├── layout/                   # Componentes de layout
│   ├── Header.vue            # Encabezado
│   ├── Footer.vue            # Pie de página
│   ├── Sidebar.vue           # Barra lateral
│   └── Navbar.vue            # Barra de navegación
├── admin/                    # Componentes para administradores
│   ├── PharmacyList.vue      # Lista de farmacias
│   ├── UserManager.vue       # Gestión de usuarios
│   ├── CategoryEditor.vue    # Editor de categorías
│   └── InvoiceGenerator.vue  # Generador de facturas
├── pharmacy/                 # Componentes para farmacias
│   ├── ProductForm.vue       # Formulario de productos
│   ├── InventoryManager.vue  # Gestor de inventario
│   ├── TicketValidator.vue   # Validador de tickets
│   └── SalesReport.vue       # Reporte de ventas
└── customer/                 # Componentes para clientes
    ├── ProductCard.vue       # Tarjeta de producto
    ├── CategoryBrowser.vue   # Navegador de categorías
    ├── CartSummary.vue       # Resumen del carrito
    ├── TicketGenerator.vue   # Generador de tickets
    └── TicketCard.vue        # Tarjeta de ticket
```

### pages/

Estructura de páginas que define automáticamente las rutas de la aplicación:

```
pages/
├── index.vue                 # Página principal (/)
├── login.vue                 # Inicio de sesión (/login)
├── register/                 # Páginas de registro
│   ├── index.vue             # /register
│   ├── customer.vue          # /register/customer
│   └── pharmacy.vue          # /register/pharmacy
├── admin/                    # Sección de administrador
│   ├── index.vue             # /admin
│   ├── pharmacies/           # /admin/pharmacies
│   │   ├── index.vue         # Lista de farmacias
│   │   └── [id].vue          # Detalle de farmacia específica
│   ├── categories/           # /admin/categories
│   │   ├── index.vue         # Lista de categorías
│   │   ├── [id].vue          # Edición de categoría
│   │   └── types.vue         # Tipos de categorías
│   └── invoices/             # /admin/invoices
│       ├── index.vue         # Lista de facturas
│       ├── [id].vue          # Detalle de factura
│       └── generate.vue      # Generación de facturas
├── pharmacy/                 # Sección de farmacia
│   ├── index.vue             # /pharmacy
│   ├── products/             # /pharmacy/products
│   │   ├── index.vue         # Lista de productos
│   │   ├── [id].vue          # Edición de producto
│   │   └── new.vue           # Nuevo producto
│   └── tickets/              # /pharmacy/tickets
│       ├── index.vue         # Lista de tickets
│       ├── validate.vue      # Validación de tickets
│       └── [id].vue          # Detalle de ticket
└── customer/                 # Sección de cliente
    ├── index.vue             # /customer
    ├── search.vue            # /customer/search
    ├── categories/           # /customer/categories
    │   ├── index.vue         # Lista de categorías
    │   └── [id].vue          # Productos por categoría
    ├── cart.vue              # /customer/cart
    └── tickets/              # /customer/tickets
        ├── index.vue         # Lista de tickets
        └── [id].vue          # Detalle de ticket
```

## Composables

Los composables son funciones que encapsulan lógica reutilizable utilizando la Composition API de Vue 3:

```javascript
// composables/useAuth.js
export default function useAuth() {
  const user = ref(null)
  const isLoggedIn = computed(() => !!user.value)
  const userRole = computed(() => user.value?.role || null)

  const login = async (credentials) => {
    // Lógica de inicio de sesión
  }

  const logout = async () => {
    // Lógica de cierre de sesión
  }

  const register = async (userData) => {
    // Lógica de registro
  }

  return {
    user,
    isLoggedIn,
    userRole,
    login,
    logout,
    register
  }
}
```

## Integración con Apollo Client

Para la comunicación con Hasura GraphQL:

```javascript
// plugins/apollo.js
import { defineNuxtPlugin } from '#app'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createHttpLink } from '@apollo/client/link/http'
import { setContext } from '@apollo/client/link/context'

export default defineNuxtPlugin((nuxtApp) => {
  const httpLink = createHttpLink({
    uri: process.env.HASURA_GRAPHQL_URL,
  })

  const authLink = setContext((_, { headers }) => {
    // Obtener token de autenticación del almacenamiento
    const token = localStorage.getItem('auth_token')
    
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        'x-hasura-role': localStorage.getItem('user_role') || 'anonymous',
      }
    }
  })

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  })

  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})
```

## Middleware de Autenticación

```javascript
// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAuth()
  
  // Redireccionar a login si no está autenticado
  if (!isLoggedIn.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})

// middleware/role.js
export default defineNuxtRouteMiddleware((to, from) => {
  const { userRole } = useAuth()
  
  // Verificar permisos según la ruta
  if (to.path.startsWith('/admin') && userRole.value !== 'admin_platform') {
    return navigateTo('/')
  }
  
  if (to.path.startsWith('/pharmacy') && userRole.value !== 'admin_pharmacy') {
    return navigateTo('/')
  }
})
```

## Configuración de Nuxt

```javascript
// nuxt.config.js
export default {
  // Modo de renderizado
  ssr: true,
  
  // Configuración de meta tags
  head: {
    title: 'FarmaciaDescuento',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Plataforma que conecta farmacias y clientes para productos con descuento' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  
  // Módulos
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/apollo',
    '@pinia/nuxt',
  ],
  
  // Configuración de Apollo
  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.HASURA_GRAPHQL_URL,
      }
    }
  },
  
  // Configuración de Tailwind
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
  },
  
  // Variables de entorno públicas
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    hasuraUrl: process.env.HASURA_GRAPHQL_URL,
  },
  
  // Variables de entorno privadas (solo servidor)
  privateRuntimeConfig: {
    hasuraAdminSecret: process.env.HASURA_ADMIN_SECRET,
  },
}
```

## Estructura de Componentes Principales

### Componente de Producto

```vue
<!-- components/customer/ProductCard.vue -->
<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.imageUrl" :alt="product.name">
      <div class="discount-badge">-{{ product.discountPercentage }}%</div>
    </div>
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <div class="product-price">
        <span class="original-price">{{ formatCurrency(product.originalPrice) }}</span>
        <span class="discounted-price">{{ formatCurrency(discountedPrice) }}</span>
      </div>
      <div class="expiration-date">
        Vence: {{ formatDate(product.expirationDate) }}
      </div>
      <div class="pharmacy-info">
        {{ product.pharmacy.name }}
      </div>
      <div class="product-categories">
        <span v-for="category in product.categories" :key="category.id" class="category-tag">
          {{ category.name }}
        </span>
      </div>
    </div>
    <div class="product-actions">
      <button @click="addToCart" class="add-to-cart-btn">
        Agregar al carrito
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCart } from '~/composables/useCart'
import { formatCurrency, formatDate } from '~/utils/formatters'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { addToCart } = useCart()

const discountedPrice = computed(() => {
  return props.product.originalPrice * (1 - props.product.discountPercentage / 100)
})

const handleAddToCart = () => {
  addToCart(props.product)
}
</script>
```

### Componente de Validación de Tickets

```vue
<!-- components/pharmacy/TicketValidator.vue -->
<template>
  <div class="ticket-validator">
    <div class="scanner-section">
      <h2>Escanear Ticket</h2>
      <div class="qr-scanner">
        <!-- Componente de escaneo de QR -->
        <qr-scanner @result="handleScanResult" />
      </div>
      <div class="manual-input">
        <h3>O ingrese el código manualmente</h3>
        <div class="input-group">
          <input v-model="ticketCode" placeholder="Código del ticket" />
          <button @click="validateTicket" :disabled="!ticketCode">Validar</button>
        </div>
      </div>
    </div>
    
    <div v-if="ticketData" class="ticket-details">
      <h2>Detalles del Ticket</h2>
      <div class="ticket-status" :class="ticketData.status">
        Estado: {{ getStatusLabel(ticketData.status) }}
      </div>
      <div class="ticket-expiration">
        Válido hasta: {{ formatDateTime(ticketData.expirationTime) }}
      </div>
      <div class="ticket-customer">
        Cliente: {{ ticketData.user.firstName }} {{ ticketData.user.lastName }}
      </div>
      
      <h3>Productos:</h3>
      <div class="ticket-products">
        <div v-for="item in ticketData.items" :key="item.id" class="ticket-product-item">
          <div class="product-name">{{ item.product.name }}</div>
          <div class="product-quantity">x{{ item.quantity }}</div>
          <div class="product-price">{{ formatCurrency(item.priceAtTime) }}</div>
          <div class="product-discount">-{{ formatCurrency(item.discountAtTime) }}</div>
        </div>
      </div>
      
      <div class="ticket-actions">
        <button 
          v-if="ticketData.status === 'active'" 
          @click="confirmTicket" 
          class="confirm-btn"
        >
          Confirmar Uso
        </button>
        <button 
          v-if="['active', 'validated'].includes(ticketData.status)" 
          @click="rejectTicket" 
          class="reject-btn"
        >
          Rechazar
        </button>
      </div>
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTickets } from '~/composables/useTickets'
import { formatCurrency, formatDateTime } from '~/utils/formatters'
import QrScanner from '~/components/common/QrScanner.vue'

const ticketCode = ref('')
const ticketData = ref(null)
const error = ref(null)

const { validateTicket, confirmTicket, rejectTicket, getStatusLabel } = useTickets()

const handleScanResult = (result) => {
  ticketCode.value = result
  validateTicket(result)
}

const handleValidateTicket = async () => {
  error.value = null
  try {
    ticketData.value = await validateTicket(ticketCode.value)
  } catch (err) {
    error.value = err.message
  }
}

const handleConfirmTicket = async () => {
  error.value = null
  try {
    await confirmTicket(ticketData.value.id)
    ticketData.value.status = 'used'
  } catch (err) {
    error.value = err.message
  }
}

const handleRejectTicket = async () => {
  error.value = null
  try {
    await rejectTicket(ticketData.value.id)
    ticketData.value = null
    ticketCode.value = ''
  } catch (err) {
    error.value = err.message
  }
}
</script>
```

## Consideraciones de Implementación

1. **Autenticación**: Utilizar JWT para autenticación con Hasura y almacenar el token en localStorage o cookies seguras.

2. **Rutas Protegidas**: Implementar middleware para proteger rutas según el rol del usuario.

3. **Estado Global**: Utilizar Pinia o Vuex para gestionar el estado global de la aplicación.

4. **Responsive Design**: Implementar diseño responsive con Tailwind CSS para adaptarse a diferentes dispositivos.

5. **Optimización de Rendimiento**:
   - Lazy loading de componentes y rutas
   - Optimización de imágenes
   - Caché de consultas GraphQL

6. **Internacionalización**: Preparar la aplicación para soportar múltiples idiomas en el futuro.

7. **Accesibilidad**: Seguir pautas de accesibilidad WCAG para asegurar que la aplicación sea accesible para todos los usuarios.
