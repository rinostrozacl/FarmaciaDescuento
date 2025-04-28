<template>
  <div>
    <!-- Hero section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="text-4xl font-bold text-secondary mb-4">
            Medicamentos con descuento, <br />cerca de ti
          </h1>
          <p class="text-gray-dark mb-6">
            Conectamos farmacias y clientes para reducir mermas por vencimiento
            y ofrecer productos a precios accesibles.
          </p>
          <div class="hero-buttons">
            <router-link to="/productos" class="btn-primary"
              >Buscar Productos</router-link
            >
            <a href="#como-funciona" class="btn-secondary">¿Cómo Funciona?</a>
          </div>
        </div>
        <div class="hero-image">
          <img
            src="/images/hero-illustration.jpg"
            alt="Farmacia Descuento"
            class="w-full h-auto"
          />
        </div>
      </div>
    </section>

    <!-- Categories section -->
    <section class="category-nav">
      <div class="container">
        <h2 class="text-3xl font-bold text-center text-secondary mb-6">
          Explorar por Categorías
        </h2>
        <div class="category-tabs">
          <button
            v-for="(tab, index) in ['Por Uso', 'Por Compuesto', 'Por Forma']"
            :key="index"
            :class="['tab', activeTab === index ? 'active' : '']"
            @click="activeTab = index"
          >
            {{ tab }}
          </button>
        </div>
        <div class="categories-grid">
          <router-link
            v-for="(category, index) in categories[activeTab]"
            :key="index"
            to="/productos"
            class="category-card"
          >
            <div class="category-icon">
              <Icon :name="category.icon" size="32px" class="text-primary" />
            </div>
            <h3>{{ category.name }}</h3>
          </router-link>
          <router-link to="/productos" class="category-card view-all">
            <div class="category-icon">
              <Icon
                name="fa6-solid:th-large"
                size="32px"
                class="text-primary"
              />
            </div>
            <h3>Ver Todas</h3>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Products section -->
    <section class="products">
      <div class="container">
        <div class="section-header">
          <h2 class="text-3xl font-bold text-secondary">
            Productos con Descuento Cerca de Ti
          </h2>
          <div class="location">
            <Icon name="fa6-solid:map-marker-alt" class="text-primary" />
            <span>Puerto Montt Centro</span>
            <button class="change-location">Cambiar</button>
          </div>
        </div>

        <div class="filter-container">
          <div class="filters">
            <div class="filter-group">
              <label>Distancia</label>
              <select>
                <option>Menos de 1 km</option>
                <option selected>Menos de 5 km</option>
                <option>Menos de 10 km</option>
                <option>Cualquier distancia</option>
              </select>
            </div>
            <div class="filter-group">
              <label>Descuento</label>
              <select>
                <option>Cualquier descuento</option>
                <option>Más del 20%</option>
                <option selected>Más del 30%</option>
                <option>Más del 50%</option>
              </select>
            </div>
            <div class="filter-group">
              <label>Vencimiento</label>
              <select>
                <option selected>Cualquier fecha</option>
                <option>Próximos 7 días</option>
                <option>Próximos 15 días</option>
                <option>Próximo mes</option>
              </select>
            </div>
            <button class="btn-filter">Aplicar Filtros</button>
          </div>
        </div>

        <div class="products-grid">
          <ProductCard
            v-for="(product, index) in products"
            :key="index"
            :product="product"
            @view-details="viewDetails"
            @add-to-cart="addToCart"
          />
        </div>

        <div class="load-more">
          <router-link to="/productos" class="btn-load-more"
            >Ver todos los productos</router-link
          >
        </div>
      </div>
    </section>

    <!-- How it works section -->
    <section id="como-funciona" class="how-it-works">
      <div class="container">
        <h2 class="text-3xl font-bold text-center text-secondary mb-12">
          ¿Cómo Funciona?
        </h2>
        <div class="steps">
          <div class="step">
            <div class="step-icon">
              <i class="fas fa-search"></i>
            </div>
            <h3>Busca</h3>
            <p>
              Encuentra productos con descuento cerca de ti, organizados por
              categorías o compuestos.
            </p>
          </div>

          <div class="step">
            <div class="step-icon">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <h3>Selecciona</h3>
            <p>
              Agrega productos a tu carrito y genera un ticket de descuento
              válido por 24 horas.
            </p>
          </div>

          <div class="step">
            <div class="step-icon">
              <i class="fas fa-ticket-alt"></i>
            </div>
            <h3>Genera</h3>
            <p>
              Recibe tu ticket con código QR por correo electrónico o guárdalo
              en la app.
            </p>
          </div>

          <div class="step">
            <div class="step-icon">
              <i class="fas fa-store"></i>
            </div>
            <h3>Visita</h3>
            <p>Acude a la farmacia y presenta tu ticket para validación.</p>
          </div>

          <div class="step">
            <div class="step-icon">
              <i class="fas fa-percentage"></i>
            </div>
            <h3>Ahorra</h3>
            <p>
              Obtén el descuento en tus productos y contribuye a reducir el
              desperdicio.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pharmacy CTA section -->
    <PharmacyCallToAction />
  </div>
