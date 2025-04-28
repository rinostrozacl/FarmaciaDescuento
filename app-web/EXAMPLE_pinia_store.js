// Ejemplo de estructura mínima para un store de Pinia
import { defineStore } from 'pinia'

export const useProductoStore = defineStore('producto', {
  state: () => ({
    productos: [],
    loading: false
  }),
  actions: {
    async fetchProductos() {
      this.loading = true
      // Aquí iría la llamada a la API o Firestore
      this.loading = false
    }
  }
})
