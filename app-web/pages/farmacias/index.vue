<template>
  <div class="pharmacies-page">
    <div class="container mx-auto px-4 py-8">
      <!-- Cabecera -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-secondary-color mb-2">
          Farmacias Participantes
        </h1>
        <p class="text-gray-dark">
          Conoce las farmacias que ofrecen productos con descuento en nuestra
          plataforma
        </p>
      </div>

      <!-- Mapa y Listado -->
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Mapa (simulado por ahora) -->
        <div class="lg:w-1/2">
          <div
            class="bg-white p-4 rounded-lg shadow-sm border border-gray h-96 flex items-center justify-center"
          >
            <div class="text-center">
              <i class="fas fa-map-marked-alt text-6xl text-gray mb-4"></i>
              <p class="text-gray-dark">
                El mapa interactivo estará disponible próximamente
              </p>
            </div>
          </div>
        </div>

        <!-- Filtros y Listado -->
        <div class="lg:w-1/2">
          <!-- Filtros -->
          <div
            class="bg-white p-4 rounded-lg shadow-sm border border-gray mb-6"
          >
            <div class="flex flex-wrap gap-4">
              <div class="w-full sm:flex-1">
                <input
                  type="text"
                  placeholder="Buscar farmacias..."
                  class="w-full py-2 px-3 border border-gray rounded-lg focus:outline-none focus:border-primary-color"
                />
              </div>
              <div class="w-full sm:w-auto">
                <select
                  class="w-full py-2 px-3 border border-gray rounded-lg focus:outline-none focus:border-primary-color"
                >
                  <option value="">Todas las zonas</option>
                  <option value="norte">Zona Norte</option>
                  <option value="centro">Zona Centro</option>
                  <option value="sur">Zona Sur</option>
                </select>
              </div>
              <button
                class="bg-primary-color text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors sm:w-auto w-full"
              >
                Filtrar
              </button>
            </div>
          </div>

          <!-- Listado de farmacias -->
          <div class="space-y-4 pharmacy-list">
            <!-- Elemento de farmacia (repetir para cada farmacia) -->
            <div
              v-for="pharmacy in pharmacies"
              :key="pharmacy.id"
              class="bg-white rounded-lg shadow-sm border border-gray overflow-hidden"
            >
              <div class="p-4">
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="text-xl font-semibold text-secondary-color">
                      {{ pharmacy.name }}
                    </h3>
                    <p class="text-gray-dark">{{ pharmacy.address }}</p>

                    <div class="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                      <span class="flex items-center text-gray-dark">
                        <i
                          class="fas fa-map-marker-alt text-accent-color mr-1"
                        ></i>
                        {{ pharmacy.distance }} km
                      </span>
                      <span class="flex items-center text-gray-dark">
                        <i class="fas fa-clock text-primary-color mr-1"></i>
                        {{ pharmacy.hours }}
                      </span>
                      <span class="flex items-center text-gray-dark">
                        <i class="fas fa-tag text-secondary-color mr-1"></i>
                        {{ pharmacy.productCount }} productos con descuento
                      </span>
                    </div>
                  </div>

                  <NuxtLink
                    :to="`/farmacias/${pharmacy.id}`"
                    class="text-primary-color"
                  >
                    <i class="fas fa-chevron-right"></i>
                  </NuxtLink>
                </div>

                <div
                  class="mt-4 pt-3 border-t border-gray flex justify-between"
                >
                  <NuxtLink
                    :to="`/farmacias/${pharmacy.id}`"
                    class="text-primary-color text-sm hover:underline"
                  >
                    Ver detalle
                  </NuxtLink>

                  <NuxtLink
                    :to="{
                      path: '/productos',
                      query: { pharmacy: pharmacy.id },
                    }"
                    class="text-accent-color text-sm hover:underline"
                  >
                    Ver productos
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- Mensaje si no hay farmacias -->
            <div v-if="!pharmacies.length" class="text-center py-8">
              <p class="text-gray-dark">
                No se encontraron farmacias con los filtros seleccionados.
              </p>
              <button class="mt-4 btn-secondary">Limpiar filtros</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Datos de ejemplo (se reemplazarían con una llamada a la API real)
const pharmacies = ref([
  {
    id: "farm1",
    name: "Farmacia Central",
    address: "Av. Principal 123, Santiago",
    distance: 1.2,
    hours: "Lun-Vie: 8:00-21:00, Sáb: 9:00-15:00",
    productCount: 48,
  },
  {
    id: "farm2",
    name: "Farmacia del Barrio",
    address: "Calle Secundaria 456, Santiago",
    distance: 2.5,
    hours: "Lun-Dom: 8:00-22:00",
    productCount: 32,
  },
  {
    id: "farm3",
    name: "Farmacia Económica",
    address: "Av. Los Leones 789, Santiago",
    distance: 3.2,
    hours: "Lun-Vie: 9:00-20:00, Sáb-Dom: 10:00-18:00",
    productCount: 65,
  },
]);

// Establecer metadatos de la página
definePageMeta({
  layout: "default",
});
</script>

<style scoped>
/* Estilos específicos para la página de farmacias si son necesarios */
</style>
