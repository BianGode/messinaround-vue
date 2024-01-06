<!-- page to get all the orders from this person -->
<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getOrders, getOrdersProducts } from '../../firebase'
import { reactive } from 'vue';

const orders = reactive([

])

onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    getOrders().then((res) => {
      console.log(res);
      getOrdersProducts(res).then((finalResult) => {
        console.log(finalResult);
      })
    })

  } else {
    console.log('not logged in yet');
  }
})
</script>
<template>
  <div class="accountOrders">
    <h1>orders</h1>
  </div>
</template>

<style lang="scss" scoped>

</style>