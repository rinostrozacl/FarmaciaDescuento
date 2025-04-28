# Gestión de Estado con Pinia

## Índice

1. [Introducción](#introducción)
2. [Stores Principales](#stores-principales)
3. [Ejemplos de Uso](#ejemplos-de-uso)
4. [Mejores Prácticas](#mejores-prácticas)
5. [Referencias](#referencias)

---

## Introducción

Este documento define la estructura y organización de los stores de Pinia para la gestión de estado en la aplicación FarmaciaDescuento.

## Stores Principales

La aplicación utiliza Pinia como solución de gestión de estado, organizando los stores en las siguientes categorías:

1. **Stores de Autenticación**: Gestión de usuarios y sesiones
2. **Stores de Datos**: Gestión de entidades principales (productos, farmacias, etc.)
3. **Stores de UI**: Gestión de estado de interfaz de usuario
4. **Stores de Carrito**: Gestión del carrito de compras
5. **Stores de Notificaciones**: Gestión de notificaciones

## 1. Store de Autenticación

```typescript
// Definición simplificada - auth.ts
import { defineStore } from 'pinia';
import { 
  signIn, signOut, createUser, 
  updateProfile, getCurrentUser 
} from '@/services/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user,
    userRole: (state) => state.user?.type || null,
    isClient: (state) => state.user?.type === 'client',
    isPharmacy: (state) => state.user?.type === 'pharmacy',
    isAdmin: (state) => state.user?.type === 'admin',
  },
  
  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;
      
      try {
        const userData = await signIn(email, password);
        this.user = userData;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async logout() {
      await signOut();
      this.user = null;
    },
    
    async register(userData) {
      this.loading = true;
      this.error = null;
      
      try {
        const user = await createUser(userData);
        this.user = user;
        return user;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async updateUser(data) {
      if (!this.user) return;
      
      this.loading = true;
      try {
        const updated = await updateProfile(this.user.id, data);
        this.user = { ...this.user, ...updated };
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async checkAuth() {
      try {
        const user = await getCurrentUser();
        this.user = user;
      } catch (error) {
        this.user = null;
      }
    }
  }
});
```

## 2. Store de Productos

```typescript
// Definición simplificada - products.ts
import { defineStore } from 'pinia';
import { 
  fetchProducts, fetchProductById,
  searchProducts 
} from '@/services/products';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    filters: {
      category: null,
      minDiscount: 0,
      maxDistance: 10,
      searchQuery: ''
    },
    pagination: {
      page: 1,
      limit: 12,
      total: 0
    }
  }),
  
  getters: {
    filteredProducts: (state) => state.products,
    productById: (state) => (id) => 
      state.products.find(p => p.id === id),
  },
  
  actions: {
    async fetchProducts() {
      this.loading = true;
      
      try {
        const result = await fetchProducts({
          ...this.filters,
          page: this.pagination.page,
          limit: this.pagination.limit
        });
        
        this.products = result.items;
        this.pagination.total = result.total;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    
    async fetchProductById(id) {
      this.loading = true;
      
      try {
        this.currentProduct = await fetchProductById(id);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    
    async search(query) {
      this.filters.searchQuery = query;
      this.pagination.page = 1;
      await this.fetchProducts();
    },
    
    setFilter(filter, value) {
      this.filters[filter] = value;
      this.pagination.page = 1;
    },
    
    setPage(page) {
      this.pagination.page = page;
      this.fetchProducts();
    }
  }
});
```

## 3. Store de Carrito

```typescript
// Definición simplificada - cart.ts
import { defineStore } from 'pinia';
import { createTicket } from '@/services/tickets';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    pharmacyId: null,
    branchId: null,
    loading: false,
    error: null
  }),
  
  getters: {
    cartCount: (state) => state.items.reduce(
      (total, item) => total + item.quantity, 0
    ),
    
    cartTotal: (state) => state.items.reduce(
      (total, item) => total + (item.price * item.quantity), 0
    ),
    
    isEmpty: (state) => state.items.length === 0,
    
    hasPharmacy: (state) => !!state.pharmacyId
  },
  
  actions: {
    addItem(item, quantity = 1) {
      // Verificar si es de la misma farmacia
      if (this.pharmacyId && item.pharmacyId !== this.pharmacyId) {
        // Confirmar cambio de farmacia
        if (!confirm('Agregar productos de otra farmacia vaciará tu carrito actual. ¿Continuar?')) {
          return;
        }
        this.clearCart();
      }
      
      const existingItem = this.items.find(i => i.inventoryId === item.inventoryId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({
          productId: item.productId,
          inventoryId: item.inventoryId,
          name: item.name,
          price: item.discountedPrice,
          image: item.image,
          quantity
        });
      }
      
      this.pharmacyId = item.pharmacyId;
      this.branchId = item.branchId;
    },
    
    removeItem(inventoryId) {
      const index = this.items.findIndex(i => i.inventoryId === inventoryId);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
      
      if (this.items.length === 0) {
        this.pharmacyId = null;
        this.branchId = null;
      }
    },
    
    updateQuantity(inventoryId, quantity) {
      const item = this.items.find(i => i.inventoryId === inventoryId);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
    },
    
    clearCart() {
      this.items = [];
      this.pharmacyId = null;
      this.branchId = null;
    },
    
    async checkout() {
      if (this.items.length === 0) return;
      
      this.loading = true;
      this.error = null;
      
      try {
        const ticketData = {
          items: this.items.map(item => ({
            inventoryId: item.inventoryId,
            quantity: item.quantity
          })),
          pharmacyId: this.pharmacyId,
          branchId: this.branchId
        };
        
        const result = await createTicket(ticketData);
        this.clearCart();
        return result;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    }
  },
  
  // Persistencia del carrito
  persist: {
    storage: localStorage,
    paths: ['items', 'pharmacyId', 'branchId']
  }
});
```

## 4. Store de Notificaciones

```typescript
// Definición simplificada - notifications.ts
import { defineStore } from 'pinia';
import { 
  fetchNotifications, markAsRead 
} from '@/services/notifications';

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [],
    unreadCount: 0,
    loading: false
  }),
  
  actions: {
    async fetchNotifications() {
      this.loading = true;
      
      try {
        const result = await fetchNotifications();
        this.notifications = result.items;
        this.unreadCount = result.items.filter(n => !n.readAt).length;
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async markAsRead(notificationId) {
      try {
        await markAsRead([notificationId]);
        
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification && !notification.readAt) {
          notification.readAt = new Date();
          this.unreadCount = Math.max(0, this.unreadCount - 1);
        }
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    },
    
    async markAllAsRead() {
      try {
        const unreadIds = this.notifications
          .filter(n => !n.readAt)
          .map(n => n.id);
          
        if (unreadIds.length === 0) return;
        
        await markAsRead(unreadIds);
        
        this.notifications.forEach(notification => {
          if (!notification.readAt) {
            notification.readAt = new Date();
          }
        });
        
        this.unreadCount = 0;
      } catch (error) {
        console.error('Error marking all notifications as read:', error);
      }
    },
    
    addNotification(notification) {
      this.notifications.unshift(notification);
      if (!notification.readAt) {
        this.unreadCount++;
      }
    }
  }
});
```

## 5. Store de UI

```typescript
// Definición simplificada - ui.ts
import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
  state: () => ({
    sidebarOpen: false,
    cartOpen: false,
    currentModal: null,
    modalData: null,
    toast: null,
    theme: 'light',
    isMobile: false
  }),
  
  actions: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
      if (this.sidebarOpen) this.cartOpen = false;
    },
    
    toggleCart() {
      this.cartOpen = !this.cartOpen;
      if (this.cartOpen) this.sidebarOpen = false;
    },
    
    openModal(modalName, data = null) {
      this.currentModal = modalName;
      this.modalData = data;
    },
    
    closeModal() {
      this.currentModal = null;
      this.modalData = null;
    },
    
    showToast(message, type = 'info', duration = 3000) {
      this.toast = { message, type, id: Date.now() };
      
      setTimeout(() => {
        if (this.toast && this.toast.id === this.toast.id) {
          this.toast = null;
        }
      }, duration);
    },
    
    setTheme(theme) {
      this.theme = theme;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    },
    
    checkMobile() {
      this.isMobile = window.innerWidth < 768;
    }
  }
});
```

## Integración con Nuxt 3

### Configuración de Pinia

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  
  pinia: {
    autoImports: [
      'defineStore',
      'storeToRefs'
    ]
  }
});
```

### Uso en Componentes

```vue
<script setup>
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const cartStore = useCartStore();

// Extraer propiedades reactivas
const { user, isAuthenticated } = storeToRefs(authStore);
const { cartCount, cartTotal } = storeToRefs(cartStore);

// Usar acciones
const login = async () => {
  try {
    await authStore.login(email.value, password.value);
    // Redireccionar o mostrar mensaje
  } catch (error) {
    // Manejar error
  }
};
</script>
```

## Buenas Prácticas

1. **Separación de Responsabilidades**: Cada store tiene una responsabilidad única
2. **Composición**: Stores pueden usar otros stores cuando sea necesario
3. **Persistencia Selectiva**: Solo persistir datos necesarios entre sesiones
4. **Manejo de Errores**: Capturar y gestionar errores dentro de las acciones
5. **Optimización de Rendimiento**: Usar getters para cálculos derivados
6. **Tipado Fuerte**: Utilizar TypeScript para definir tipos de estado y acciones
