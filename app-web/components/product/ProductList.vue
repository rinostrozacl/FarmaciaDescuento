<template>
  <div>
    <div v-if="loading" class="flex h-40 w-full items-center justify-center">
      <div class="flex flex-col items-center">
        <svg
          class="h-10 w-10 animate-spin text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p class="mt-2 text-gray-600">Cargando productos...</p>
      </div>
    </div>

    <div
      v-else-if="products.length === 0"
      class="flex h-40 w-full flex-col items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p class="mt-2 text-center text-lg text-gray-600">
        No se encontraron productos
      </p>
      <p class="text-center text-gray-500">
        Intenta con otra búsqueda o ajusta los filtros
      </p>
    </div>

    <div v-else>
      <div class="mb-4 text-sm text-gray-600">
        {{ products.length }} productos encontrados
      </div>

      <div
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
          @view-details="viewDetails"
        />
      </div>

      <div v-if="hasMoreProducts" class="mt-8 flex justify-center">
        <button
          @click="loadMore"
          class="rounded-lg border border-primary bg-white px-6 py-2 text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          :class="{ 'cursor-not-allowed opacity-50': loadingMore }"
          :disabled="loadingMore"
        >
          <span v-if="loadingMore">Cargando...</span>
          <span v-else>Cargar más productos</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ProductCard from "./ProductCard.vue";

const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  hasMoreProducts: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["load-more", "add-to-cart"]);

const router = useRouter();
const store = useStore();
const loadingMore = ref(false);

const loadMore = async () => {
  if (loadingMore.value) return;

  loadingMore.value = true;
  try {
    await emit("load-more");
  } finally {
    loadingMore.value = false;
  }
};

const viewDetails = (productId) => {
  router.push(`/productos/${productId}`);
};

const addToCart = (product) => {
  store.dispatch("cart/addItem", {
    id: product.id,
    name: product.name,
    price: product.price,
    discountPrice: product.discountPrice,
    pharmacy: product.pharmacy,
    image: product.image,
    quantity: 1,
  });

  store.dispatch("ui/showToast", {
    message: `${product.name} ha sido añadido al carrito`,
    type: "success",
  });

  emit("add-to-cart", product);
};
</script>
