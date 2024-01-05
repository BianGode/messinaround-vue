import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/pages/Home.vue";
import About from "../components/pages/About.vue";
import Login from "../components/pages/Login.vue"
import Register from "../components/pages/Register.vue"
import Shop from "../components/pages/Shop.vue"
import ProductPageVue from "../components/ProductPage.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: '/shop', component: Shop },
  { path: '/product/:title', component: ProductPageVue,}
  // user dynamic route matching
  // { path: '/users/:id', component: User },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // same as `routes: routes`
});

export default router