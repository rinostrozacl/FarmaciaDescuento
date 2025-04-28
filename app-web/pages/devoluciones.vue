<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Política de Devoluciones</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="prose max-w-none">
        <h2>Proceso de Devolución</h2>
        <p>
          En FarmaciaDescuento entendemos que pueden surgir situaciones donde
          necesites devolver un producto. Sin embargo, debido a la naturaleza de
          los productos farmacéuticos y médicos, y considerando que trabajamos
          con productos cercanos a su fecha de vencimiento, nuestra política de
          devoluciones tiene algunas condiciones especiales.
        </p>

        <h3 class="mt-6">Condiciones para Devoluciones</h3>
        <ol class="list-decimal pl-6 space-y-2">
          <li>
            <strong>Error en el pedido:</strong> Si recibiste un producto
            diferente al que solicitaste, podrás solicitar la devolución dentro
            de las 24 horas siguientes a la recepción.
          </li>
          <li>
            <strong>Producto dañado:</strong> Si el producto presenta daños
            visibles en su empaque o contenido, podrás solicitar la devolución
            de inmediato al momento de la recepción.
          </li>
          <li>
            <strong>Calidad del producto:</strong> Si detectas algún problema de
            calidad en el producto (siempre que esté dentro de su fecha de
            vencimiento), podrás solicitar la devolución dentro de las 24 horas
            siguientes a la recepción.
          </li>
        </ol>

        <h3 class="mt-6">Productos No Sujetos a Devolución</h3>
        <ul class="list-disc pl-6 space-y-2">
          <li>Productos abiertos o parcialmente usados.</li>
          <li>Productos de uso personal o íntimo.</li>
          <li>Productos refrigerados o que requieren cadena de frío.</li>
          <li>
            Productos comprados bajo ofertas especiales claramente marcadas como
            "sin devolución".
          </li>
        </ul>

        <h3 class="mt-6">Procedimiento para Solicitar una Devolución</h3>
        <ol class="list-decimal pl-6 space-y-2">
          <li>
            Ingresa a tu cuenta y selecciona el pedido con el producto que
            deseas devolver.
          </li>
          <li>
            Haz clic en "Solicitar Devolución" y completa el formulario
            indicando el motivo.
          </li>
          <li>
            Adjunta fotografías que evidencien el problema (en caso de daño o
            problemas de calidad).
          </li>
          <li>
            Espera la revisión de tu solicitud, la cual será procesada en un
            plazo máximo de 48 horas.
          </li>
          <li>
            Si tu solicitud es aprobada, recibirás las instrucciones para
            devolver el producto a la farmacia correspondiente o para programar
            un retiro.
          </li>
        </ol>

        <h3 class="mt-6">Formas de Reembolso</h3>
        <p>
          Una vez aprobada la devolución y recibido el producto, podrás elegir
          entre:
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Crédito para futuras compras en la plataforma.</li>
          <li>
            Reembolso a través del mismo método de pago utilizado en la compra
            (puede tardar hasta 15 días hábiles).
          </li>
          <li>Reemplazo del producto (sujeto a disponibilidad).</li>
        </ul>

        <h3 class="mt-6">Contacto</h3>
        <p>
          Si tienes dudas sobre nuestra política de devoluciones o necesitas
          ayuda con una solicitud específica, puedes contactarnos a través de:
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Correo electrónico: devoluciones@farmaciadescuento.cl</li>
          <li>
            Teléfono: +56 2 2123 4567 (Lunes a Viernes de 9:00 a 18:00 hrs)
          </li>
          <li>Chat en línea disponible en nuestra plataforma</li>
        </ul>
      </div>

      <div class="mt-8 border-t pt-6">
        <h3 class="font-semibold mb-4">¿Necesitas solicitar una devolución?</h3>
        <div class="flex flex-col sm:flex-row gap-4">
          <NuxtLink
            to="/mis-tickets"
            class="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 text-center"
          >
            Ir a mis tickets
          </NuxtLink>
          <button
            @click="showContactForm"
            class="px-6 py-3 border border-green-600 text-green-600 rounded-md hover:bg-green-50 text-center"
          >
            Contactar soporte
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "~/composables/useToast";

definePageMeta({
  layout: "default",
});

const { showToast } = useToast();

const showContactForm = () => {
  // Aquí se implementaría la lógica para mostrar un formulario de contacto
  // Por ahora solo mostramos un toast
  showToast({
    message: "Formulario de contacto no disponible en este momento",
    type: "info",
  });
};
</script>

<style scoped>
/* Estilos adicionales para la página de devoluciones */
.prose h2 {
  @apply text-xl font-semibold text-gray-800 mb-4;
}

.prose h3 {
  @apply text-lg font-semibold text-gray-700 mb-2;
}

.prose p {
  @apply mb-4 text-gray-600;
}

.prose ul,
.prose ol {
  @apply mb-4;
}
</style>
