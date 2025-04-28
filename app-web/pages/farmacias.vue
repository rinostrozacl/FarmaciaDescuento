<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-3">
      Farmacias Participantes
    </h1>
    <p class="text-gray-600 mb-6">
      Descubre farmacias cerca de ti con descuentos especiales.
    </p>

    <!-- Aviso de filtro activo -->
    <div
      v-if="selectedCity || selectedRegion"
      class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r"
    >
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            class="h-5 w-5 text-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-blue-700">
            Mostrando farmacias en {{ selectedCity || "todas las ciudades" }},
            {{ selectedRegion || "todas las regiones" }}.
            <button
              @click="resetFilters"
              class="font-medium underline text-blue-700 hover:text-blue-900"
            >
              Quitar filtros
            </button>
          </p>
        </div>
      </div>
    </div>

    <!-- Buscador y filtros -->
    <div class="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <label
            for="search"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Buscar farmacias</label
          >
          <div class="relative">
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Nombre, ubicación, etc."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
            <span
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              🔍
            </span>
          </div>
        </div>
        <div class="w-full md:w-48">
          <label
            for="region"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Región</label
          >
          <select
            id="region"
            v-model="selectedRegion"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Todas las regiones</option>
            <option v-for="region in regions" :key="region" :value="region">
              {{ region }}
            </option>
          </select>
        </div>
        <div class="w-full md:w-48">
          <label for="city" class="block text-sm font-medium text-gray-700 mb-1"
            >Ciudad</label
          >
          <select
            id="city"
            v-model="selectedCity"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Todas las ciudades</option>
            <option v-for="city in cities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
        </div>
        <div class="w-full md:w-48">
          <label
            for="sortBy"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Ordenar por</label
          >
          <select
            id="sortBy"
            v-model="sortBy"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          >
            <option value="distance">Distancia</option>
            <option value="rating">Calificación</option>
            <option value="discount">Mayor descuento</option>
            <option value="az">A-Z</option>
          </select>
        </div>
      </div>
      <div class="mt-4">
        <div class="flex flex-wrap gap-2">
          <button
            @click="toggleFilter('open')"
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center',
              filters.open
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
          >
            <span v-if="filters.open" class="mr-1">✓</span>
            Abiertas ahora
          </button>
          <button
            @click="toggleFilter('delivery')"
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center',
              filters.delivery
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
          >
            <span v-if="filters.delivery" class="mr-1">✓</span>
            Despacho a domicilio
          </button>
          <button
            @click="toggleFilter('highDiscount')"
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center',
              filters.highDiscount
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
          >
            <span v-if="filters.highDiscount" class="mr-1">✓</span>
            Altos descuentos
          </button>
        </div>
      </div>
    </div>

    <!-- Estado de carga -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"
      ></div>
    </div>

    <!-- Resultados: Lista de farmacias -->
    <div
      v-else-if="filteredPharmacies.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="pharmacy in filteredPharmacies"
        :key="pharmacy.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <NuxtLink :to="`/farmacias/${pharmacy.id}`" class="block">
          <div class="relative h-48 bg-gray-200 overflow-hidden">
            <img
              v-if="pharmacy.coverImage"
              :src="pharmacy.coverImage"
              :alt="pharmacy.name"
              class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              @error="handleImageError"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-gray-100"
            >
              <span class="text-gray-400 text-3xl">🏥</span>
            </div>

            <div
              class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent"
            >
              <div class="flex items-center">
                <div
                  class="bg-white rounded-full h-12 w-12 flex items-center justify-center mr-3 shadow-md"
                >
                  <img
                    v-if="pharmacy.logoUrl"
                    :src="pharmacy.logoUrl"
                    :alt="pharmacy.name"
                    class="h-8 w-8 object-contain"
                    @error="handleImageError"
                  />
                  <span v-else class="text-2xl">💊</span>
                </div>
                <h2 class="text-xl font-bold text-white truncate max-w-[70%]">
                  {{ pharmacy.name }}
                </h2>
                <div
                  v-if="pharmacy.isOpen"
                  class="ml-auto bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium"
                >
                  Abierto
                </div>
                <div
                  v-else
                  class="ml-auto bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs font-medium"
                >
                  Cerrado
                </div>
              </div>
            </div>
          </div>

          <div class="p-4">
            <div class="flex justify-between items-start mb-3">
              <div>
                <div class="flex">
                  <span
                    v-for="i in 5"
                    :key="i"
                    :class="[
                      'text-lg',
                      i <= pharmacy.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300',
                    ]"
                  >
                    ★
                  </span>
                </div>
                <p class="text-sm text-gray-600">
                  {{ pharmacy.reviewCount }} reseñas
                </p>
              </div>
              <div class="text-sm text-green-600 font-semibold">
                <span v-if="pharmacy.distance">{{ pharmacy.distance }} km</span>
              </div>
            </div>

            <p class="text-gray-600 mb-3 line-clamp-2">
              <span class="mr-1">📍</span>
              {{ pharmacy.address }}
            </p>

            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="service in pharmacy.services.slice(0, 3)"
                :key="service"
                class="bg-gray-100 px-2 py-1 rounded text-xs text-gray-800"
              >
                {{ service }}
              </span>
              <span
                v-if="pharmacy.services.length > 3"
                class="bg-gray-100 px-2 py-1 rounded text-xs text-gray-800"
              >
                +{{ pharmacy.services.length - 3 }} más
              </span>
            </div>

            <div class="flex justify-between items-center text-sm">
              <span class="text-orange-500 font-semibold">
                Hasta {{ pharmacy.maxDiscount }}% dcto.
              </span>
              <span class="text-gray-600">
                {{ pharmacy.productCount }} productos
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Sin resultados -->
    <div v-else-if="!loading" class="bg-gray-100 rounded-lg p-8 text-center">
      <p class="text-gray-600 text-lg mb-4">
        No se encontraron farmacias con los filtros seleccionados.
      </p>
      <button
        @click="resetFilters"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Mostrar todas las farmacias
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Estados
const loading = ref(true);
const searchQuery = ref("");
const selectedRegion = ref("Los Lagos");
const selectedCity = ref("Puerto Montt");
const sortBy = ref("distance");
const filters = ref({
  open: false,
  delivery: false,
  highDiscount: false,
});
const pharmacies = ref([]);

