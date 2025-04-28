<template>
  <div class="categorias-page">
    <div class="breadcrumb-container">
      <div class="container">
        <Breadcrumb :items="breadcrumbItems" />
      </div>
    </div>

    <section class="categories-section">
      <div class="container">
        <h1 class="categorias-title">Categorías de Productos</h1>

        <p class="categorias-description">
          Explora nuestras categorías de productos farmacéuticos con descuento.
          Puedes navegar por uso terapéutico, compuesto activo o forma
          farmacéutica.
        </p>

        <div class="categoria-grupo">
          <div class="categoria-header">
            <Icon name="mdi:heart-pulse" class="categoria-icon" size="24px" />
            <h2>Por Uso Terapéutico</h2>
          </div>

          <p class="categoria-descripcion">
            Encuentra medicamentos según su uso terapéutico o el tipo de
            condición que tratan.
          </p>

          <div class="categoria-cards">
            <NuxtLink
              to="/productos?categoria=resfriado"
              class="categoria-card"
            >
              <div class="categoria-card-icon">
                <Icon
                  name="mdi:head-snowflake"
                  size="32px"
                  class="text-primary"
                />
              </div>
              <h3>Resfriado y Gripe</h3>
              <div class="categoria-productos">24 productos</div>
            </NuxtLink>

            <NuxtLink
              to="/productos?categoria=dolor-cabeza"
              class="categoria-card"
            >
              <div class="categoria-card-icon">
                <Icon name="mdi:head-flash" size="32px" class="text-primary" />
              </div>
              <h3>Dolor de Cabeza</h3>
              <div class="categoria-productos">18 productos</div>
            </NuxtLink>

            <NuxtLink
              to="/productos?categoria=sistema-digestivo"
              class="categoria-card"
            >
              <div class="categoria-card-icon">
                <Icon name="mdi:stomach" size="32px" class="text-primary" />
              </div>
              <h3>Sistema Digestivo</h3>
              <div class="categoria-productos">32 productos</div>
            </NuxtLink>

            <NuxtLink to="/productos?categoria=alergias" class="categoria-card">
              <div class="categoria-card-icon">
                <Icon name="mdi:allergy" size="32px" class="text-primary" />
              </div>
              <h3>Alergias</h3>
              <div class="categoria-productos">15 productos</div>
            </NuxtLink>

            <NuxtLink to="/productos?categoria=presion" class="categoria-card">
              <div class="categoria-card-icon">
                <Icon name="mdi:heart-pulse" size="32px" class="text-primary" />
              </div>
              <h3>Presión Arterial</h3>
              <div class="categoria-productos">12 productos</div>
            </NuxtLink>

            <NuxtLink
              to="/productos?categoria=oftalmicos"
              class="categoria-card"
            >
              <div class="categoria-card-icon">
                <Icon name="mdi:eye" size="32px" class="text-primary" />
              </div>
              <h3>Oftálmicos</h3>
              <div class="categoria-productos">9 productos</div>
            </NuxtLink>

            <NuxtLink
              to="/productos?categoria=salud-bucal"
              class="categoria-card"
            >
              <div class="categoria-card-icon">
                <Icon name="mdi:tooth" size="32px" class="text-primary" />
              </div>
              <h3>Salud Bucal</h3>
              <div class="categoria-productos">14 productos</div>
            </NuxtLink>

            <NuxtLink
              to="/productos?categoria=sistema-nervioso"
              class="categoria-card"
            >
              <div class="categoria-card-icon">
                <Icon name="mdi:brain" size="32px" class="text-primary" />
              </div>
              <h3>Sistema Nervioso</h3>
              <div class="categoria-productos">21 productos</div>
            </NuxtLink>
          </div>
        </div>

        <div class="categoria-grupo">
          <div class="categoria-header">
            <Icon name="mdi:flask" class="categoria-icon" size="24px" />
            <h2>Por Compuesto Activo</h2>
          </div>

          <p class="categoria-descripcion">
            Busca medicamentos según su principio activo o compuesto genérico.
          </p>

          <div class="categoria-cards">
            <NuxtLink
              to="/productos?compuesto=paracetamol"
              class="categoria-card"
            >
              <div class="categoria-card-icon">
                <Icon name="mdi:pill" size="32px" class="text-primary" />
              </div>
              <h3>Paracetamol</h3>
              <div class="categoria-productos">16 productos</div>
            </NuxtLink>

            <NuxtLink
              to="/productos?compuesto=ibuprofeno"
              class="categoria-card"
            >
              <div class="categoria-card-icon">
                <Icon name="mdi:pill" size="32px" class="text-primary" />
              </div>
              <h3>Ibuprofeno</h3>
              <div class="categoria-productos">12 productos</div>
            </NuxtLink>

            <NuxtLink to="/productos?compuesto=aspirina" class="categoria-card">
              <div class="categoria-card-icon">
                <Icon name="mdi:pill" size="32px" class="text-primary" />
              </div>
              <h3>Aspirina</h3>
              <div class="categoria-productos">8 productos</div>
            </NuxtLink>

            <NuxtLink
              to="/productos?compuesto=loratadina"
              class="categoria-card"
            >
              <div class="categoria-card-icon">
                <Icon name="mdi:pill" size="32px" class="text-primary" />
              </div>
              <h3>Loratadina</h3>
              <div class="categoria-productos">7 productos</div>
            </NuxtLink>

            <NuxtLink
              to="/productos?compuesto=omeprazol"
              class="categoria-card"
            >
              <div class="categoria-card-icon">
                <Icon name="mdi:pill" size="32px" class="text-primary" />
              </div>
              <h3>Omeprazol</h3>
              <div class="categoria-productos">9 productos</div>
            </NuxtLink>

            <NuxtLink
              to="/productos?compuesto=amoxicilina"
              class="categoria-card"
            >
              <div class="categoria-card-icon">
                <Icon name="mdi:pill" size="32px" class="text-primary" />
              </div>
              <h3>Amoxicilina</h3>
              <div class="categoria-productos">11 productos</div>
            </NuxtLink>
          </div>
        </div>

        <div class="categoria-grupo">
          <div class="categoria-header">
            <Icon name="mdi:pill" class="categoria-icon" size="24px" />
            <h2>Por Forma Farmacéutica</h2>
          </div>

          <p class="categoria-descripcion">
            Encuentra medicamentos según su presentación o forma farmacéutica.
          </p>

          <div class="categoria-cards">
            <NuxtLink to="/productos?forma=comprimidos" class="categoria-card">
              <div class="categoria-card-icon">
                <Icon
                  name="mdi:medication-outline"
                  size="32px"
                  class="text-primary"
                />
              </div>
              <h3>Comprimidos</h3>
              <div class="categoria-productos">45 productos</div>
            </NuxtLink>

            <NuxtLink to="/productos?forma=capsulas" class="categoria-card">
              <div class="categoria-card-icon">
                <Icon name="mdi:capsule" size="32px" class="text-primary" />
              </div>
              <h3>Cápsulas</h3>
              <div class="categoria-productos">28 productos</div>
            </NuxtLink>

            <NuxtLink to="/productos?forma=jarabes" class="categoria-card">
              <div class="categoria-card-icon">
                <Icon
                  name="mdi:bottle-tonic"
                  size="32px"
                  class="text-primary"
                />
              </div>
              <h3>Jarabes</h3>
              <div class="categoria-productos">17 productos</div>
            </NuxtLink>

            <NuxtLink to="/productos?forma=aerosoles" class="categoria-card">
              <div class="categoria-card-icon">
                <Icon name="mdi:spray" size="32px" class="text-primary" />
              </div>
              <h3>Aerosoles</h3>
              <div class="categoria-productos">9 productos</div>
            </NuxtLink>

            <NuxtLink to="/productos?forma=gotas" class="categoria-card">
              <div class="categoria-card-icon">
                <Icon name="mdi:eyedropper" size="32px" class="text-primary" />
              </div>
              <h3>Gotas</h3>
              <div class="categoria-productos">12 productos</div>
            </NuxtLink>

            <NuxtLink to="/productos?forma=cremas" class="categoria-card">
              <div class="categoria-card-icon">
                <Icon name="mdi:lotion" size="32px" class="text-primary" />
              </div>
              <h3>Cremas y Ungüentos</h3>
              <div class="categoria-productos">19 productos</div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "#imports";

