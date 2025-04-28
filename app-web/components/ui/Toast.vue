<template>
  <div class="toast-container" :class="position">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        v-show="toast.show"
        class="toast"
        :class="[toast.type, position]"
      >
        <div class="toast-content">
          <div v-if="toast.type === 'success'" class="toast-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div v-else-if="toast.type === 'error'" class="toast-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <div v-else-if="toast.type === 'warning'" class="toast-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
              ></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div v-else class="toast-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div class="toast-message">{{ toast.message }}</div>
          <button @click="closeToast(toast.id)" class="toast-close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useToast } from "~/composables/useToast";

const { toasts, closeToast } = useToast();

// Calcular la posición de las notificaciones (usar la primera notificación como referencia)
const position = computed(() => {
  if (toasts.value.length === 0) return "top-right";
  return toasts.value[0].position || "top-right";
});
</script>

<style scoped>
.toast-container {
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  width: 100%;
  padding: 15px;
  pointer-events: none;
}

/* Posicionamiento */
.top-right {
  top: 0;
  right: 0;
}

.top-left {
  top: 0;
  left: 0;
}

.bottom-right {
  bottom: 0;
  right: 0;
}

.bottom-left {
  bottom: 0;
  left: 0;
}

.top-center {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.bottom-center {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.toast {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  pointer-events: auto;
}

.toast-content {
  display: flex;
  align-items: center;
  padding: 12px 15px;
}

.toast-icon {
  flex-shrink: 0;
  margin-right: 12px;
  width: 24px;
  height: 24px;
}

.toast-message {
  flex-grow: 1;
  font-size: 14px;
  line-height: 1.4;
}

.toast-close {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  opacity: 0.6;
  transition: opacity 0.2s;
  width: 20px;
  height: 20px;
}

.toast-close:hover {
  opacity: 1;
}

/* Estilos según tipo */
.success {
  border-left: 4px solid #28a745;
}

.success .toast-icon {
  color: #28a745;
}

.error {
  border-left: 4px solid #dc3545;
}

.error .toast-icon {
  color: #dc3545;
}

.warning {
  border-left: 4px solid #ffc107;
}

.warning .toast-icon {
  color: #ffc107;
}

.info {
  border-left: 4px solid #17a2b8;
}

.info .toast-icon {
  color: #17a2b8;
}

/* Animaciones */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
