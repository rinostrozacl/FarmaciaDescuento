<template>
  <div class="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-bold mb-6">Mi Perfil</h1>

    <div class="bg-white shadow rounded-lg overflow-hidden">
      <!-- Secciones del perfil -->
      <div class="border-b border-gray-200">
        <nav class="flex -mb-px">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="activeTab = tab.id"
            class="py-4 px-6 border-b-2 font-medium text-sm"
            :class="
              activeTab === tab.id
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            "
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Información Personal -->
      <div v-if="activeTab === 'info'" class="p-6">
        <form @submit.prevent="updateProfile" class="space-y-6">
          <div class="flex flex-col sm:flex-row">
            <div class="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
              <div
                class="relative rounded-full h-20 w-20 overflow-hidden bg-gray-100"
              >
                <img
                  v-if="profileImage || user.photoURL"
                  :src="profileImage || user.photoURL"
                  alt="Foto de perfil"
                  class="h-full w-full object-cover"
                />
                <svg
                  v-else
                  class="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div class="mt-2">
                <label
                  class="block text-sm font-medium text-green-600 cursor-pointer hover:text-green-500"
                >
                  <span>Cambiar foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleImageChange"
                    class="sr-only"
                  />
                </label>
              </div>
            </div>

            <div class="flex-1 space-y-4">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    for="firstName"
                    class="block text-sm font-medium text-gray-700"
                    >Nombre</label
                  >
                  <input
                    type="text"
                    id="firstName"
                    v-model="profileForm.firstName"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label
                    for="lastName"
                    class="block text-sm font-medium text-gray-700"
                    >Apellido</label
                  >
                  <input
                    type="text"
                    id="lastName"
                    v-model="profileForm.lastName"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="profileForm.email"
                  disabled
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50"
                />
              </div>

              <div>
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-700"
                  >Teléfono</label
                >
                <input
                  type="tel"
                  id="phone"
                  v-model="profileForm.phone"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label for="address" class="block text-sm font-medium text-gray-700"
              >Dirección</label
            >
            <input
              type="text"
              id="address"
              v-model="profileForm.address"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div v-if="errorMessage" class="text-red-600 text-sm">
            {{ errorMessage }}
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Guardando...</span>
              <span v-else>Guardar cambios</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Historial de Pedidos -->
      <div v-if="activeTab === 'orders'" class="p-6">
        <div v-if="orders.length === 0" class="text-center py-10">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No hay pedidos</h3>
          <p class="mt-1 text-sm text-gray-500">
            Aún no has realizado ningún pedido.
          </p>
          <div class="mt-6">
            <NuxtLink
              to="/productos"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Ver productos
            </NuxtLink>
          </div>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Pedido
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Estado
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in orders" :key="order.id">
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  #{{ order.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(order.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800':
                        order.status === 'completado',
                      'bg-yellow-100 text-yellow-800':
                        order.status === 'pendiente',
                      'bg-blue-100 text-blue-800':
                        order.status === 'en proceso',
                    }"
                  >
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${{ order.total.toLocaleString("es-CL") }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    @click="viewOrderDetails(order.id)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Ver detalles
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Seguridad -->
      <div v-if="activeTab === 'security'" class="p-6">
        <form @submit.prevent="updatePassword" class="space-y-6">
          <div>
            <label
              for="currentPassword"
              class="block text-sm font-medium text-gray-700"
              >Contraseña actual</label
            >
            <input
              type="password"
              id="currentPassword"
              v-model="passwordForm.currentPassword"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label
              for="newPassword"
              class="block text-sm font-medium text-gray-700"
              >Nueva contraseña</label
            >
            <input
              type="password"
              id="newPassword"
              v-model="passwordForm.newPassword"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700"
              >Confirmar nueva contraseña</label
            >
            <input
              type="password"
              id="confirmPassword"
              v-model="passwordForm.confirmPassword"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div v-if="securityError" class="text-red-600 text-sm">
            {{ securityError }}
          </div>

          <div v-if="securitySuccess" class="text-green-600 text-sm">
            {{ securitySuccess }}
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              :disabled="isPasswordLoading"
            >
              <span v-if="isPasswordLoading">Actualizando...</span>
              <span v-else>Actualizar contraseña</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useUserStore } from "~/stores/user";

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