// SEO
useHead({
  title: "Categorías de Productos | FarmaciaDescuento",
  meta: [
    {
      name: "description",
      content:
        "Explora nuestras categorías de productos farmacéuticos con descuento por fecha de vencimiento próxima.",
    },
  ],
});

const breadcrumbItems = ref([
  { text: "Inicio", to: "/" },
  { text: "Categorías", to: "/categorias", active: true },
]);
</script>

<style scoped>
.categorias-page {
  background-color: #f7fff7;
  min-height: 100vh;
}

.breadcrumb-container {
  background-color: #fff;
  padding: 1rem 0;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.categorias-title {
  color: var(--secondary-color);
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 600;
}

.categorias-description {
  text-align: center;
  color: #666;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.5;
}

.categoria-grupo {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.categoria-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.categoria-icon {
  color: var(--primary-color);
  margin-right: 0.5rem;
}

.categoria-header h2 {
  color: var(--secondary-color);
  font-size: 1.25rem;
  font-weight: 600;
}

.categoria-descripcion {
  color: #666;
  margin-bottom: 1.5rem;
}

.categoria-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.categoria-card {
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  flex: 0 0 220px;
  margin-bottom: 1rem;
}

.categoria-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.categoria-card-icon {
  background-color: #fff;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: var(--primary-color);
}

.categoria-card h3 {
  color: var(--secondary-color);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.categoria-productos {
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .categoria-cards {
    gap: 0.8rem;
  }

  .categoria-card {
    flex: 0 0 160px;
    padding: 1rem;
  }

  .categoria-card-icon {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 576px) {
  .categoria-cards {
    gap: 0.5rem;
  }

  .categoria-card {
    flex: 0 0 calc(50% - 0.5rem);
    padding: 0.8rem;
    margin-bottom: 0.5rem;
  }

  .categoria-card h3 {
    font-size: 1rem;
  }

  .categoria-productos {
    font-size: 0.8rem;
  }
}
</style>
