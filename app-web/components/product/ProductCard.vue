<template>
  <div
    class="product-card group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 h-full flex flex-col"
  >
    <!-- Imagen del producto con etiqueta de descuento -->
    <div class="relative h-48 overflow-hidden bg-gray-100">
      <img
        :src="productImage"
        :alt="product.name"
        class="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        @error="onImageError"
      />
      <div
        v-if="productDiscountPercentage > 0"
        class="absolute left-0 top-0 bg-accent px-2 py-1 text-sm font-bold text-white shadow-md"
      >
        -{{ productDiscountPercentage }}%
      </div>

      <!-- Días restantes para vencimiento -->
      <div
        v-if="daysUntilExpiry <= 30"
        :class="[
          'absolute bottom-0 right-0 px-2 py-1 text-xs font-medium text-white',
          daysUntilExpiry <= 7 ? 'bg-red-600' : 'bg-black/70',
        ]"
      >
        {{ expiryText }}
      </div>

      <!-- Etiqueta de disponibilidad -->
      <div
        v-if="isAvailable"
        class="absolute top-0 right-0 bg-green-500 px-2 py-1 text-xs font-medium text-white shadow-md"
      >
        Disponible
      </div>
      <div
        v-else
        class="absolute top-0 right-0 bg-gray-500 px-2 py-1 text-xs font-medium text-white shadow-md"
      >
        Agotado
      </div>
    </div>

    <!-- Información del producto -->
    <div class="p-4 flex flex-col flex-grow">
      <!-- Categoría -->
      <div class="mb-1">
        <span
          class="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
          >{{ productCategory }}</span
        >
      </div>

      <!-- Nombre del producto -->
      <h3
        class="line-clamp-2 h-12 text-sm font-semibold text-gray-800 md:text-base"
        :title="product.name"
      >
        {{ product.name }}
      </h3>

      <!-- Sección inferior de info y botón -->
      <div class="">
        <!-- Precios -->
        <div class="mb-1">
          <span class="text-lg font-bold text-primary">
            desde ${{ formatPrice(discountedPrice) }}
          </span>
        </div>

        <!-- Disponibilidad en farmacias -->
        <div class="mb-4 flex items-center text-sm text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1 h-4 w-4 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <span>Disponible en {{ getPharmacyCount }} farmacias</span>
        </div>

        <!-- Botón de acción -->
        <div class="flex">
          <button
            @click="$emit('view-details', product)"
            class="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
          >
            Ver ofertas
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

defineEmits(["view-details", "add-to-cart"]);

// Estado para la animación de agregar al carrito
const addingToCart = ref(false);

// Función para simular la añadida al carrito con animación
function addToCartWithAnimation() {
  if (!isAvailable.value || addingToCart.value) return;

  addingToCart.value = true;

  // Simular la acción de añadir al carrito
  setTimeout(() => {
    addingToCart.value = false;
    $emit("add-to-cart", props.product);
  }, 600);
}

// Imagen de respaldo en caso de error
const fallbackImage = "/images/products/paracetamol.png";

// Obtener nombre de producto para elegir imagen alternativa
const getProductImageByName = (name) => {
  // Intentar identificar producto por nombre para usar imagen específica
  const lowerName = name.toLowerCase();
  if (lowerName.includes("paracetamol")) {
    return "/images/products/paracetamol.png";
  } else if (lowerName.includes("ibuprofeno")) {
    return "/images/products/ibuprofeno.png";
  } else if (lowerName.includes("loratadina")) {
    return "/images/products/loratadina.png";
  } else if (lowerName.includes("omeprazol")) {
    return "/images/products/omeprazol.png";
  }
  // Imagen predeterminada si no coincide con ningún nombre
  return "/images/products/paracetamol.png";
};

// Manejar error de carga de imagen
function onImageError(e) {
  e.target.src = getProductImageByName(props.product.name || "");
}

// Manejar la flexibilidad en la estructura de datos del producto
const productImage = computed(() => {
  return props.product.image || props.product.imageUrl || fallbackImage;
});

const productCategory = computed(() => {
  return (
    props.product.category ||
    (props.product.tags && props.product.tags.length > 0
      ? props.product.tags[0]
      : "")
  );
});

const productDiscountPercentage = computed(() => {
  if (props.product.discountPercentage !== undefined) {
    return props.product.discountPercentage;
  }
  if (typeof props.product.discount === "string") {
    // Extraer el número del formato "-30%"
    return parseInt(props.product.discount.replace(/-|%/g, "")) || 0;
  }
  if (typeof props.product.discount === "number") {
    return props.product.discount;
  }
  // Calcular el porcentaje si tenemos precio original y con descuento
  if (productOriginalPrice.value > 0 && discountedPrice.value > 0) {
    return Math.round(
      (1 - discountedPrice.value / productOriginalPrice.value) * 100
    );
  }
  return 0;
});

