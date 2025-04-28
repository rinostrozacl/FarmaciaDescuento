<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-gray-800 mb-8">Carrito de Compras</h1>

    <!-- Carrito vacío -->
    <div v-if="isEmpty" class="bg-white rounded-lg shadow-md p-8 text-center">
      <div class="text-6xl text-gray-300 mb-4">🛒</div>
      <h2 class="text-xl font-semibold text-gray-700 mb-4">
        Tu carrito está vacío
      </h2>
      <p class="text-gray-600 mb-6">
        Parece que aún no has agregado productos a tu carrito.
      </p>
      <NuxtLink
        to="/productos"
        class="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-medium"
      >
        Explorar productos
      </NuxtLink>
    </div>

    <!-- Carrito con productos -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Lista de productos en el carrito -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <!-- Encabezado de la tabla -->
          <div class="p-4 bg-gray-50 border-b">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-6 font-medium text-gray-700">Producto</div>
              <div class="col-span-2 font-medium text-gray-700 text-center">
                Precio
              </div>
              <div class="col-span-2 font-medium text-gray-700 text-center">
                Cantidad
              </div>
              <div class="col-span-2 font-medium text-gray-700 text-right">
                Subtotal
              </div>
            </div>
          </div>

          <!-- Lista de productos -->
          <div
            v-for="(item, index) in cartItems"
            :key="item.id"
            class="p-4 border-b"
          >
            <div class="grid grid-cols-12 gap-4 items-center">
              <!-- Producto (imagen y nombre) -->
              <div class="col-span-6">
                <div class="flex items-center">
                  <div class="w-16 h-16 mr-4 flex-shrink-0">
                    <img
                      v-if="item.imageUrl"
                      :src="item.imageUrl"
                      :alt="item.name"
                      class="w-full h-full object-contain"
                      @error="handleImageError"
                    />
                    <div
                      v-else
                      class="w-full h-full flex items-center justify-center bg-gray-100"
                    >
                      <span class="text-gray-400 text-2xl">📦</span>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-sm md:text-base font-medium text-gray-800">
                      {{ item.name }}
                    </h3>
                    <p class="text-xs text-gray-500">{{ item.pharmacyName }}</p>
                    <div class="flex items-center mt-2">
                      <button
                        @click="removeItem(index)"
                        class="text-red-500 hover:text-red-700 text-xs flex items-center"
                      >
                        <span class="mr-1">×</span> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Precio unitario -->
              <div class="col-span-2 text-center">
                <p class="text-gray-800 font-medium">
                  ${{ formatPrice(item.price) }}
                </p>
                <p
                  v-if="item.regularPrice > item.price"
                  class="text-xs text-gray-500 line-through"
                >
                  ${{ formatPrice(item.regularPrice) }}
                </p>
              </div>

              <!-- Cantidad -->
              <div class="col-span-2">
                <div class="flex items-center justify-center">
                  <button
                    @click="decrementQuantity(index)"
                    class="bg-gray-100 text-gray-700 w-8 h-8 rounded-l-md flex items-center justify-center"
                    :disabled="item.quantity <= 1"
                    :class="{
                      'opacity-50 cursor-not-allowed': item.quantity <= 1,
                    }"
                  >
                    -
                  </button>
                  <input
                    v-model="item.quantity"
                    type="number"
                    min="1"
                    class="w-12 h-8 border-y border-gray-300 text-center text-sm"
                    @change="updateQuantity(index, $event)"
                  />
                  <button
                    @click="incrementQuantity(index)"
                    class="bg-gray-100 text-gray-700 w-8 h-8 rounded-r-md flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <!-- Subtotal -->
              <div class="col-span-2 text-right font-medium">
                ${{ formatPrice(item.price * item.quantity) }}
              </div>
            </div>
          </div>

          <!-- Acciones del carrito -->
          <div class="p-4 flex justify-between">
            <button
              @click="clearCart"
              class="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Vaciar carrito
            </button>
            <NuxtLink
              to="/productos"
              class="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              Seguir comprando
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Resumen de la compra -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-bold text-gray-800 mb-4">
            Resumen de la compra
          </h2>

          <!-- Detalles de costos -->
          <div class="space-y-3 mb-6">
            <div class="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${{ formatPrice(subtotal) }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Envío</span>
              <span v-if="shippingCost > 0"
                >${{ formatPrice(shippingCost) }}</span
              >
              <span v-else class="text-green-600 font-medium">Gratis</span>
            </div>
            <div v-if="discount > 0" class="flex justify-between text-red-500">
              <span>Descuento</span>
              <span>-${{ formatPrice(discount) }}</span>
            </div>
            <div class="border-t border-gray-200 pt-3 mt-3">
              <div class="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${{ formatPrice(total) }}</span>
              </div>
              <div class="text-gray-500 text-xs mt-1 text-right">
                Impuestos incluidos
              </div>
            </div>
          </div>

          <!-- Cupón de descuento -->
          <div class="mb-6">
            <div class="flex gap-2">
              <input
                v-model="couponCode"
                type="text"
                placeholder="Código de descuento"
                class="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                @click="applyCoupon"
                class="bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-300 transition-colors"
              >
                Aplicar
              </button>
            </div>
            <p v-if="couponError" class="text-red-500 text-xs mt-1">
              {{ couponError }}
            </p>
            <p v-if="couponSuccess" class="text-green-600 text-xs mt-1">
              {{ couponSuccess }}
            </p>
          </div>

          <!-- Botón de finalizar compra -->
          <button
            @click="checkout"
            class="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
          >
            Finalizar compra
          </button>

          <!-- Métodos de pago aceptados -->
          <div class="mt-4 text-center">
            <p class="text-xs text-gray-500 mb-2">
              Aceptamos los siguientes métodos de pago
            </p>
            <div class="flex justify-center space-x-2">
              <div class="w-8 h-5 bg-gray-200 rounded"></div>
              <div class="w-8 h-5 bg-gray-200 rounded"></div>
              <div class="w-8 h-5 bg-gray-200 rounded"></div>
              <div class="w-8 h-5 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "~/stores/cart";

