<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary-color mb-8">
      Términos y Condiciones
    </h1>

    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <p class="mb-4">
        Última actualización: {{ new Date().toLocaleDateString() }}
      </p>
      <p class="mb-6">
        Por favor, lea estos términos y condiciones cuidadosamente antes de
        utilizar la plataforma FarmaciaDescuento.
      </p>

      <div class="space-y-6">
        <section>
          <h2 class="text-xl font-semibold mb-3">1. Aceptación de Términos</h2>
          <p>
            Al acceder y utilizar nuestra plataforma, usted acepta estar sujeto
            a estos términos y condiciones, todas las leyes y regulaciones
            aplicables. Si no está de acuerdo con alguno de estos términos, está
            prohibido usar o acceder a este sitio.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-3">
            2. Descripción del Servicio
          </h2>
          <p>
            FarmaciaDescuento es una plataforma que conecta a farmacias con
            clientes interesados en obtener productos con descuento,
            especialmente aquellos cercanos a su fecha de vencimiento. Nuestros
            servicios incluyen:
          </p>
          <ul class="list-disc ml-6 mt-2 space-y-1">
            <li>
              Búsqueda y visualización de productos farmacéuticos con descuento
            </li>
            <li>Compras en línea de medicamentos y productos de farmacia</li>
            <li>Gestión de pedidos y seguimiento de entregas</li>
            <li>
              Sistema de calificaciones y comentarios para farmacias y productos
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-3">3. Cuentas de Usuario</h2>
          <p>
            Para acceder a ciertas funciones de nuestra plataforma, deberá
            registrarse y crear una cuenta. Usted es responsable de:
          </p>
          <ul class="list-disc ml-6 mt-2 space-y-1">
            <li>Mantener la confidencialidad de su información de cuenta</li>
            <li>Restringir el acceso a su computadora o dispositivo móvil</li>
            <li>
              Asumir la responsabilidad por todas las actividades realizadas
              bajo su cuenta
            </li>
          </ul>
          <p class="mt-2">
            Nos reservamos el derecho de cerrar cuentas y rechazar servicios a
            cualquier usuario, a nuestra discreción.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-3">4. Compras y Pagos</h2>
          <p>Al realizar una compra a través de nuestra plataforma:</p>
          <ul class="list-disc ml-6 mt-2 space-y-1">
            <li>Acepta pagar por todos los productos que elija adquirir</li>
            <li>
              Es responsable de proporcionar información de pago precisa y
              actualizada
            </li>
            <li>
              Reconoce que los precios y la disponibilidad están sujetos a
              cambios
            </li>
          </ul>
          <p class="mt-2">
            Utilizamos proveedores de servicios de pago externos y no
            almacenamos la información completa de su tarjeta de crédito en
            nuestros servidores.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-3">
            5. Política de Devoluciones
          </h2>
          <p>
            Debido a la naturaleza de los productos farmacéuticos, especialmente
            aquellos con fechas de vencimiento cercanas, nuestra política de
            devoluciones es limitada:
          </p>
          <ul class="list-disc ml-6 mt-2 space-y-1">
            <li>
              Solo se aceptarán devoluciones en caso de productos defectuosos o
              errores en el pedido
            </li>
            <li>
              Debe notificar el problema dentro de las 24 horas posteriores a la
              recepción
            </li>
            <li>
              No se aceptan devoluciones de medicamentos por motivos de
              seguridad
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-3">
            6. Exención de Responsabilidad
          </h2>
          <p>
            Los productos ofrecidos a través de nuestra plataforma son
            proporcionados por farmacias independientes. FarmaciaDescuento:
          </p>
          <ul class="list-disc ml-6 mt-2 space-y-1">
            <li>
              No garantiza la calidad, seguridad o eficacia de los productos
            </li>
            <li>
              No es responsable de errores en la descripción de los productos
            </li>
            <li>
              Recomienda consultar a un profesional de la salud antes de
              utilizar cualquier medicamento
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-3">7. Propiedad Intelectual</h2>
          <p>
            Todos los contenidos de la plataforma, incluyendo textos, gráficos,
            logotipos, imágenes y software, están protegidos por derechos de
            autor y son propiedad de FarmaciaDescuento o de terceros que nos han
            otorgado licencias. Está prohibida la reproducción, distribución o
            uso no autorizado de estos materiales.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-3">8. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos y condiciones
            en cualquier momento. Las modificaciones entrarán en vigor
            inmediatamente después de su publicación en la plataforma. Es su
            responsabilidad revisar periódicamente estos términos.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-3">9. Ley Aplicable</h2>
          <p>
            Estos términos y condiciones se rigen por las leyes de Chile, sin
            consideración a conflictos de principios legales. Cualquier disputa
            relacionada con estos términos será sometida a la jurisdicción
            exclusiva de los tribunales de Santiago de Chile.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-3">10. Contacto</h2>
          <p>
            Si tiene alguna pregunta sobre estos términos y condiciones, puede
            contactarnos a través de:
          </p>
          <ul class="list-disc ml-6 mt-2 space-y-1">
            <li>Email: legal@farmaciadescuento.com</li>
            <li>Teléfono: +56 2 2123 4567</li>
            <li>
              Dirección: Av. Providencia 1234, Providencia, Santiago, Chile
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
</script>
