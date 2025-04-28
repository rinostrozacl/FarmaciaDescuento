<template>
  <div class="fixed inset-0 overflow-hidden z-50">
    <!-- Overlay de fondo oscuro -->
    <div
      class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      @click="closeCart"
    ></div>

    <!-- Panel lateral del carrito -->
    <div class="absolute inset-y-0 right-0 max-w-full flex">
      <div class="relative w-screen max-w-md">
        <div class="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
          <!-- Cabecera del carrito -->
          <div class="px-4 py-6 bg-green-600 sm:px-6">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-medium text-white">Carrito de compras</h2>
              <button
                @click="closeCart"
                class="text-white hover:text-gray-200 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
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
            </div>
            <div class="mt-1">
              <p class="text-sm text-green-100">
                {{ cartItemsCount }} producto{{
                  cartItemsCount === 1 ? "" : "s"
                }}
                en tu carrito
              </p>
            </div>
          </div>

          <!-- Contenido del carrito -->
          <div class="flex-1 overflow-y-auto p-4 sm:p-6">
            <div v-if="loading" class="flex justify-center py-10">
              <div
                class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"
              ></div>
            </div>

            <div
              v-else-if="error"
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            >
              {{ error }}
            </div>

            <div v-else-if="!hasItems" class="text-center py-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-16 w-16 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p class="text-lg text-gray-600">Tu carrito está vacío</p>
              <p class="text-gray-500 mt-1 mb-4">
                ¡Explora nuestros productos con descuento!
              </p>
              <button
                @click="goToProducts"
                class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Ver productos
              </button>
            </div>

            <div v-else>
              <!-- Lista de productos en el carrito -->
              <ul class="divide-y divide-gray-200">
                <li v-for="item in cartItems" :key="item.id" class="py-6 flex">
                  <!-- Imagen del producto -->
                  <div
                    class="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden"
                  >
                    <img
                      :src="item.image"
                      :alt="item.name"
                      class="w-full h-full object-center object-cover"
                    />
                  </div>

                  <!-- Detalles del producto -->
                  <div class="ml-4 flex-1 flex flex-col">
                    <div class="flex justify-between">
                      <div>
                        <h3 class="text-sm font-medium text-gray-900">
                          {{ item.name }}
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">
                          {{ item.pharmacy }}
                        </p>
                      </div>
                      <p class="text-sm font-medium text-gray-900">
                        ${{ formatPrice(item.price * item.quantity) }}
                      </p>
                    </div>

                    <!-- Precios y descuentos -->
                    <div class="mt-1 flex items-center">
                      <span class="text-xs line-through text-gray-500">
                        ${{ formatPrice(item.originalPrice * item.quantity) }}
                      </span>
                      <span class="ml-2 text-xs text-green-600">
                        {{ calculateDiscount(item.originalPrice, item.price) }}%
                        descuento
                      </span>
                    </div>

                    <!-- Controles de cantidad y eliminar -->
                    <div class="flex-1 flex items-end justify-between text-sm">
                      <div class="flex items-center border rounded-md">
                        <button
                          @click="decreaseQuantity(item)"
                          class="px-2 py-1 text-gray-600 hover:text-gray-800"
                          :disabled="item.quantity <= 1"
                          :class="{
                            'opacity-50 cursor-not-allowed': item.quantity <= 1,
                          }"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span class="px-2 py-1 text-gray-800">{{
                          item.quantity
                        }}</span>
                        <button
                          @click="increaseQuantity(item)"
                          class="px-2 py-1 text-gray-600 hover:text-gray-800"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>

                      <button
                        @click="removeItem(item.id)"
                        class="text-red-600 hover:text-red-800"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              </ul>

              <!-- Resumen del carrito -->
              <div class="mt-6 border-t border-gray-200 pt-6">
                <div
                  class="flex justify-between text-base font-medium text-gray-900 mb-2"
                >
                  <p>Subtotal</p>
                  <p>${{ formatPrice(subtotal) }}</p>
                </div>
                <div
                  class="flex justify-between text-base font-medium text-green-600 mb-4"
                >
                  <p>Ahorro total</p>
                  <p>${{ formatPrice(savings) }}</p>
                </div>
                <p class="text-xs text-gray-500 mb-6">
                  Retiro en farmacia. No incluye envío.
                </p>
                <button
                  @click="goToCheckout"
                  class="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 flex items-center justify-center"
                  :disabled="isCheckoutDisabled"
                  :class="{
                    'opacity-70 cursor-not-allowed': isCheckoutDisabled,
                  }"
                >
                  <span v-if="isCreatingTicket">Procesando...</span>
                  <span v-else>Generar ticket de reserva</span>
                </button>
                <div class="mt-3">
                  <button
                    @click="closeCart"
                    class="w-full border border-gray-300 bg-white text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
                  >
                    Seguir comprando
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "~/stores/cart";
import { useToast } from "~/composables/useToast";

// Definir props y emits
defineEmits(["close"]);

// Obtener el store y router
const cartStore = useCartStore();
const router = useRouter();
const { showToast } = useToast();

// Estados computados desde el store
const cartItems = computed(() => cartStore.items);
const cartItemsCount = computed(() => cartStore.totalItems);
const hasItems = computed(() => cartStore.hasItems);
const subtotal = computed(() => cartStore.totalAmount);
const savings = computed(() => cartStore.totalSavings);
const loading = computed(() => cartStore.loading);
const error = computed(() => cartStore.error);

// Estado adicional
const isCreatingTicket = ref(false);
const isCheckoutDisabled = computed(
  () => !hasItems.value || isCreatingTicket.value
);

// Métodos
const closeCart = () => {
  cartStore.closeCart();
};

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const calculateDiscount = (originalPrice: number, discountedPrice: number) => {
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(discount);
};

const increaseQuantity = (item: any) => {
  cartStore.updateQuantity(item.id, item.quantity + 1);
};

const decreaseQuantity = (item: any) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.id, item.quantity - 1);
  }
};

const removeItem = (itemId: string) => {
  cartStore.removeItem(itemId);
};

const goToProducts = () => {
  closeCart();
  router.push("/productos");
};

const goToCheckout = async () => {
  try {
    isCreatingTicket.value = true;
    // Aquí iría la lógica para generar el ticket de reserva
    const ticketId = await cartStore.createTicket();

    // Simular un retraso para mostrar la animación de carga
    setTimeout(() => {
      isCreatingTicket.value = false;
      closeCart();

      showToast({
        message: `Ticket #${ticketId} generado con éxito`,
        type: "success",
      });

      // Redireccionar al detalle del ticket
      router.push(`/mis-tickets`);
    }, 1500);
  } catch (error: any) {
    isCreatingTicket.value = false;
    showToast({
      message: error.message || "Error al generar el ticket",
      type: "error",
    });
  }
};
</script>
