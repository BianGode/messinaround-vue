<script setup>
import { getAuth } from "firebase/auth";
import { RouterLink, RouterView } from "vue-router"
import { addOrder } from '../../firebase'
import { checkSideBarFun, toggleShoppingCart } from '../../functions'
import router from '../../router/index'
import { onMounted } from "vue";
const props = defineProps({
  products: Array,
  user: String
})
const auth = getAuth()

const handleOrder = () => {
  let productData = {
    productIDs: [],
    prices: [],
    fullPrice: 0
  }
  props.products.forEach((prod) => {
    productData.productIDs.push(prod.title)
    productData.fullPrice += prod.price
    console.log(productData.fullPrice);
  })


  // for(let i; i < productData.prices.length; i++) {
  //   productData.fullPrice += productData.prices[i]
  // }

  addOrder(productData).then(() => {
    console.log('Added succesfully');
    router.push("/profile/orders")
  }).catch((err) => {
    console.log(err);
  })
}

onMounted(() => {
  checkSideBarFun()
  toggleShoppingCart()
  // addOrder()
})
</script>
<template>
  <div class="orderPageWrap">
    <p>Products about to order:</p>
    <div v-if="props.products.length > 0" class="orderProductsWrap">
      <div class="orderProduct" v-for="prod in products">
        <img :src="prod.image" alt="">
        <h3>{{ prod.title }}</h3>
        <p>{{ prod.price }}</p>
        <font-awesome-icon> <!-- Delete--> </font-awesome-icon>
      </div>
    </div>
    <div class="cartEmpty" v-else>
      <p>Cart is empty</p>
      <RouterLink class="cartEmptyBtn" to="/shop">Go to Shop!</RouterLink>
      <RouterLink v-if="props.user" class="cartEmptyBtn" to="/login">Or Login</RouterLink>
    </div>
    <button @click="handleOrder" v-if="auth.currentUser && props.products.length > 0">Order</button>
    <!-- <button v-else>
      <RouterLink to="/login">Can't order yet, First Login</RouterLink>
    </button> -->
  </div>
</template>
<style lang="scss" scoped>
.orderPageWrap {
  padding: 10px;

  .orderProductsWrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .orderProduct {
      display: flex;
      text-align: center;
      width: 100%;

      img {
        height: 60px;
      }

      p {
        margin-left: auto;
      }
    }
  }

  .cartEmpty {
    .cartEmptyBtn {
      background-color:rgb(130, 203, 135);
      padding: 5px 10px;
      border-radius: 5px;
    }
    p, a {
      color: black;
      text-decoration: none;
    }
  }
}</style>