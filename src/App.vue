<!-- Important: This design is created mobile-first -->

<script setup>
import { computed, reactive, ref } from 'vue';
import { RouterLink, RouterView } from "vue-router"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { shortMessageChange, closeSidebar, toggleShoppingCart } from './functions';
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

const addToShoppingCart = (image, title, price) => {
  console.log(image);
  cartState.products.push({
    image: image,
    title: title,
    price: price
  })
}

const removeFromCart = (index) => {
  const stateProd = cartState.products.splice(index, 1)
  console.log(stateProd);
}

const handleSignOut = () => {
  shortMessageChange('Signed out succesfully')

  signOut(auth).then(() => {
    userState.user = null
  }).catch((err) => {
    console.log(err);
  })
}

</script>
<template>
  <div class="mainWrap">
    <div></div>
    <!-- main navbar -->
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
        <RouterLink class="link" to="/admin">Admin</RouterLink>
        <RouterLink v-if="!userState.user" class="link" to="/login">Login</RouterLink>
        <RouterLink v-if="!userState.user" class="link" to="/register">Register</RouterLink>
      </div>
      <div class="shopAndUserIconWrap">
        <div class="cartWrap">
          <font-awesome-icon @click="toggleShoppingCart" class="headCart" icon="fa-solid fa-cart-shopping" />
          <div class="countCart" v-if="cartState.products.length <= 9">{{ cartState.products.length }}</div>
          <div class="countCart" v-if="cartState.products.length > 9">9+</div>
        </div>
        <RouterLink v-if="userState.user" to="/profile/orders"><font-awesome-icon class="headProfile" icon="fa-solid fa-user" />
        </RouterLink>
      </div>
    </div>

    <div class="shortMessage">
      <p class="message"></p>
    </div>

    <!-- Shopping cart -->
    <div class="shoppingCart off">
      <p class="cartProdCounter"><b>{{ cartState.products.length }} </b>products</p>
      <div class="cart-item" v-if="cartState.products.length > 0" v-for="(prod, inx) in cartState.products.slice(0, 5)">
        <div class="imgProdWrap">
          <img :src="prod.image" alt="">
          <div>
            <p>{{ prod.title }}</p>
            <p>{{ prod.price }}</p>
          </div>
        </div>
        <font-awesome-icon icon="fa-solid fa-trash" @click="removeFromCart(inx)" />
      </div>
      <div class="orderViewAllWrap">
        <RouterLink class="cartOrderLink" to="/orderPage">Order<p>View All</p>
        </RouterLink>
      </div>
    </div>

    <!-- sidebar -->
    <div class="sideBar off">
      <font-awesome-icon class="xMark" @click="closeSidebar" icon="fa-solid fa-xmark" />
      <div class="sideBarLinks">
        <RouterLink class="link" to="/">Home</RouterLink>
        <RouterLink class="link" to="/about">about</RouterLink>
        <RouterLink class="link" to="/shop">Shop</RouterLink>
        <RouterLink v-if="!userState.user" class="link" to="/register">Register</RouterLink>
        <RouterLink v-if="!userState.user" class="link" to="/login">Login</RouterLink>
        <button v-if="userState.user" @click="handleSignOut()">Logout</button>
      </div>
    </div>
    <div class="backDrop"></div>

    <!-- the view all the pages are being rendered -->
    <RouterView v-if="userState.user" :addToCart="addToShoppingCart" :products="cartState.products"
      :user="userState.user.email" />
    <RouterView v-else :addToCart="addToShoppingCart" :products="cartState.products"
      :shortMessageChange="shortMessageChange" />
  </div>
  <footer>
    <div class="footerInfo">
      <div class="phoneWrap">
        <font-awesome-icon icon="fa-solid fa-phone" />
      </div>
      <p>06 xxxxxxxx</p>
      <div class="envelopeWrap">
        <font-awesome-icon icon="fa-solid fa-envelope" />
      </div>
      <p>webshop@contact.info</p>
    </div>
  </footer>
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
  from {
    width: 0;
  }

  to {
    width: 80%
  }
}

