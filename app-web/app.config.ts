// Configuración global para el módulo @nuxt/icon
export default defineAppConfig({
  icon: {
    size: "24px", // tamaño por defecto para todos los iconos
    class: "icon", // clase CSS por defecto
    mode: "svg", // modo por defecto ('svg' o 'css')
    // Aliases para iconos comunes
    aliases: {
      // Por Uso
      "med:analgesico": "mdi:pill",
      "med:antibiotico": "healthicons:medicines",
      "med:antiinflamatorio": "tabler:activity",
      "med:antipiretico": "mdi:thermometer",
      "med:antialergico": "carbon:humidity",
      "med:digestivo": "tabler:intestine",
      "med:vitamina": "carbon:pill",
      "med:dermatologico": "fa6-solid:hand-dots",

      // Por Forma
      "med:tableta": "mdi:pill",
      "med:capsula": "healthicons:medicines",
      "med:jarabe": "tabler:bottle",
      "med:gota": "fa6-solid:droplet",
      "med:inyectable": "tabler:syringe",
      "med:crema": "carbon:maximize",
      "med:parche": "mdi:bandage",
      "med:inhalador": "mdi:spray",

      // Molécula
      "med:molecula": "tabler:molecule",
    },
  },
});
