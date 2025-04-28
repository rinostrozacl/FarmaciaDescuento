# Estructura mínima recomendada para Nuxt 3

```
app-web/
├── assets/
├── components/
├── composables/
├── layouts/
├── middleware/
├── pages/
├── plugins/
├── public/
├── stores/           # Aquí van los stores de Pinia
├── utils/
├── app.vue
├── nuxt.config.ts
├── package.json
├── .env.example
```

- Usa la carpeta `stores` para todos los stores de Pinia.
- Coloca los layouts personalizados en `layouts/`.
- Usa `pages/` para las rutas principales (inicio, productos, farmacias, tickets, admin).
- Los plugins de integración (Firebase, Sentry, etc.) van en `plugins/`.
- Los composables reutilizables en `composables/`.
