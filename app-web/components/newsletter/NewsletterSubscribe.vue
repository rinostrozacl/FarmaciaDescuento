<template>
  <div
    :class="useDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'"
  >
    <form @submit.prevent="subscribe" class="flex flex-col md:flex-row gap-3">
      <div class="flex-grow relative">
        <input
          v-model="email"
          type="email"
          :placeholder="placeholder"
          required
          class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500"
          :class="
            useDarkTheme
              ? 'bg-gray-700 border-gray-600'
              : 'bg-white border-gray-300'
          "
        />
        <transition name="fade">
          <div
            v-if="message"
            :class="[
              'absolute -bottom-6 left-0 text-sm',
              error ? 'text-red-500' : 'text-green-500',
            ]"
          >
            {{ message }}
          </div>
        </transition>
      </div>
      <button
        type="submit"
        :disabled="loading"
        :class="[
          'px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center',
          loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-teal-600',
          useDarkTheme ? 'bg-teal-500 text-white' : 'bg-teal-500 text-white',
        ]"
      >
        <svg
          v-if="loading"
          class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        {{ buttonText }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Props
const props = defineProps({
  buttonText: {
    type: String,
    default: "Suscribir",
  },
  placeholder: {
    type: String,
    default: "Correo electrónico",
  },
  useDarkTheme: {
    type: Boolean,
    default: true,
  },
});

// Estado
const email = ref("");
const loading = ref(false);
const message = ref("");
const error = ref(false);

// Método para suscribirse
const subscribe = async () => {
  if (!email.value || !isValidEmail(email.value)) {
    setMessage("Por favor, ingresa un correo electrónico válido", true);
    return;
  }

  loading.value = true;
  setMessage("");

  try {
    // Simulación de API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // En un entorno real, aquí se haría la llamada a la API
    // const response = await fetch('/api/newsletter/subscribe', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: email.value })
    // });
    // const data = await response.json();
    // if (!response.ok) throw new Error(data.message || 'Error al suscribirse');

    setMessage(
      "¡Gracias por suscribirte! Recibirás nuestras promociones pronto.",
      false
    );
    email.value = "";
  } catch (err) {
    setMessage(err.message || "Ocurrió un error, intenta nuevamente.", true);
  } finally {
    loading.value = false;

    // Limpiar mensaje después de 5 segundos
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }
};

// Validación básica de email
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Establecer mensaje
const setMessage = (msg, isError = false) => {
  message.value = msg;
  error.value = isError;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
