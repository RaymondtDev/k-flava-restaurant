<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import SpecialDeals from '../components/SpecialDeals.vue'
import menuItems from '../menu-items.json'
import Reviews from '../components/Reviews.vue'

const categories = ref(['all', ...menuItems.categories]);
const allItems = ref(menuItems.items.filter(item => item.category !== 'special-deal').map(i => ({
  ...i,
  thumbnail: new URL(i.thumbnail, import.meta.url).href
})));

// State
const currentCategory = ref('all'); // current visible category
const itemsPerPage = ref(9);
const loadedCount = ref({}); // how many items shown per category

// change number of menu items displayed on smaller screens
const updateItemsCount = () => {
  itemsPerPage.value = window.innerWidth <= 768 ? 6 : 9;
}

onMounted(() => {
  updateItemsCount();
  window.addEventListener('resize', updateItemsCount());
})
onUnmounted(() => {
  window.removeEventListener('resize', updateItemsCount());
})

watch(itemsPerPage, () => {
  Object.keys(loadedCount.value).forEach(cat => {
    loadedCount.value[cat] = itemsPerPage.value;
  })
})

// Initialize loadedCount for every category
categories.value.forEach(cat => {
  loadedCount.value[cat] = itemsPerPage.value;
})

// Compute current slide position
const currentIndex = computed(() => categories.value.indexOf(currentCategory.value));

// Get items for a specific category
const getItemsForCategory = (cat) => {
  if (cat === 'all') return allItems.value;
  return allItems.value.filter(item => item.category === cat);
}

// Items currently visible in a category (with pagination)
const visibleItems = (cat) => {
  const items = getItemsForCategory(cat);
  return items.slice(0, loadedCount.value[cat]);
}

// Check if "Load More" should appear
const hasMoreItems = (cat) => {
  return loadedCount.value[cat] < getItemsForCategory(cat).length;
}

// Actions
const selectCategory = async (cat) => {
  currentCategory.value = cat;
}

const loadMore = (cat) => {
  loadedCount.value[cat] += itemsPerPage.value;
}
</script>

<template>
  <section class="menu-hero full-width">
    <h1>Our Menu</h1>
  </section>

  <SpecialDeals />

  <section class="menu full-width content-area">
    <!-- Category Navigation -->
    <div class="menu-nav">
      <p
        v-for="cat in categories"
        :key="cat"
        :class="{ active: cat === currentCategory }"
        @click="selectCategory(cat)"
      >
        {{ cat }}
      </p>
    </div>

    <!-- Sliding Sections -->
    <div
        class="menu-sections"
      >
        <!-- One section per category -->
        <section
          v-for="(cat, index) in categories"
          :key="cat"
          class="menu-section"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >

          <div class="grid">
            <div
              v-for="item in visibleItems(cat)"
              :key="item.id"
              class="menu-item-card"
            >
              <div class="thumbnail">
                <img :src="item.thumbnail" :alt="item.name">
              </div>
              <div class="info">
                <h4>{{ item.name }}</h4>
                <p class="desc">{{ item.description }}</p>
                <p class="price">R {{ item.price }}</p>
              </div>
            </div>
          </div>

          <!-- Load More Button -->
          <button
            v-if="hasMoreItems(cat)"
            @click="loadMore(cat)"
            class="cta-button"
          >
            Load More
          </button>
        </section>
      </div>
  </section>

  <Reviews />
</template>

<style scoped>
.menu-hero {
  margin-top: var(--header-height);
  padding-block: 50px;
  text-align: center;
  background: url('../assets/images/fire-background.jpg') no-repeat center center/cover;
  border-image: linear-gradient(to bottom, rgba(20, 20, 20, 0.2), rgba(20, 20, 20, 0.4)) 1 fill;
  /* position: relative;
  z-index: 1; */

  h1 {
    text-shadow: var(--solid-shadow);
  }
}

/* .menu-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(5px) saturate(50%);
  z-index: -1;
} */

.menu {
  padding-block: 25px;
  background-color: var(--secondary-background);
}

.menu-nav {
  display: flex;
  background-color: var(--primary-background);
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
  margin-bottom: 20px;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.menu-nav::-webkit-scrollbar { display: none; }

.menu-nav p {
  padding: 10px 15px;
  margin: 0;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.5s ease;
  text-transform: capitalize;
  position: relative;
}

.menu-nav p::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0%;
  height: 2px;
  background-color: var(--primary-color);
  transition: all 0.5s ease;
}

.menu-nav p:hover {
  background-color: var(--secondary-background);
  color: var(--primary-color);
}

.menu-nav p.active {
  background-color: var(--secondary-background);
  color: var(--primary-color);
  transition: all 0.5s ease;
}

.menu-nav p.active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
  transition: all 0.5s ease;
}

.menu-sections {
  display: flex;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
}

.menu-section {
  flex: 0 0 100%;
  min-height: fit-content;
  background-color: var(--primary-background);
  box-shadow: 2 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.menu-item-card {
  background-color: var(--secondary-background);
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: transform 0.3s;
  display: grid;
  grid-template-rows: 200px 1fr 1fr auto;

  .thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .info {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 3;

    .desc {
      color: var(--text-color);
    }

    h4,p {
      padding: 0;
      margin: 0;
    }
  }
}

.menu-item-card:hover {
  transform: translateY(-5px);
}

.menu-item-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.info {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.info h4 {
  margin: 0 0 8px 0;
  font-size: 1.1rem;
}

.price {
  font-weight: bold;
  color: var(--primary-color);
  margin: 8px 0 0 0;
}

.desc {
  font-size: 0.9rem;
  color: #666;
  margin-top: 8px;
  flex-grow: 1;
}

.cta-button {
  display: block;
  margin: 20px auto 10px;
  font-size: 1.1rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
  .menu-section { padding: 20px; }
}

@media (max-width: 480px) {
  .grid { grid-template-columns: 1fr; }
  .menu-nav p { padding: 12px 16px; font-size: 0.95rem; }
}
</style>