const authStore = useAuthStore();
const userStore = useUserStore();

// Estado
const user = computed(() => authStore.user);
const profileImage = ref(null);
const isLoading = ref(false);
const isPasswordLoading = ref(false);
const errorMessage = ref("");
const securityError = ref("");
const securitySuccess = ref("");
const activeTab = ref("info");
const orders = ref([]);

// Tabs
const tabs = [
  { id: "info", name: "Información personal" },
  { id: "orders", name: "Historial de pedidos" },
  { id: "security", name: "Seguridad" },
];

// Formularios
const profileForm = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
});

const passwordForm = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

// Cargar datos del usuario
onMounted(async () => {
  if (user.value) {
    profileForm.email = user.value.email || "";
    profileForm.firstName = user.value.displayName?.split(" ")[0] || "";
    profileForm.lastName =
      user.value.displayName?.split(" ").slice(1).join(" ") || "";

    // Cargar datos adicionales desde Firestore
    try {
      const userData = await userStore.getUserProfile(user.value.uid);
      if (userData) {
        profileForm.phone = userData.phone || "";
        profileForm.address = userData.address || "";
      }

      // Cargar pedidos
      await fetchOrders();
    } catch (error) {
      console.error("Error al cargar datos del usuario:", error);
    }
  }
});

// Cambiar imagen de perfil
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// Actualizar perfil
const updateProfile = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const displayName =
      `${profileForm.firstName} ${profileForm.lastName}`.trim();

    // Actualizar perfil en Firebase Auth
    await authStore.updateProfile({
      displayName,
    });

    // Actualizar foto de perfil si se cambió
    if (profileImage.value && profileImage.value !== user.value.photoURL) {
      await authStore.updateProfilePhoto(profileImage.value);
    }

    // Guardar datos adicionales en Firestore
    await userStore.updateUserProfile(user.value.uid, {
      firstName: profileForm.firstName,
      lastName: profileForm.lastName,
      phone: profileForm.phone,
      address: profileForm.address,
    });
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    errorMessage.value = "Error al actualizar el perfil. Intenta de nuevo.";
  } finally {
    isLoading.value = false;
  }
};

// Actualizar contraseña
const updatePassword = async () => {
  // Reiniciar mensajes
  securityError.value = "";
  securitySuccess.value = "";

  // Validar contraseñas
  if (!passwordForm.currentPassword) {
    securityError.value = "La contraseña actual es requerida";
    return;
  }

  if (!passwordForm.newPassword) {
    securityError.value = "La nueva contraseña es requerida";
    return;
  }

  if (passwordForm.newPassword.length < 6) {
    securityError.value = "La contraseña debe tener al menos 6 caracteres";
    return;
  }

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    securityError.value = "Las contraseñas no coinciden";
    return;
  }

  isPasswordLoading.value = true;

  try {
    await authStore.updatePassword(
      passwordForm.currentPassword,
      passwordForm.newPassword
    );

    // Reiniciar formulario
    passwordForm.currentPassword = "";
    passwordForm.newPassword = "";
    passwordForm.confirmPassword = "";

    securitySuccess.value = "Contraseña actualizada correctamente";
  } catch (error) {
    console.error("Error al actualizar contraseña:", error);

    if (error.code === "auth/wrong-password") {
      securityError.value = "La contraseña actual es incorrecta";
    } else {
      securityError.value =
        "Error al actualizar la contraseña. Intenta de nuevo.";
    }
  } finally {
    isPasswordLoading.value = false;
  }
};

// Cargar pedidos
const fetchOrders = async () => {
  try {
    // Simular carga de pedidos (aquí conectarías con Firestore)
    // Ejemplo de datos de prueba
    orders.value = [
      {
        id: "1001",
        date: new Date("2023-11-15"),
        status: "completado",
        total: 15990,
      },
      {
        id: "1002",
        date: new Date("2023-12-03"),
        status: "en proceso",
        total: 8500,
      },
    ];
  } catch (error) {
    console.error("Error al cargar pedidos:", error);
  }
};

// Ver detalles del pedido
const viewOrderDetails = (orderId) => {
  // Implementar navegación a detalles del pedido
  console.log("Ver detalles del pedido:", orderId);
};

// Formatear fecha
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("es-CL");
};
</script>
