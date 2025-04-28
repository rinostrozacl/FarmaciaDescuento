<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">
      Productos con Descuento
    </h1>

    <!-- Filtros y búsqueda -->
    <div class="bg-white p-4 rounded-lg border border-gray-200 mb-6">
      <h2 class="text-lg font-medium mb-4">Buscar productos</h2>
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Nombre del producto, marca, etc."
              class="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none"
              @input="filterProducts"
            />
            <button
              class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 mt-4">
        <div class="md:w-1/3">
          <label class="block mb-2 text-sm font-medium text-gray-700"
            >Categoría</label
          >
          <select
            v-model="filters.category"
            class="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none"
            @change="filterProducts"
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

        <div class="md:w-1/3">
          <label class="block mb-2 text-sm font-medium text-gray-700"
            >Ordenar por</label
          >
          <select
            v-model="filters.orderBy"
            class="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none"
            @change="filterProducts"
          >
            <option value="discount">Mayor descuento</option>
            <option value="expiry">Próximos a vencer</option>
            <option value="priceAsc">Precio: menor a mayor</option>
            <option value="priceDesc">Precio: mayor a menor</option>
          </select>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 mt-4">
        <div class="bg-gray-100 text-sm px-3 py-1 rounded-full">
          Descuentos +50% <button class="ml-1 text-gray-500">&times;</button>
        </div>
        <div class="bg-gray-100 text-sm px-3 py-1 rounded-full">
          Envío gratis <button class="ml-1 text-gray-500">&times;</button>
        </div>
        <div class="bg-gray-100 text-sm px-3 py-1 rounded-full">
          Próximos a vencer <button class="ml-1 text-gray-500">&times;</button>
        </div>
      </div>
    </div>

    <!-- Cargando -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"
      ></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="bg-red-100 p-4 rounded-lg text-red-700 mb-6">
      {{ error }}
    </div>

    <!-- Sin resultados -->
    <div
      v-else-if="filteredProducts.length === 0"
      class="bg-gray-100 p-8 rounded-lg text-center my-8"
    >
      <h3 class="text-xl font-semibold text-gray-700 mb-2">
        No se encontraron productos
      </h3>
      <p class="text-gray-600">
        Intenta con otros términos de búsqueda o filtros.
      </p>
    </div>

    <!-- Lista de productos -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <ProductCard
        v-for="product in paginatedProducts"
        :key="product.id"
        :product="product"
        @view-details="viewDetails"
        @add-to-cart="addToCart"
      />
    </div>

    <!-- Paginación -->
    <div v-if="filteredProducts.length > 0" class="flex justify-center mt-8">
      <button
        v-for="page in totalPages"
        :key="page"
        :class="[
          'mx-1 px-3 py-1 rounded',
          currentPage === page
            ? 'bg-teal-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
        ]"
        @click="currentPage = page"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import ProductCard from "~/components/product/ProductCard.vue";

// Estados
const loading = ref(true);
const error = ref(null);
const products = ref([]);
const filteredProducts = ref([]);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 12;
const filters = reactive({
  category: "",
  orderBy: "discount",
});