const productOriginalPrice = computed(() => {
  if (props.product.originalPrice !== undefined) {
    if (typeof props.product.originalPrice === "number") {
      return props.product.originalPrice;
    }
    if (typeof props.product.originalPrice === "string") {
      // Extraer el número del formato "$5.990"
      return parseInt(props.product.originalPrice.replace(/[$,.]/g, "")) || 0;
    }
  }
  if (props.product.price !== undefined) {
    return typeof props.product.price === "number"
      ? props.product.price
      : parseInt(props.product.price.replace(/[$,.]/g, "")) || 0;
  }
  if (props.product.regularPrice !== undefined) {
    return typeof props.product.regularPrice === "number"
      ? props.product.regularPrice
      : parseInt(props.product.regularPrice.replace(/[$,.]/g, "")) || 0;
  }
  return 0;
});

// Función para formatear precios en formato chileno
const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CL").format(price);
};

// Calcular precio con descuento
const discountedPrice = computed(() => {
  if (props.product.discountedPrice !== undefined) {
    if (typeof props.product.discountedPrice === "number") {
      return props.product.discountedPrice;
    }
    if (typeof props.product.discountedPrice === "string") {
      // Extraer el número del formato "desde $3.590"
      return (
        parseInt(props.product.discountedPrice.replace(/[^0-9]/g, "")) || 0
      );
    }
  }

  // Si no hay precio con descuento explícito pero hay porcentaje de descuento
  if (productOriginalPrice.value > 0 && productDiscountPercentage.value > 0) {
    const discount =
      productOriginalPrice.value * (productDiscountPercentage.value / 100);
    return Math.round(productOriginalPrice.value - discount);
  }

  // Si no hay información suficiente, devolver el precio original
  return productOriginalPrice.value;
});

const productPharmacy = computed(() => {
  if (props.product.pharmacy) {
    return props.product.pharmacy;
  }
  return {
    name:
      props.product.pharmacyName ||
      (props.product.pharmacies
        ? `Disponible en ${props.product.pharmacies} farmacias`
        : "Farmacia"),
    distance: props.product.distance || 0,
  };
});

// Calcular días hasta vencimiento
const expiryDate = computed(() => {
  if (props.product.expiryDate) {
    return new Date(props.product.expiryDate);
  }
  if (props.product.expiration) {
    // Convertir formato "15/05/2025" a Date
    const parts = props.product.expiration.split("/");
    if (parts.length === 3) {
      return new Date(parts[2], parts[1] - 1, parts[0]);
    }
  }
  // Valor por defecto: 30 días a partir de hoy
  const defaultExpiry = new Date();
  defaultExpiry.setDate(defaultExpiry.getDate() + 30);
  return defaultExpiry;
});

const daysUntilExpiry = computed(() => {
  const now = new Date();
  const diffTime = expiryDate.value - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Texto de vencimiento
const expiryText = computed(() => {
  if (daysUntilExpiry.value <= 0) {
    return "Vence hoy";
  } else if (daysUntilExpiry.value === 1) {
    return "Vence mañana";
  } else if (daysUntilExpiry.value <= 7) {
    return `Vence en ${daysUntilExpiry.value} días`;
  } else if (daysUntilExpiry.value <= 30) {
    return `Vence en ${Math.floor(daysUntilExpiry.value / 7)} semanas`;
  }
  return "";
});

// Verificar disponibilidad del producto
const isAvailable = computed(() => {
  // Si el producto tiene un campo de disponibilidad explícito, usarlo
  if (props.product.available !== undefined) {
    return props.product.available;
  }

  // Si tiene stock definido, verificar que sea mayor a 0
  if (props.product.stock !== undefined) {
    return props.product.stock > 0;
  }

  // Si tiene farmacias asociadas, asumir que está disponible
  if (
    props.product.pharmacies &&
    typeof props.product.pharmacies === "number"
  ) {
    return props.product.pharmacies > 0;
  }

  // Por defecto, asumir que está disponible
  return true;
});

// Obtener cantidad de farmacias
const getPharmacyCount = computed(() => {
  if (props.product.pharmacies !== undefined) {
    return typeof props.product.pharmacies === "number"
      ? props.product.pharmacies
      : parseInt(props.product.pharmacies) || getRandomFarmacyCount();
  }

  if (props.product.pharmacyCount !== undefined) {
    return props.product.pharmacyCount;
  }

  return getRandomFarmacyCount();
});

// Función para generar un número aleatorio de farmacias entre 1 y 10
// para demo y por diversidad visual cuando no se proporciona un valor real
const getRandomFarmacyCount = () => {
  // Usar el id del producto como semilla si está disponible
  if (props.product.id) {
    // Convertir el id a un número si es una cadena
    const numericId =
      typeof props.product.id === "number"
        ? props.product.id
        : parseInt(props.product.id.replace(/\D/g, "")) ||
          Math.floor(Math.random() * 10) + 1;

    // Usar módulo para obtener un número entre 1 y 10
    return (numericId % 10) + 1;
  }

  // Si no hay id, generar un número aleatorio entre 1 y 10
  return Math.floor(Math.random() * 10) + 1;
};
</script>

<style scoped>
.product-card {
  transition: all 0.2s ease-in-out;
  position: relative;
}

.product-card:hover {
  transform: translateY(-5px);
}

.fallback-image {
  filter: grayscale(0.5);
}

/* Para evitar que los nombres de productos largos rompan el diseño */
h3 {
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-word;
}
</style>