</template>

<script setup>
import { ref } from "vue";
import PharmacyCallToAction from "~/components/PharmacyCallToAction.vue";
import ProductCard from "~/components/product/ProductCard.vue";

// Definir meta datos de la página
definePageMeta({
  layout: "default",
});

// Estado para las pestañas de categorías
const activeTab = ref(0);

// Datos de categorías con iconos
const categories = ref([
  // Por Uso
  [
    { name: "Resfriado", icon: "med:analgesico" },
    { name: "Dolor de Cabeza", icon: "med:antipiretico" },
    { name: "Sistema Digestivo", icon: "med:digestivo" },
    { name: "Alergias", icon: "med:antialergico" },
    { name: "Presión Arterial", icon: "tabler:heart" },
    { name: "Oftálmicos", icon: "tabler:eye" },
  ],
  // Por Compuesto
  [
    { name: "Paracetamol", icon: "med:molecula" },
    { name: "Ibuprofeno", icon: "med:molecula" },
    { name: "Amoxicilina", icon: "med:molecula" },
    { name: "Aspirina", icon: "med:molecula" },
    { name: "Omeprazol", icon: "med:molecula" },
    { name: "Loratadina", icon: "med:molecula" },
  ],
  // Por Forma
  [
    { name: "Tabletas", icon: "med:tableta" },
    { name: "Cápsulas", icon: "med:capsula" },
    { name: "Jarabes", icon: "med:jarabe" },
    { name: "Gotas", icon: "med:gota" },
    { name: "Inyectables", icon: "med:inyectable" },
    { name: "Cremas", icon: "med:crema" },
  ],
]);

// Datos de productos de muestra
const products = ref([
  {
    id: 1,
    name: "Paracetamol 500mg",
    image: "/images/products/paracetamol.png",
    pharmacies: 5,
    originalPrice: 5990,
    discountedPrice: 3590,
    discountPercentage: 40,
    expiration: "15/05/2025",
    tags: ["Analgésico", "Dolor de cabeza"],
  },
  {
    id: 2,
    name: "Ibuprofeno 400mg",
    image: "/images/products/ibuprofeno.png",
    pharmacies: 3,
    originalPrice: 6490,
    discountedPrice: 4220,
    discountPercentage: 35,
    expiration: "22/05/2025",
    tags: ["Antiinflamatorio", "Dolor muscular"],
  },
  {
    id: 3,
    name: "Loratadina 10mg",
    image: "/images/products/loratadina.png",
    pharmacies: 8,
    originalPrice: 7990,
    discountedPrice: 3995,
    discountPercentage: 50,
    expiration: "10/05/2025",
    tags: ["Antialérgico", "Alergias"],
  },
  {
    id: 4,
    name: "Omeprazol 20mg",
    image: "/images/products/omeprazol.png",
    pharmacies: 6,
    originalPrice: 8990,
    discountedPrice: 4945,
    discountPercentage: 45,
    expiration: "18/05/2025",
    tags: ["Antiácido", "Sistema digestivo"],
  },
]);

// Funciones para manejar eventos del ProductCard
const viewDetails = (product) => {
  navigateTo(`/productos/${product.id}`);
};

const addToCart = (product) => {
  // Implementar lógica para agregar al carrito (por ahora solo mostramos alerta)
  alert(`Producto agregado al carrito: ${product.name}`);
};
</script>

