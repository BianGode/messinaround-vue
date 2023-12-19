import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import About from "../components/About.vue";
import Login from "../components/Login.vue"
import Register from "../components/Register.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/login", component: Login },
  { path: "/register", component: Register },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // same as `routes: routes`
});

export default router