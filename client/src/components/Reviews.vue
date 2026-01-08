<script setup>
  import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
  import { reviewsData } from '../reviews';
  import ReviewCard from './ReviewCard.vue';

  const reviews = ref(reviewsData);
  let reviewsPerSlide = ref(3);
  const currentSlide = ref(0);
  let interval = null;

  onMounted(() => {
    const update = () => {
      reviewsPerSlide.value = window.innerWidth <= 425 ? 1 : window.innerWidth <= 768 ? 2 : 3;
    }
    window.addEventListener('resize', update());
    update()

    interval = setInterval(next, 7000);
  })
  onUnmounted(() => {
    clearInterval(interval)
  })

  const slides = computed(() => {
    const chunks = [];
    for (let i = 0; i < reviews.value.length; i += reviewsPerSlide.value) {
      chunks.push(reviews.value.slice(i, i + reviewsPerSlide.value))
    };

    return chunks;
  });

  const goTo = (index) => {
    currentSlide.value = index;
  }

  const next = () => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length;
  }

  // Pause on hover
  const hovered = ref(false)
  watch(hovered, (val) => {
    if (val) clearInterval(interval)
    else interval = setInterval(next, 7000)
  })
</script>

<template>
  <section class="social-proof-section">
    <div class="social-proof-content">
      <h2 class="section-title">What Our Customers Say</h2>
      <div 
        class="reviews-slides"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
      >
        <div 
          class="reviews-slide"
          v-for="(slide, index) in slides"
          :key="index"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <ReviewCard 
            v-for="review in slide"
            :key="review.id"
            :name="review.name"
            :stars="review.rating"
            :quote="review.quote"
          />
        </div>
      </div>
      <div class="reviews-dots-container">
        <div class="dots">
          <p 
            v-for="(_,index) in slides" 
            class="dot"
            :key="index"
            :class="{ active: index === currentSlide }"
            @click="goTo(index)"
            :aria-label="`go-to-slide-${index+1}`"
          ></p>
      </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .social-proof-section {
    overflow-x: hidden;
  }

  .reviews-slides {
    display: flex;
    overflow-x: hidden;
    
    .reviews-slide {
      flex: 0 0 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      transition: transform 0.5s ease-in-out;
    }
  }

  .section-title {
    text-shadow: var(--solid-shadow);
    text-align: center;
  }

  .reviews-dots-container{
    display: flex;
    justify-content: center;
    align-items: center;
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

  @media screen and (max-width: 425px) {
    .reviews-slide { flex-direction: column; }
  }
</style>