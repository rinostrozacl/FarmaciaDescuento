import { ref, onMounted } from "vue";

// Interfaces para el sistema de notificaciones
export interface ToastOptions {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}

interface ToastItem extends ToastOptions {
  id: number;
  show: boolean;
}

// Estado global para las notificaciones
const toasts = ref<ToastItem[]>([]);
let toastId = 0;

export function useToast() {
  // Mostrar una notificación
  const showToast = (options: ToastOptions) => {
    const defaultOptions: ToastOptions = {
      message: "",
      type: "info",
      duration: 3000,
      position: "top-right",
    };

    // Combinar opciones con valores predeterminados
    const toastOptions = { ...defaultOptions, ...options };

    // Crear nueva notificación
    const id = toastId++;
    const toast: ToastItem = {
      id,
      show: true,
      ...toastOptions,
    };

    // Añadir al array de notificaciones
    toasts.value.push(toast);

    // Configurar el temporizador para ocultar la notificación
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        closeToast(id);
      }, toast.duration);
    }

    return id;
  };

  // Cerrar una notificación específica
  const closeToast = (id: number) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      // Primero marcamos la notificación como oculta (para animación)
      toasts.value[index].show = false;

      // Después de un tiempo para la animación, eliminamos del array
      setTimeout(() => {
        toasts.value = toasts.value.filter((t) => t.id !== id);
      }, 300);
    }
  };

  // Limpiar todas las notificaciones
  const clearToasts = () => {
    toasts.value = [];
  };

  // Helpers para tipos específicos de notificaciones
  const success = (message: string, options?: Partial<ToastOptions>) => {
    return showToast({ message, type: "success", ...options });
  };

  const error = (message: string, options?: Partial<ToastOptions>) => {
    return showToast({ message, type: "error", ...options });
  };

  const warning = (message: string, options?: Partial<ToastOptions>) => {
    return showToast({ message, type: "warning", ...options });
  };

  const info = (message: string, options?: Partial<ToastOptions>) => {
    return showToast({ message, type: "info", ...options });
  };

  return {
    toasts,
    showToast,
    closeToast,
    clearToasts,
    success,
    error,
    warning,
    info,
  };
}
