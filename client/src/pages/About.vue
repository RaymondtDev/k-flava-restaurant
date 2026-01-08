<script setup>
  import FAQs from '../components/FAQs.vue';
  import Reviews from '../components/Reviews.vue';

  const teamMembers = [
    { name: "Khutso Shabangu", role: "Owner" },
    { name: "Raymond Phahlamohlaka", role: "Owner" },
    { name: "Samantha Phahlamohlaka", role: "Manager" },
    { name: "Nothando Mnguni", role: "Executive Chef" },
    { name: "France Ngwenya", role: "Junior Chef" }
  ]
</script>

<template>
  <section class="about-hero full-width content-area">
    <div class="about-content">
      <div class="empty"></div>
      <div class="about-info">
        <h1>About Us</h1>
        <p>
          <b style="color: var(--primary-color);">Born in the heart of Vezubuhle, we are a local spot built on kasi flavour, fire, and community. </b><br>
          What started as a small dream - just a wood-fired oven, a braai-stand, and a whole lot of passion and love - has grown into a place where the neighbourhood comes together to eat, laugh, and feel at home.
        </p>
      </div>
    </div>
  </section>

  <section class="our-story full-width content-area">
    <div class="our-story-content">
      <div class="info">
        <h2>Our Story</h2>
        <p>
          Our story began in the heart of Vezubuhle - in a culturally rich community of Ndebele peoples. We always believed food should bring people together, so we set out to create something our community could call its own.<br><br>
          What started with a small wood-fired oven, a hardworking braai stand, and a big dream turned into a place where pizza and South African BBQ meet the true kasi flavour spirit. We experimented, hustled, learned, and slowly the neighbourhood gathered around our fire. <br><br>
          Today we serve flavours inspired by home - simple, bold, and made with heart. And no matter how we grow, we remain rooted in the same belief: <br><br>
          <b style="color: var(--primary-color);">Great food. Great people. Great Ndebele energy.</b>
        </p>
      </div>
      <div class="image">
        <img src="../assets/images/our-story-image.png" alt="" />
      </div>
    </div>
  </section>

  <section class="our-team-section full-width content-area">
    <h2>Our Team</h2>
    <div class="our-team-content">
      <div class="team-member-card" v-for="(member, index) in teamMembers" :key="index">
        <div class="image">
          <img src="../assets/images/placeholder.png" alt="Team memeber profile image">
        </div>
        <div class="member-info">
          <h5>{{ member.name }}</h5>
          <p>{{ member.role }}</p>
        </div>
      </div>
    </div>
  </section>

  <Reviews />

  <section class="faq-section full-width content-area">
    <h2 class="section-title">Frequently Asked Questions</h2>

    <FAQs :faqs="[
        {
          question: 'Do you offer delivery?',
          answer: 'Yes! We deliver within a 15km radius. Delivery fee depends on distance. Free delivery on orders over R300.'
        },
        {
          question: 'Are your burgers halal?',
          answer: 'Yes, all our meat is 100% halal certified.'
        },
        {
          question: 'Can I customize my order?',
          answer: 'Absolutely! You can remove or add ingredients when ordering online or in-store.'
        },
        {
          question: 'What are your opening hours?',
          answer: 'Monday–Thursday: 10:00–22:00\nFriday–Saturday: 10:00–23:00\nSunday: 11:00–21:00'
        },
        {
          question: 'Do you cater for events?',
          answer: 'Yes! We offer catering platters for parties, corporate events, and weddings. Contact us for a quote.'
        }
      ]"
    />
  </section>
</template>

<style scoped>
  .about-hero {
    margin-top: var(--header-height);
    background: url('../assets/images/about-image-background.jpg') no-repeat center center/cover;
    padding: 20px 0 150px 0;
    border-image: linear-gradient(to bottom, rgba(20, 20, 20, 0.2), rgba(20, 20, 20, 0.4)) 1 fill;
  }

  .about-content {
    display: flex;

    .empty {
      width: 50%;
    }

    .about-info {
      width: 50%;
    }

    .about-info h1 {
      text-shadow: var(--solid-shadow);
    }
  }

  .our-story {
    background-color: var(--secondary-background);
  }

  .our-story-content {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    padding: 20px 0;

    .info {
      padding-right: 20px;
    }

    .info h2 {
      text-shadow: var(--solid-shadow);
    }

    .image {
      border-radius: 5px;
    }
  }

  .our-team-section {
    background-color: var(--primary-background);
    padding-block: 15px;

    h2 {
      text-shadow: var(--solid-shadow);
      text-align: center;
    }
  }

  .our-team-content {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;

    .team-member-card {
      width: 150px;
      max-width: 150px;
      display: grid;
      grid-template-rows: 150px 1fr auto;
    }

    .template-member-card .image {
      height: 150px;
      max-height: 150px;
    }

    .team-member-card .image img {
      object-fit: contain;
    }

    .team-member-card .member-info {
      grid-row: span 2;
      display: grid;
      grid-template-rows: subgrid;
      text-align: center;

      p {
        padding: 0;
        margin: 0;
      }
    }
  }

  .faq-section {
    background-color: var(--primary-background);
    padding-block: 15px;
    border-bottom: 2px solid var(--secondary-background);

    .section-title {
      text-shadow: var(--solid-shadow);
    }
  }

  @media screen and (max-width: 425px) {
    .about-content .empty {
      display: none;
    }

    .about-content .about-info {
      width: 100%;
      text-align: center;
    }

    .our-story-content {
      grid-template-columns: 1fr;
    }
  }
</style>