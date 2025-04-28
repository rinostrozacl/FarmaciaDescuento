<template>
  <div>
    <!-- Breadcrumbs -->
    <div class="bg-gray-100 py-3 mb-6">
      <div class="container mx-auto px-4">
        <ul class="flex flex-wrap items-center text-sm">
          <li class="flex items-center">
            <NuxtLink to="/" class="text-primary hover:text-primary-dark"
              >Inicio</NuxtLink
            >
            <span class="mx-2 text-gray-500">/</span>
          </li>
          <li class="flex items-center">
            <NuxtLink
              to="/categorias"
              class="text-primary hover:text-primary-dark"
              >Categorías</NuxtLink
            >
            <span class="mx-2 text-gray-500">/</span>
          </li>
          <li class="flex items-center">
            <NuxtLink
              to="/productos"
              class="text-primary hover:text-primary-dark"
              >{{ product?.category || "Productos" }}</NuxtLink
            >
            <span class="mx-2 text-gray-500">/</span>
          </li>
          <li class="text-accent font-medium">
            {{ product?.name || "Cargando..." }}
          </li>
        </ul>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- Cargando -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
        ></div>
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="bg-red-100 p-4 rounded-lg text-red-700 mb-6"
      >
        {{ error }}
        <NuxtLink to="/productos" class="text-primary hover:underline ml-4">
          Volver a la lista de productos
        </NuxtLink>
      </div>

      <!-- Detalle del producto -->
      <div
        v-else-if="product"
        class="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div class="flex flex-col md:flex-row">
          <!-- Galería del producto -->
          <div class="md:w-2/5 lg:w-1/3 p-6">
            <div class="relative">
              <img
                :src="product.imageUrl || '/images/product-placeholder.jpg'"
                :alt="product.name"
                class="w-full h-80 object-contain border rounded-lg bg-white p-4"
                @error="handleImageError"
              />
              <div
                class="absolute top-0 right-0 bg-accent text-white px-3 py-2 rounded-bl-lg text-lg font-bold"
              >
                -{{ product.discountPercentage }}%
              </div>
            </div>
            <!-- Miniaturas (simuladas) -->
            <div class="flex gap-2">
              <div
                class="w-20 h-20 border rounded-lg p-1 border-primary cursor-pointer"
                @click="handleImageError"
              >
                <img
                  :src="product.imageUrl || '/images/product-placeholder.jpg'"
                  :alt="product.name"
                  class="w-full h-full object-contain"
                  @error="handleImageError"
                />
              </div>
              <div
                class="w-20 h-20 border rounded-lg p-1 cursor-pointer"
                @click="handleImageError"
              >
                <img
                  :src="product.imageUrl || '/images/product-placeholder.jpg'"
                  :alt="product.name"
                  class="w-full h-full object-contain"
                  @error="handleImageError"
                />
              </div>
              <div
                class="w-20 h-20 border rounded-lg p-1 cursor-pointer"
                @click="handleImageError"
              >
                <img
                  :src="product.imageUrl || '/images/product/paracetamol.png'"
                  :alt="product.name"
                  class="w-full h-full object-contain"
                  @error="handleImageError"
                />
              </div>
            </div>
          </div>

          <!-- Información del producto -->
          <div class="md:w-3/5 lg:w-2/3 p-6">
            <h1 class="text-3xl font-bold text-secondary mb-4">
              {{ product.name }}
            </h1>

            <!-- Farmacia y precio -->
            <div class="mb-6">
              <h3 class="text-xl font-semibold text-secondary mb-2">
                Selecciona una farmacia:
              </h3>

              <div class="flex items-center mb-4">
                <div class="bg-gray-100 p-2 rounded-full mr-3">
                  <Icon name="mdi:store" size="24px" class="text-primary" />
                </div>
                <div>
                  <span>Disponible en:</span>
                  <span class="font-bold text-primary ml-1"
                    >{{ getRandomFarmacyCount(product.id) }} farmacias</span
                  >
                </div>
              </div>

              <div class="mb-6 flex items-center">
                <div
                  class="bg-accent text-white px-3 py-1 rounded-lg font-bold text-sm mr-4"
                >
                  -{{ product.discountPercentage }}%
                </div>
                <div class="flex items-baseline">
                  <span class="text-gray-500 line-through text-lg mr-2"
                    >${{ formatPrice(product.price) }}</span
                  >
                  <span class="text-2xl font-bold text-accent"
                    >desde ${{
                      formatPrice(
                        calculateDiscountedPrice(
                          product.price,
                          product.discountPercentage
                        )
                      )
                    }}</span
                  >
                </div>
              </div>
            </div>

            <!-- Opciones de farmacias -->
            <div class="border rounded-lg overflow-hidden mb-6">
              <div
                v-for="(pharmacy, index) in mockPharmacies"
                :key="index"
                class="border-b last:border-b-0"
              >
                <div
                  class="p-4 cursor-pointer transition-colors hover:bg-gray-50"
                  :class="{
                    'bg-green-50 border-l-4 border-primary':
                      selectedPharmacy === index,
                  }"
                  @click="selectedPharmacy = index"
                >
                  <div class="flex justify-between items-center mb-2">
                    <div class="font-bold text-secondary text-lg">
                      {{ pharmacy.name }}
                    </div>
                    <div class="flex items-center">
                      <span
                        class="bg-accent text-white text-xs px-2 py-1 rounded-lg mr-2"
                        >-{{ product.discountPercentage }}%</span
                      >
                      <span class="text-gray-500 line-through text-sm mr-2"
                        >${{ formatPrice(product.price + index * 300) }}</span
                      >
                      <span class="font-bold text-accent text-lg"
                        >${{
                          formatPrice(
                            calculateDiscountedPrice(
                              product.price,
                              product.discountPercentage
                            ) +
                              index * 300
                          )
                        }}</span
                      >
                    </div>
                  </div>
                  <div class="text-sm text-gray-600 mb-3">
                    {{ pharmacy.address }}
                  </div>
                  <div class="flex flex-wrap gap-5 text-xs text-gray-500">
                    <div class="flex items-center text-cyan-500">
                      <Icon name="mdi:map-marker" size="16px" class="mr-1" />
                      {{ (1 + index * 0.8).toFixed(1) }} km
                    </div>
                    <div class="flex items-center">
                      <Icon
                        name="mdi:package-variant-closed"
                        size="16px"
                        class="mr-1"
                      />
                      Stock: {{ 15 - index * 3 }} unidades
                    </div>
                    <div class="flex items-center text-red-500">
                      <Icon name="mdi:flask" size="16px" class="mr-1" /> Lab:
                      {{ product.brand }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Descripción del producto -->
            <div class="mb-6">
              <p class="text-gray-700">{{ product.description }}</p>
            </div>

            <!-- Categorías -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                class="bg-gray-100 text-secondary px-3 py-1 rounded-full text-sm flex items-center"
              >
                <Icon name="mdi:pill" class="mr-1" /> {{ product.category }}
              </span>
              <span
                class="bg-gray-100 text-secondary px-3 py-1 rounded-full text-sm flex items-center"
              >
                <Icon name="mdi:flask-outline" class="mr-1" />
                {{ product.activeIngredient }}
              </span>
              <span
                class="bg-gray-100 text-secondary px-3 py-1 rounded-full text-sm flex items-center"
              >
                <Icon name="mdi:calendar-clock" class="mr-1" /> Vence en
                {{ getDaysUntilExpiry(product.expiryDate) }} días
              </span>
            </div>

            <!-- Acción de compra -->
            <div class="flex items-center gap-4">
              <div class="flex border rounded-lg overflow-hidden">
                <button
                  class="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition"
                  @click="quantity > 1 ? quantity-- : null"
                >
                  -
                </button>
                <input
                  type="number"
                  v-model="quantity"
                  min="1"
                  class="w-16 text-center border-x"
                />
                <button
                  class="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition"
                  @click="quantity++"
                >
                  +
                </button>
              </div>
              <button
                class="flex-1 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition flex items-center justify-center"
                @click="addToCart"
                :disabled="loading || addingToCart"
              >
                <Icon name="mdi:cart" class="mr-2" />
                <span v-if="addingToCart">Agregando...</span>
                <span v-else>Agregar al carrito</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Pestañas de información -->
        <div class="border-t p-6">
          <div class="flex border-b mb-4">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              class="px-4 py-3 font-medium transition-colors"
              :class="
                activeTab === index
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-primary'
              "
              @click="activeTab = index"
            >
              {{ tab.label }}
            </button>
          </div>

          <div v-if="activeTab === 0">
            <h3 class="text-xl font-semibold text-secondary mb-4">
              Descripción del Producto
            </h3>
            <p class="mb-3">{{ product.description }}</p>
            <p class="mb-3">
              Este producto contiene {{ product.activeIngredient }}
              {{ product.dosage }} en una presentación de
              {{ product.presentation }}.
            </p>
            <p>
              A diferencia de otros medicamentos similares, este producto ofrece
              una excelente relación calidad-precio y está próximo a vencer, lo
              que permite un descuento excepcional manteniendo toda su
              efectividad.
            </p>
          </div>

          <div v-if="activeTab === 1">
            <h3 class="text-xl font-semibold text-secondary mb-4">
              Modo de Uso
            </h3>
            <p class="mb-3">Adultos y niños mayores de 12 años:</p>
            <ul class="list-disc pl-5 mb-4">
              <li class="mb-2">
                Tomar según la indicación médica o como se indica en el envase
              </li>
              <li class="mb-2">No exceder la dosis recomendada</li>
              <li class="mb-2">
                No usar por más de 5 días consecutivos sin consultar a un médico
              </li>
            </ul>
            <p>
              Se recomienda tomar con un vaso de agua. Puede tomarse con o sin
              alimentos.
            </p>
          </div>

          <div v-if="activeTab === 2">
            <h3 class="text-xl font-semibold text-secondary mb-4">
              Advertencias y Precauciones
            </h3>
            <ul class="list-disc pl-5">
              <li class="mb-2">No exceder la dosis recomendada</li>
              <li class="mb-2">
                El uso prolongado o excesivo puede causar efectos secundarios
              </li>
              <li class="mb-2">
                Consulte a su médico si está embarazada o en período de
                lactancia
              </li>
              <li class="mb-2">No usar en caso de enfermedad hepática grave</li>
              <li class="mb-2">
                No consumir alcohol mientras toma este medicamento
              </li>
              <li class="mb-2">Mantener fuera del alcance de los niños</li>
              <li class="mb-2">
                Almacenar en lugar fresco y seco, protegido de la luz
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Recomendaciones -->
      <div v-if="similarProducts.length > 0" class="mt-12 mb-12">
        <h2 class="text-2xl font-bold mb-6 text-center text-secondary">
          Productos Similares
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="similarProduct in similarProducts"
            :key="similarProduct.id"
            class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div class="relative">
              <img
                :src="
                  similarProduct.imageUrl || '/images/product-placeholder.jpg'
                "
                :alt="similarProduct.name"
                class="h-48 w-full object-contain p-4"
                @error="handleImageError"
              />
              <div
                class="absolute top-0 right-0 bg-accent text-white px-2 py-1 rounded-bl-lg"
              >
                -{{ similarProduct.discountPercentage }}%
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-1">
                {{ similarProduct.name }}
              </h3>
              <p class="text-sm text-gray-600 mb-3">
                {{ similarProduct.brand }} · {{ similarProduct.dosage }}
              </p>
              <div>
                <div class="flex items-baseline">
                  <span class="text-gray-500 line-through text-sm mr-2"
                    >${{ formatPrice(similarProduct.price) }}</span
                  >
                  <span class="text-lg font-bold text-accent">
                    desde ${{
                      formatPrice(
                        calculateDiscountedPrice(
                          similarProduct.price,
                          similarProduct.discountPercentage
                        )
                      )
                    }}
                  </span>
                </div>
              </div>
              <div class="mt-2">
                <p class="text-sm text-gray-600 mb-2">
                  Disponible en
                  {{ getRandomFarmacyCount(similarProduct.id) }} farmacias
                </p>
                <NuxtLink
                  :to="`/productos/${similarProduct.id}`"
                  class="block w-full text-center py-2 rounded bg-primary text-white hover:bg-primary-dark transition"
                >
                  Ver Ofertas
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "~/stores/cart";
import { useToast } from "~/composables/useToast";

const route = useRoute();
const cartStore = useCartStore();
const { showToast } = useToast();

// Estados
const loading = ref(true);
const addingToCart = ref(false);
const error = ref(null);
const product = ref(null);
const similarProducts = ref([]);
const quantity = ref(1);
const selectedPharmacy = ref(0);
const activeTab = ref(0);

// Pestañas de información
const tabs = [
  { label: "Descripción", id: "description" },
  { label: "Modo de Uso", id: "usage" },
  { label: "Advertencias", id: "warnings" },
];

// Datos de muestra para farmacias
const mockPharmacies = [
  {
    id: "f1",
    name: "Farmacia San Pablo",
    address: "Av. Presidente Ibáñez 1234, Puerto Montt",
    distance: 1.2,
    stock: 12,
    lab: "Laboratorio Chile",
  },
  {
    id: "f2",
    name: "Farmacia Cruz Verde",
    address: "Av. Angelmó 456, Puerto Montt",
    distance: 2.5,
    stock: 8,
    lab: "Mintlab",
  },
  {
    id: "f3",
    name: "Farmacia Salcobrand",
    address: "Av. Diego Portales 789, Puerto Montt",
    distance: 3.1,
    stock: 15,
    lab: "Laboratorio Bagó",
  },
  {
    id: "f4",
    name: "Farmacia Dr. Simi",
    address: "Calle Urmeneta 234, Puerto Montt",
    distance: 1.8,
    stock: 20,
    lab: "Laboratorio Dr. Simi",
  },
];

// Datos de muestra para pruebas (reemplazar con llamada a API)
const mockProducts = [
  {
    id: "1",
    name: "Paracetamol",
    brand: "Laboratorio Chile",
    category: "Analgésicos",
    activeIngredient: "Paracetamol",
    dosage: "500mg",
    presentation: "Caja 20 comprimidos",
    description:
      "Alivia el dolor y reduce la fiebre. Indicado para el tratamiento sintomático del dolor leve a moderado y la fiebre. Actúa a nivel del sistema nervioso central inhibiendo la síntesis de prostaglandinas.",
    price: 3990,
    discountPercentage: 30,
    imageUrl: "/images/product-placeholder.jpg",
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días después
    pharmacyName: "Farmacia Central",
    pharmacyId: "101",
    pharmacyAddress: "Av. Providencia 1234, Santiago",
    requiresPrescription: false,
  },
  {
    id: "2",
    name: "Ibuprofeno",
    brand: "Laboratorio Bagó",
    category: "Antiinflamatorios",
    activeIngredient: "Ibuprofeno",
    dosage: "400mg",
    presentation: "Caja 30 comprimidos",
    description:
      "Alivia el dolor y reduce la inflamación. Eficaz en el tratamiento de dolores musculares, articulares, dolor de cabeza y fiebre. Actúa inhibiendo la producción de prostaglandinas.",
    price: 4590,
    discountPercentage: 25,
    imageUrl: "/images/product-placeholder.jpg",
    expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 días después
    pharmacyName: "Farmacia del Barrio",
    pharmacyId: "102",
    pharmacyAddress: "Av. Las Condes 4321, Las Condes",
    requiresPrescription: false,
  },
  {
    id: "3",
    name: "Loratadina",
    brand: "MK",
    category: "Antialérgicos",
    activeIngredient: "Loratadina",
    dosage: "10mg",
    presentation: "Caja 10 comprimidos",
    description:
      "Alivia los síntomas de la alergia como estornudos, picazón y secreción nasal. Este antihistamínico bloquea la acción de la histamina en el organismo.",
    price: 2990,
    discountPercentage: 15,
    imageUrl: "/images/product-placeholder.jpg",
    expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 días después
    pharmacyName: "Farmacia del Sur",
    pharmacyId: "103",
    pharmacyAddress: "Av. Gran Avenida 5678, La Cisterna",
    requiresPrescription: false,
  },
];

// Métodos
const fetchProduct = async () => {
  try {
    loading.value = true;
    error.value = null;

    const productId = "1";
    //route.params.id;

    // Simular llamada a API con retraso
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Buscar producto en datos de muestra
    const foundProduct = mockProducts.find((p) => p.id === productId);

    if (!foundProduct) {
      error.value = "Producto no encontrado";
      return;
    }

    // Asignar imagen específica según el ID del producto
    if (foundProduct.id === "1") {
      foundProduct.imageUrl = "/images/products/paracetamol.png";
    } else if (foundProduct.id === "2") {
      foundProduct.imageUrl = "/images/products/ibuprofeno.png";
    } else if (foundProduct.id === "3") {
      foundProduct.imageUrl = "/images/products/loratadina.png";
    } else {
      foundProduct.imageUrl = "/images/product-placeholder.jpg";
    }

    product.value = foundProduct;

    // Buscar productos similares (misma categoría pero distinto ID)
    similarProducts.value = mockProducts
      .filter(
        (p) => p.category === foundProduct.category && p.id !== foundProduct.id
      )
      .slice(0, 4);

    // Asignar imágenes a productos similares
    similarProducts.value.forEach((p) => {
      if (p.id === "1") {
        p.imageUrl = "/images/products/paracetamol.png";
      } else if (p.id === "2") {
        p.imageUrl = "/images/products/ibuprofeno.png";
      } else if (p.id === "3") {
        p.imageUrl = "/images/products/loratadina.png";
      } else {
        p.imageUrl = "/images/product-placeholder.jpg";
      }
    });
  } catch (err) {
    console.error("Error al cargar el producto:", err);
    error.value =
      "No se pudo cargar el producto. Por favor, intenta nuevamente.";
  } finally {
    loading.value = false;
  }
};

const addToCart = async () => {
  try {
    addingToCart.value = true;

    // Simular retraso de llamada a API
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Obtener farmacia seleccionada
    const pharmacy = mockPharmacies[selectedPharmacy.value];

    // Calcular precio con la farmacia seleccionada
    const price =
      calculateDiscountedPrice(
        product.value.price,
        product.value.discountPercentage
      ) +
      selectedPharmacy.value * 300;

    // Agregar al carrito usando la store
    const productToAdd = {
      ...product.value,
      quantity: quantity.value,
      pharmacyName: pharmacy.name,
      pharmacyId: pharmacy.id,
      pharmacyAddress: pharmacy.address,
      calculatedPrice: price,
    };

    cartStore.addToCart(productToAdd);

    // Mostrar notificación
    showToast({
      message: `${product.value.name} agregado al carrito`,
      type: "success",
      duration: 3000,
    });
  } catch (err) {
    console.error("Error al agregar al carrito:", err);
    showToast({
      message: "Error al agregar al carrito. Intenta nuevamente.",
      type: "error",
      duration: 3000,
    });
  } finally {
    addingToCart.value = false;
  }
};

const calculateDiscountedPrice = (price, discountPercentage) => {
  return price - price * (discountPercentage / 100);
};

const formatPrice = (price) => {
  return Math.round(price).toLocaleString("es-CL");
};

const getDaysUntilExpiry = (expiryDate) => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = Math.abs(expiry - now);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const handleImageError = (event) => {
  if (event && event.target) {
    event.target.src = "/images/product-placeholder.jpg";
  }
};

// Cargar datos al montar el componente
onMounted(() => {
  fetchProduct();
});

// Configuración de metadatos de la página
definePageMeta({
  layout: "default",
});

// Función para obtener un número aleatorio pero consistente de farmacias
const getRandomFarmacyCount = (id) => {
  // Convertir el id a número para usar como semilla
  const numericId =
    typeof id === "number" ? id : parseInt(id.replace(/\D/g, "")) || 1;

  // Usar módulo para obtener un número entre 1 y 10
  return (numericId % 10) + 1;
};

// SEO
useHead({
  title: () =>
    product.value
      ? `${product.value.name} - FarmaciaDescuento`
      : "Cargando producto - FarmaciaDescuento",
  meta: [
    {
      name: "description",
      content: () =>
        product.value
          ? `${product.value.name} ${product.value.dosage} con ${product.value.discountPercentage}% de descuento. ${product.value.description?.substring(0, 100)}...`
          : "Detalle de producto en FarmaciaDescuento",
    },
  ],
});
</script>

<style scoped>
.primary {
  color: var(--primary-color);
}
.secondary {
  color: var(--secondary-color);
}
.accent {
  color: var(--accent-color);
}
.bg-primary {
  background-color: var(--primary-color);
}
.bg-primary-dark {
  background-color: var(--primary-dark);
}
.bg-secondary {
  background-color: var(--secondary-color);
}
.bg-accent {
  background-color: var(--accent-color);
}
.border-primary {
  border-color: var(--primary-color);
}
.border-secondary {
  border-color: var(--secondary-color);
}
.border-accent {
  border-color: var(--accent-color);
}
.text-primary {
  color: var(--primary-color);
}
.text-secondary {
  color: var(--secondary-color);
}
.text-accent {
  color: var(--accent-color);
}
</style>
