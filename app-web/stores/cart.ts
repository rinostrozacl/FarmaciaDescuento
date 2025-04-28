import { defineStore } from "pinia";
import { useProductsStore, type Product } from "./products";
import { useAuthStore } from "./auth";

export interface CartItem {
  id: string;
  productId: string;
  pharmacyId: string;
  name: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  quantity: number;
  maxQuantity: number;
  image: string;
  expirationDate: Date;
  pharmacy: string; // Nombre de la farmacia para mostrar
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  showCart: boolean;
}

export const useCartStore = defineStore("cart", {
  state: (): CartState => ({
    items: [],
    loading: false,
    error: null,
    showCart: false,
  }),

  getters: {
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },

    totalAmount: (state) => {
      return state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    totalSavings: (state) => {
      return state.items.reduce((total, item) => {
        return total + (item.originalPrice - item.price) * item.quantity;
      }, 0);
    },

    pharmacyId: (state) => {
      if (state.items.length > 0) {
        return state.items[0].pharmacyId;
      }
      return null;
    },

    hasItems: (state) => state.items.length > 0,

    isFromSamePharmacy: (state) => {
      if (state.items.length <= 1) return true;

      const pharmacyId = state.items[0].pharmacyId;
      return state.items.every((item) => item.pharmacyId === pharmacyId);
    },
  },

  actions: {
    addToCart(item: CartItem) {
      try {
        // Verificar si ya existe ese producto en el carrito
        const existingItem = this.items.find(
          (i) => i.productId === item.productId
        );

        // Verificar que el producto sea de la misma farmacia
        if (this.items.length > 0 && this.pharmacyId !== item.pharmacyId) {
          throw new Error("Solo puedes agregar productos de la misma farmacia");
        }

        if (existingItem) {
          // Si existe, incrementar cantidad
          const newQuantity = existingItem.quantity + item.quantity;

          // Validar que no exceda la cantidad máxima
          if (newQuantity > existingItem.maxQuantity) {
            throw new Error(
              `Solo hay ${existingItem.maxQuantity} unidades disponibles`
            );
          }

          existingItem.quantity = newQuantity;
        } else {
          // Si no existe, agregarlo al carrito
          this.items.push(item);
        }

        // Abrir el carrito
        this.showCart = true;

        // Guardar en LocalStorage
        this.saveToLocalStorage();

        return true;
      } catch (error: any) {
        this.error = error.message;
        return false;
      }
    },

    updateQuantity(itemId: string, quantity: number) {
      const item = this.items.find((i) => i.id === itemId);

      if (item) {
        // Validar cantidad máxima
        if (quantity > item.maxQuantity) {
          this.error = `Solo hay ${item.maxQuantity} unidades disponibles`;
          return false;
        }

        // Actualizar cantidad
        item.quantity = quantity;

        // Guardar en LocalStorage
        this.saveToLocalStorage();
        return true;
      }

      return false;
    },

    removeItem(itemId: string) {
      this.items = this.items.filter((item) => item.id !== itemId);

      // Guardar en LocalStorage
      this.saveToLocalStorage();
    },

    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },

    toggleCart() {
      this.showCart = !this.showCart;
    },

    openCart() {
      this.showCart = true;
    },

    closeCart() {
      this.showCart = false;
    },

    loadFromLocalStorage() {
      try {
        const cartItems = localStorage.getItem("cart-items");

        if (cartItems) {
          // Convertir fechas de cadena a objetos Date
          const parsedItems = JSON.parse(cartItems);

          this.items = parsedItems.map((item: any) => ({
            ...item,
            expirationDate: new Date(item.expirationDate),
          }));
        }
      } catch (error) {
        console.error("Error al cargar el carrito desde LocalStorage:", error);
      }
    },

    saveToLocalStorage() {
      try {
        localStorage.setItem("cart-items", JSON.stringify(this.items));
      } catch (error) {
        console.error("Error al guardar el carrito en LocalStorage:", error);
      }
    },

    async createTicket() {
      if (!this.hasItems) {
        throw new Error("No hay productos en el carrito");
      }

      if (!this.isFromSamePharmacy) {
        throw new Error("Todos los productos deben ser de la misma farmacia");
      }

      this.loading = true;
      this.error = null;

      try {
        // Aquí iría la llamada al API para crear el ticket
        // Por ahora simulamos la creación

        // Generar un ID aleatorio para el ticket
        const ticketId = "TK-" + Math.floor(1000 + Math.random() * 9000);

        // Limpiar el carrito después de crear el ticket
        this.clearCart();

        return ticketId;
      } catch (error: any) {
        this.error = error.message || "Error al crear el ticket";
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
