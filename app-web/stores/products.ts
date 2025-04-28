import { defineStore } from 'pinia';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs, 
  getDoc, 
  doc,
  startAfter,
  Timestamp,
  GeoPoint
} from 'firebase/firestore';
import { useAuthStore } from './auth';

export interface Product {
  id: string;
  pharmacyId: string;
  pharmacyName?: string;
  pharmacyAddress?: string;
  pharmacyLocation?: {
    latitude: number;
    longitude: number;
  };
  name: string;
  description: string;
  category: string;
  subcategory: string;
  laboratory: string;
  activeIngredient: string;
  concentration: string;
  presentation: string;
  requiresPrescription: boolean;
  originalPrice: number;
  discountPercentage: number;
  discountedPrice: number;
  stock: number;
  expirationDate: Date;
  images: string[];
  tags: string[];
  status: 'active' | 'inactive' | 'sold_out';
  createdAt: Date;
  updatedAt: Date;
  distance?: number; // Distancia calculada desde la ubicación del usuario
}

export interface ProductsState {
  products: Product[];
  featuredProducts: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  lastVisible: any | null;
  hasMore: boolean;
  filters: {
    category: string | null;
    subcategory: string | null;
    laboratory: string | null;
    minDiscountPercentage: number | null;
    maxDistance: number | null;
    requiresPrescription: boolean | null;
    searchQuery: string | null;
    sortBy: 'discountPercentage' | 'expirationDate' | 'price' | 'distance';
    sortDirection: 'asc' | 'desc';
  };
  categories: { id: string; name: string; subcategories: string[] }[];
  laboratories: string[];
}

