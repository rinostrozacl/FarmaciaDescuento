<template>
  <div class="w-full">
    <div class="relative flex w-full">
      <!-- Campo de búsqueda -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar medicamentos, productos de farmacia..."
        class="w-full rounded-l-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        @keyup.enter="handleSearch"
      />

      <!-- Botón para limpiar búsqueda -->
      <button
        v-if="searchQuery.length > 0"
        @click="clearSearch"
        class="absolute right-[100px] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        aria-label="Limpiar búsqueda"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Botón de búsqueda -->
      <button
        @click="handleSearch"
        class="flex items-center justify-center rounded-r-lg bg-primary px-6 text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span class="ml-2 hidden md:inline">Buscar</span>
      </button>
    </div>

    <!-- Filtros adicionales -->
    <div class="mt-3 flex flex-wrap gap-2 text-sm">
      <!-- Filtro por categoría -->
      <div class="flex-1 min-w-[200px]">
        <select
          v-model="categoryFilter"
          class="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">Todas las categorías</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>

      <!-- Filtro por distancia -->
      <div class="flex-1 min-w-[200px]">
        <select
          v-model="distanceFilter"
          class="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="0">Cualquier distancia</option>
          <option value="1">1 km o menos</option>
          <option value="3">3 km o menos</option>
          <option value="5">5 km o menos</option>
          <option value="10">10 km o menos</option>
        </select>
      </div>

      <!-- Filtro por vencimiento -->
      <div class="flex-1 min-w-[200px]">
        <select
          v-model="expiryFilter"
          class="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="0">Cualquier fecha de vencimiento</option>
          <option value="7">Vence en 7 días o menos</option>
          <option value="15">Vence en 15 días o menos</option>
          <option value="30">Vence en 30 días o menos</option>
        </select>
      </div>

      <!-- Botón para aplicar filtros -->
      <button
        @click="applyFilters"
        class="min-w-[120px] rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
      >
        Filtrar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const props = defineProps({
  initialQuery: {
    type: String,
    default: "",
  },
  initialCategory: {
    type: String,
    default: "",
  },
  initialDistance: {
    type: Number,
    default: 0,
  },
  initialExpiry: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["search"]);

// Estado reactivo
const searchQuery = ref(props.initialQuery);
const categoryFilter = ref(props.initialCategory);
const distanceFilter = ref(props.initialDistance.toString());
const expiryFilter = ref(props.initialExpiry.toString());

// Router y route para navegación
const router = useRouter();
const route = useRoute();

// Lista de categorías (esto podría venir de una API)
const categories = ref([
  "Medicamentos",
  "Dermocosmética",
  "Cuidado personal",
  "Vitaminas y suplementos",
  "Cuidado del bebé",
  "Equipos médicos",
  "Productos naturales",
]);

// Inicializar con valores de la URL si están presentes
onMounted(() => {
  const { query, category, distance, expiry } = route.query;

  if (query) searchQuery.value = query;
  if (category) categoryFilter.value = category;
  if (distance) distanceFilter.value = distance;
  if (expiry) expiryFilter.value = expiry;
});

// Limpiar la búsqueda
const clearSearch = () => {
  searchQuery.value = "";
  searchQuery.value.focus();
};

// Manejar la búsqueda
const handleSearch = () => {
  updateRouteAndEmit();
};

// Aplicar filtros adicionales
const applyFilters = () => {
  updateRouteAndEmit();
};

// Actualizar la ruta y emitir evento de búsqueda
const updateRouteAndEmit = () => {
  // Crear objeto con parámetros de búsqueda
  const searchParams = {
    query: searchQuery.value,
    category: categoryFilter.value,
    distance: distanceFilter.value,
    expiry: expiryFilter.value,
  };

  // Filtrar parámetros vacíos
  const filteredParams = Object.fromEntries(
    Object.entries(searchParams).filter(
      ([_, value]) => value !== "" && value !== "0"
    )
  );

  // Actualizar la URL sin recargar la página
  router.push({
    path: "/productos",
    query: filteredParams,
  });

  // Emitir evento con los parámetros de búsqueda
  emit("search", searchParams);
};
</script>
