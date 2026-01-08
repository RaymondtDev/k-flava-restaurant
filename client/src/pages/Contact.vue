<script setup>
  import { ref } from 'vue';

  const fullName = ref('');
  const surname = ref('');
  const email = ref('');
  const phoneNumber = ref('');
  const message = ref('');

  const loading = ref(false);
  const success = ref(false);
  const error = ref('');

  const submitData = async () => {
    const data = {
      name: fullName.value.trim(),
      surname: surname.value.trim(),
      email: email.value.trim(),
      number: phoneNumber.value.trim(),
      message: message.value.trim()
    }

    loading.value = true;
    error.value = '';
    success.value = false;

    // console.log(data)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        success.value = true;
        fullName.value = '';
        surname.value = '';
        email.value = '';
        phoneNumber.value = '';
        message.value = '';
      } else {
        error.value = 'Failed to send message. Try again.';
      }
    } catch (error) {
      error.value = 'Network error. Check your internet connection.';
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <section class="contact-hero full-width content-area">
    <h1>Contact Us</h1>
    <p>Feel free to hit us up for any equiries you may have, or to place an order. We're looking forward to hearing from you!</p>
  </section>
  <section class="contact-info-section full-width content-area">
    <div class="contact-info-container">
      <div class="contact-info">
        <h2>
          Ready To Talk To Us?<br>
          Send Us A <span>Hello!</span>
        </h2>
        <div class="contact-links">
          <p>Email: <a href="mailto:kflava@gmail.com">kflava@gmail.com</a></p>
          <p>WhatsApp / Phone: <a href="https://wa.me/+27661331990">066 133 1990</a></p>
          <p>Facebook: <a href="hhtps://facebook.com">@kflava-page</a></p>
          <p>Email: <a href="https://instagram.com">@kasi_flava</a></p>
        </div>
      </div>
      <div class="contact-form">
        <form @submit.prevent="submitData">
          <p v-if="success" style="color: var(--primary-color); text-align: center;">Thank you! We'll get back to you very soon.</p>
          <p v-if="error" style="color: red; text-align: center;">{{ error }}</p>
          <div class="full-names">
            <input type="text" name="name" id="name" v-model="fullName" placeholder="Enter Your Name" required>
            <input type="text" name="surname" id="surname" v-model="surname" placeholder="Enter Your Surname" required>
          </div>
          <input type="text" name="email" id="email" v-model="email" placeholder="Enter Your Email" required>
          <input type="tel" name="phone-number" id="phone-number" v-model="phoneNumber" placeholder="e.g. 071 234 5678" required>
          <textarea name="message" id="message" v-model="message" placeholder="Enter Your Message" required></textarea>

          <button type="submit" class="cta-button" :disabled="loading">
            {{ loading ? 'Sending...' : 'Send Message' }}
          </button>
        </form>
      </div>
    </div>
  </section>
  <section class="map full-width">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.0571326350946!2d28.768353988854976!3d-25.40289809999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ec00f2de792c28d%3A0x727d34b6166dc123!2sPhola%20Mall!5e0!3m2!1sen!2sza!4v1764355565001!5m2!1sen!2sza" width="100%" height="500" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </section>
</template>

<style scoped>
  .contact-hero {
    margin-top: var(--header-height);
    background: url('../assets/images/contact-background.jpg') no-repeat center center/cover;
    border-image: linear-gradient(to bottom, rgba(20, 20, 20, 0.4), rgba(20, 20, 20, 0.8)) 1 fill;
    z-index: 1;
    position: relative;
    padding: 40px 0 80px 0;
    text-align: center;

    h1 {
      text-shadow: var(--solid-shadow);
    }

    p {
      width: clamp(300px, 60%, 600px);
      margin: 0 auto;
    }
  }

  .contact-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    backdrop-filter: blur(5px) saturate(150%);
    z-index: -1;
  }

  .contact-info-section {
    background-color: var(--primary-background);
    padding-block: 50px;
  }

  .contact-info-container {
    display: grid;
    grid-template-columns: repeat(2, 50%);
  }

  .contact-info {
    h2 {
      margin: 0;
      padding: 0;
      text-shadow: var(--solid-shadow);

      span {
        color: var(--secondary-color);
      }
    }

    .contact-links {
      margin-top: 30px;
    }

    .contact-links p {
      margin: 0;
      padding: 0;
    }

    .contact-links p a {
      color: var(--primary-color);
    }
  }

  .contact-form form {
    background-color: var(--secondary-background);
    padding: 10px;
    border-radius: 5px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

    .full-names {
      display: flex;
      column-gap: 10px;
    }

    input, textarea {
      width: 100%;
      font-weight: 1.2rem;
      padding: 15px 10px;
      background-color: var(--tertiary-background);
      border-radius: 5px;
      border: none;
      margin-block: 5px;
      font-family: var(--font-secondary);
      color: var(--text-color);
    }

    input:focus, textarea:focus {
      outline-color: var(--primary-color);
    }

    input::placeholder, textarea::placeholder {
      color: var(--input-placeholder-text-color);
    }

    .cta-button {
      background-color: var(--primary-color);
      border-radius: 0px;
      cursor: pointer;
      font-weight: bold;
      text-transform: uppercase;
      width: 100%;
      padding-block: 15px;
    }

    .cta-button:hover {
      scale: 1.02;
    }
  }

  @media screen and (max-width: 768px) {
    .contact-form form .full-names {
      flex-direction: column;
    }
  }

  @media screen and (max-width: 425px) {
    .contact-info-container {
      grid-template-columns: 1fr;
    }

    .contact-info {
      padding-bottom: 50px;
    }
  }
</style>