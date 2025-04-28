<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Cargando -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"
      ></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="bg-red-100 p-4 rounded-lg text-red-700 mb-6">
      {{ error }}
      <NuxtLink to="/farmacias" class="text-green-600 hover:underline ml-4">
        Volver a la lista de farmacias
      </NuxtLink>
    </div>

    <!-- Detalle de la farmacia -->
    <div
      v-else-if="pharmacy"
      class="bg-white rounded-lg shadow-lg overflow-hidden mb-8"
    >
      <!-- Botón de regreso -->
      <div class="p-6 pb-0">
        <NuxtLink
          to="/farmacias"
          class="text-green-600 hover:underline flex items-center"
        >
          <span class="mr-1">←</span> Volver a farmacias
        </NuxtLink>
      </div>

      <!-- Encabezado -->
      <div class="p-6">
        <div class="flex flex-col md:flex-row items-start md:items-center">
          <div
            class="bg-gray-100 rounded-full h-24 w-24 flex items-center justify-center mr-6"
          >
            <img
              v-if="pharmacy.logoUrl"
              :src="pharmacy.logoUrl"
              :alt="pharmacy.name"
              class="h-16 w-16 object-contain"
              @error="handleImageError"
            />
            <span v-else class="text-4xl">🏥</span>
          </div>
          <div class="mt-4 md:mt-0">
            <h1 class="text-3xl font-bold">{{ pharmacy.name }}</h1>
            <div class="flex items-center mt-2">
              <div class="flex">
                <span
                  v-for="i in 5"
                  :key="i"
                  :class="[
                    'text-xl',
                    i <= pharmacy.rating ? 'text-yellow-400' : 'text-gray-300',
                  ]"
                >
                  ★
                </span>
              </div>
              <span class="ml-2 text-gray-600">
                {{ pharmacy.rating }} ({{ pharmacy.reviewCount }} reseñas)
              </span>
            </div>
          </div>
          <div
            v-if="pharmacy.isOpen"
            class="ml-auto mt-4 md:mt-0 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            Abierto ahora
          </div>
          <div
            v-else
            class="ml-auto mt-4 md:mt-0 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            Cerrado ahora
          </div>
        </div>

        <!-- Información de contacto -->
        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 class="text-xl font-semibold mb-3">Información de contacto</h2>
            <div class="space-y-2">
              <div class="flex items-start">
                <span class="text-gray-500 mr-2">📍</span>
                <span>{{ pharmacy.address }}</span>
              </div>
              <div class="flex items-start">
                <span class="text-gray-500 mr-2">📞</span>
                <span>{{ pharmacy.phone }}</span>
              </div>
              <div class="flex items-start">
                <span class="text-gray-500 mr-2">✉️</span>
                <span>{{ pharmacy.email }}</span>
              </div>
              <div class="flex items-start">
                <span class="text-gray-500 mr-2">🌐</span>
                <a
                  :href="pharmacy.website"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-green-600 hover:underline"
                >
                  {{ pharmacy.website }}
                </a>
              </div>
            </div>
          </div>
          <div>
            <h2 class="text-xl font-semibold mb-3">Horario de atención</h2>
            <div class="space-y-2">
              <div
                v-for="(schedule, day) in pharmacy.schedule"
                :key="day"
                class="flex"
              >
                <span class="w-32 font-medium">{{ day }}:</span>
                <span>{{ schedule }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Descripción y servicios -->
        <div class="mt-6">
          <h2 class="text-xl font-semibold mb-3">Acerca de nosotros</h2>
          <p class="text-gray-700">{{ pharmacy.description }}</p>

          <h2 class="text-xl font-semibold mt-6 mb-3">Servicios</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="service in pharmacy.services"
              :key="service"
              class="bg-gray-100 px-3 py-1 rounded-full text-gray-800"
            >
              {{ service }}
            </span>
          </div>
        </div>
      </div>

      <!-- Mapa (placeholder) -->
      <div class="border-t">
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-4">Ubicación</h2>
          <div
            class="bg-gray-200 h-64 rounded-lg flex items-center justify-center"
          >
            <p class="text-gray-500">
              Mapa no disponible en esta versión de demostración
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Productos disponibles -->
    <div v-if="!loading && !error && pharmacy">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Productos con descuento</h2>
        <div class="flex items-center gap-4">
          <span class="text-gray-600">Filtrar por:</span>
          <select v-model="filterCategory" class="border rounded px-3 py-2">
            <option value="">Todas las categorías</option>
            <option v-for="category in categories" :key="category">
              {{ category }}
            </option>
          </select>
          <select v-model="sortBy" class="border rounded px-3 py-2">
            <option value="discount">Mayor descuento</option>
            <option value="expiry">Próximos a vencer</option>
            <option value="priceAsc">Menor precio</option>
            <option value="priceDesc">Mayor precio</option>
          </select>
        </div>
      </div>

      <!-- Grilla de productos -->
      <div
        v-if="filteredProducts.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div class="relative">
            <img
              :src="product.imageUrl || '/images/product-placeholder.jpg'"
              :alt="product.name"
              class="h-48 w-full object-cover"
              @error="handleImageError"
            />
            <div
              class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-bl-lg"
            >
              -{{ product.discountPercentage }}%
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-1 line-clamp-2">
              {{ product.name }}
            </h3>
            <p class="text-sm text-gray-600 mb-3">
              {{ product.brand }} · {{ product.dosage }}
            </p>
            <div class="flex items-center justify-between">
              <div>
                <span class="text-lg font-bold text-green-600">
                  ${{
                    formatPrice(
                      calculateDiscountedPrice(
                        product.price,
                        product.discountPercentage
                      )
                    )
                  }}
                </span>
                <span class="text-sm text-gray-500 line-through ml-2">
                  ${{ formatPrice(product.price) }}
                </span>
              </div>
            </div>
            <div class="mt-3">
              <NuxtLink
                :to="`/productos/${product.id}`"
                class="block w-full text-center py-2 rounded bg-green-100 text-green-700 hover:bg-green-200 transition"
              >
                Ver detalles
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- No hay productos -->
      <div v-else class="bg-gray-100 rounded-lg p-8 text-center">
        <p class="text-gray-600 text-lg mb-4">
          No hay productos disponibles con los filtros seleccionados.
        </p>
        <button
          @click="resetFilters"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Mostrar todos los productos
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Estados
const loading = ref(true);
const error = ref(null);
const pharmacy = ref(null);
const products = ref([]);
const filterCategory = ref("");
const sortBy = ref("discount");

// Datos de muestra para pruebas (reemplazar con llamada a API)
const mockPharmacies = [
  {
    id: "101",
    name: "Farmacia Central",
    logoUrl: "",
    rating: 4.5,
    reviewCount: 128,
    isOpen: true,
    address: "Av. Providencia 1234, Santiago",
    phone: "+56 2 2123 4567",
    email: "contacto@farmaciacentral.cl",
    website: "https://www.farmaciacentral.cl",
    description:
      "Farmacia Central es un establecimiento comprometido con la salud y bienestar de la comunidad. Con más de 20 años de experiencia, ofrecemos productos farmacéuticos de calidad, con un enfoque especial en medicamentos con descuento para hacer más accesible el cuidado de la salud.",
    services: [
      "Despacho a domicilio",
      "Medición de presión",
      "Inyecciones",
      "Toma de muestras",
    ],
    schedule: {
      Lunes: "8:30 - 21:00",
      Martes: "8:30 - 21:00",
      Miércoles: "8:30 - 21:00",
      Jueves: "8:30 - 21:00",
      Viernes: "8:30 - 21:00",
      Sábado: "9:00 - 18:00",
      Domingo: "10:00 - 14:00",
    },
  },
  {
    id: "102",
    name: "Farmacia del Barrio",
    logoUrl: "",
    rating: 4.2,
    reviewCount: 86,
    isOpen: false,
    address: "Av. Las Condes 4321, Las Condes",
    phone: "+56 2 2234 5678",
    email: "contacto@farmaciadelbarrio.cl",
    website: "https://www.farmaciadelbarrio.cl",
    description:
      "Farmacia del Barrio es tu farmacia de confianza. Nos especializamos en atención personalizada y ofrecemos una amplia gama de productos farmacéuticos con descuentos especiales en medicamentos próximos a vencer, ayudándote a ahorrar sin comprometer tu salud.",
    services: ["Despacho a domicilio", "Consulta farmacéutica", "Vacunatorio"],
    schedule: {
      Lunes: "9:00 - 20:00",
      Martes: "9:00 - 20:00",
      Miércoles: "9:00 - 20:00",
      Jueves: "9:00 - 20:00",
      Viernes: "9:00 - 20:00",
      Sábado: "10:00 - 17:00",
      Domingo: "Cerrado",
    },
  },
];

const mockProducts = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    brand: "Laboratorio Chile",
    category: "Analgésicos",
    dosage: "500mg",
    price: 3990,
    discountPercentage: 30,
    pharmacyId: "101",
    imageUrl: "/images/product-placeholder.jpg",
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días después
  },
  {
    id: "2",
    name: "Ibuprofeno 400mg",
    brand: "Laboratorio Bagó",
    category: "Antiinflamatorios",
    dosage: "400mg",
    price: 4590,
    discountPercentage: 25,
    pharmacyId: "101",
    imageUrl: "/images/product-placeholder.jpg",
    expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 días después
  },
  {
    id: "3",
    name: "Loratadina 10mg",
    brand: "MK",
    category: "Antialérgicos",
    dosage: "10mg",
    price: 2990,
    discountPercentage: 15,
    pharmacyId: "101",
    imageUrl: "/images/product-placeholder.jpg",
    expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 días después
  },
  {
    id: "4",
    name: "Omeprazol 20mg",
    brand: "Mintlab",
    category: "Gastrointestinales",
    dosage: "20mg",
    price: 5290,
    discountPercentage: 35,
    pharmacyId: "101",
    imageUrl: "/images/product-placeholder.jpg",
    expiryDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 días después
  },
  {
    id: "5",
    name: "Losartán 50mg",
    brand: "Gador",
    category: "Antihipertensivos",
    dosage: "50mg",
    price: 6990,
    discountPercentage: 20,
    pharmacyId: "102",
    imageUrl: "/images/product-placeholder.jpg",
    expiryDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000), // 35 días después
  },
  {
    id: "6",
    name: "Amoxicilina 500mg",
    brand: "Eurofarma",
    category: "Antibióticos",
    dosage: "500mg",
    price: 7490,
    discountPercentage: 40,
    pharmacyId: "102",
    imageUrl: "/images/product-placeholder.jpg",
    expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 días después
  },
];

