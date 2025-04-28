<template>
  <div class="product-gallery">
    <!-- Imagen principal -->
    <div class="main-image bg-white p-4 rounded-lg shadow-sm mb-4">
      <div class="relative aspect-square bg-gray-light rounded overflow-hidden">
        <img
          :src="currentImage"
          :alt="alt"
          class="w-full h-full object-contain"
        />

        <!-- Controles -->
        <template v-if="images.length > 1">
          <button
            @click="prevImage"
            class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-light"
            :disabled="currentIndex === 0"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <button
            @click="nextImage"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-light"
            :disabled="currentIndex === images.length - 1"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </template>
      </div>
    </div>

    <!-- Miniaturas -->
    <div v-if="images.length > 1" class="thumbnails grid grid-cols-4 gap-2">
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="currentIndex = index"
        class="aspect-square bg-white p-1 rounded border"
        :class="{ 'border-primary-color': currentIndex === index }"
      >
        <div class="w-full h-full bg-gray-light rounded overflow-hidden">
          <img
            :src="image"
            :alt="`${alt} - imagen ${index + 1}`"
            class="w-full h-full object-contain"
          />
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
    validator: (value) => value.length > 0,
  },
  alt: {
    type: String,
    required: true,
  },
});

// Índice de la imagen actual
const currentIndex = ref(0);

// Imagen actual
const currentImage = computed(() => {
  return props.images[currentIndex.value];
});

// Métodos para navegación
const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const nextImage = () => {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++;
  }
};

// Soporte para gestos táctiles
let touchStartX = 0;
let touchEndX = 0;

const handleTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
};

const handleSwipe = () => {
  const swipeThreshold = 50;
  const diff = touchEndX - touchStartX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      prevImage();
    } else {
      nextImage();
    }
  }
};

// Agregar event listeners para gestos táctiles
onMounted(() => {
  const gallery = document.querySelector(".product-gallery");
  gallery.addEventListener("touchstart", handleTouchStart);
  gallery.addEventListener("touchend", handleTouchEnd);
});

// Limpiar event listeners
onUnmounted(() => {
  const gallery = document.querySelector(".product-gallery");
  gallery.removeEventListener("touchstart", handleTouchStart);
  gallery.removeEventListener("touchend", handleTouchEnd);
});
</script>

<style scoped>
.product-gallery {
  user-select: none;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
