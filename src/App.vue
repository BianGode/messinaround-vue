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
const admin = ref(false)

const auth = getAuth()
onAuthStateChanged(auth, (user) => {
  if (user) {
    userState.user = user
    if(user.email == 'admin@admin.admin') {
      admin.value = true
    }
  } else {
    console.log('Not signed in');
  }
})

const closeSidebar = () => {
  const sideBar = document.querySelector('.sideBar')
  const backDrop = document.querySelector('.backDrop')

  sideBar.classList.toggle('on')
  sideBar.classList.toggle('off')
  backDrop.classList.toggle('on')
}

const toggleShoppingCart = () => {
  const shoppingcartEl = document.querySelector('.shoppingCart')
  shoppingcartEl.classList.toggle('on')
  shoppingcartEl.classList.toggle('off')
}

const addToShoppingCart = (img, title) => {
  console.log(img, title);
  cartState.products.push({
    img: img,
    title: title
  })
}
const removeFromCart = (index) => {
  const stateProd = cartState.products.splice(index, 1)
  console.log(stateProd);
}

// still todo
// https://trello.com/b/mD6RYfMa/webshop-vue

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
      <RouterLink class="link" to="/about">About</RouterLink>
      <RouterLink class="link" to="/shop">Shop</RouterLink>
      <RouterLink v-if="!userState.user" class="link" to="/login">Login</RouterLink>
      <RouterLink v-if="!userState.user" class="link" to="/register">Register</RouterLink>
    </div>
    <div @click="toggleShoppingCart">
      <font-awesome-icon class="headCart" icon="fa-solid fa-cart-shopping" />
    </div>

  </div>
  <!-- Shopping cart -->
  <div class="shoppingCart off">
    <h3>{{ cartState.products.length }} products</h3>
    <div class="cart-item" v-if="cartState.products.length > 0" v-for="(prod, inx) in cartState.products">
      <img :src="prod.img" alt="">
      <p>{{ prod.title }}</p>
      <font-awesome-icon icon="fa-solid fa-trash" @click="removeFromCart(inx)"/>
    </div>
  </div>

  <!-- sidebar -->
  <div class="sideBar off">
    <h3 @click="closeSidebar">X</h3>
    <div class="sideBarLinks">
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" to="/about">about</RouterLink>
      <RouterLink class="link" to="/shop">Shop</RouterLink>
      <RouterLink v-if="!userState.user" class="link" to="/login">Login</RouterLink>
      <RouterLink v-if="!userState.user" class="link" to="/register">Register</RouterLink>
    </div>
  </div>
  <div class="backDrop"></div>

  <RouterView :addToCart="addToShoppingCart"/>
</template>
<style lang="scss" scoped>
// note to self: create a keyframe for slide in and out sidebar and fix sidebar styling
// fonts
@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;600&display=swap');
@keyframes sidebarExpand {
  from {
    width: 0%;
  }
  to {
    width: 65%;
  }
}
@keyframes sidebarContract {
  from {
    width: 65%;
    display: flex;
  }
  to {
    display: flex;
    width: 0%;
  }
}
// animation
@keyframes expand {
  from { width: 0;}
  to {width: 80%}
}
@keyframes contract {
  to {width: 0%;}
  from { width: 80%;}
}

// set fonts for everyting
* {
  font-family: 'Libre Franklin', sans-serif;
}

.Navigation {
  width: 100%;
  height: 70px;
  background-image: url('./assets/header.jpeg');
  background-size: cover;
  background-position: center;
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
  // display: none;
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  position: absolute;
}
.sideBar.on {
  top: 0;
  left: 0;
  z-index: 10;
  transition: left 0.3s ease-in;
  // animation: sidebarExpand 1s ease-in-out;
  .sideBarLinks {
    display: flex;
    flex-direction: column;
  }
}
.sideBar.off {
  left: -65%;
  transition: left 0.3s ease-in;
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
.shoppingCart {
  position: absolute;
  background-color: rgba(255, 215, 0, 0.8);
  border-radius: 5px;
  width: 80%;
  left: 10%;
  display: flex;
  flex-direction: column;
}
.shoppingCart.on {
  top: 80px;
  transition: top 1s ease-in-out;
  .cart-item {
    display: flex;
    img {
      width: 70px;
    }
  }

}

.shoppingCart.off {
  // display: none;
  // width: 0;
  position: absolute;
  top: -80px;
  transition: top 1s ease-in-out;
  // animation: contract 0.5s linear;
}
</style>