// Configuración
const router = useRouter();
const cartStore = useCartStore();

// Estados
const cartItems = ref([]);
const couponCode = ref("");
const couponError = ref("");
const couponSuccess = ref("");
const discount = ref(0);
const shippingCost = ref(0);

// Cargar items del carrito
const loadCartItems = () => {
  cartItems.value = cartStore.items;
};

// Propiedades computadas
const isEmpty = computed(() => cartItems.value.length === 0);

const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

const total = computed(() => {
  return subtotal.value + shippingCost.value - discount.value;
});

// Métodos
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const handleImageError = (event) => {
  event.target.src = "/images/product-placeholder.jpg";
};

const updateQuantity = (index, event) => {
  const qty = parseInt(event.target.value, 10);
  if (isNaN(qty) || qty < 1) {
    cartItems.value[index].quantity = 1;
  } else {
    cartItems.value[index].quantity = qty;
  }
  cartStore.updateItemQuantity(index, cartItems.value[index].quantity);
};

const incrementQuantity = (index) => {
  cartItems.value[index].quantity++;
  cartStore.updateItemQuantity(index, cartItems.value[index].quantity);
};

const decrementQuantity = (index) => {
  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity--;
    cartStore.updateItemQuantity(index, cartItems.value[index].quantity);
  }
};

const removeItem = (index) => {
  // Confirmar antes de eliminar
  if (
    confirm("¿Estás seguro de que deseas eliminar este producto del carrito?")
  ) {
    cartStore.removeItem(index);
    loadCartItems();
  }
};

const clearCart = () => {
  // Confirmar antes de vaciar el carrito
  if (confirm("¿Estás seguro de que deseas vaciar todo el carrito?")) {
    cartStore.clearCart();
    loadCartItems();
  }
};

const applyCoupon = () => {
  if (!couponCode.value) {
    couponError.value = "Por favor ingresa un código de descuento";
    couponSuccess.value = "";
    return;
  }

  // Simular verificación de cupón
  if (couponCode.value.toUpperCase() === "DESCUENTO20") {
    discount.value = Math.round(subtotal.value * 0.2);
    couponSuccess.value = "¡Descuento del 20% aplicado!";
    couponError.value = "";
  } else {
    couponError.value = "Código de descuento inválido";
    couponSuccess.value = "";
    discount.value = 0;
  }
};

const checkout = () => {
  if (isEmpty.value) {
    alert("Tu carrito está vacío");
    return;
  }

  // Aquí iría la lógica para procesar el pago
  alert("¡Gracias por tu compra! Redirigiendo al proceso de pago...");

  // Simular redirección a página de pago
  setTimeout(() => {
    // En una implementación real, aquí se redireccionaría a la pasarela de pago
    router.push("/perfil");
  }, 1000);
};

// Calcular costos de envío (simplificado)
const calculateShippingCost = () => {
  // Lógica simplificada: envío gratis para compras mayores a $30.000
  if (subtotal.value > 30000) {
    shippingCost.value = 0;
  } else {
    shippingCost.value = 3990;
  }
};

// Observar cambios en el subtotal para recalcular envío
watch(subtotal, () => {
  calculateShippingCost();
});

// Inicializar
onMounted(() => {
  loadCartItems();
  calculateShippingCost();
});

// Configuración de metadatos de la página
definePageMeta({
  layout: "default",
});
</script>

<style scoped>
/* Estilos específicos para la página de carrito si son necesarios */
</style>
