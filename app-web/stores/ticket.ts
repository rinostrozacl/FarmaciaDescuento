import { defineStore } from 'pinia'

export const useTicketStore = defineStore('ticket', {
  state: () => ({
    tickets: [],
    loading: false
  }),
  actions: {
    async fetchTickets() {
      this.loading = true
      // TODO: Reemplazar con llamada real a Firestore o API
      this.tickets = [
        {
          id: 'tick_001',
          codigo: 'A1B2C3',
          fecha: '2025-04-21T13:00:00Z',
          producto: 'Paracetamol 500mg',
          farmacia: 'Farmacia Central',
          estado: 'pendiente'
        }
      ]
      this.loading = false
    }
  }
})
