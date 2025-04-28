<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Preguntas Frecuentes</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="mb-8">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar preguntas..."
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          @input="filterQuestions"
        />
      </div>

      <div v-if="filteredQuestions.length === 0" class="text-center py-8">
        <p class="text-gray-600">
          No se encontraron resultados para tu búsqueda.
        </p>
        <button
          @click="resetSearch"
          class="mt-4 px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Ver todas las preguntas
        </button>
      </div>

      <div v-else>
        <div class="space-y-6">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="mb-8"
          >
            <h2 class="text-xl font-semibold text-gray-800 mb-4">
              {{ category.title }}
            </h2>

            <div class="space-y-4">
              <div
                v-for="(question, qIndex) in getFilteredQuestionsForCategory(
                  category.id
                )"
                :key="qIndex"
                class="border border-gray-200 rounded-md overflow-hidden"
              >
                <button
                  @click="toggleQuestion(question)"
                  class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                  :class="{ 'bg-gray-50': question.isOpen }"
                >
                  <span class="font-medium text-gray-800">{{
                    question.question
                  }}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-500 transition-transform"
                    :class="{ 'transform rotate-180': question.isOpen }"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  v-if="question.isOpen"
                  class="px-6 py-4 bg-gray-50 border-t border-gray-200"
                >
                  <div
                    class="text-gray-600 prose"
                    v-html="question.answer"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 border-t pt-6">
        <h3 class="font-semibold mb-4">
          ¿No encuentras respuesta a tu pregunta?
        </h3>
        <div class="flex flex-col sm:flex-row gap-4">
          <button
            @click="showContactForm"
            class="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 text-center"
          >
            Contactar soporte
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
});

const { showToast } = useToast();
const searchQuery = ref("");

// Categorías de preguntas
const categories = [
  { id: "general", title: "Información General" },
  { id: "account", title: "Cuenta y Registro" },
  { id: "products", title: "Productos y Compras" },
  { id: "tickets", title: "Tickets y Reservas" },
  { id: "returns", title: "Devoluciones" },
];

