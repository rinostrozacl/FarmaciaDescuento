import { defineStore } from "pinia";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
  GeoPoint,
} from "firebase/firestore";
import { db } from "~/plugins/firebase";

export const usePharmaciesStore = defineStore("pharmacies", {
  state: () => ({
    pharmacies: [],
    currentPharmacy: null,
    nearbyPharmacies: [],
    loading: false,
    error: null,
    lastDocument: null,
    hasMore: true,
    filters: {
      city: null,
      rating: null,
      sortBy: "name",
    },
  }),

  getters: {
    getPharmacyById: (state) => (id) => {
      return state.pharmacies.find((pharmacy) => pharmacy.id === id) || null;
    },
    uniqueCities: (state) => {
      const cities = new Set();
      state.pharmacies.forEach((pharmacy) => {
        if (pharmacy.address && pharmacy.address.city) {
          cities.add(pharmacy.address.city);
        }
      });
      return Array.from(cities).sort();
    },
  },

  actions: {
    /**
     * Cargar farmacias con paginación y filtros opcionales
     * @param {Object} options - Opciones de carga
     * @param {boolean} options.reset - Si se debe reiniciar la carga (por defecto: false)
     * @param {number} options.pageSize - Tamaño de página (por defecto: 15)
     * @param {Object} options.filters - Filtros a aplicar
     */
    async loadPharmacies({ reset = false, pageSize = 15, filters = {} } = {}) {
      try {
        this.loading = true;

        // Si es una nueva carga (reset), reiniciar el estado
        if (reset) {
          this.pharmacies = [];
          this.lastDocument = null;
          this.hasMore = true;

          // Actualizar filtros si se proporcionan
          if (Object.keys(filters).length > 0) {
            this.filters = { ...this.filters, ...filters };
          }
        }

        // Si no hay más farmacias, salir
        if (!this.hasMore) {
          this.loading = false;
          return [];
        }

        // Crear consulta base
        let pharmaciesQuery = collection(db, "pharmacies");
        let constraints = [];

        // Aplicar filtros
        if (this.filters.city) {
          constraints.push(where("address.city", "==", this.filters.city));
        }

        if (this.filters.rating !== null) {
          constraints.push(where("rating", ">=", this.filters.rating));
        }

        // Definir ordenamiento
        let sortOption;
        switch (this.filters.sortBy) {
          case "rating":
            sortOption = orderBy("rating", "desc");
            break;
          case "products":
            sortOption = orderBy("productCount", "desc");
            break;
          case "name":
          default:
            sortOption = orderBy("name", "asc");
            break;
        }
        constraints.push(sortOption);

     * Carga farmacias con filtros opcionales
     * @param {Object} options - Opciones de filtrado
     * @param {number} options.pageSize - Número de farmacias por página (defecto: 10)
     * @param {Array} options.filterBy - Array de condiciones de filtro [campo, operador, valor]
     * @param {Array} options.orderByField - Campo por el cual ordenar (defecto: 'name')
     * @param {boolean} options.orderDesc - Ordenar descendente (defecto: false)
     * @param {boolean} options.loadMore - Cargar más farmacias (paginación)
     */
    async loadPharmacies(options = {}) {
      const {
        pageSize = 10,
        filterBy = [],
        orderByField = "name",
        orderDesc = false,
        loadMore = false,
      } = options;

      if (!loadMore) {
        this.pharmacies = [];
        this.lastDocument = null;
        this.hasMore = true;
      }

      if (!this.hasMore) return;

      this.loading = true;
      this.error = null;

      try {
        let pharmaciesRef = collection(db, "pharmacies");
        let pharmaciesQuery = query(pharmaciesRef);

        // Aplicar filtros si existen
        if (filterBy.length > 0) {
          filterBy.forEach((filter) => {
            const [field, operator, value] = filter;
            pharmaciesQuery = query(
              pharmaciesQuery,
              where(field, operator, value)
            );
          });
        }

        // Aplicar ordenamiento
        pharmaciesQuery = query(
          pharmaciesQuery,
          orderBy(orderByField, orderDesc ? "desc" : "asc")
        );

        // Aplicar paginación
        pharmaciesQuery = query(pharmaciesQuery, limit(pageSize));

        // Si cargamos más, comenzar desde el último documento
        if (loadMore && this.lastDocument) {
          pharmaciesQuery = query(
            pharmaciesQuery,
            startAfter(this.lastDocument)
          );
        }

        const querySnapshot = await getDocs(pharmaciesQuery);

        // Verificar si hay más farmacias
        this.hasMore = querySnapshot.docs.length === pageSize;

        // Guardar el último documento para paginación
        if (querySnapshot.docs.length > 0) {
          this.lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];
        }

        const loadedPharmacies = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // Convertir campos de fecha si existen
            createdAt: data.createdAt?.toDate() || null,
          };
        });

        if (loadMore) {
          this.pharmacies = [...this.pharmacies, ...loadedPharmacies];
        } else {
          this.pharmacies = loadedPharmacies;
        }

        return this.pharmacies;
      } catch (error) {
        console.error("Error al cargar farmacias:", error);
        this.error = error.message;
        return [];
      } finally {
        this.loading = false;
      }
    },

    /**
     * Cargar los detalles de una farmacia específica por su ID
     * @param {string} pharmacyId - ID de la farmacia
     */
    async loadPharmacyDetails(pharmacyId) {
      this.loading = true;
      this.error = null;
      this.currentPharmacy = null;

      try {
        const pharmacyDoc = doc(db, "pharmacies", pharmacyId);
        const pharmacySnapshot = await getDoc(pharmacyDoc);

        if (!pharmacySnapshot.exists()) {
          throw new Error("La farmacia no existe");
        }

        const data = pharmacySnapshot.data();

        this.currentPharmacy = {
          id: pharmacySnapshot.id,
          ...data,
          createdAt: data.createdAt?.toDate() || null,
        };

        // Cargar productos de esta farmacia
        const productsRef = collection(db, "products");
        const productsQuery = query(
          productsRef,
          where("pharmacyId", "==", pharmacyId),
          orderBy("createdAt", "desc"),
          limit(10)
        );

        const productsSnapshot = await getDocs(productsQuery);

        this.currentPharmacy.products = productsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            expirationDate: data.expirationDate?.toDate() || null,
            createdAt: data.createdAt?.toDate() || null,
          };
        });

        return this.currentPharmacy;
      } catch (error) {
        console.error("Error al cargar detalles de la farmacia:", error);
        this.error = error.message;
        return null;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Buscar farmacias por texto
     * @param {string} searchText - Texto de búsqueda
     * @param {number} resultLimit - Número máximo de resultados (defecto: 20)
     */
    async searchPharmacies(searchText, resultLimit = 20) {
      this.loading = true;
      this.error = null;

      try {
        // Convertir a minúsculas para búsqueda insensible a mayúsculas
        const searchLower = searchText.toLowerCase();

        const pharmaciesRef = collection(db, "pharmacies");
        const pharmaciesQuery = query(
          pharmaciesRef,
          orderBy("name"),
          limit(resultLimit * 2) // Buscar más para filtrar después
        );

        const querySnapshot = await getDocs(pharmaciesQuery);

        // Filtrar por coincidencia en nombre, dirección o ciudad
        const results = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate() || null,
            };
          })
          .filter((pharmacy) => {
            return (
              pharmacy.name.toLowerCase().includes(searchLower) ||
              (pharmacy.address &&
                pharmacy.address.toLowerCase().includes(searchLower)) ||
              (pharmacy.city &&
                pharmacy.city.toLowerCase().includes(searchLower))
            );
          })
          .slice(0, resultLimit); // Limitar resultados al número especificado

        return results;
      } catch (error) {
        console.error("Error al buscar farmacias:", error);
        this.error = error.message;
        return [];
      } finally {
        this.loading = false;
      }
    },

    /**
     * Encontrar farmacias cercanas basadas en coordenadas
     * @param {number} latitude - Latitud
     * @param {number} longitude - Longitud
     * @param {number} maxResults - Número máximo de resultados (defecto: 10)
     * @param {number} maxDistanceKm - Distancia máxima en kilómetros (para filtrado posterior)
     */
    async findNearbyPharmacies(
      latitude,
      longitude,
      maxResults = 10,
      maxDistanceKm = 10
    ) {
      this.loading = true;
      this.error = null;
      this.nearbyPharmacies = [];

      try {
        // Debido a limitaciones de Firestore con consultas geoespaciales,
        // cargamos todas las farmacias y filtramos por distancia en el cliente
        const pharmaciesRef = collection(db, "pharmacies");
        const pharmaciesQuery = query(pharmaciesRef);

        const querySnapshot = await getDocs(pharmaciesQuery);

        // Convertir las coordenadas a números
        const userLat = Number(latitude);
        const userLng = Number(longitude);

        // Filtrar y ordenar por distancia
        const pharmaciesWithDistance = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            let distance = null;

            // Calcular distancia si hay ubicación
            if (data.location && data.location instanceof GeoPoint) {
              distance = this.calculateDistance(
                userLat,
                userLng,
                data.location.latitude,
                data.location.longitude
              );
            }

            return {
              id: doc.id,
              ...data,
              distance: distance,
              createdAt: data.createdAt?.toDate() || null,
            };
          })
          .filter((pharmacy) => {
            // Filtrar farmacias con ubicación y dentro de la distancia máxima
            return (
              pharmacy.distance !== null && pharmacy.distance <= maxDistanceKm
            );
          })
          .sort((a, b) => a.distance - b.distance)
          .slice(0, maxResults);

        this.nearbyPharmacies = pharmaciesWithDistance;
        return this.nearbyPharmacies;
      } catch (error) {
        console.error("Error al buscar farmacias cercanas:", error);
        this.error = error.message;
        return [];
      } finally {
        this.loading = false;
      }
    },

    /**
     * Calcular distancia entre dos puntos en kilómetros usando la fórmula de Haversine
     * @private
     */
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radio de la Tierra en km
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) *
          Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distancia en km
      return distance;
    },

    /**
     * Convertir grados a radianes
     * @private
     */
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
  },
});
