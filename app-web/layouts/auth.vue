<template>
  <div class="auth-layout min-h-screen bg-gray-light">
    <!-- Contenido principal -->
    <slot />

    <!-- Footer -->
    <footer class="py-6 text-center text-sm text-gray-dark">
      <div class="container mx-auto px-4">
        <p>
          © {{ new Date().getFullYear() }} FarmaciaDescuento. Todos los
          derechos reservados.
        </p>
        <div class="mt-2 space-x-3">
          <NuxtLink to="/terminos" class="text-primary-color hover:underline"
            >Términos y Condiciones</NuxtLink
          >
          <span>•</span>
          <NuxtLink to="/privacidad" class="text-primary-color hover:underline"
            >Política de Privacidad</NuxtLink
          >
          <span>•</span>
          <NuxtLink to="/" class="text-primary-color hover:underline"
            >Volver al inicio</NuxtLink
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Lógica del layout de autenticación si es necesaria
</script>

<style>
/* Estilos específicos para el layout de autenticación */
</style>
