// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: process.env.NODE_ENV === "development" },

  // CSS global
  css: ["~/assets/css/variables.css", "~/assets/css/main.css"],

  // Módulos
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/device",
    "@vueuse/nuxt",
    "@nuxt/image",
    "nuxt-mcp",
    "@nuxt/icon",
  ],

  // Plugins
  plugins: ["~/plugins/fontawesome.js", "~/plugins/components.js"],

  // Configuración del módulo de iconos
  icon: {
    size: "24px", // tamaño por defecto
    customCollections: [
      {
        prefix: "med",
        dir: "./public/images/icons",
        // Usar los SVG locales como colección personalizada
      },
    ],
    // Incluir algunos iconos comunes en el bundle del cliente para evitar peticiones
    clientBundle: {
      icons: [
        "mdi:pill",
        "healthicons:medicines",
        "tabler:activity",
        "mdi:thermometer",
        "carbon:humidity",
        "tabler:intestine",
        "carbon:pill",
        "fa6-solid:hand-dots",
        "tabler:molecule",
        "tabler:bottle",
        "fa6-solid:droplet",
        "tabler:syringe",
        "carbon:maximize",
        "mdi:bandage",
        "mdi:spray",
      ],
      // Escanear componentes para incluir iconos usados
      scan: true,
      // Incluir colecciones personalizadas
      includeCustomCollections: true,
    },
    // Usar mode local para servir los iconos desde el servidor de Nuxt
    serverBundle: "local",
    class: "icon",
  },

  // Configuración de componentes
  components: {
    dirs: [
      "~/components",
      "~/components/layout",
      "~/components/ui",
      "~/components/forms",
      "~/components/search",
    ],
  },

  // Configuración de SEO
  app: {
    head: {
      titleTemplate: "%s | FarmaciaDescuento",
      title: "FarmaciaDescuento",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Conectamos farmacias y clientes para reducir mermas por vencimiento y ofrecer productos a precios accesibles.",
        },
        { name: "format-detection", content: "telephone=no" },
        { property: "og:title", content: "FarmaciaDescuento" },
        {
          property: "og:description",
          content:
            "Conectamos farmacias y clientes para reducir mermas por vencimiento y ofrecer productos a precios accesibles.",
        },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "FarmaciaDescuento" },
        { property: "og:locale", content: "es_CL" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "FarmaciaDescuento" },
        {
          name: "twitter:description",
          content:
            "Conectamos farmacias y clientes para reducir mermas por vencimiento y ofrecer productos a precios accesibles.",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "canonical",
          href: process.env.APP_URL || "https://farmaciadescuento.cl",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css",
        },
        { rel: "icon", type: "image/svg+xml", href: "/images/logo.svg" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap",
        },
      ],
    },
  },

  // Configuración de runtime
  runtimeConfig: {
    public: {
      environment: process.env.NODE_ENV || "development",
      apiBaseUrl:
        process.env.API_BASE_URL ||
        "http://localhost:5001/farmaciadescuento/us-central1",
      appUrl: process.env.APP_URL || "http://localhost:3000",
      appName: process.env.APP_NAME || "FarmaciaDescuento",
      debug: process.env.APP_DEBUG === "true",

      // Firebase
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      },

      // Google Maps
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,

      // Sentry
      sentryDsn: process.env.SENTRY_DSN,

      // Google Analytics
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,

      // API
      apiTimeout: parseInt(process.env.API_TIMEOUT || "30000"),

      // Caché
      cacheTTL: parseInt(process.env.CACHE_TTL || "3600"),

      // Notificaciones
      fcmVapidKey: process.env.FCM_VAPID_KEY,
    },

    // Variables privadas (solo disponibles en el servidor)
    resendApiKey: process.env.RESEND_API_KEY,
    transbankCommerceCode: process.env.TRANSBANK_COMMERCE_CODE,
    transbankApiKey: process.env.TRANSBANK_API_KEY,
  },

  // Configuración de imagen
  image: {
    quality: 80,
    format: ["webp", "jpg", "png"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  // Configuración de compilación
  build: {
    transpile: ["@googlemaps/js-api-loader"],
  },

  // Configuración de nitro (servidor)
  nitro: {
    compressPublicAssets: true,
    minify: true,
    timing: process.env.NODE_ENV === "development",
    devProxy: {
      "/api": {
        target: "https://firebase.googleapis.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // Configuración de vite
  vite: {
    optimizeDeps: {
      include: [
        "firebase/app",
        "firebase/auth",
        "firebase/firestore",
        "firebase/storage",
        "firebase/analytics",
      ],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            firebase: [
              "firebase/app",
              "firebase/auth",
              "firebase/firestore",
              "firebase/storage",
            ],
            mapas: ["@googlemaps/js-api-loader"],
          },
        },
      },
    },
  },

  // Configuración de MCP (typecasting para evitar errores de tipo)
  mcp: {
    enabled: true, // Habilitar MCP en desarrollo
  } as any,

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