<style scoped>
/* Hero Section */
.hero {
  padding: 60px 0;
  background-color: var(--light-color, #f7fff7);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero .container {
  display: flex;
  align-items: center;
  gap: 40px;
}

.hero-content {
  flex: 1;
}

.hero-content h1 {
  margin-bottom: 1rem;
  color: var(--secondary-color, #1a535c);
}

.hero-content p {
  margin-bottom: 1.5rem;
  color: var(--gray-dark, #888888);
}

.hero-buttons {
  display: flex;
  gap: 16px;
}

.hero-image {
  flex: 1;
}

.btn-primary {
  display: inline-block;
  padding: 12px 24px;
  background-color: var(--primary-color, #4ecdc4);
  color: white;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: var(--primary-dark, #36b5ac);
}

.btn-secondary {
  display: inline-block;
  padding: 12px 24px;
  background-color: white;
  color: var(--secondary-color, #1a535c);
  border: 1px solid var(--secondary-color, #1a535c);
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: var(--secondary-color, #1a535c);
  color: white;
}

/* Category Navigation */
.category-nav {
  padding: 60px 0;
  background-color: white;
}

.category-nav h2 {
  margin-bottom: 1.5rem;
  color: var(--secondary-color, #1a535c);
  text-align: center;
}

.category-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.tab {
  padding: 10px 24px;
  background-color: var(--gray-light, #f4f4f4);
  border: none;
  border-radius: 8px;
  margin: 0 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  color: var(--gray-dark, #888888);
}

.tab.active,
.tab:hover {
  background-color: var(--primary-color, #4ecdc4);
  color: white;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.category-card {
  padding: 16px;
  background-color: var(--gray-light, #f4f4f4);
  border-radius: 8px;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.category-icon {
  background-color: white;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  z-index: 1;
}

.category-card h3 {
  font-size: 1rem;
  font-weight: 500;
  color: var(--secondary-color, #1a535c);
  z-index: 1;
}

.category-card.view-all {
  background-color: var(--gray, #e0e0e0);
}

/* Products Section */
.products {
  padding: 60px 0;
  background-color: var(--gray-light, #f4f4f4);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.location {
  display: flex;
  align-items: center;
  color: var(--gray-dark, #888888);
}

.location i {
  margin-right: 8px;
  color: var(--primary-color, #4ecdc4);
}

.change-location {
  margin-left: 8px;
  color: var(--primary-color, #4ecdc4);
  background: none;
  border: none;
  cursor: pointer;
}

.filter-container {
  margin-bottom: 1.5rem;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  font-size: 0.8rem;
  color: var(--gray-dark, #888888);
  margin-bottom: 5px;
}

.filter-group select {
  padding: 8px 16px;
  border: 1px solid var(--gray, #e0e0e0);
  border-radius: 4px;
  font-size: 0.9rem;
}

.btn-filter {
  background-color: var(--secondary-color, #1a535c);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 2rem;
}

.product-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  position: relative;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.discount-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: var(--accent-color, #ff6b6b);
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  padding: 4px 10px;
  border-radius: 4px;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.product-image {
  height: 200px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--gray-light, #f4f4f4);
  overflow: hidden;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.product-info {
  padding: 16px;
}

.product-info h3 {
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.product-availability {
  font-size: 0.8rem;
  color: var(--gray-dark, #888888);
  margin-bottom: 8px;
}

.product-price {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.original-price {
  text-decoration: line-through;
  color: var(--gray-dark, #888888);
  font-size: 0.9rem;
  margin-right: 10px;
}

.discounted-price {
  color: var(--accent-color, #ff6b6b);
  font-weight: bold;
}

.product-expiration {
  font-size: 0.8rem;
  color: var(--gray-dark, #888888);
  margin-bottom: 8px;
}

.product-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 12px;
}

.category-tag {
  font-size: 0.7rem;
  background-color: var(--gray-light, #f4f4f4);
  padding: 3px 8px;
  border-radius: 4px;
}

.btn-view-offers {
  display: block;
  width: 100%;
  padding: 8px 0;
  background-color: var(--primary-color, #4ecdc4);
  color: white;
  text-align: center;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.btn-view-offers:hover {
  background-color: var(--primary-dark, #36b5ac);
}

.load-more {
  text-align: center;
  margin-top: 2rem;
}

.btn-load-more {
  display: inline-block;
  padding: 12px 24px;
  background-color: transparent;
  color: var(--secondary-color, #1a535c);
  border: 1px solid var(--secondary-color, #1a535c);
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-load-more:hover {
  background-color: var(--secondary-color, #1a535c);
  color: white;
}

/* How it works section */
.how-it-works {
  padding: 60px 0;
  background-color: white;
  text-align: center;
}

.how-it-works h2 {
  margin-bottom: 40px;
  color: var(--secondary-color, #1a535c);
  text-align: center;
}

.steps {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.step {
  text-align: center;
  flex: 1;
  min-width: 180px;
  padding: 20px;
}

.step-icon {
  width: 80px;
  height: 80px;
  background-color: var(--primary-color, #4ecdc4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 2rem;
  color: white;
}

.step h3 {
  margin-bottom: 10px;
  color: var(--secondary-color, #1a535c);
  font-weight: 600;
}

.step p {
  color: var(--gray-dark);
  font-size: 0.9rem;
  line-height: 1.4;
  max-width: 220px;
  margin: 0 auto;
}

@media (max-width: 992px) {
  .hero .container {
    flex-direction: column;
  }

  .hero-content {
    order: 2;
    text-align: center;
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-image {
    order: 1;
    margin-bottom: 2rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .location {
    margin-top: 0.5rem;
  }

  .filters {
    flex-wrap: wrap;
    gap: 16px;
  }

  .steps {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  .step {
    min-width: 150px;
    margin-bottom: 30px;
  }
}

@media (max-width: 576px) {
  .hero-content h1 {
    font-size: 1.8rem;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .tab {
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