// Propiedades computadas
const categories = computed(() => {
  const uniqueCategories = [
    ...new Set(products.value.map((product) => product.category)),
  ];
  return uniqueCategories;
});

const filteredProducts = computed(() => {
  let result = [...products.value];

  // Aplicar filtro de categoría
  if (filterCategory.value) {
    result = result.filter(
      (product) => product.category === filterCategory.value
    );
  }

  // Aplicar ordenamiento
  switch (sortBy.value) {
    case "discount":
      result.sort((a, b) => b.discountPercentage - a.discountPercentage);
      break;
    case "expiry":
      result.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
      break;
    case "priceAsc":
      result.sort(
        (a, b) =>
          calculateDiscountedPrice(a.price, a.discountPercentage) -
          calculateDiscountedPrice(b.price, b.discountPercentage)
      );
      break;
    case "priceDesc":
      result.sort(
        (a, b) =>
          calculateDiscountedPrice(b.price, b.discountPercentage) -
          calculateDiscountedPrice(a.price, a.discountPercentage)
      );
      break;
  }

  return result;
});

// Métodos
const fetchPharmacy = async () => {
  try {
    loading.value = true;
    error.value = null;

    const pharmacyId = route.params.id;

    // Simular llamada a API con retraso
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Buscar farmacia en datos de muestra
    const foundPharmacy = mockPharmacies.find((p) => p.id === pharmacyId);

    if (!foundPharmacy) {
      error.value = "Farmacia no encontrada";
      return;
    }

    pharmacy.value = foundPharmacy;

    // Filtrar productos de esta farmacia
    products.value = mockProducts.filter(
      (p) => p.pharmacyId === foundPharmacy.id
    );
  } catch (err) {
    console.error("Error al cargar la farmacia:", err);
    error.value =
      "No se pudo cargar la información de la farmacia. Por favor, intenta nuevamente.";
  } finally {
    loading.value = false;
  }
};

const resetFilters = () => {
  filterCategory.value = "";
  sortBy.value = "discount";
};

const calculateDiscountedPrice = (price, discountPercentage) => {
  return price - price * (discountPercentage / 100);
};

const formatPrice = (price) => {
  return price.toLocaleString("es-CL");
};

const handleImageError = (event) => {
  event.target.src = "/images/pharmacy-placeholder.jpg";
};

// Cargar datos al montar el componente
onMounted(() => {
  fetchPharmacy();
});

// Configuración de metadatos de la página
definePageMeta({
  layout: "default",
});
</script>