// Regiones disponibles
const regions = [
  "Metropolitana",
  "Valparaíso",
  "Biobío",
  "La Araucanía",
  "Los Lagos",
  "Maule",
];

// Ciudades disponibles
const cities = ["Puerto Montt", "Puerto Varas", "Llanquihue", "Frutillar"];

// Datos de muestra para pruebas (reemplazar con llamada a API)
const mockPharmacies = [
  {
    id: "101",
    name: "Farmacia Central",
    logoUrl: "",
    coverImage: "/images/pharmacies/farmacia1.webp",
    rating: 4.5,
    reviewCount: 128,
    isOpen: true,
    address: "Av. Providencia 1234, Santiago, Metropolitana",
    region: "Metropolitana",
    distance: 1.2,
    services: [
      "Despacho a domicilio",
      "Medición de presión",
      "Inyecciones",
      "Toma de muestras",
    ],
    maxDiscount: 40,
    productCount: 45,
  },
  {
    id: "102",
    name: "Farmacia del Barrio",
    logoUrl: "",
    coverImage: "/images/pharmacies/farmacia2.jpg",
    rating: 4.2,
    reviewCount: 86,
    isOpen: false,
    address: "Av. Las Condes 4321, Las Condes, Metropolitana",
    region: "Metropolitana",
    distance: 3.5,
    services: ["Despacho a domicilio", "Consulta farmacéutica", "Vacunatorio"],
    maxDiscount: 35,
    productCount: 32,
  },
  {
    id: "103",
    name: "Farmacia Bienestar",
    logoUrl: "",
    coverImage: "/images/pharmacies/farmacia3.jpg",
    rating: 4.7,
    reviewCount: 152,
    isOpen: true,
    address: "Calle Viña del Mar 567, Viña del Mar, Valparaíso",
    region: "Valparaíso",
    distance: 8.7,
    services: [
      "Atención 24 horas",
      "Despacho a domicilio",
      "Consulta farmacéutica",
    ],
    maxDiscount: 50,
    productCount: 68,
  },
  {
    id: "104",
    name: "Farmacia Vida Sana",
    logoUrl: "",
    coverImage: "/images/pharmacies/farmacia4.jpg",
    rating: 3.9,
    reviewCount: 74,
    isOpen: true,
    address: "Av. Concepción 890, Concepción, Biobío",
    region: "Biobío",
    distance: 12.3,
    services: ["Medición de presión", "Control de diabetes"],
    maxDiscount: 25,
    productCount: 29,
  },
  {
    id: "105",
    name: "Farmacia Económica",
    logoUrl: "",
    coverImage: "/images/pharmacies/farmacia5.png",
    rating: 4.1,
    reviewCount: 95,
    isOpen: false,
    address: "Calle Temuco 432, Temuco, La Araucanía",
    region: "La Araucanía",
    distance: 15.8,
    services: ["Despacho a domicilio", "Atención preferencial"],
    maxDiscount: 45,
    productCount: 52,
  },
  // Farmacias en Puerto Montt
  {
    id: "106",
    name: "Farmacia Cruz Verde Puerto Montt",
    logoUrl: "/images/pharmacies/cruz-verde-logo.svg",
    coverImage: "/images/pharmacies/farmacia1.webp",
    rating: 4.6,
    reviewCount: 110,
    isOpen: true,
    address: "Av. Salvador Allende 1205, Puerto Montt, Los Lagos",
    region: "Los Lagos",
    distance: 0.8,
    services: [
      "Despacho a domicilio",
      "Medición de presión",
      "Consulta farmacéutica",
      "Vacunatorio",
    ],
    maxDiscount: 55,
    productCount: 75,
  },
  {
    id: "107",
    name: "Farmacia Salcobrand Puerto Montt",
    logoUrl: "/images/pharmacies/salcobrand-logo.svg",
    coverImage: "/images/pharmacies/farmacia2.jpg",
    rating: 4.3,
    reviewCount: 145,
    isOpen: true,
    address: "Av. Antonio Varas 646, Puerto Montt, Los Lagos",
    region: "Los Lagos",
    distance: 1.5,
    services: [
      "Atención 24 horas",
      "Despacho a domicilio",
      "Control de diabetes",
      "Toma de muestras",
    ],
    maxDiscount: 40,
    productCount: 82,
  },
  // Farmacias en Puerto Varas
  {
    id: "108",
    name: "Farmacia Ahumada Puerto Varas",
    logoUrl: "/images/pharmacies/ahumada-logo.svg",
    coverImage: "/images/pharmacies/farmacia3.jpg",
    rating: 4.5,
    reviewCount: 92,
    isOpen: true,
    address: "Av. Salvador 123, Puerto Varas, Los Lagos",
    region: "Los Lagos",
    distance: 5.3,
    services: [
      "Despacho a domicilio",
      "Consulta farmacéutica",
      "Productos naturales",
    ],
    maxDiscount: 35,
    productCount: 65,
  },
  {
    id: "109",
    name: "Farmacia Popular Puerto Varas",
    logoUrl: "",
    coverImage: "/images/pharmacies/farmacia4.jpg",
    rating: 4.8,
    reviewCount: 87,
    isOpen: true,
    address: "Calle Del Salvador 810, Puerto Varas, Los Lagos",
    region: "Los Lagos",
    distance: 6.2,
    services: [
      "Precios accesibles",
      "Atención preferencial adulto mayor",
      "Productos genéricos",
    ],
    maxDiscount: 60,
    productCount: 48,
  },
  // Farmacias en Llanquihue
  {
    id: "110",
    name: "Farmacia San Juan Llanquihue",
    logoUrl: "",
    coverImage: "/images/pharmacies/farmacia5.png",
    rating: 4.1,
    reviewCount: 45,
    isOpen: true,
    address: "Errazuriz 450, Llanquihue, Los Lagos",
    region: "Los Lagos",
    distance: 18.5,
    services: ["Despacho a domicilio", "Vacunatorio", "Medicamentos de marca"],
    maxDiscount: 30,
    productCount: 55,
  },
  // Farmacias en Frutillar
  {
    id: "111",
    name: "Farmacia Frutillar Centro",
    logoUrl: "",
    coverImage: "/images/pharmacies/farmacia1.webp",
    rating: 4.4,
    reviewCount: 38,
    isOpen: false,
    address: "Carlos Richter 351, Frutillar, Los Lagos",
    region: "Los Lagos",
    distance: 25.7,
    services: [
      "Perfumería",
      "Consulta farmacéutica",
      "Medicamentos importados",
    ],
    maxDiscount: 25,
    productCount: 42,
  },
];

