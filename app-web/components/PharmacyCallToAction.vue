<template>
  <section class="footer-bg py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <!-- Columna izquierda: Texto -->
        <div class="text-white space-y-8">
          <h2 class="text-3xl font-bold mb-4 text-white">
            ¿Eres una Farmacia?
          </h2>

          <p class="text-lg">
            Únete a nuestra plataforma y reduce tus mermas por vencimiento
            mientras atraes nuevos clientes.
          </p>

          <ul class="benefits">
            <li>
              <i class="fas fa-check-circle"></i> Reduce pérdidas por productos
              vencidos
            </li>
            <li>
              <i class="fas fa-check-circle"></i> Atrae nuevos clientes a tu
              farmacia
            </li>
            <li>
              <i class="fas fa-check-circle"></i> Gestiona fácilmente tus
              productos con descuento
            </li>
            <li>
              <i class="fas fa-check-circle"></i> Contribuye a la sostenibilidad
              y acceso a medicamentos
            </li>
          </ul>

          <div class="pt-4">
            <NuxtLink
              to="/registrar-farmacia"
              class="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-md transition-all inline-block"
            >
              Registrar mi Farmacia
            </NuxtLink>
          </div>
        </div>

        <!-- Columna derecha: Imagen -->
        <div
          class="bg-white rounded-lg p-8 flex items-center justify-center h-80"
        >
          <img
            src="/images/pharmacy-placeholder.jpg"
            alt="Imagen Farmacéutico"
            class="max-h-full object-contain rounded"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No se requiere lógica adicional
</script>

<style scoped>
.footer-bg {
  background-color: var(--secondary-color);
}
</style>
