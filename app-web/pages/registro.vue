<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-center text-3xl font-bold text-gray-900 mb-6">
        Crear cuenta
      </h2>

      <p class="text-center mb-6">
        ¿Ya tienes cuenta?
        <NuxtLink
          to="/login"
          class="text-green-600 hover:text-green-800 font-medium"
        >
          Iniciar sesión
        </NuxtLink>
      </p>

      <form @submit.prevent="handleRegistro" class="space-y-4">
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700"
            >Nombre</label
          >
          <input
            type="text"
            id="nombre"
            v-model="nombre"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
            :class="{ 'border-red-500': nombreError }"
          />
          <p v-if="nombreError" class="mt-1 text-sm text-red-600">
            {{ nombreError }}
          </p>
        </div>

        <div>
          <label for="apellido" class="block text-sm font-medium text-gray-700"
            >Apellido</label
          >
          <input
            type="text"
            id="apellido"
            v-model="apellido"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
            :class="{ 'border-red-500': apellidoError }"
          />
          <p v-if="apellidoError" class="mt-1 text-sm text-red-600">
            {{ apellidoError }}
          </p>
        </div>

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
          <label for="telefono" class="block text-sm font-medium text-gray-700"
            >Teléfono</label
          >
          <input
            type="tel"
            id="telefono"
            v-model="telefono"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
            :class="{ 'border-red-500': telefonoError }"
          />
          <p v-if="telefonoError" class="mt-1 text-sm text-red-600">
            {{ telefonoError }}
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

        <div>
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-gray-700"
            >Confirmar contraseña</label
          >
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
            :class="{ 'border-red-500': confirmPasswordError }"
          />
          <p v-if="confirmPasswordError" class="mt-1 text-sm text-red-600">
            {{ confirmPasswordError }}
          </p>
        </div>

        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input
              id="terminos"
              type="checkbox"
              v-model="aceptaTerminos"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              :class="{ 'border-red-500': terminosError }"
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="terminos" class="font-medium text-gray-700"
              >Acepto los términos y condiciones</label
            >
            <p v-if="terminosError" class="mt-1 text-sm text-red-600">
              {{ terminosError }}
            </p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Procesando...</span>
            <span v-else>Registrarme</span>
          </button>
        </div>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">O regístrate con</span>
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
const nombre = ref("");
const apellido = ref("");
const email = ref("");
const telefono = ref("");
const password = ref("");
const confirmPassword = ref("");
const aceptaTerminos = ref(false);

// Estados de error
const nombreError = ref("");
const apellidoError = ref("");
const emailError = ref("");
const telefonoError = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");
const terminosError = ref("");

// Estado de carga
const isLoading = ref(false);

// Validación del formulario
const validateForm = () => {
  let isValid = true;

  // Resetear errores
  nombreError.value = "";
  apellidoError.value = "";
  emailError.value = "";
  telefonoError.value = "";
  passwordError.value = "";
  confirmPasswordError.value = "";
  terminosError.value = "";

  // Validar nombre
  if (!nombre.value.trim()) {
    nombreError.value = "El nombre es requerido";
    isValid = false;
  }

  // Validar apellido
  if (!apellido.value.trim()) {
    apellidoError.value = "El apellido es requerido";
    isValid = false;
  }

  // Validar email
  if (!email.value.trim()) {
    emailError.value = "El email es requerido";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = "Email inválido";
    isValid = false;
  }

  // Validar teléfono
  if (!telefono.value.trim()) {
    telefonoError.value = "El teléfono es requerido";
    isValid = false;
  } else if (!/^\d{9,}$/.test(telefono.value.replace(/\s/g, ""))) {
    telefonoError.value = "Formato de teléfono inválido";
    isValid = false;
  }

  // Validar contraseña
  if (!password.value) {
    passwordError.value = "La contraseña es requerida";
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.value = "La contraseña debe tener al menos 6 caracteres";
    isValid = false;
  }

  // Validar confirmación de contraseña
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = "Las contraseñas no coinciden";
    isValid = false;
  }

  // Validar términos
  if (!aceptaTerminos.value) {
    terminosError.value = "Debes aceptar los términos y condiciones";
    isValid = false;
  }

  return isValid;
};

// Manejar registro
const handleRegistro = async () => {
  if (!validateForm()) return;

  isLoading.value = true;

  try {
    const userData = {
      email: email.value,
      password: password.value,
      displayName: `${nombre.value} ${apellido.value}`,
      telefono: telefono.value,
    };

    await authStore.register(userData);
    router.push("/productos");
  } catch (error) {
    console.error("Error al registrar:", error);
    if (error.code === "auth/email-already-in-use") {
      emailError.value = "Este email ya está registrado";
    } else {
      emailError.value =
        "Error al crear la cuenta. Intenta de nuevo más tarde.";
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
