<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-center text-3xl font-bold text-gray-900 mb-6">
        Recuperar contraseña
      </h2>

      <p class="text-center mb-6 text-gray-600">
        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer
        tu contraseña.
      </p>

      <form
        v-if="!emailSent"
        @submit.prevent="handlePasswordReset"
        class="space-y-4"
      >
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
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Enviando...</span>
            <span v-else>Enviar enlace de restablecimiento</span>
          </button>
        </div>
      </form>

      <div v-if="emailSent" class="text-center">
        <div
          class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4"
        >
          <svg
            class="h-6 w-6 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900">¡Correo enviado!</h3>
        <p class="mt-2 text-sm text-gray-500">
          Hemos enviado un enlace de restablecimiento a {{ email }}. Por favor
          revisa tu bandeja de entrada y sigue las instrucciones.
        </p>
        <div class="mt-6">
          <button
            @click="resetForm"
            class="text-sm font-medium text-green-600 hover:text-green-500"
          >
            Enviar a otro correo
          </button>
        </div>
      </div>

      <div class="mt-6 text-center">
        <NuxtLink
          to="/login"
          class="text-sm font-medium text-green-600 hover:text-green-500"
        >
          Volver a inicio de sesión
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "default",
});

const authStore = useAuthStore();

// Estados
const email = ref("");
const emailError = ref("");
const isLoading = ref(false);
const emailSent = ref(false);

// Validación
const validateEmail = () => {
  emailError.value = "";

  if (!email.value.trim()) {
    emailError.value = "El email es requerido";
    return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = "Email inválido";
    return false;
  }

  return true;
};

// Manejar solicitud de recuperación
const handlePasswordReset = async () => {
  if (!validateEmail()) return;

  isLoading.value = true;

  try {
    await authStore.sendPasswordResetEmail(email.value);
    emailSent.value = true;
  } catch (error) {
    console.error("Error al enviar correo de recuperación:", error);
    if (error.code === "auth/user-not-found") {
      emailError.value = "No existe una cuenta con este correo";
    } else {
      emailError.value =
        "Error al enviar el correo. Intenta de nuevo más tarde.";
    }
  } finally {
    isLoading.value = false;
  }
};

// Resetear formulario
const resetForm = () => {
  email.value = "";
  emailError.value = "";
  emailSent.value = false;
};
</script>