// Propiedades computadas
const filteredPharmacies = computed(() => {
  let result = [...pharmacies.value];

  // Filtrar por término de búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (pharmacy) =>
        pharmacy.name.toLowerCase().includes(query) ||
        pharmacy.address.toLowerCase().includes(query)
    );
  }

  // Filtrar por región
  if (selectedRegion.value) {
    result = result.filter(
      (pharmacy) => pharmacy.region === selectedRegion.value
    );
  }

  // Filtrar por ciudad
  if (selectedCity.value) {
    result = result.filter((pharmacy) =>
      pharmacy.address.includes(selectedCity.value)
    );
  }

  // Aplicar filtros adicionales
  if (filters.value.open) {
    result = result.filter((pharmacy) => pharmacy.isOpen);
  }

  if (filters.value.delivery) {
    result = result.filter((pharmacy) =>
      pharmacy.services.some(
        (service) =>
          service.toLowerCase().includes("despacho") ||
          service.toLowerCase().includes("domicilio")
      )
    );
  }

  if (filters.value.highDiscount) {
    result = result.filter((pharmacy) => pharmacy.maxDiscount >= 40);
  }

  // Aplicar ordenamiento
  switch (sortBy.value) {
    case "distance":
      result.sort((a, b) => a.distance - b.distance);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "discount":
      result.sort((a, b) => b.maxDiscount - a.maxDiscount);
      break;
    case "az":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return result;
});

// Métodos
const fetchPharmacies = async () => {
  try {
    loading.value = true;

    // Simular llamada a API con retraso
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Asignar datos de muestra
    pharmacies.value = mockPharmacies;
  } catch (err) {
    console.error("Error al cargar farmacias:", err);
  } finally {
    loading.value = false;
  }
};

const toggleFilter = (filter) => {
  filters.value[filter] = !filters.value[filter];
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedRegion.value = "";
  selectedCity.value = "";
  sortBy.value = "distance";
  filters.value = {
    open: false,
    delivery: false,
    highDiscount: false,
  };
};

const handleImageError = (event) => {
  if (event.target.src.includes("logoUrl")) {
    event.target.parentNode.innerHTML = '<span class="text-2xl">💊</span>';
  } else {
    event.target.src = "/images/pharmacy-placeholder.jpg";
    event.target.classList.add("fallback-image");
  }
};

// Cargar datos al montar el componente
onMounted(() => {
  fetchPharmacies();
});

// Configuración de metadatos de la página
definePageMeta({
  layout: "default",
});
</script>
