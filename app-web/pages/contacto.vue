<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary-color mb-8">Contacto</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Información de contacto -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Información de Contacto</h2>

        <div class="space-y-4">
          <div class="flex items-start">
            <div class="flex-shrink-0 text-primary-color mr-3">
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <p class="font-medium">Teléfono</p>
              <p>+56 2 2123 4567</p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="flex-shrink-0 text-primary-color mr-3">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p class="font-medium">Email</p>
              <p>contacto@farmaciadescuento.com</p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="flex-shrink-0 text-primary-color mr-3">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <p class="font-medium">Dirección</p>
              <p>Av. Providencia 1234, Providencia</p>
              <p>Santiago, Chile</p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="flex-shrink-0 text-primary-color mr-3">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p class="font-medium">Horario de Atención</p>
              <p>Lunes a Viernes: 9:00 - 18:00</p>
              <p>Sábado: 10:00 - 14:00</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulario de contacto -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Envíanos un Mensaje</h2>

        <form class="space-y-4">
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Nombre</label
            >
            <input
              type="text"
              id="name"
              name="name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
            />
          </div>

          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Email</label
            >
            <input
              type="email"
              id="email"
              name="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
            />
          </div>

          <div>
            <label
              for="subject"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Asunto</label
            >
            <input
              type="text"
              id="subject"
              name="subject"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
            />
          </div>

          <div>
            <label
              for="message"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Mensaje</label
            >
            <textarea
              id="message"
              name="message"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              class="w-full bg-primary-color text-white font-medium py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color"
            >
              Enviar Mensaje
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
</script>
