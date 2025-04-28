<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-center mb-8 text-teal-600">
      Test de Tailwind CSS
    </h1>

    <!-- Sección de colores -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Colores</h2>
      <div class="grid grid-cols-4 gap-4">
        <div class="p-6 bg-teal-500 text-white rounded-lg shadow-md">
          Teal 500
        </div>
        <div class="p-6 bg-teal-700 text-white rounded-lg shadow-md">
          Teal 700
        </div>
        <div class="p-6 bg-blue-500 text-white rounded-lg shadow-md">
          Blue 500
        </div>
        <div class="p-6 bg-green-500 text-white rounded-lg shadow-md">
          Green 500
        </div>
      </div>
    </section>

    <!-- Test de Grid y Responsive -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Grid Responsive</h2>
      <p class="mb-4 text-gray-600">
        Este grid debería tener 1 columna en móvil, 2 en tablet y 4 en desktop.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          class="bg-gray-100 p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 class="font-bold text-lg mb-2">Elemento 1</h3>
          <p>Columna 1 del grid con responsive</p>
        </div>
        <div
          class="bg-gray-100 p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 class="font-bold text-lg mb-2">Elemento 2</h3>
          <p>Columna 2 del grid con responsive</p>
        </div>
        <div
          class="bg-gray-100 p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 class="font-bold text-lg mb-2">Elemento 3</h3>
          <p>Columna 3 del grid con responsive</p>
        </div>
        <div
          class="bg-gray-100 p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 class="font-bold text-lg mb-2">Elemento 4</h3>
          <p>Columna 4 del grid con responsive</p>
        </div>
      </div>
    </section>

    <!-- Test de Flexbox -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Flexbox</h2>
      <div class="flex flex-col md:flex-row gap-4 items-center justify-center">
        <div class="bg-blue-100 p-4 rounded-lg w-full md:w-1/3">
          Flex Item 1
        </div>
        <div class="bg-blue-200 p-4 rounded-lg w-full md:w-1/3">
          Flex Item 2
        </div>
        <div class="bg-blue-300 p-4 rounded-lg w-full md:w-1/3">
          Flex Item 3
        </div>
      </div>
    </section>

    <!-- Test de Espaciado y Tamaños -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Espaciado y Tamaños</h2>
      <div class="space-y-4">
        <div class="h-12 bg-purple-100 w-1/4">w-1/4</div>
        <div class="h-12 bg-purple-200 w-2/4">w-2/4</div>
        <div class="h-12 bg-purple-300 w-3/4">w-3/4</div>
        <div class="h-12 bg-purple-400 w-full">w-full</div>
      </div>
    </section>

    <!-- Test de Utilidades -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Utilidades</h2>
      <div class="grid grid-cols-2 gap-4">
        <div class="shadow-sm p-4 rounded-lg border">shadow-sm</div>
        <div class="shadow p-4 rounded-lg border">shadow</div>
        <div class="shadow-md p-4 rounded-lg border">shadow-md</div>
        <div class="shadow-lg p-4 rounded-lg border">shadow-lg</div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="mt-12 pt-6 border-t border-gray-200">
      <p class="text-center text-gray-500">
        Este es un test para verificar el funcionamiento de Tailwind CSS
      </p>
    </footer>
  </div>
</template>

<script setup>
// Setup script
</script>
