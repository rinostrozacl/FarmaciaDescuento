import { defineStore } from 'pinia'

export const usePharmacyStore = defineStore('pharmacy', {
  state: () => ({
    farmacias: [],
    loading: false
  }),
  actions: {
    async fetchFarmacias() {
      this.loading = true
      // TODO: Reemplazar con llamada real a Firestore o API
      this.farmacias = [
        {
          id: 'farm_001',
          nombre: 'Farmacia Central',
          direccion: 'Av. Providencia 1234, Santiago',
          horario: 'Lun-Vie 9:00-20:00',
          logo: ''
        }
      ]
      this.loading = false
    }
  }
})
