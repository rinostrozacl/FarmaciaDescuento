<template>
  <nav aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li v-for="(item, index) in items" :key="index" class="breadcrumb-item">
        <NuxtLink v-if="!item.active" :to="item.to" class="breadcrumb-link">
          {{ item.text }}
        </NuxtLink>
        <span v-else class="breadcrumb-current">{{ item.text }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    validator: (items) => {
      return items.every(
        (item) =>
          typeof item.text === "string" &&
          (typeof item.to === "string" || item.active)
      );
    },
  },
});
</script>

<style scoped>
.breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-item:not(:first-child)::before {
  content: "/";
  margin: 0 0.5rem;
  color: #6c757d;
}

.breadcrumb-link {
  color: #16a34a;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: #15803d;
  text-decoration: underline;
}

.breadcrumb-current {
  color: #6c757d;
  font-weight: 500;
}
</style>
