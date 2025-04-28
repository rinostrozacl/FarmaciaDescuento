<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-2">Mis Tickets</h1>
    <p class="text-gray-600 mb-6">
      Gestiona tus tickets de descuento y revisa su estado.
    </p>

    <!-- Tabs de navegación -->
    <div class="flex border-b border-gray-200 mb-6">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="activeTab = tab.value"
        class="py-3 px-5 text-gray-700 font-medium relative"
        :class="{
          'text-green-600 border-b-2 border-green-600': activeTab === tab.value,
          'hover:text-green-600 hover:border-b hover:border-gray-300':
            activeTab !== tab.value,
        }"
      >
        {{ tab.label }}
        <span
          class="ml-1 bg-gray-200 text-gray-600 text-xs rounded-full w-5 h-5 inline-flex items-center justify-center"
          :class="{ 'bg-green-600 text-white': activeTab === tab.value }"
        >
          {{ getTabCount(tab.value) }}
        </span>
      </button>
    </div>

    <div v-if="loading" class="flex justify-center my-10">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"
      ></div>
    </div>

    <div
      v-else-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      {{ error }}
    </div>

    <div
      v-else-if="filteredTickets.length === 0"
      class="text-center py-12 bg-white rounded-lg shadow"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 mx-auto text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <h3 class="text-xl font-semibold text-gray-800 mb-2">
        No tienes tickets en esta categoría
      </h3>
      <p class="text-gray-600 mb-6 max-w-md mx-auto">
        Explora los productos disponibles y genera tickets de descuento para
        aprovechar ofertas especiales.
      </p>
      <NuxtLink
        to="/productos"
        class="inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        Explorar productos
      </NuxtLink>
    </div>

    <div v-else>
      <div
        v-for="ticket in filteredTickets"
        :key="ticket.id"
        class="bg-white rounded-lg shadow-md mb-6 overflow-hidden transition-all hover:shadow-lg hover:translate-y-[-2px]"
      >
        <div
          class="bg-gray-50 px-6 py-4 border-b flex justify-between items-center"
        >
          <div class="text-gray-800 font-medium">Ticket #{{ ticket.id }}</div>
          <div class="text-sm text-gray-600">
            Creado: {{ formatDate(ticket.createdAt) }}
          </div>
          <div
            class="px-3 py-1 rounded-full text-xs font-medium"
            :class="getStatusClass(ticket.status)"
          >
            {{ getStatusText(ticket.status) }}
          </div>
        </div>

        <div class="p-6">
          <!-- Información de farmacia -->
          <div class="flex items-center mb-4">
            <div
              class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mr-3"
            >
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div>
              <div class="font-medium">{{ ticket.pharmacy.name }}</div>
              <div class="text-sm text-gray-600">
                {{ ticket.pharmacy.address || "Dirección no disponible" }}
              </div>
            </div>
          </div>

          <!-- Lista de productos -->
          <div class="border-t border-b border-gray-100 py-4 mb-4">
            <div v-if="ticket.items && ticket.items.length > 0">
              <div
                v-for="(item, index) in ticket.items"
                :key="index"
                class="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-100"
              >
                <div class="flex-grow">{{ item.name }}</div>
                <div class="text-gray-600 mx-4 text-sm">
                  {{ item.quantity }} unidad(es)
                </div>
                <div class="font-medium">${{ formatPrice(item.price) }}</div>
              </div>
            </div>
            <div v-else class="text-gray-500 text-sm py-2 italic">
              No hay detalles de productos disponibles
            </div>
          </div>

          <!-- Resumen de precios -->
          <div class="flex justify-between items-end mb-4">
            <div class="font-medium">Total:</div>
            <div>
              <div class="text-xl font-bold text-gray-800">
                ${{ formatPrice(ticket.total) }}
              </div>
              <div class="text-sm text-green-600">
                Ahorro: ${{ formatPrice(ticket.savings) }}
              </div>
            </div>
          </div>

          <!-- Acciones y validez -->
          <div class="flex justify-between items-center">
            <div
              class="text-sm"
              :class="{
                'text-gray-600':
                  ticket.status !== 'ready' && ticket.status !== 'pending',
                'text-yellow-600': ticket.status === 'ready',
                'text-red-600':
                  ticket.status === 'pending' &&
                  ticket.timeRemaining &&
                  ticket.timeRemaining < 6,
              }"
            >
              <span
                v-if="ticket.status === 'pending' || ticket.status === 'ready'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 inline-block mr-1"
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
                Válido por:
                {{ formatTimeRemaining(ticket.timeRemaining) || "N/A" }}
              </span>
              <span v-else-if="ticket.status === 'completed'">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 inline-block mr-1"
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
                Utilizado el
                {{ formatDate(ticket.completedAt || ticket.createdAt) }}
              </span>
              <span v-else-if="ticket.status === 'cancelled'">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 inline-block mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancelado
              </span>
            </div>
            <div class="flex space-x-2">
              <button
                @click="showTicketDetails(ticket)"
                class="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Ver Ticket
              </button>
              <button
                v-if="ticket.status === 'pending' || ticket.status === 'ready'"
                class="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Descargar QR
              </button>
              <button
                v-if="canCancel(ticket)"
                @click="cancelTicket(ticket.id)"
                class="px-4 py-2 text-sm border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de detalles del ticket -->
    <div
      v-if="selectedTicket"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black bg-opacity-50"
        @click="selectedTicket = null"
      ></div>
      <div
        class="bg-white rounded-lg shadow-xl w-full max-w-2xl z-10 relative overflow-hidden max-h-90vh"
      >
        <div class="flex justify-between items-center p-6 border-b">
          <h2 class="text-xl font-semibold text-gray-800">
            Detalles del Ticket #{{ selectedTicket.id }}
          </h2>
          <button
            @click="selectedTicket = null"
            class="text-gray-500 hover:text-gray-700"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <!-- Código QR -->
          <div
            class="w-32 h-32 mx-auto mb-6 bg-gray-100 flex items-center justify-center"
          >
            <div class="text-xs text-gray-500 text-center">
              Código QR del Ticket
            </div>
          </div>

          <!-- Información general -->
          <div class="mb-6">
            <h3 class="text-lg font-medium text-gray-800 mb-3">
              Información General
            </h3>
            <p class="mb-2">
              <span class="font-medium">Estado:</span>
              <span
                class="px-2 py-1 rounded-full text-xs font-medium"
                :class="getStatusClass(selectedTicket.status)"
              >
                {{ getStatusText(selectedTicket.status) }}
              </span>
            </p>
            <p class="mb-2">
              <span class="font-medium">Fecha de creación:</span>
              {{ formatDate(selectedTicket.createdAt) }}
            </p>
            <p class="mb-2">
              <span class="font-medium">Válido hasta:</span>
              {{ formatExpiryDate(selectedTicket) }}
            </p>
            <p class="mb-2">
              <span class="font-medium">Farmacia:</span>
              {{ selectedTicket.pharmacy.name }} ({{
                selectedTicket.pharmacy.address || "Dirección no disponible"
              }})
            </p>
          </div>

          <!-- Productos -->
          <div class="mb-6">
            <h3 class="text-lg font-medium text-gray-800 mb-3">Productos</h3>
            <div v-if="selectedTicket.items && selectedTicket.items.length > 0">
              <div
                v-for="(item, index) in selectedTicket.items"
                :key="index"
                class="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-100"
              >
                <div class="flex-grow">{{ item.name }}</div>
                <div class="text-gray-600 mx-4 text-sm">
                  {{ item.quantity }} unidad(es)
                </div>
                <div class="font-medium">${{ formatPrice(item.price) }}</div>
              </div>
              <div
                class="flex justify-between items-end mt-4 pt-4 border-t border-gray-100"
              >
                <div class="font-medium">Total:</div>
                <div>
                  <div class="text-xl font-bold text-gray-800">
                    ${{ formatPrice(selectedTicket.total) }}
                  </div>
                  <div class="text-sm text-green-600">
                    Ahorro: ${{ formatPrice(selectedTicket.savings) }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-gray-500 text-sm py-2 italic">
              No hay detalles de productos disponibles
            </div>
          </div>

          <!-- Instrucciones -->
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-3">
              Instrucciones
            </h3>
            <ol class="list-decimal pl-5 space-y-2 text-gray-700">
              <li>
                Presenta este código QR en la farmacia dentro del tiempo de
                validez.
              </li>
              <li>
                El personal de la farmacia escaneará el código para validar tu
                ticket.
              </li>
              <li>
                Una vez validado, podrás realizar la compra con el descuento
                aplicado.
              </li>
              <li>
                El ticket es válido solo para los productos y cantidades
                especificadas.
              </li>
            </ol>
          </div>
        </div>

        <div class="p-6 border-t text-center">
          <button
            class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Descargar Ticket
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useToast } from "~/composables/useToast";

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

