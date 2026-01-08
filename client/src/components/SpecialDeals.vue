<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { menuItems } from '../menu-items';

const specialDeals = ref(menuItems.items.filter(item => item.category === 'special-deal'));

const currentIndex = ref(0);
const dealsContainer = ref(null);

let rafId = null;

const updateIndexFromScroll = () => {
  const el = dealsContainer.value;
  if (!el) return;
  const width = el.clientWidth || 1;
  const idx = Math.round(el.scrollLeft / width);
  currentIndex.value = Math.min(Math.max(idx, 0), specialDeals.value.length - 1);
};

const onScroll = () => {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    updateIndexFromScroll();
    rafId = null;
  });
};

const onResize = () => {
  // Keep the currently selected slide in view after resize
  const el = dealsContainer.value;
  if (!el) return;
  el.scrollTo({ left: currentIndex.value * el.clientWidth });
};

const goToSlide = (index) => {
  const el = dealsContainer.value;
  if (el) {
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
  }
  currentIndex.value = index;
};

onMounted(() => {
  const el = dealsContainer.value;
  if (!el) return;
  el.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  // ensure index matches initial scroll position
  updateIndexFromScroll();
});

onBeforeUnmount(() => {
  const el = dealsContainer.value;
  if (el) el.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onResize);
  if (rafId) cancelAnimationFrame(rafId);
});

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
    <div class="deals-cards" ref="dealsContainer">
      <div 
        class="deal-card" 
        v-for="(item,index) in specialDeals" 
        :key="index" 
        
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
          <img :src="item.thumbnail" :alt="item.name" />
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
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
  }

  .deal-card {
    scroll-snap-align: start;
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