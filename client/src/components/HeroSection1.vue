<template>
  <section class="hero-section full-width content-area" style="margin-top: var(--header-height);">
    <div class="hero-content">
      <p class="kicker">Zwakala!</p>
      <h1 class="heading">Get Yourself Some Local Kasi Flava</h1>
      <p class="subheading">Home of bold Kasi Flava - from wood-fired pizzas to BBQ that tastes like a proper weeked braai. Come grab a drink or beer with us, and lets chillax with a proper kasi meal.</p>
      <button class="cta-button">
        <router-link to="/menu">Explore Menu</router-link>
      </button>
    </div>
  </section>
</template>

<style scoped>
  @keyframes shake {
    0% { transform: translate(0); }
    20% { transform: translate(-1px, 0px) rotate(1deg); }
    40% { transform: translate(1px, 0px) rotate(-1deg); }
    60% { transform: translate(-1px, 0px) rotate(1deg); }
    80% { transform: translate(1px, 0px) rotate(-1deg); }
    100% { transform: translate(0); }
  }

  .hero-section {
    background: url('../assets/images/hero-background.jpg') no-repeat center center/cover;
    padding-block: 5rem;
    border-image: linear-gradient(to bottom, rgba(20, 20, 20, 0.4), rgba(20, 20, 20, 0.8)) 1 fill;
    position: relative;
    z-index: 1;
  }

  .hero-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    backdrop-filter: blur(10px) saturate(150%);
    z-index: -1;
  }

  .hero-content {
    text-align: center;

    .heading {
      font-size: var(--hero-heading-size);
      margin-top: 0;
      text-shadow: var(--soft-shadow);
    }

    .subheading {
      width: clamp(300px, 60%, 600px);
      margin: 0 auto;
      margin-bottom: 2rem;
      color: #f8f9fa;
    }

    .kicker {
      color: var(--secondary-color);
      font-weight: bold;
      font-family: var(--font-primary);
      font-size: 2rem;
      margin: 0;
      font-style: italic;
      text-shadow: var(--solid-shadow);
      animation: shake .5s 5;
    }
  }

  .cta-button a {
    font-size: 1rem;
    font-weight: bold;
    color: #f8f9fa;
  }
</style>