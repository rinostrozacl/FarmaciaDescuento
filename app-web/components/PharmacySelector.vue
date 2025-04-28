<template>
  <div class="pharmacy-selector">
    <h3 class="text-xl font-semibold text-secondary-color mb-4">
      Disponible en estas farmacias
    </h3>

    <!-- Información de disponibilidad -->
    <div class="availability-info flex items-center mb-4 text-gray-dark">
      <i class="fas fa-store mr-2 text-lg text-secondary-color"></i>
      Disponible en
      <span class="font-medium text-secondary-color mx-1">{{
        pharmacies.length
      }}</span>
      farmacias
    </div>

    <!-- Lista de farmacias -->
    <div class="pharmacy-options border rounded-lg overflow-hidden mb-6">
      <div
        v-for="pharmacy in pharmacies"
        :key="pharmacy.id"
        class="pharmacy-option border-b last:border-b-0"
      >
        <div class="flex items-center">
          <!-- Radio button -->
          <input
            type="radio"
            :id="pharmacy.id"
            :value="pharmacy.id"
            v-model="selectedPharmacyId"
            class="hidden"
          />

          <!-- Label con la información de la farmacia -->
          <label
            :for="pharmacy.id"
            class="w-full p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            :class="{ selected: selectedPharmacyId === pharmacy.id }"
          >
            <div class="flex justify-between items-start mb-1">
              <span class="pharmacy-name font-medium text-secondary-color">{{
                pharmacy.name
              }}</span>
              <span
                class="pharmacy-price text-lg font-semibold text-accent-color"
                >${{ pharmacy.finalPrice.toLocaleString("es-CL") }}</span
              >
            </div>

            <div class="pharmacy-address text-sm text-gray-dark mb-2">
              {{ pharmacy.address }}
            </div>

            <div
              class="pharmacy-details flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-dark"
            >
              <span class="flex items-center">
                <i class="fas fa-map-marker-alt text-primary-color mr-1"></i>
                {{ pharmacy.distance }} km
              </span>
              <span class="flex items-center">
                <i class="fas fa-cube text-secondary-color mr-1"></i>
                Stock: {{ pharmacy.stock }} unidades
              </span>
              <span class="flex items-center">
                <i class="fas fa-flask text-accent-color mr-1"></i>
                {{ pharmacy.laboratory }}
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!-- Botón para agregar al carrito -->
    <button
      @click="addToCart"
      class="w-full py-3 bg-primary-color text-white font-medium rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="!selectedPharmacyId"
    >
      Agregar al Carrito
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "~/stores/cart";

const props = defineProps({
  pharmacies: {
    type: Array,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
});

const cartStore = useCartStore();
const selectedPharmacyId = ref("");

// Farmacia seleccionada
const selectedPharmacy = computed(() => {
  if (!selectedPharmacyId.value) return null;
  return props.pharmacies.find((p) => p.id === selectedPharmacyId.value);
});

// Agregar al carrito
const addToCart = () => {
  if (!selectedPharmacy.value) return;

  cartStore.addItem({
    id: Date.now().toString(), // ID único para el item del carrito
    productId: props.productId,
    pharmacyId: selectedPharmacy.value.id,
    name: props.productName,
    pharmacyName: selectedPharmacy.value.name,
    price: selectedPharmacy.value.finalPrice,
    originalPrice: selectedPharmacy.value.originalPrice,
    quantity: 1,
    image: props.productImage,
  });
};
</script>

<style scoped>
.pharmacy-option .selected {
  background-color: #f0f9f8;
  border-left: 4px solid var(--primary-color);
}
</style>
