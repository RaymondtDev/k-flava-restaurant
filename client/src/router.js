import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Menu from "./pages/Menu.vue";
import About from "./pages/About.vue";
import Contact from "./pages/Contact.vue";

const routes = [
  { path: '/', component: Home },
  { path: '/menu', component: Menu },
  { path: '/about', component: About},
  { path: '/contact', component: Contact }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;