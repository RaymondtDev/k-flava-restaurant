<script setup>
  import { ref, onMounted, computed } from 'vue';
  import menuItems from '../menu-items.json';

  const thumbnailUrls = computed(() => {
  const modules = import.meta.glob('/src/assets/images/special-deals/*.{jpg,png,jpeg,webp}', { eager: true, query: '?url', query: 'url' });
  
    return Object.fromEntries(
      Object.entries(modules).map(([key, value]) => {
        // Extract filename from path, e.g., "/src/assets/images/special-deals/pizza.jpg" → "pizza.jpg"
        const filename = key.split('/').pop();
        return [filename, value];
      })
    );
  });

  const specialDeals = ref(menuItems.items.filter(item => item.category === 'special-deal').map(i => ({
    ...i,
    thumbnailUrl: thumbnailUrls.value[i.thumbnail]
  })));

  const currentIndex = ref(0);

  const goToSlide = (index) => {
    currentIndex.value = index
  }

</script>

<template>
  <section class="special-deals full-width content-area">
    <div class="heading-nav">
      <h2>Special Deals</h2>
      <div class="dots">
        <p 
          v-for="(item,index) in specialDeals" 
          class="dot"
          :key="index"
          :class="{ active: index === currentIndex }"
          @click="goToSlide(index)"
          :aria-label="`go-to-slide-${index+1}`"
        ></p>
      </div>
    </div>
    <div class="deals-cards">
      <div 
        class="deal-card" 
        v-for="(item,index) in specialDeals" 
        :key="index" 
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div class="item-info">
          <h4>{{ item.name }}</h4>
          <p>{{ item.description }}</p>
          <ul>
            <li v-for="listItem in item.items">{{ listItem }}</li>
          </ul>
          <p class="item-price">R {{ item.price }}</p>
        </div>
        <div class="item-thumbnail">
          <!-- load thumbnailUrl image -->
          <img :src="item.thumbnailUrl" :alt="item.name"
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .special-deals {
    background-color: var(--primary-background);
    padding-bottom: 50px;
  }

  .heading-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      text-shadow: var(--solid-shadow);
    }

    .dots {
      display: flex;
      justify-content: space-evenly;
      height: fit-content;
      gap: 10px;
      margin-right: 5px;
    }

    .dots .dot {
      width: 15px;
      aspect-ratio: 1;
      border-radius: 50%;
      background-color: var(--tertiary-color);
      cursor: pointer;
    }

    .dots .dot.active {
      background-color: var(--primary-color);
    }
  }

  .deals-cards {
    display: flex;
  }

  .deal-card {
    flex: 0 0 100%;
    display: grid;
    grid-template-columns: 40% 60%;
    transition: transform 0.5s ease-in-out;
    background-color: var(--secondary-background);
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);

    .item-info {
      padding-inline: 10px;
    }

    .item-info .item-price {
      color: var(--primary-color);
      font-style: italic;
      font-weight: bold;
    }

    .item-thumbnail {
      position: relative;
      overflow: hidden;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    .item-thumbnail img {
      position: absolute;
    }
  }

  .deal-card:nth-child(2) {
    margin-inline: 5px;
  }

  @media screen and (max-width: 480px) {
    .deals-cards {
      margin-right: 5px;
    }

    .deal-card {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(2, auto);

      .item-thumbnail {
        position: static;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
      }

      .item-thumbnail img {
        position: static;
      }
    }
  }
</style>