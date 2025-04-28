import { defineStore } from "pinia";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const useUserStore = defineStore("user", {
  state: () => ({
    profile: null,
    loading: false,
    error: null,
  }),

  actions: {
    /**
     * Obtiene el perfil de usuario desde Firestore
     * @param {string} userId - ID del usuario
     * @returns {Promise<Object|null>} - Datos del perfil o null si no existe
     */
    async getUserProfile(userId) {
      this.loading = true;
      this.error = null;

      try {
        const db = getFirestore();
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          this.profile = userData;
          return userData;
        } else {
          // Si el perfil no existe, devolver null
          this.profile = null;
          return null;
        }
      } catch (error) {
        console.error("Error al obtener perfil de usuario:", error);
        this.error = error.message;
        return null;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Crea o actualiza el perfil de usuario en Firestore
     * @param {string} userId - ID del usuario
     * @param {Object} userData - Datos a guardar
     */
    async updateUserProfile(userId, userData) {
      this.loading = true;
      this.error = null;

      try {
        const db = getFirestore();
        const userRef = doc(db, "users", userId);

        // Verificar si el documento existe
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          // Actualizar documento existente
          await updateDoc(userRef, userData);
        } else {
          // Crear nuevo documento
          await setDoc(userRef, {
            ...userData,
            createdAt: new Date(),
          });
        }

        // Actualizar estado local
        this.profile = { ...this.profile, ...userData };

        return true;
      } catch (error) {
        console.error("Error al actualizar perfil de usuario:", error);
        this.error = error.message;
        return false;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Obtiene los pedidos del usuario desde Firestore
     * @param {string} userId - ID del usuario
     * @returns {Promise<Array>} - Lista de pedidos
     */
    async getUserOrders(userId) {
      this.loading = true;
      this.error = null;

      try {
        const db = getFirestore();
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const orders = [];
        querySnapshot.forEach((doc) => {
          orders.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        return orders;
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
        this.error = error.message;
        return [];
      } finally {
        this.loading = false;
      }
    },

    /**
     * Obtiene los detalles de un pedido específico
     * @param {string} orderId - ID del pedido
     * @returns {Promise<Object|null>} - Datos del pedido o null si no existe
     */
    async getOrderDetails(orderId) {
      this.loading = true;
      this.error = null;

      try {
        const db = getFirestore();
        const orderRef = doc(db, "orders", orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          const orderData = orderSnap.data();

          // Obtener detalles de los productos en el pedido
          const orderItemsRef = collection(db, "orders", orderId, "items");
          const itemsSnapshot = await getDocs(orderItemsRef);

          const items = [];
          itemsSnapshot.forEach((doc) => {
            items.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          return {
            id: orderId,
            ...orderData,
            items,
          };
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error al obtener detalles del pedido:", error);
        this.error = error.message;
        return null;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Limpia el estado del store
     */
    clearUserData() {
      this.profile = null;
      this.error = null;
    },
  },
});