// Preguntas frecuentes por categoría
const allQuestions = ref([
  {
    id: 1,
    categoryId: "general",
    question: "¿Qué es FarmaciaDescuento?",
    answer:
      "<p>FarmaciaDescuento es una plataforma que conecta a farmacias con clientes interesados en adquirir medicamentos y productos de salud con descuentos significativos. Nuestra especialidad son productos cercanos a su fecha de vencimiento, pero en perfectas condiciones y con garantía de calidad.</p>",
    isOpen: false,
  },
  {
    id: 2,
    categoryId: "general",
    question: "¿Cómo funciona el servicio?",
    answer:
      "<p>Nuestro servicio funciona en tres pasos simples:</p><ol><li>Las farmacias registran productos con descuento en nuestra plataforma.</li><li>Los clientes encuentran los productos que necesitan a precios reducidos.</li><li>Los clientes generan un ticket de reserva y retiran sus productos en la farmacia seleccionada.</li></ol>",
    isOpen: false,
  },
  {
    id: 3,
    categoryId: "account",
    question: "¿Cómo me registro en la plataforma?",
    answer:
      '<p>Para registrarte, haz clic en el botón "Crear Cuenta" en la esquina superior derecha de la página. Completa el formulario con tus datos personales y sigue las instrucciones para verificar tu correo electrónico. ¡Y listo! Ya puedes comenzar a explorar nuestras ofertas.</p>',
    isOpen: false,
  },
  {
    id: 4,
    categoryId: "account",
    question: "¿Puedo usar la plataforma sin registrarme?",
    answer:
      "<p>Puedes explorar productos y ofertas sin necesidad de registro, pero para generar tickets de reserva y completar una compra, es necesario tener una cuenta registrada.</p>",
    isOpen: false,
  },
  {
    id: 5,
    categoryId: "products",
    question: "¿Los productos están próximos a vencer?",
    answer:
      "<p>Sí, muchos de los productos ofrecidos están cercanos a su fecha de vencimiento, lo que nos permite ofrecer descuentos significativos. Sin embargo, todos los productos cumplen con los estándares de calidad y son completamente seguros para su uso dentro del período indicado.</p>",
    isOpen: false,
  },
  {
    id: 6,
    categoryId: "products",
    question: "¿Qué tipos de productos puedo encontrar?",
    answer:
      "<p>En nuestra plataforma podrás encontrar una amplia variedad de productos farmacéuticos y de cuidado personal, incluyendo:</p><ul><li>Medicamentos de venta libre</li><li>Suplementos y vitaminas</li><li>Productos de higiene personal</li><li>Productos para bebés</li><li>Cosméticos y dermocosméticos</li><li>Y mucho más</li></ul>",
    isOpen: false,
  },
  {
    id: 7,
    categoryId: "tickets",
    question: "¿Cómo funciona el sistema de tickets?",
    answer:
      "<p>Al completar tu compra, generamos un ticket digital que funciona como una reserva de los productos seleccionados. Este ticket tiene un código único que debes presentar en la farmacia para retirar tus productos. Los tickets tienen una validez de 24 horas, durante las cuales los productos están reservados a tu nombre.</p>",
    isOpen: false,
  },
  {
    id: 8,
    categoryId: "tickets",
    question: "¿Puedo cancelar un ticket?",
    answer:
      '<p>Sí, puedes cancelar un ticket siempre y cuando aún no lo hayas canjeado en la farmacia. Para cancelar, ve a la sección "Mis Tickets" en tu perfil y selecciona la opción "Cancelar" junto al ticket correspondiente.</p>',
    isOpen: false,
  },
  {
    id: 9,
    categoryId: "returns",
    question: "¿Cuál es la política de devoluciones?",
    answer:
      '<p>Nuestra política de devoluciones contempla casos específicos como errores en el pedido, productos dañados o problemas de calidad. Para más detalles, te invitamos a visitar nuestra <a href="/devoluciones" class="text-green-600 hover:underline">página de devoluciones</a>.</p>',
    isOpen: false,
  },
  {
    id: 10,
    categoryId: "returns",
    question: "¿Cómo solicito una devolución?",
    answer:
      '<p>Para solicitar una devolución, debes seguir estos pasos:</p><ol><li>Ingresa a tu cuenta y selecciona el pedido con el producto a devolver</li><li>Haz clic en "Solicitar Devolución" y completa el formulario</li><li>Adjunta fotos si es necesario y envía la solicitud</li><li>Espera la revisión de tu caso (máximo 48 horas)</li></ol>',
    isOpen: false,
  },
]);

// Filtrar preguntas según búsqueda
const filteredQuestions = ref(allQuestions.value);

const filterQuestions = () => {
  if (!searchQuery.value.trim()) {
    filteredQuestions.value = allQuestions.value;
    return;
  }

  const query = searchQuery.value.toLowerCase();
  filteredQuestions.value = allQuestions.value.filter(
    (q) =>
      q.question.toLowerCase().includes(query) ||
      q.answer.toLowerCase().includes(query)
  );
};

const resetSearch = () => {
  searchQuery.value = "";
  filteredQuestions.value = allQuestions.value;
};

// Filtrar preguntas por categoría
const getFilteredQuestionsForCategory = (categoryId: string) => {
  return filteredQuestions.value.filter((q) => q.categoryId === categoryId);
};

// Abrir/cerrar una pregunta
const toggleQuestion = (question: { isOpen: boolean }) => {
  question.isOpen = !question.isOpen;
};

// Contacto
const showContactForm = () => {
  // Aquí se implementaría la lógica para mostrar un formulario de contacto
  // Por ahora solo mostramos un toast
  showToast({
    message: "Formulario de contacto no disponible en este momento",
    type: "info",
  });
};

// Inicializar con la primera pregunta abierta
onMounted(() => {
  if (allQuestions.value.length > 0) {
    allQuestions.value[0].isOpen = true;
  }
});
</script>

<style scoped>
/* Estilizar los links dentro de las respuestas */
:deep(a) {
  @apply text-green-600 hover:underline;
}

:deep(ul),
:deep(ol) {
  @apply pl-5 my-2 space-y-1;
}

:deep(ul) {
  @apply list-disc;
}

:deep(ol) {
  @apply list-decimal;
}
</style>
