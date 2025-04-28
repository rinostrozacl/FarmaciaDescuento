<template>
  <div>
    <!-- Header con Banner Principal -->
    <section
      class="relative bg-gradient-to-r from-teal-500 to-green-500 text-white py-16"
    >
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="flex flex-col justify-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              Medicamentos con descuento cerca de ti
            </h1>
            <p class="text-xl mb-6">
              Encuentra medicamentos con descuento por vencimiento próximo en
              farmacias cercanas a tu ubicación.
            </p>
            <div class="space-y-3">
              <div class="flex items-center">
                <span class="bg-white text-teal-500 rounded-full p-1 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
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
                </span>
                <span>Ahorra hasta un 70% en tus medicamentos</span>
              </div>
              <div class="flex items-center">
                <span class="bg-white text-teal-500 rounded-full p-1 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
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
                </span>
                <span>Medicamentos seguros y de calidad</span>
              </div>
              <div class="flex items-center">
                <span class="bg-white text-teal-500 rounded-full p-1 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
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
                </span>
                <span>Contribuye a reducir el desperdicio de medicamentos</span>
              </div>
            </div>
            <div class="mt-8">
              <NuxtLink
                to="/productos"
                class="bg-white text-teal-600 hover:bg-gray-100 font-medium px-6 py-3 rounded-lg shadow-md inline-flex items-center transition-colors"
              >
                <span>Explorar Medicamentos</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </NuxtLink>
            </div>
          </div>
          <div class="hidden lg:flex items-center justify-center">
            <img
              src="/images/hero-image.svg"
              alt="Medicamentos con descuento"
              class="max-w-md w-full"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Buscador de medicamentos -->
    <section class="py-10 bg-white">
      <div class="container mx-auto px-4">
        <div class="bg-gray-50 rounded-xl shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            Encuentra medicamentos con descuento
          </h2>
          <SearchProducts />
        </div>
      </div>
    </section>

    <!-- Categorías de medicamentos -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-4">
          Categorías Populares
        </h2>
        <p class="text-gray-600 text-center mb-8">
          Explora nuestras categorías de medicamentos más buscadas
        </p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <NuxtLink
              :to="`/productos?categoria=${category.slug}`"
              class="block"
            >
              <div class="p-6 text-center">
                <div
                  class="inline-block p-3 bg-teal-50 text-teal-500 rounded-full mb-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      :d="category.icon"
                    />
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-800">{{ category.name }}</h3>
                <p class="text-sm text-gray-500 mt-2">
                  {{ category.count }} productos
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Productos destacados -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-4">
          Productos con Descuento
        </h2>
        <p class="text-gray-600 text-center mb-8">
          Medicamentos de calidad con descuentos increíbles
        </p>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <div
            v-for="(product, index) in featuredProducts"
            :key="index"
            class="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <NuxtLink :to="`/productos/${product.id}`" class="block">
              <div class="relative">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-48 object-cover rounded-t-lg"
                />
                <div
                  class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"
                >
                  {{ product.discount }}% OFF
                </div>
              </div>
              <div class="p-4">
                <div class="flex items-center text-sm mb-2">
                  <span class="text-gray-600">{{ product.pharmacy }}</span>
                  <span class="mx-2">•</span>
                  <span class="text-gray-600">{{ product.distance }}</span>
                </div>
                <h3 class="font-semibold text-gray-800 mb-1">
                  {{ product.name }}
                </h3>
                <p class="text-sm text-gray-500 mb-2">
                  {{ product.description }}
                </p>
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-gray-500 text-sm line-through">{{
                      product.originalPrice
                    }}</span>
                    <p class="text-xl font-bold text-teal-600">
                      {{ product.discountedPrice }}
                    </p>
                  </div>
                  <span class="text-xs text-gray-500"
                    >Vence: {{ product.expirationDate }}</span
                  >
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <div class="text-center mt-8">
          <NuxtLink
            to="/productos"
            class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center transition-colors"
          >
            <span>Ver todos los productos</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Farmacias asociadas -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-4">Farmacias Asociadas</h2>
        <p class="text-gray-600 text-center mb-8">
          Trabajamos con las mejores farmacias para ofrecerte los mejores
          descuentos
        </p>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          <div
            v-for="(pharmacy, index) in pharmacies"
            :key="index"
            class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <NuxtLink
              :to="`/farmacias/${pharmacy.id}`"
              class="flex flex-col items-center text-center"
            >
              <img
                :src="pharmacy.logo"
                :alt="pharmacy.name"
                class="h-16 w-16 object-contain mb-3"
              />
              <h3 class="font-medium text-gray-800 text-sm">
                {{ pharmacy.name }}
              </h3>
              <p class="text-xs text-gray-500 mt-1">{{ pharmacy.location }}</p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Cómo funciona -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-4">¿Cómo Funciona?</h2>
        <p class="text-gray-600 text-center mb-12">
          Comprar medicamentos con descuento nunca fue tan fácil
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div
              class="inline-flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 text-teal-500 mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3">1. Busca</h3>
            <p class="text-gray-600">
              Encuentra medicamentos con descuento en farmacias cercanas a tu
              ubicación.
            </p>
          </div>

          <div class="text-center">
            <div
              class="inline-flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 text-teal-500 mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3">2. Compra</h3>
            <p class="text-gray-600">
              Añade productos a tu carrito y completa la compra en nuestra
              plataforma segura.
            </p>
          </div>

          <div class="text-center">
            <div
              class="inline-flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 text-teal-500 mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3">3. Recoge</h3>
            <p class="text-gray-600">
              Recoge tus medicamentos en la farmacia seleccionada mostrando tu
              código de compra.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="py-16 bg-teal-50">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-6">
            <h2 class="text-3xl font-bold mb-2">
              Suscríbete a nuestro boletín
            </h2>
            <p class="text-gray-600">
              Recibe ofertas exclusivas y novedades sobre medicamentos con
              descuento
            </p>
          </div>
          <NewsletterSubscribe
            class="max-w-md mx-auto"
            button-text="Suscribirme"
            placeholder="Tu correo electrónico"
            :use-dark-theme="false"
          />
        </div>
      </div>
    </section>

    <!-- Testimonios -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-4">
          Lo que dicen nuestros clientes
        </h2>
        <p class="text-gray-600 text-center mb-10">
          Miles de personas ahorran con nosotros todos los días
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="bg-gray-50 p-6 rounded-lg"
          >
            <div class="flex items-center space-x-1 text-yellow-400 mb-4">
              <svg
                v-for="star in 5"
                :key="star"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
            <p class="text-gray-600 mb-4">{{ testimonial.comment }}</p>
            <div class="flex items-center">
              <img
                :src="testimonial.avatar"
                :alt="testimonial.name"
                class="h-10 w-10 rounded-full mr-3"
              />
              <div>
                <p class="font-medium text-gray-800">{{ testimonial.name }}</p>
                <p class="text-sm text-gray-500">{{ testimonial.city }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SearchProducts from "~/components/search/SearchProducts.vue";
import NewsletterSubscribe from "~/components/newsletter/NewsletterSubscribe.vue";

// Datos simulados para categorías
const categories = ref([
  {
    name: "Analgésicos",
    slug: "analgesicos",
    count: 45,
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    name: "Antibióticos",
    slug: "antibioticos",
    count: 32,
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
  {
    name: "Antialérgicos",
    slug: "antialergicos",
    count: 28,
    icon: "M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11",
  },
  {
    name: "Vitaminas",
    slug: "vitaminas",
    count: 37,
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
]);

// Datos simulados para productos destacados
const featuredProducts = ref([
  {
    id: 1,
    name: "Paracetamol 500mg",
    description: "Blister 20 comprimidos",
    originalPrice: "$5.990",
    discountedPrice: "$3.590",
    discount: 40,
    image: "/images/products/paracetamol.jpg",
    pharmacy: "Farmacia Central",
    distance: "1.2 km",
    expirationDate: "30/08/2023",
  },
  {
    id: 2,
    name: "Ibuprofeno 400mg",
    description: "Blister 16 comprimidos",
    originalPrice: "$6.490",
    discountedPrice: "$4.540",
    discount: 30,
    image: "/images/products/ibuprofeno.jpg",
    pharmacy: "Farmacia Cruz Verde",
    distance: "2.3 km",
    expirationDate: "15/09/2023",
  },
  {
    id: 3,
    name: "Loratadina 10mg",
    description: "Caja 30 comprimidos",
    originalPrice: "$7.290",
    discountedPrice: "$3.645",
    discount: 50,
    image: "/images/products/loratadina.jpg",
    pharmacy: "Farmacia Salcobrand",
    distance: "0.8 km",
    expirationDate: "10/09/2023",
  },
  {
    id: 4,
    name: "Omeprazol 20mg",
    description: "Frasco 30 cápsulas",
    originalPrice: "$9.990",
    discountedPrice: "$6.990",
    discount: 30,
    image: "/images/products/omeprazol.jpg",
    pharmacy: "Farmacia Ahumada",
    distance: "1.5 km",
    expirationDate: "05/10/2023",
  },
]);

// Datos simulados para farmacias
const pharmacies = ref([
  {
    id: 1,
    name: "Farmacia Central",
    logo: "/images/pharmacies/central.png",
    location: "Santiago Centro",
  },
  {
    id: 2,
    name: "Cruz Verde",
    logo: "/images/pharmacies/cruz-verde.png",
    location: "Providencia",
  },
  {
    id: 3,
    name: "Salcobrand",
    logo: "/images/pharmacies/salcobrand.png",
    location: "Las Condes",
  },
  {
    id: 4,
    name: "Farmacia Ahumada",
    logo: "/images/pharmacies/ahumada.png",
    location: "Vitacura",
  },
  {
    id: 5,
    name: "Dr. Simi",
    logo: "/images/pharmacies/drsimi.png",
    location: "La Florida",
  },
  {
    id: 6,
    name: "Farmacias Knop",
    logo: "/images/pharmacies/knop.png",
    location: "Ñuñoa",
  },
]);

// Datos simulados para testimonios
const testimonials = ref([
  {
    name: "María González",
    avatar: "/images/avatar-placeholder.svg",
    city: "Santiago",
    comment:
      "Gracias a FarmaciaDescuento pude ahorrar un 45% en un medicamento que tomo regularmente. ¡Súper recomendado!",
  },
  {
    name: "Juan Pérez",
    avatar: "/images/avatar-placeholder.svg",
    city: "Viña del Mar",
    comment:
      "Excelente servicio, encontré antibióticos con un descuento increíble y el proceso de compra fue muy fácil.",
  },
  {
    name: "Carla Ramírez",
    avatar: "/images/avatar-placeholder.svg",
    city: "Concepción",
    comment:
      "Me encanta la plataforma. He ahorrado mucho dinero en medicamentos para mi familia. La recomiendo 100%.",
  },
]);
</script>
