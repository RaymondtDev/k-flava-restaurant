<script setup>
  import { ref } from 'vue';

  const props = defineProps({
    faqs: {
      type: Array,
      required: true,
      default: () => [],
    },
  });

  const openIndex = ref(-1); // -1 = all closed

  const toggle = (index) => {
    openIndex.value = openIndex.value === index ? -1 : index;
  };
</script>

<template>
  <div class="faq-accordion">
    <div
      v-for="(faq, index) in faqs"
      :key="index"
      class="faq-item"
      :class="{ open: openIndex === index }"
    >
      <!-- Question -->
      <button
        class="faq-question"
        @click="toggle(index)"
        :aria-expanded="openIndex === index"
        :aria-controls="`answer-${index}`"
      >
        <span>{{ faq.question }}</span>
        <svg
          class="chevron"
          :class="{ rotated: openIndex === index }"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="currentColor" d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      <!-- Answer (with smooth slide) -->
      <div
        class="faq-answer-wrapper"
        :id="`answer-${index}`"
        v-show="openIndex === index"
      >
        <div class="faq-answer">
          {{ faq.answer }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-accordion {
  background: var(--secondary-background);
  border-radius: 5px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.faq-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  width: 100%;
  padding: 20px 24px;
  background: transparent;
  border: none;
  text-align: left;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-color, #333);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
}

.faq-question:hover {
  background: rgba(255, 107, 0, 0.08);
  color: var(--primary-color);
}

.chevron {
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-left: 16px;
}

.chevron.rotated {
  transform: rotate(180deg);
}

.faq-answer-wrapper {
  overflow: hidden;
  animation: slideDown 0.4s ease-out;
  background-color: var(--tertiary-background);
}

.faq-answer {
  padding: 0 24px 24px;
  line-height: 1.6;
  color: var(--text-color);
  font-size: 1rem;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 300px; /* more than enough for any answer */
  }
}
</style>
