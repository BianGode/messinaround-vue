<!-- page to view all the products in cart and where you can proceed to fake checkout -->
<!-- things todo here js wise -->
<!-- add order to database -->
<!-- then redirect to profile or shop -->
<!-- show order in profile page -->
<script setup>
import { getAuth } from "firebase/auth";
import { RouterLink, RouterView } from "vue-router"
import { addOrder } from '../../firebase'

const props = defineProps({
  products: Array
})
const auth = getAuth()

const handleOrder = () => {
  let productIDs = []
  props.products.forEach((prod) => {
    productIDs.push(prod.title)
  })

  addOrder(productIDs).then(() => {
    console.log('Added succesfully');
  }).catch((err) => {
    console.log(err);
  })
}

</script>
<template>
  <div class="orderPageWrap">
    <p>Products about to order:</p>
    <div v-if="props.products.length > 0" class="orderProductsWrap">
      <!-- BUSY with styling and templating the order page -->
      <!-- look at top of page -->
      <div class="orderProduct" v-for="prod in products">
        <img :src="prod.image" alt="">
        <h3>{{ prod.title }}</h3>
        <p>{{ prod.price }}</p>
      </div>
    </div>
    <div v-else>
      <p>Cart is empty</p>
      <RouterLink class="" to="/shop">Go to Shop!</RouterLink>
    </div>
    <button @click="handleOrder" v-if="auth.currentUser && props.products.length > 0">Order</button>
    <button v-else><RouterLink to="/login">Can't order yet, First Login</RouterLink></button>
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
}
</style>