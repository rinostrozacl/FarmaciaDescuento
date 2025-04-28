# FarmaciaDescuento - App Web

Plataforma web para conectar farmacias y clientes, ofreciendo productos con descuento y gestión de tickets. Construida con Nuxt 3, Vue 3, Pinia y Firebase.

## Estructura del proyecto

- `/components`: Componentes Vue organizados por dominio (productos, farmacias, tickets, auth, UI)
- `/pages`: Rutas principales de la app (inicio, productos, farmacias, carrito, perfil, admin, login, etc)
- `/stores`: Stores de Pinia para estado global (auth, cart, products, ui, pharmacy, ticket)
- `/plugins`: Integraciones con servicios externos (Firebase, Sentry, etc)
- `/layouts`: Layout principal y globales
- `/public`: Recursos estáticos (logo, imágenes, favicon)
- `.env.example`: Plantilla de variables de entorno

## Requisitos previos
- Node.js >= 18
- npm >= 9 (o yarn/pnpm)

## Variables de entorno
Copia `.env.example` a `.env` y completa los valores para:
- Firebase (API keys, projectId, etc)
- Google Maps, Resend, Sentry, Analytics, Transbank

## Instalación
```bash
npm install
# o yarn install
```

## Desarrollo
```bash
npm run dev
# o yarn dev
```

## Build producción
```bash
npm run build
npm run preview
```

## Estructura de carpetas recomendada
Ver `EXAMPLE_nuxt_structure.md` y ejemplos de stores/plugins en la raíz de `app-web/`.

## Scripts útiles
- `npm run lint` — Linting de código
- `npm run test` — Pruebas unitarias (Vitest)
- `npm run build` — Build para producción
- `npm run preview` — Previsualización local del build

## Documentación
- Revisa `/docs` y `/docs/requerimientos/` para requerimientos, casos de uso y estructura de datos.

## Notas
- El proyecto está preparado para integración con CI/CD, SEO, accesibilidad y buenas prácticas de seguridad.
- Usa variables de entorno para todas las integraciones sensibles.

---

¿Dudas? Consulta la documentación interna o abre un issue.
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
