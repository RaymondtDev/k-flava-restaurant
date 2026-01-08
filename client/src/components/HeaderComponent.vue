<script setup>
  import { onMounted, onUnmounted, ref } from 'vue';

  const isOpen = ref(false);
  const headerRef = ref(null);

  const displayMenu = () => {
    isOpen.value = !isOpen.value
  }

  const updateHeight = () => {
    const headerHeight = headerRef.value.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  }

  onMounted(() => {
    updateHeight();
    // add css variable for header height, adjust for change in viewport size
    window.addEventListener('resize', updateHeight);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateHeight);
  })
</script>

<template>
  <header class="full-width content-area" ref="headerRef">
    <div class="header-content">
      <router-link to="/">
        <div class="logo">
          <img src="../assets/KFlava-logo.png" alt="KFlava logo" width="50px" height="50px" class="logo-image" />
          <h1>K'Flava</h1>
        </div>
      </router-link>

      <nav id="nav-links" :class="{ open: isOpen }">
        <ul>
          <li @click="displayMenu()"><router-link to="/menu">Menu</router-link></li>
          <li @click="displayMenu()"><router-link to="/about">About</router-link></li>
          <li class="cta-button" @click="displayMenu()"><router-link to="/contact">Contact</router-link></li>
        </ul>
      </nav>

      <div class="hamburger" @click="displayMenu()">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </header>
</template>

<style scoped>
  header {
    background-color: var(--primary-background);
    position: fixed;
    width: 100%;
    top: 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.473);
    z-index: 3;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;

    h1 {
      margin: 0;
      color: var(--primary-color);
      text-shadow: var(--soft-shadow);
    }
  }

  nav ul {
    list-style: none;
    display: flex;

    li {
      padding: 10px 15px;
    }

    li a:not(.cta-button a):hover {
      color: var(--primary-color);
    }
  }

  .hamburger {
    width: 40px;
    aspect-ratio: 1;
    display: none;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;

    span {
      width: 80%;
      height: 3px;
      background-color: var(--primary-color);
      border-radius: 10px;
    }
  }

  @media screen and (max-width: 768px) {
    .header-content nav {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: var(--nav-background);
      backdrop-filter: blur(10px) saturate(150%);
      overflow: hidden;
      z-index: 2;
      width: 50vw;
      height: 100svh;
      transform: translateX(100%);
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .header-content nav.open {
      transform: translateX(0);
      opacity: 1;
    }

    .header-content nav ul {
      flex-direction: column;
      margin: 0;
      padding: 10px;
      text-align: center;
    }

    .hamburger {
      display: flex;
    }
  }

  @media screen and (max-width: 425px) {
    .header-content nav {
      width: 85vw;
    }
  }
</style>