// Datos de muestra para pruebas (reemplazar con llamada a API)
const mockProducts = [
  {
    id: "1",
    name: "Paracetamol",
    brand: "Laboratorio Chile",
    category: "Analgésicos",
    activeIngredient: "Paracetamol",
    dosage: "500mg",
    presentation: "Caja 20 comprimidos",
    description: "Alivia el dolor y reduce la fiebre",
    price: 3990,
    discountPercentage: 30,
    imageUrl: "/images/products/paracetamol.png",
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días después
    pharmacyName: "Farmacia Central",
    pharmacyId: "101",
  },
  {
    id: "2",
    name: "Ibuprofeno",
    brand: "Laboratorio Bagó",
    category: "Antiinflamatorios",
    activeIngredient: "Ibuprofeno",
    dosage: "400mg",
    presentation: "Caja 30 comprimidos",
    description: "Alivia el dolor y reduce la inflamación",
    price: 4590,
    discountPercentage: 25,
    imageUrl: "/images/products/ibuprofeno.png",
    expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 días después
    pharmacyName: "Farmacia del Barrio",
    pharmacyId: "102",
  },
  {
    id: "3",
    name: "Loratadina",
    brand: "MK",
    category: "Antialérgicos",
    activeIngredient: "Loratadina",
    dosage: "10mg",
    presentation: "Caja 10 comprimidos",
    description: "Alivia los síntomas de la alergia",
    price: 2990,
    discountPercentage: 15,
    imageUrl: "/images/products/loratadina.png",
    expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 días después
    pharmacyName: "Farmacia del Sur",
    pharmacyId: "103",
  },
  {
    id: "4",
    name: "Omeprazol",
    brand: "Recalcine",
    category: "Antiácidos",
    activeIngredient: "Omeprazol",
    dosage: "20mg",
    presentation: "Caja 14 comprimidos",
    description: "Para el tratamiento de la acidez y úlceras gástricas",
    price: 5990,
    discountPercentage: 40,
    imageUrl: "/images/products/omeprazol.png",
    expiryDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 días después
    pharmacyName: "Farmacia del Norte",
    pharmacyId: "104",
  },
  {
    id: "5",
    name: "Vitamina C",
    brand: "GNC",
    category: "Vitaminas",
    activeIngredient: "Ácido ascórbico",
    dosage: "1000mg",
    presentation: "Frasco 60 comprimidos",
    description:
      "Suplemento de vitamina C para fortalecer el sistema inmunológico",
    price: 7990,
    discountPercentage: 35,
    imageUrl: "/images/products/paracetamol.png", // Usar imagen placeholder
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 días después
    pharmacyName: "Farmacia Bienestar",
    pharmacyId: "105",
  },
  {
    id: "6",
    name: "Aspirina",
    brand: "Bayer",
    category: "Analgésicos",
    activeIngredient: "Ácido acetilsalicílico",
    dosage: "100mg",
    presentation: "Caja 28 comprimidos",
    description: "Antiinflamatorio, analgésico y anticoagulante",
    price: 3490,
    discountPercentage: 20,
    imageUrl: "/images/products/ibuprofeno.png", // Usar imagen placeholder
    expiryDate: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000), // 70 días después
    pharmacyName: "Farmacia Central",
    pharmacyId: "101",
  },
];

// Valores computados
const categories = computed(() => {
  return [...new Set(products.value.map((product) => product.category))];
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

// Métodos
const fetchProducts = async () => {
  try {
    loading.value = true;
    error.value = null;

    // Simular llamada a API con retraso
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Usar datos de muestra para desarrollo
    products.value = mockProducts;
    filterProducts();
  } catch (err) {
    console.error("Error al cargar productos:", err);
    error.value =
      "No se pudieron cargar los productos. Intenta de nuevo más tarde.";
  } finally {
    loading.value = false;
  }
};

const filterProducts = () => {
  let result = [...products.value];

  // Filtrar por búsqueda
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.activeIngredient.toLowerCase().includes(query)
    );
  }

  // Filtrar por categoría
  if (filters.category) {
    result = result.filter((product) => product.category === filters.category);
  }

  // Ordenar
  switch (filters.orderBy) {
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

  filteredProducts.value = result;
  currentPage.value = 1; // Reiniciar paginación
};

const calculateDiscountedPrice = (price, discountPercentage) => {
  return price * (1 - discountPercentage / 100);
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CL").format(Math.round(price));
};

const getDaysUntilExpiry = (expiryDate) => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = Math.abs(expiry - now);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const handleImageError = (e) => {
  // Obtener el nombre del producto del alt de la imagen
  const productName = e.target.alt || "";
  const lowerName = productName.toLowerCase();

  // Asignar la imagen correspondiente según el nombre del producto
  if (lowerName.includes("paracetamol")) {
    e.target.src = "/images/products/paracetamol.png";
  } else if (lowerName.includes("ibuprofeno")) {
    e.target.src = "/images/products/ibuprofeno.png";
  } else if (lowerName.includes("loratadina")) {
    e.target.src = "/images/products/loratadina.png";
  } else if (lowerName.includes("omeprazol")) {
    e.target.src = "/images/products/omeprazol.png";
  } else {
    e.target.src = "/images/products/paracetamol.png"; // Imagen por defecto
  }
};

const viewDetails = (product) => {
  navigateTo(`/productos/${product.id}`);
};

const addToCart = (product) => {
  // Implementar lógica para agregar al carrito (por ahora solo mostramos alerta)
  alert(`Producto agregado al carrito: ${product.name}`);
};

// Inicializar
onMounted(fetchProducts);
</script>
