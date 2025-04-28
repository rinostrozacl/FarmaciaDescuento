<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-center text-3xl font-bold text-gray-900 mb-6">
        Iniciar sesión
      </h2>

      <p class="text-center mb-6">
        ¿No tienes cuenta?
        <NuxtLink
          to="/registro"
          class="text-green-600 hover:text-green-800 font-medium"
        >
          Registrarse
        </NuxtLink>
      </p>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
            :class="{ 'border-red-500': emailError }"
          />
          <p v-if="emailError" class="mt-1 text-sm text-red-600">
            {{ emailError }}
          </p>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Contraseña</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
            :class="{ 'border-red-500': passwordError }"
          />
          <p v-if="passwordError" class="mt-1 text-sm text-red-600">
            {{ passwordError }}
          </p>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              v-model="rememberMe"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Recordarme
            </label>
          </div>

          <div class="text-sm">
            <NuxtLink
              to="/recuperar-password"
              class="font-medium text-green-600 hover:text-green-500"
            >
              ¿Olvidaste tu contraseña?
            </NuxtLink>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Iniciando sesión...</span>
            <span v-else>Iniciar sesión</span>
          </button>
        </div>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">O continúa con</span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-3">
          <button
            @click="socialLogin('google')"
            class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Google
          </button>
          <button
            @click="socialLogin('facebook')"
            class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Facebook
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "default",
});

const router = useRouter();
const authStore = useAuthStore();

// Datos del formulario
const email = ref("");
const password = ref("");
const rememberMe = ref(false);

// Estados de error
const emailError = ref("");
const passwordError = ref("");

// Estado de carga
const isLoading = ref(false);

// Validación del formulario
const validateForm = () => {
  let isValid = true;

  // Resetear errores
  emailError.value = "";
  passwordError.value = "";

  // Validar email
  if (!email.value.trim()) {
    emailError.value = "El email es requerido";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = "Email inválido";
    isValid = false;
  }

  // Validar contraseña
  if (!password.value) {
    passwordError.value = "La contraseña es requerida";
    isValid = false;
  }

  return isValid;
};

// Manejar inicio de sesión
const handleLogin = async () => {
  if (!validateForm()) return;

  isLoading.value = true;

  try {
    await authStore.login({
      email: email.value,
      password: password.value,
      remember: rememberMe.value,
    });
    router.push("/productos");
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    if (
      error.code === "auth/user-not-found" ||
      error.code === "auth/wrong-password"
    ) {
      emailError.value = "Email o contraseña incorrectos";
    } else {
      emailError.value = "Error al iniciar sesión. Intenta de nuevo más tarde.";
    }
  } finally {
    isLoading.value = false;
  }
};

// Login con redes sociales
const socialLogin = async (provider) => {
  try {
    isLoading.value = true;
    await authStore.loginWithProvider(provider);
    router.push("/productos");
  } catch (error) {
    console.error(`Error al iniciar sesión con ${provider}:`, error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Estilos específicos para la página de login */
</style>
