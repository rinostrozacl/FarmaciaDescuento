<template>
  <footer class="footer-bg text-white py-8 font-sans">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <!-- Columna 1: Logo y descripción -->
        <div>
          <div class="mb-4">
            <img
              src="/imagotipo-light.svg"
              alt="FarmaciaDescuento"
              class="h-10"
            />
          </div>
          <p class="text-gray-300 text-sm mb-6">
            Conectando farmacias y clientes para reducir mermas por vencimiento
            y ofrecer productos a precios accesibles.
          </p>
          <div class="flex space-x-4">
            <a href="#" aria-label="Facebook" class="social-icon">
              <Icon name="mdi:facebook" size="24px" />
            </a>
            <a href="#" aria-label="Twitter" class="social-icon">
              <Icon name="mdi:twitter" size="24px" />
            </a>
            <a href="#" aria-label="Instagram" class="social-icon">
              <Icon name="mdi:instagram" size="24px" />
            </a>
            <a href="#" aria-label="LinkedIn" class="social-icon">
              <Icon name="mdi:linkedin" size="24px" />
            </a>
          </div>
        </div>

        <!-- Columna 2: Enlaces Rápidos -->
        <div>
          <h3 class="text-lg font-medium mb-4 text-white">Enlaces Rápidos</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-footer-link">
                <Icon
                  name="mdi:home"
                  class="text-footer-icon mr-2"
                  size="16px"
                />
                Inicio
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/categorias" class="text-footer-link">
                <Icon
                  name="mdi:tag-multiple"
                  class="text-footer-icon mr-2"
                  size="16px"
                />
                Categorías
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/productos/ofertas" class="text-footer-link">
                <Icon
                  name="mdi:sale"
                  class="text-footer-icon mr-2"
                  size="16px"
                />
                Ofertas
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/farmacias" class="text-footer-link">
                <Icon
                  name="mdi:pharmacy"
                  class="text-footer-icon mr-2"
                  size="16px"
                />
                Farmacias
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/como-funciona" class="text-footer-link">
                <Icon
                  name="mdi:information"
                  class="text-footer-icon mr-2"
                  size="16px"
                />
                Cómo Funciona
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/mis-pedidos" class="text-footer-link">
                <Icon
                  name="mdi:package-variant"
                  class="text-footer-icon mr-2"
                  size="16px"
                />
                Mis Pedidos
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Columna 3: Para Farmacias -->
        <div>
          <h3 class="text-lg font-medium mb-4 text-white">Para Farmacias</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/registrar-farmacia" class="text-footer-link">
                <Icon
                  name="mdi:store-plus"
                  class="text-footer-icon mr-2"
                  size="18px"
                />
                Registrar Farmacia
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/beneficios" class="text-footer-link">
                <Icon
                  name="mdi:star"
                  class="text-footer-icon mr-2"
                  size="18px"
                />
                Beneficios
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/panel-de-control" class="text-footer-link">
                <Icon
                  name="mdi:view-dashboard"
                  class="text-footer-icon mr-2"
                  size="18px"
                />
                Panel de Control
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/subir-productos" class="text-footer-link">
                <Icon
                  name="mdi:upload"
                  class="text-footer-icon mr-2"
                  size="18px"
                />
                Subir Productos
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/reportes" class="text-footer-link">
                <Icon
                  name="mdi:chart-bar"
                  class="text-footer-icon mr-2"
                  size="18px"
                />
                Reportes
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/soporte-farmacia" class="text-footer-link">
                <Icon
                  name="mdi:headset"
                  class="text-footer-icon mr-2"
                  size="18px"
                />
                Soporte
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Columna 4: Legal -->
        <div>
          <h3 class="text-lg font-medium mb-4 text-white">Legal</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/terminos" class="text-footer-link">
                <Icon
                  name="mdi:file-document"
                  class="text-footer-icon mr-2"
                  size="18px"
                />
                Términos y Condiciones
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacidad" class="text-footer-link">
                <Icon
                  name="mdi:shield-lock"
                  class="text-footer-icon mr-2"
                  size="18px"
                />
                Política de Privacidad
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/devoluciones" class="text-footer-link">
                <Icon
                  name="mdi:arrow-u-left-top"
                  class="text-footer-icon mr-2"
                  size="18px"
                />
                Política de Devoluciones
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cookies" class="text-footer-link">
                <Icon
                  name="mdi:cookie"
                  class="text-footer-icon mr-2"
                  size="18px"
                />
                Política de Cookies
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/accesibilidad" class="text-footer-link">
                <Icon
                  name="mdi:accessibility"
                  class="text-footer-icon mr-2"
                  size="18px"
                />
                Accesibilidad
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Columna 5: Contacto -->
        <div>
          <h3 class="text-lg font-medium mb-4 text-white">Contacto</h3>
          <ul class="space-y-3">
            <li class="text-footer-contact">
              <Icon
                name="mdi:map-marker"
                class="text-footer-icon mt-1 mr-3 text-primary"
                size="20px"
              />
              <span>Av. Presidente Ibáñez 1234, Puerto Montt</span>
            </li>
            <li class="text-footer-contact">
              <Icon
                name="mdi:phone"
                class="text-footer-icon mt-1 mr-3 text-primary"
                size="20px"
              />
              <span>+56 2 2345 6789</span>
            </li>
            <li class="text-footer-contact">
              <Icon
                name="mdi:email"
                class="text-footer-icon mt-1 mr-3 text-primary"
                size="20px"
              />
              <span>contacto@farmaciadescuento.cl</span>
            </li>
            <li class="text-footer-contact">
              <Icon
                name="mdi:clock-time-four"
                class="text-footer-icon mt-1 mr-3 text-primary"
                size="20px"
              />
              <span>Lun - Vie: 9:00 - 18:00 hrs</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Newsletter -->
      <div class="mt-8 mb-6 bg-white/10 rounded-lg p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div class="md:col-span-1">
            <h3 class="text-lg font-medium mb-2 text-white">Newsletter</h3>
            <p class="text-sm text-gray-300">
              Recibe ofertas exclusivas y novedades en tu correo.
            </p>
          </div>
          <div class="md:col-span-2">
            <form
              @submit.prevent="suscribirNewsletter"
              class="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                v-model="email"
                placeholder="Tu correo electrónico"
                class="px-4 py-2 rounded-md flex-grow text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                class="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Línea divisoria -->
      <hr class="border-t border-white border-opacity-20 my-6" />

      <!-- Copyright -->
      <div class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-sm text-gray-300 mb-4 md:mb-0">
          © {{ currentYear }} FarmaciaDescuento. Todos los derechos reservados.
        </p>
        <div class="flex space-x-4">
          <a href="#" class="text-gray-300 hover:text-white transition-colors">
            <Icon
              name="mdi:arrow-up-circle"
              size="24px"
              @click.prevent="scrollToTop"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, ref } from "vue";

const currentYear = computed(() => new Date().getFullYear());
const email = ref("");

const suscribirNewsletter = () => {
  // Aquí implementaremos la lógica para procesar la suscripción
  alert(`Gracias por suscribirte con: ${email.value}`);
  email.value = "";
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<style scoped>
.footer-bg {
  background-color: var(--secondary-color);
}

.social-icon {
  @apply text-white hover:text-primary transition-colors bg-white/20 rounded-full p-2 flex items-center justify-center;
}

.text-footer-link {
  @apply text-gray-300 hover:text-white transition-colors flex items-center text-sm;
}

.text-footer-icon {
  @apply mr-2;
  font-size: 16px;
}

.text-footer-contact {
  @apply flex items-start text-sm;
}
</style>