interface Pharmacy {
  id: string;
  name: string;
  address?: string;
}

interface TicketItem {
  name: string;
  quantity: number;
  price: number;
}

interface Ticket {
  id: string;
  createdAt: Date;
  completedAt?: Date;
  status: "pending" | "completed" | "cancelled" | "ready";
  total: number;
  savings: number;
  pharmacy: Pharmacy;
  items: TicketItem[];
  timeRemaining?: number; // en horas
}

const tickets = ref<Ticket[]>([]);
const loading = ref(true);
const error = ref("");
const selectedTicket = ref<Ticket | null>(null);
const activeTab = ref("all");
const { showToast, error: showError } = useToast();

const tabs = [
  { label: "Activos", value: "active" },
  { label: "Listos", value: "ready" },
  { label: "Utilizados", value: "completed" },
  { label: "Cancelados", value: "cancelled" },
  { label: "Todos", value: "all" },
];

// Filtrar tickets según pestaña activa
const filteredTickets = computed(() => {
  if (activeTab.value === "all") {
    return tickets.value;
  } else if (activeTab.value === "active") {
    return tickets.value.filter((ticket) => ticket.status === "pending");
  } else {
    return tickets.value.filter((ticket) => ticket.status === activeTab.value);
  }
});

// Contar tickets por tipo
const getTabCount = (tabValue: string) => {
  if (tabValue === "all") {
    return tickets.value.length;
  } else if (tabValue === "active") {
    return tickets.value.filter((ticket) => ticket.status === "pending").length;
  } else {
    return tickets.value.filter((ticket) => ticket.status === tabValue).length;
  }
};

