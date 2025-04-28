import { defineStore } from "pinia";

export interface UIState {
  darkMode: boolean;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isFilterOpen: boolean;
  isLoading: boolean;
  toast: {
    show: boolean;
    message: string;
    type: "success" | "error" | "info" | "warning";
    duration: number;
  };
  modal: {
    show: boolean;
    title: string;
    content: string;
    confirmText: string;
    cancelText: string;
    onConfirm: (() => void) | null;
    onCancel: (() => void) | null;
  };
  currentLocation: {
    latitude: number | null;
    longitude: number | null;
    address: string | null;
  };
}

export const useUIStore = defineStore("ui", {
  state: (): UIState => ({
    darkMode: false,
    isMobileMenuOpen: false,
    isSearchOpen: false,
    isFilterOpen: false,
    isLoading: false,
    toast: {
      show: false,
      message: "",
      type: "info",
      duration: 3000,
    },
    modal: {
      show: false,
      title: "",
      content: "",
      confirmText: "Aceptar",
      cancelText: "Cancelar",
      onConfirm: null,
      onCancel: null,
    },
    currentLocation: {
      latitude: null,
      longitude: null,
      address: null,
    },
  }),

  getters: {
    isDarkMode: (state) => state.darkMode,
    getToast: (state) => state.toast,
    getModal: (state) => state.modal,
    hasLocation: (state) =>
      state.currentLocation.latitude !== null &&
      state.currentLocation.longitude !== null,
  },

  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;

      if (process.client) {
        // Guardar preferencia en localStorage
        localStorage.setItem("darkMode", this.darkMode ? "true" : "false");

        // Actualizar clase en el documento
        if (this.darkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    },

    initDarkMode() {
      if (process.client) {
        // Obtener preferencia de localStorage o usar preferencia del sistema
        const savedMode = localStorage.getItem("darkMode");

        if (savedMode !== null) {
          this.darkMode = savedMode === "true";
        } else {
          // Usar preferencia del sistema
          this.darkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
        }

        // Actualizar clase en el documento
        if (this.darkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    },

    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;

      if (this.isMobileMenuOpen) {
        // Cerrar otros paneles si están abiertos
        this.isSearchOpen = false;
        this.isFilterOpen = false;
      }
    },

    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },

    toggleSearch() {
      this.isSearchOpen = !this.isSearchOpen;

      if (this.isSearchOpen) {
        // Cerrar otros paneles si están abiertos
        this.isMobileMenuOpen = false;
        this.isFilterOpen = false;
      }
    },

    closeSearch() {
      this.isSearchOpen = false;
    },

    toggleFilter() {
      this.isFilterOpen = !this.isFilterOpen;

      if (this.isFilterOpen) {
        // Cerrar otros paneles si están abiertos
        this.isMobileMenuOpen = false;
        this.isSearchOpen = false;
      }
    },

    closeFilter() {
      this.isFilterOpen = false;
    },

    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },

    showToast(
      message: string,
      type: "success" | "error" | "info" | "warning" = "info",
      duration: number = 3000
    ) {
      this.toast = {
        show: true,
        message,
        type,
        duration,
      };

      // Ocultar el toast después de la duración especificada
      setTimeout(() => {
        this.hideToast();
      }, duration);
    },

    hideToast() {
      this.toast.show = false;
    },

    showModal(options: {
      title: string;
      content: string;
      confirmText?: string;
      cancelText?: string;
      onConfirm?: () => void;
      onCancel?: () => void;
    }) {
      this.modal = {
        show: true,
        title: options.title,
        content: options.content,
        confirmText: options.confirmText || "Aceptar",
        cancelText: options.cancelText || "Cancelar",
        onConfirm: options.onConfirm || null,
        onCancel: options.onCancel || null,
      };
    },

    hideModal() {
      this.modal.show = false;
    },

    confirmModal() {
      if (this.modal.onConfirm) {
        this.modal.onConfirm();
      }
      this.hideModal();
    },

    cancelModal() {
      if (this.modal.onCancel) {
        this.modal.onCancel();
      }
      this.hideModal();
    },

    setLocation(
      latitude: number,
      longitude: number,
      address: string | null = null
    ) {
      this.currentLocation = {
        latitude,
        longitude,
        address,
      };

      if (process.client) {
        // Guardar ubicación en localStorage
        localStorage.setItem(
          "userLocation",
          JSON.stringify(this.currentLocation)
        );
      }
    },

    loadSavedLocation() {
      if (process.client) {
        const savedLocation = localStorage.getItem("userLocation");

        if (savedLocation) {
          try {
            this.currentLocation = JSON.parse(savedLocation);
          } catch (error) {
            console.error(
              "Error al cargar ubicación desde localStorage:",
              error
            );
          }
        }
      }
    },

    clearLocation() {
      this.currentLocation = {
        latitude: null,
        longitude: null,
        address: null,
      };

      if (process.client) {
        localStorage.removeItem("userLocation");
      }
    },

    showLocationModal() {
      this.showModal("location");
    },
  },
});
