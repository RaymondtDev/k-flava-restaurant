<script setup>
  import SpecialDeals from '../components/SpecialDeals.vue';
  import HeroSection1 from '../components/HeroSection1.vue';
  import Reviews from '../components/Reviews.vue';
</script>

<template>
  <hero-section1 />
  <section class="about-section full-width content-area">
    <div class="services">
      <div class="service">
        <div class="icon">
          <img src="../assets/icons/card-payment-icon.svg" alt="">
        </div>
        <h4>Accept Cards</h4>
        <p>We also accept card payments when ordering or on delivery</p>
      </div>
      <div class="service">
        <div class="icon">
          <img src="../assets/icons/order-online-icon.svg" alt="">
        </div>
        <h4>Online Ordering</h4>
        <p>Give us a call or WhatsApp to order online</p>
      </div>
      <div class="service">
        <div class="icon">
          <img src="../assets/icons/fast-delivery-icon.svg" alt="">
        </div>
        <h4>Fast Delivery</h4>
        <p>All your orders will be quickly delivered to your location</p>
      </div>
    </div>
    <div class="about-section-content">
      <div class="about-section-image">
        <img src="../assets/images/about-image-background.jpg" alt="">
      </div>
      <div class="about-info">
        <h3>
          We are commited to delivering the best Kasi Flava expreience.
        </h3>
        <p>
          Our goal is to bring the authentic flavors of Kasi cuisine to your table, using traditional recipes and locally sourced ingredients. Whether you're craving a hearty meal or a quick snack, K'Flava has something for everyone. Join us and experience the vibrant tastes of Kasi culture in every bite.
        </p>
      </div>
    </div>
  </section>
  <special-deals />
  <reviews />
</template>

<style scoped>
  .about-section {
    background-color: var(--secondary-background);
    padding-top: 20px;
  }

  .services {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, auto);
    background-color: var(--primary-background);
    padding: 10px;
    border-radius: 5px;
    max-width: 70%;
    margin: 0 auto;

    .service {
      display: grid;
      grid-template-rows: subgrid;
      grid-row: span 3;
      justify-items: center;
      text-align: center;
    }

    .service .icon {
      width: 30px;
      aspect-ratio: 1;
      background-color: var(--primary-color);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      padding: 4px;
      margin-bottom: 10px;
    }

    .service h4 {
      margin: 0;
      font-size: 0.95rem;
    }

    .service p {
      font-size: 0.9rem;
      margin: 0;
    }
  }

  .about-section-content {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    padding: 20px 0;
  }

  .about-section-image {
    border-radius: 5px;
  }

  .about-info {
    padding: 10px 0 100px 60px;
    h3 {
      text-shadow: var(--solid-shadow);
    }
  }

  @media screen and (max-width: 768px) {
    .about-info {
      padding-inline: 15px;
    }
  }

  @media screen and (max-width: 480px) {
    .services {
      max-width: 100%;
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3, auto);
      gap: 15px;
    }

    .about-section-content {
      grid-template-columns: 100%;
    }

    /* about section image order change */
    .about-section-image {
      order: 2;
    }

    .about-info {
      order: 1;
      padding-bottom: 10px;
    }
  }
</style>