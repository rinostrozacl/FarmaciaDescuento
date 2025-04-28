<template>
  <header class="bg-white border-b border-gray-100">
    <div class="container mx-auto px-4 py-2">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="text-teal-500 font-bold text-2xl flex items-center"
        >
          <img src="/isotipo.svg" alt="FarmaciaDescuento" class="h-10 m-3" />
        </NuxtLink>

        <!-- Barra de búsqueda - visible en desktop, oculto en móvil -->
        <form
          @submit.prevent="submitSearch"
          class="flex-1 max-w-md hidden md:block"
        >
          <div class="flex">
            <input
              type="text"
              placeholder="Buscar medicamentos, productos..."
              class="w-full py-1.5 px-3 rounded-l border border-gray-200 focus:outline-none"
              v-model="searchText"
            />
            <button
              type="submit"
              class="bg-teal-500 text-white px-3 py-1.5 rounded-r hover:bg-teal-600"
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
        </form>

        <!-- Botón menú hamburguesa para móvil -->
        <button
          @click="toggleMobileMenu"
          class="text-gray-700 md:hidden focus:outline-none"
          aria-label="Abrir menú"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              v-if="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Carrito siempre visible -->
        <NuxtLink to="/carrito" class="relative ml-auto md:ml-0 mr-2 md:mr-0">
          <i class="fas fa-shopping-cart text-gray-700"></i>
          <span
            v-if="cartItemCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
          >
            {{ cartItemCount > 9 ? "9+" : cartItemCount }}
          </span>
        </NuxtLink>

        <!-- Navegación principal - version desktop -->
        <nav class="hidden md:flex items-center ml-6">
          <ul class="flex space-x-5">
            <li>
              <NuxtLink
                to="/"
                class="text-teal-500 hover:text-teal-600 font-medium pb-1"
                exact-active-class="border-b-2 border-teal-500"
              >
                Inicio
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/productos"
                class="text-gray-700 hover:text-teal-500 font-medium pb-1"
                active-class="text-teal-500 border-b-2 border-teal-500"
              >
                Productos
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/categorias"
                class="text-gray-700 hover:text-teal-500 font-medium pb-1"
                active-class="text-teal-500 border-b-2 border-teal-500"
              >
                Categorías
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/farmacias"
                class="text-gray-700 hover:text-teal-500 font-medium pb-1"
                active-class="text-teal-500 border-b-2 border-teal-500"
              >
                Farmacias
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/mis-tickets"
                class="text-gray-700 hover:text-teal-500 font-medium pb-1"
                active-class="text-teal-500 border-b-2 border-teal-500"
              >
                Mis Tickets
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Acciones de usuario - version desktop -->
        <div class="hidden md:flex items-center space-x-4 ml-6">
          <NuxtLink to="/login" class="text-gray-700 hover:text-teal-500">
            Iniciar Sesión
          </NuxtLink>
          <NuxtLink to="/registro" class="text-gray-700 hover:text-teal-500">
            Registrarse
          </NuxtLink>
        </div>
      </div>

      <!-- Menú móvil desplegable -->
      <div v-show="mobileMenuOpen" class="md:hidden">
        <!-- Barra de búsqueda para móvil -->
        <form @submit.prevent="submitSearch" class="mt-3 mb-4">
          <div class="flex">
            <input
              type="text"
              placeholder="Buscar medicamentos, productos..."
              class="w-full py-1.5 px-3 rounded-l border border-gray-200 focus:outline-none"
              v-model="searchText"
            />
            <button
              type="submit"
              class="bg-teal-500 text-white px-3 py-1.5 rounded-r hover:bg-teal-600"
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
        </form>

        <!-- Links de navegación para móvil -->
        <nav class="py-3 border-t border-gray-100">
          <ul class="space-y-3">
            <li>
              <NuxtLink
                to="/"
                class="block py-2 text-gray-700 hover:text-teal-500 font-medium"
                exact-active-class="text-teal-500"
                @click="mobileMenuOpen = false"
              >
                Inicio
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/productos"
                class="block py-2 text-gray-700 hover:text-teal-500 font-medium"
                active-class="text-teal-500"
                @click="mobileMenuOpen = false"
              >
                Productos
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/categorias"
                class="block py-2 text-gray-700 hover:text-teal-500 font-medium"
                active-class="text-teal-500"
                @click="mobileMenuOpen = false"
              >
                Categorías
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/farmacias"
                class="block py-2 text-gray-700 hover:text-teal-500 font-medium"
                active-class="text-teal-500"
                @click="mobileMenuOpen = false"
              >
                Farmacias
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/mis-tickets"
                class="block py-2 text-gray-700 hover:text-teal-500 font-medium"
                active-class="text-teal-500"
                @click="mobileMenuOpen = false"
              >
                Mis Tickets
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Acciones de usuario para móvil -->
        <div class="py-3 border-t border-gray-100 flex space-x-4">
          <NuxtLink
            to="/login"
            class="text-gray-700 hover:text-teal-500 font-medium"
            @click="mobileMenuOpen = false"
          >
            Iniciar Sesión
          </NuxtLink>
          <NuxtLink
            to="/registro"
            class="text-gray-700 hover:text-teal-500 font-medium"
            @click="mobileMenuOpen = false"
          >
            Registrarse
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "~/stores/cart";

// Router y estado
const router = useRouter();
const searchText = ref("");
const mobileMenuOpen = ref(false);

// Store del carrito
const cartStore = useCartStore();
const cartItemCount = computed(() => cartStore.totalItems);

// Métodos
function submitSearch() {
  if (searchText.value.trim()) {
    router.push({
      path: "/busqueda",
      query: { q: searchText.value.trim() },
    });
    searchText.value = "";
    mobileMenuOpen.value = false;
  }
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}
</script>
