<template>
  <footer class="full-width content-area">
    <div class="footer-content">
      <div class="logo">
        <img src="../assets/KFlava-logo.png" alt="KFlava logo" >
        <h4>K'Flava</h4>
      </div>
      <div class="quick-links">
        <h4>Quick Links</h4>
        <div class="links">
          <router-link to="/">Home</router-link>
          <router-link to="/menu">Menu</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/contact">Contact</router-link>
        </div>
      </div>
      <div class="location">
        <h4>Find Us</h4>
        <div class="location-info">
          <p>Phola Mall</p>
          <p>Entrance 2 - Shop 8</p>
          <p>KwaMhlanga 1022</p>
          <p>Mpumalanga</p>
        </div>
      </div>
      <div class="contact">
        <h4>Contact Us</h4>
        <div class="contact-info">
          <p>Email: <span>kflava@gmail.com</span></p>
          <p>Phone: <span>066 133 1990</span></p>
        </div>
      </div>
    </div>
    <div class="social-media">
      <div class="icons">
        <a href="http://wa.me/+27661331990/" target="blank">
          <div class="icon">
            <img src="../assets/icons/whatsapp-icon.svg" alt="Whatsapp Icon">
          </div>
        </a>
        <a href="http://facebook.com/" target="blank">
          <div class="icon">
            <img src="../assets/icons/facebook-icon.svg" alt="Facebook Icon">
          </div>
        </a>
        <a href="http://instagram.com/" target="blank">
          <div class="icon">
            <img src="../assets/icons/instagram-icon.svg" alt="Instagram Icon">
          </div>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  footer {
    background-color: var(--primary-background);
    padding-block: 20px;

    .footer-content {
      display: flex;
      justify-content: space-between;
    }

    .logo {
      width: 100px;
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .logo img {
      aspect-ratio: 1;
    }

    .quick-links .links {
      display: flex;
      flex-direction: column;
    }

    .quick-links .links a:hover {
      color: var(--primary-color);
    }

    p {
      padding: 0;
      margin: 0;
      font-size: 1rem;
    }

    p span {
      color: var(--primary-color);
    }

    .social-media {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .icons {
      display: flex;
      gap: 10px;
    }

    .icons .icon {
      width: 30px;
      aspect-ratio: 1;
      background-color: var(--primary-color);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      padding: 4px;
    }
  }

  @media screen and (max-width: 425px) {
    .footer-content {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
</style>