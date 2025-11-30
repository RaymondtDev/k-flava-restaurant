<script setup>
  const props = defineProps({
    profileImage: {
      type: String,
      required: false,
      default: "/images/reviews/placeholder.png"
    },
    name: {
      type: String,
      required: true,
      default: "John Doe"
    },
    stars: {
      type: Number,
      required: true,
      default: 5
    },
    quote: {
      type: String,
      required: true,
      default: "Great service. Great food."
    }
  })

  const parsedImage = new URL(props.profileImage, import.meta.url).href;
</script>

<template>
  <div class="review-card">
    <div class="image">
      <img :src="parsedImage" alt="reviewer-profile-image">
    </div>
    <div class="info">
      <div class="stars">
        <div class="star" v-for="(star, index) in stars">
          <img src="../assets/icons/fill-star-icon.svg" alt="review-star" />
        </div>
      </div>
      <q>{{ quote }}</q>
      <p>{{ name }}</p>
    </div>
  </div>
</template>

<style scoped>
  .review-card {
    background-color: var(--secondary-background);
    padding: 10px 5px;
    box-shadow: 2px 2px 2px rbga(0, 0, 0, 0.5);
    border-radius: 5px;
    display: flex;
    gap: 5px;
  }

  .image {
    min-width: 50px;
    width: 50px;
    height: 50px;

    img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: contain;
    }
  }

  .info .stars {
    display: flex;
    gap: 2px;
    margin-bottom: 10px;

    .star {
      width: 20px;
    }
  }

  .info q {
    font-style: italic;
  }

  .info p {
    margin: 0;
    margin-top: 10px;
    padding: 0;
  }
</style>