// Cargar tickets del usuario
onMounted(async () => {
  try {
    loading.value = true;
    // Aquí se conectaría con el backend para obtener los tickets
    // Por ahora usamos datos de ejemplo
    setTimeout(() => {
      tickets.value = [
        {
          id: "TK-1001",
          createdAt: new Date(Date.now() - 86400000), // 1 día atrás
          status: "pending",
          total: 11400,
          savings: 7080,
          timeRemaining: 23.75, // 23 horas y 45 minutos
          pharmacy: {
            id: "ph-1",
            name: "Farmacia San Pablo",
            address: "Av. Presidente Ibáñez 1234, Puerto Montt",
          },
          items: [
            { name: "Paracetamol 500mg", quantity: 2, price: 7180 },
            { name: "Ibuprofeno 400mg", quantity: 1, price: 4220 },
          ],
        },
        {
          id: "TK-1002",
          createdAt: new Date(Date.now() - 172800000), // 2 días atrás
          completedAt: new Date(Date.now() - 130000000),
          status: "completed",
          total: 12300,
          savings: 1500,
          pharmacy: {
            id: "ph-2",
            name: "Farmacia Santa María",
            address: "Av. Los Lagos 567, Puerto Montt",
          },
          items: [
            { name: "Omeprazol 20mg", quantity: 1, price: 8500 },
            { name: "Loratadina 10mg", quantity: 2, price: 3800 },
          ],
        },
        {
          id: "TK-1003",
          createdAt: new Date(Date.now() - 129600000), // 1.5 días atrás
          status: "ready",
          total: 3995,
          savings: 3995,
          timeRemaining: 5.5, // 5 horas y 30 minutos
          pharmacy: {
            id: "ph-3",
            name: "Farmacia Cruz Verde",
            address: "Av. Angelmó 456, Puerto Montt",
          },
          items: [{ name: "Loratadina 10mg", quantity: 1, price: 3995 }],
        },
        {
          id: "TK-1004",
          createdAt: new Date(Date.now() - 345600000), // 4 días atrás
          status: "cancelled",
          total: 15800,
          savings: 2300,
          pharmacy: {
            id: "ph-1",
            name: "Farmacia San Pablo",
            address: "Av. Presidente Ibáñez 1234, Puerto Montt",
          },
          items: [
            { name: "Vitamina C 1000mg", quantity: 1, price: 9800 },
            { name: "Amoxicilina 500mg", quantity: 1, price: 6000 },
          ],
        },
      ];
      loading.value = false;
    }, 1000);
  } catch (err: any) {
    error.value = "No se pudieron cargar los tickets: " + err.message;
    loading.value = false;
  }
});

