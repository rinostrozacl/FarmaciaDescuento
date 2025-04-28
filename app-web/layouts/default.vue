<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter />
    <CartSidebar v-if="cartStore.showCart" @close="cartStore.closeCart" />
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import Toast from "~/components/ui/Toast.vue";

const cartStore = useCartStore();
</script>

<style>
/* Estilos globales */
body {
  @apply bg-light text-gray-900;
}

/* Transiciones */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