@keyframes contract {
  to {
    width: 0%;
  }

  from {
    width: 80%;
  }
}

// set fonts for everyting
* {
  font-family: 'Libre Franklin', sans-serif;
}

.mainWrap {
  // padding-bottom: 100px;
  // min-height: 100vh;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
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

  .shopAndUserIconWrap {
    display: flex;
    gap: 1rem;
    padding-right: 5px;
    align-items: center;

    .cartWrap {
      display: flex;

      .countCart {
        position: relative;
        top: -10px;
        // top: -25px;
        // left: 1rem;
        font-size: 10px;
        padding: 3px;
        background-color: #006457;
        border-radius: 15px;
        text-align: center;
      }
    }
    .headProfile {
      color: black;
    } 
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
  z-index: 10;
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  background-color: white;
  position: absolute;
  padding: 2rem 1rem;

  .xMark {
    padding-bottom: 1rem;
  }

  .sideBarLinks {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    a {
      color: #8C7404;
      text-decoration: none;
    }
    button {
      background-color: white;
      border: 2px solid rgb(25, 68, 25);
      border-radius: 5px;
      color: rgb(25, 68, 25);
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      padding: 5px 10px;
      transition: all 0.2s ease;
      font-weight: 700;
    }
    button:hover {
      transform: scale(1.1);
      background-color: rgb(25, 68, 25);
      color: white;
      transition: all 0.2s ease;
    }
  }
}

.sideBar.on {
  top: 0;
  left: 0;
  transition: left 0.2s ease-in;
  // animation: sidebarExpand 1s ease-in-out;
}

.sideBar.off {
  transition: left 0.2s ease-in;
  left: -65%;
}

// style for alert 
.shortMessage {
  width: 80%;
  display: block;
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  background-color: rgba(161, 161, 62, 0.78);
  border-radius: 5px;
  border: 3px solid rgba(118, 118, 66, 0.7);
  // margin: 0 auto;
}

.shortMessage.on {
  top: 80px;
  height: 50px;
  transition: all 0.2s ease-in-out;
}

.shortMessage.off {
  // display: none;
  top: -80px;
  height: 0;
  transition: all 0.2s ease-in-out;
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
  border-radius: 5px;
  width: 80%;
  left: 10%;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: rgba(0, 87, 82, 0.9);

  .cartProdCounter {
    color: #f3bf01;
  }

  .cart-item {
    display: flex;
    justify-content: space-between;

    .imgProdWrap {
      display: flex;

      img {
        width: 70px;
      }

      div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        color: #f3bf01;

        p {
          margin: 0;
          text-align: center;
        }
      }
    }
  }

  .orderViewAllWrap {
    display: flex;
    flex-direction: column;
    background-color: #d7c346;
    width: fit-content;
    align-items: center;
    // gap: 0px;
    margin: 0 auto;
    padding: 10px 15px;

    .cartOrderLink {
      color: black;
      text-decoration: none;
      font-weight: 700;
      font-size: 15px;
      margin: 0 auto;
      border-radius: 5px;
    }

    p {
      margin: 0;
      text-decoration: underline;
      font-size: 10px;
    }
  }
}

.shoppingCart.on {
  top: 80px;
  transition: top 1s ease-in-out;
}

.shoppingCart.off {
  //display: none;
  // width: 0;
  position: absolute;
  top: -100%;
  transition: all 1s ease-in-out;
  // animation: contract 0.5s linear;
}


footer {
  height: 100px;
  // margin-top: auto;
  margin-top: auto;
  background-color: #006457;
  .footerInfo {
    width: 60%;
    display: grid;
    grid-template-columns: auto auto;
    .phoneWrap {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .envelopeWrap {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}</style>
