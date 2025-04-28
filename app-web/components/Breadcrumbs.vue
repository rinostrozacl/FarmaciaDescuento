<template>
  <nav class="breadcrumb py-3 px-4 bg-gray-light rounded-lg mb-4">
    <ol class="breadcrumb-list flex flex-wrap items-center text-sm">
      <!-- Inicio -->
      <li>
        <NuxtLink
          to="/"
          class="text-secondary-color hover:text-primary-color transition-colors"
        >
          <i class="fas fa-home"></i>
          <span class="sr-only">Inicio</span>
        </NuxtLink>
      </li>

      <!-- Separador -->
      <li class="mx-2 text-gray-dark">
        <i class="fas fa-chevron-right text-xs"></i>
      </li>

      <!-- Items -->
      <template v-for="(item, index) in items" :key="index">
        <li>
          <template v-if="item.to && index < items.length - 1">
            <NuxtLink
              :to="item.to"
              class="text-secondary-color hover:text-primary-color transition-colors"
            >
              {{ item.text }}
            </NuxtLink>
          </template>
          <template v-else>
            <span class="text-accent-color font-medium">
              {{ item.text }}
            </span>
          </template>
        </li>

        <!-- Separador (excepto para el último item) -->
        <li v-if="index < items.length - 1" class="mx-2 text-gray-dark">
          <i class="fas fa-chevron-right text-xs"></i>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(
        (item) =>
          typeof item === "object" &&
          "text" in item &&
          typeof item.text === "string"
      );
    },
  },
});
</script>
