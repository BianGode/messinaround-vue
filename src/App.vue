<script setup>
import { computed, reactive, ref } from 'vue';
import { RouterLink, RouterView } from "vue-router"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const active = reactive({
  active: '',
})
const userState = reactive({
  user: null,
})
const cartState = reactive({
  products: []
})
const auth = getAuth()
onAuthStateChanged(auth, (user) => {
  if (user) {
    userState.user = user
  } else {
    console.log('Not signed in');
  }
})

const closeSidebar = () => {
  const sideBar = document.querySelector('.sideBar')
  const backDrop = document.querySelector('.backDrop')

  sideBar.classList.toggle('on')
  backDrop.classList.toggle('on')
}

const toggleShoppingCart = () => {
  const shoppingcartEl = document.querySelector('.shoppingCart')
  shoppingcartEl.classList.toggle('on')
}

const addToShoppingCart = (img, title) => {
  console.log(img, title);
  cartState.products.push({
    img: img,
    title: title
  })
}
const removeFromCart = (index) => {
  cartState.products.splice(index)
}
</script>
<template>
  <div></div>
  <div class="Navigation">
    <div class="hamburger" @click="closeSidebar">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </div>
    <h1>Logo</h1>
    <div class="links">
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" to="/about">about</RouterLink>
      <RouterLink v-if="!userState.user" class="link" to="/login">Login</RouterLink>
      <RouterLink v-if="!userState.user" class="link" to="/register">Register</RouterLink>
    </div>
    <div @click="toggleShoppingCart">
      <font-awesome-icon class="headCart" icon="fa-solid fa-cart-shopping" />
    </div>

  </div>
  <!-- Shopping cart -->
  <div class="shoppingCart">
    <h3>X products</h3>
    <div class="cart-item" v-if="cartState.products.length > 0" v-for="(prod, inx) in cartState.products">
      <img :src="prod.img" alt="">
      <p>{{ prod.title }}</p>
      <font-awesome-icon icon="fa-solid fa-trash" @click="removeFromCart(inx)"/>
    </div>
  </div>

  <!-- sidebar -->
  <div class="sideBar">
    <h3 @click="closeSidebar">X</h3>
    <div class="sideBarLinks">
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" to="/about">about</RouterLink>
      <RouterLink v-if="!userState.user" class="link" to="/login">Login</RouterLink>
      <RouterLink v-if="!userState.user" class="link" to="/register">Register</RouterLink>
    </div>
  </div>
  <div class="backDrop"></div>

  <RouterView @shop-cart="addToShoppingCart" />
</template>
<style lang="scss" scoped>
.Navigation {
  width: 100%;
  height: 70px;
  background-image: url('./assets/header.jpeg');
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  .hamburger {
    height: 20px;
    width: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .line {
      display: block;
      width: 100%;
      height: 2px;
      background-color: black;
    }

  }

  .link {
    display: none;
  }
}

.backDrop.on {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background-color: rgba(43, 48, 9, 0.5);
}

.sideBar {
  display: none;
}

.sideBar.on {
  position: absolute;
  top: 0;
  left: 0;
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 10;

  .sideBarLinks {
    display: flex;
    flex-direction: column;
  }
}

// mediaQueries for desktop
@media screen and (min-width: 900px) {
  .Navigation {
    .hamburger {
      display: none;
    }

    .links {
      display: flex;
      gap: 1rem;

      .link {
        display: block;
        text-decoration: none;
        color: white;
        padding: 5px 10px;
        background-color: rgba(0, 0, 0, 0.4);
      }
    }
  }
}

//shoppingCart style
.shoppingCart.on {
  display: flex;
  width: 80%;
  flex-direction: column;
  position: absolute;
  background-color: aquamarine;
  top: 80px;
  left: 10%;
  .cart-item {
    display: flex;
    img {
      width: 70px;
    }
  }

}

.shoppingCart {
  display: none;
}
</style>
