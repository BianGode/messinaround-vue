import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/pages/Home.vue";
import About from "../components/pages/About.vue";
import Login from "../components/pages/Login.vue"
import Register from "../components/pages/Register.vue"
import Shop from "../components/pages/Shop.vue"
import ProductPageVue from "../components/ProductPage.vue";
import Order from "../components/pages/Order.vue"
import Admin from "../components/pages/AdminDash.vue"
import Profile from "../components/pages/Profile.vue"
import Orders from "../components/pages/Orders.vue"
import Settings from "../components/pages/Settings.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: '/shop', component: Shop },
  { path: '/product/:title', component: ProductPageVue,},
  { path: '/orderPage', component: Order},
  { path:'/admin', component: Admin},
  { 
    path: '/profile',
     component: Profile,
      children: [
        {
          path: "orders",
          component: Orders
      },
      {
        path: "settings",
        component: Settings
      }
    ]
    }
  // user dynamic route matching
  // { path: '/users/:id', component: User },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // same as `routes: routes`
});

export default router