// Formatear precio
const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Formatear fecha
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

// Formatear tiempo restante
const formatTimeRemaining = (hours?: number) => {
  if (!hours) return null;

  const fullHours = Math.floor(hours);
  const minutes = Math.round((hours - fullHours) * 60);

  if (fullHours === 0) {
    return `${minutes} minutos`;
  } else if (minutes === 0) {
    return `${fullHours} ${fullHours === 1 ? "hora" : "horas"}`;
  } else {
    return `${fullHours} ${fullHours === 1 ? "hora" : "horas"} ${minutes} minutos`;
  }
};

// Formatear fecha de expiración
const formatExpiryDate = (ticket: Ticket) => {
  if (ticket.status === "completed" || ticket.status === "cancelled") {
    return "No aplicable";
  }

  if (!ticket.timeRemaining) {
    return "No disponible";
  }

  const expiryDate = new Date(
    new Date(ticket.createdAt).getTime() + 24 * 60 * 60 * 1000
  ); // 24 horas
  return formatDate(expiryDate);
};

// Obtener clase según estado
const getStatusClass = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-green-100 text-green-800 border border-green-200";
    case "ready":
      return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    case "completed":
      return "bg-blue-100 text-blue-800 border border-blue-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200";
  }
};

// Obtener texto según estado
const getStatusText = (status: string) => {
  switch (status) {
    case "pending":
      return "Activo";
    case "ready":
      return "Listo para retirar";
    case "completed":
      return "Completado";
    case "cancelled":
      return "Cancelado";
    default:
      return "Desconocido";
  }
};

// Verificar si puede cancelar
const canCancel = (ticket: Ticket) => {
  return ["pending", "ready"].includes(ticket.status);
};

// Cancelar ticket
const cancelTicket = async (ticketId: string) => {
  try {
    // Aquí se conectaría con el backend para cancelar el ticket
    // Por ahora simulamos la operación
    const ticket = tickets.value.find((t) => t.id === ticketId);
    if (ticket) {
      ticket.status = "cancelled";
      showToast({
        message: "Ticket cancelado con éxito",
        type: "success",
      });
    }
  } catch (err: any) {
    showError("No se pudo cancelar el ticket: " + err.message);
  }
};

// Mostrar detalles del ticket
const showTicketDetails = (ticket: Ticket) => {
  selectedTicket.value = ticket;
};
</script>