export const useProductsStore = defineStore('products', {
  state: (): ProductsState => ({
    products: [],
    featuredProducts: [],
    currentProduct: null,
    loading: false,
    error: null,
    lastVisible: null,
    hasMore: true,
    filters: {
      category: null,
      subcategory: null,
      laboratory: null,
      minDiscountPercentage: null,
      maxDistance: null,
      requiresPrescription: null,
      searchQuery: null,
      sortBy: 'discountPercentage',
      sortDirection: 'desc'
    },
    categories: [],
    laboratories: []
  }),
  
  getters: {
    getProductById: (state) => (id: string) => {
      return state.products.find(product => product.id === id) || null;
    },
    
    filteredProducts: (state) => {
      // Filtrado local adicional si es necesario
      return state.products;
    },
    
    productsByCategory: (state) => (category: string) => {
      return state.products.filter(product => product.category === category);
    },
    
    productsByPharmacy: (state) => (pharmacyId: string) => {
      return state.products.filter(product => product.pharmacyId === pharmacyId);
    }
  },
  
  actions: {
    async fetchCategories() {
      const { $db } = useNuxtApp();
      this.loading = true;
      
      try {
        const categoriesRef = collection($db, 'categories');
        const snapshot = await getDocs(categoriesRef);
        
        this.categories = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          subcategories: doc.data().subcategories || []
        }));
      } catch (error: any) {
        console.error('Error al obtener categorías:', error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    
    async fetchLaboratories() {
      const { $db } = useNuxtApp();
      this.loading = true;
      
      try {
        const laboratoriesRef = collection($db, 'laboratories');
        const snapshot = await getDocs(laboratoriesRef);
        
        this.laboratories = snapshot.docs.map(doc => doc.data().name);
      } catch (error: any) {
        console.error('Error al obtener laboratorios:', error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    
    async fetchProducts(loadMore = false) {
      const { $db } = useNuxtApp();
      this.loading = true;
      this.error = null;
      
      try {
        // Construir la consulta base
        let productsQuery = query(
          collection($db, 'products'),
          where('status', '==', 'active')
        );
        
        // Aplicar filtros
        if (this.filters.category) {
          productsQuery = query(
            productsQuery,
            where('category', '==', this.filters.category)
          );
        }
        
        if (this.filters.subcategory) {
          productsQuery = query(
            productsQuery,
            where('subcategory', '==', this.filters.subcategory)
          );
        }
        
        if (this.filters.laboratory) {
          productsQuery = query(
            productsQuery,
            where('laboratory', '==', this.filters.laboratory)
          );
        }
        
        if (this.filters.minDiscountPercentage) {
          productsQuery = query(
            productsQuery,
            where('discountPercentage', '>=', this.filters.minDiscountPercentage)
          );
        }
        
        if (this.filters.requiresPrescription !== null) {
          productsQuery = query(
            productsQuery,
            where('requiresPrescription', '==', this.filters.requiresPrescription)
          );
        }
        
        // Ordenamiento
        productsQuery = query(
          productsQuery,
          orderBy(this.filters.sortBy, this.filters.sortDirection)
        );
        
        // Paginación
        if (loadMore && this.lastVisible) {
          productsQuery = query(
            productsQuery,
            startAfter(this.lastVisible),
            limit(20)
          );
        } else {
          productsQuery = query(
            productsQuery,
            limit(20)
          );
        }
        
        const snapshot = await getDocs(productsQuery);
        
        // Actualizar el último documento visible para paginación
        this.lastVisible = snapshot.docs.length > 0 
          ? snapshot.docs[snapshot.docs.length - 1] 
          : null;
        
        // Verificar si hay más resultados
        this.hasMore = snapshot.docs.length === 20;
        
        // Mapear los documentos a objetos de producto
        const productsData = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const data = doc.data();
            
            // Obtener información de la farmacia
            const pharmacyDoc = await getDoc(doc($db, 'pharmacies', data.pharmacyId));
            const pharmacyData = pharmacyDoc.exists() ? pharmacyDoc.data() : null;
            
            return {
              id: doc.id,
              pharmacyId: data.pharmacyId,
              pharmacyName: pharmacyData?.name || 'Farmacia',
              pharmacyAddress: pharmacyData?.address || '',
              pharmacyLocation: pharmacyData?.location 
                ? { 
                    latitude: pharmacyData.location.latitude, 
                    longitude: pharmacyData.location.longitude 
                  } 
                : undefined,
              name: data.name,
              description: data.description,
              category: data.category,
              subcategory: data.subcategory,
              laboratory: data.laboratory,
              activeIngredient: data.activeIngredient,
              concentration: data.concentration,
              presentation: data.presentation,
              requiresPrescription: data.requiresPrescription,
              originalPrice: data.originalPrice,
              discountPercentage: data.discountPercentage,
              discountedPrice: data.discountedPrice,
              stock: data.stock,
              expirationDate: data.expirationDate.toDate(),
              images: data.images,
              tags: data.tags,
              status: data.status,
              createdAt: data.createdAt.toDate(),
              updatedAt: data.updatedAt.toDate()
            } as Product;
          })
        );
        
        // Actualizar la lista de productos
        if (loadMore) {
          this.products = [...this.products, ...productsData];
        } else {
          this.products = productsData;
        }
      } catch (error: any) {
        console.error('Error al obtener productos:', error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    
    async fetchProductById(id: string) {
      const { $db } = useNuxtApp();
      this.loading = true;
      this.error = null;
      
      try {
        const productDoc = await getDoc(doc($db, 'products', id));
        
        if (!productDoc.exists()) {
          this.error = 'Producto no encontrado';
          this.currentProduct = null;
          return null;
        }
        
        const data = productDoc.data();
        
        // Obtener información de la farmacia
        const pharmacyDoc = await getDoc(doc($db, 'pharmacies', data.pharmacyId));
        const pharmacyData = pharmacyDoc.exists() ? pharmacyDoc.data() : null;
        
        this.currentProduct = {
          id: productDoc.id,
          pharmacyId: data.pharmacyId,
          pharmacyName: pharmacyData?.name || 'Farmacia',
          pharmacyAddress: pharmacyData?.address || '',
          pharmacyLocation: pharmacyData?.location 
            ? { 
                latitude: pharmacyData.location.latitude, 
                longitude: pharmacyData.location.longitude 
              } 
            : undefined,
          name: data.name,
          description: data.description,
          category: data.category,
          subcategory: data.subcategory,
          laboratory: data.laboratory,
          activeIngredient: data.activeIngredient,
          concentration: data.concentration,
          presentation: data.presentation,
          requiresPrescription: data.requiresPrescription,
          originalPrice: data.originalPrice,
          discountPercentage: data.discountPercentage,
          discountedPrice: data.discountedPrice,
          stock: data.stock,
          expirationDate: data.expirationDate.toDate(),
          images: data.images,
          tags: data.tags,
          status: data.status,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        } as Product;
        
        return this.currentProduct;
      } catch (error: any) {
        console.error('Error al obtener producto:', error);
        this.error = error.message;
        return null;
      } finally {
        this.loading = false;
      }
    },
    
    async fetchFeaturedProducts() {
      const { $db } = useNuxtApp();
      this.loading = true;
      
      try {
        // Consulta para obtener productos destacados (mayor descuento)
        const featuredQuery = query(
          collection($db, 'products'),
          where('status', '==', 'active'),
          orderBy('discountPercentage', 'desc'),
          limit(8)
        );
        
        const snapshot = await getDocs(featuredQuery);
        
        // Mapear los documentos a objetos de producto
        this.featuredProducts = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const data = doc.data();
            
            // Obtener información de la farmacia
            const pharmacyDoc = await getDoc(doc($db, 'pharmacies', data.pharmacyId));
            const pharmacyData = pharmacyDoc.exists() ? pharmacyDoc.data() : null;
            
            return {
              id: doc.id,
              pharmacyId: data.pharmacyId,
              pharmacyName: pharmacyData?.name || 'Farmacia',
              pharmacyAddress: pharmacyData?.address || '',
              name: data.name,
              category: data.category,
              subcategory: data.subcategory,
              laboratory: data.laboratory,
              originalPrice: data.originalPrice,
              discountPercentage: data.discountPercentage,
              discountedPrice: data.discountedPrice,
              expirationDate: data.expirationDate.toDate(),
              images: data.images[0] ? [data.images[0]] : [],
              status: data.status
            } as Product;
          })
        );
      } catch (error: any) {
        console.error('Error al obtener productos destacados:', error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    
    async searchProductsByLocation(latitude: number, longitude: number, maxDistanceKm: number) {
      // Esta función requiere una implementación más compleja con GeoFirestore o Cloud Functions
      // Por ahora, implementamos una versión simplificada
      
      const { $db } = useNuxtApp();
      this.loading = true;
      this.error = null;
      
      try {
        // Obtener todas las farmacias
        const pharmaciesSnapshot = await getDocs(collection($db, 'pharmacies'));
        
        // Filtrar farmacias por distancia
        const nearbyPharmacies = pharmaciesSnapshot.docs
          .filter(doc => {
            const data = doc.data();
            if (!data.location) return false;
            
            // Calcular distancia usando la fórmula de Haversine
            const distance = this.calculateDistance(
              latitude, 
              longitude, 
              data.location.latitude, 
              data.location.longitude
            );
            
            return distance <= maxDistanceKm;
          })
          .map(doc => ({
            id: doc.id,
            location: doc.data().location,
            distance: this.calculateDistance(
              latitude, 
              longitude, 
              doc.data().location.latitude, 
              doc.data().location.longitude
            )
          }));
        
        if (nearbyPharmacies.length === 0) {
          this.products = [];
          return;
        }
        
        // Obtener productos de las farmacias cercanas
        const productsPromises = nearbyPharmacies.map(async (pharmacy) => {
          const productsQuery = query(
            collection($db, 'products'),
            where('pharmacyId', '==', pharmacy.id),
            where('status', '==', 'active'),
            limit(50)
          );
          
          const productsSnapshot = await getDocs(productsQuery);
          
          return productsSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              pharmacyId: data.pharmacyId,
              pharmacyName: data.pharmacyName || 'Farmacia',
              name: data.name,
              category: data.category,
              subcategory: data.subcategory,
              laboratory: data.laboratory,
              originalPrice: data.originalPrice,
              discountPercentage: data.discountPercentage,
              discountedPrice: data.discountedPrice,
              expirationDate: data.expirationDate.toDate(),
              images: data.images,
              distance: pharmacy.distance // Añadir la distancia calculada
            } as Product;
          });
        });
        
        const productsArrays = await Promise.all(productsPromises);
        const allProducts = productsArrays.flat();
        
        // Ordenar por distancia
        allProducts.sort((a, b) => (a.distance || 0) - (b.distance || 0));
        
        this.products = allProducts;
      } catch (error: any) {
        console.error('Error al buscar productos por ubicación:', error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    
    calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
      // Fórmula de Haversine para calcular distancia entre dos puntos geográficos
      const R = 6371; // Radio de la Tierra en km
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c; // Distancia en km
      return Math.round(distance * 10) / 10; // Redondear a 1 decimal
    },
    
    deg2rad(deg: number): number {
      return deg * (Math.PI/180);
    },
    
    setFilters(filters: Partial<ProductsState['filters']>) {
      this.filters = {
        ...this.filters,
        ...filters
      };
      
      // Resetear paginación
      this.lastVisible = null;
      this.hasMore = true;
    },
    
    resetFilters() {
      this.filters = {
        category: null,
        subcategory: null,
        laboratory: null,
        minDiscountPercentage: null,
        maxDistance: null,
        requiresPrescription: null,
        searchQuery: null,
        sortBy: 'discountPercentage',
        sortDirection: 'desc'
      };
      
      // Resetear paginación
      this.lastVisible = null;
      this.hasMore = true;
    }
  }
});
