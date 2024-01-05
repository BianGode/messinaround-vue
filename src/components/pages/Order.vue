<!-- page to view all the products in cart and where you can proceed to fake checkout -->
<!-- things todo here js wise -->
<!-- add order to database -->
<!-- then redirect to profile or shop -->
<!-- show order in profile page -->
<script setup>
const props = defineProps({
  products: Array
})
</script>
<template>
  <p>Products in shoppingcart</p>
  <div class="OrderProductsWrap">
    <!-- BUSY with styling and templating the order page -->
    <div class="" v-for="prod in products">
      <img :src="prod.image" alt="">
      <h3>{{ prod.title }}</h3>
      <p>{{ prod.price }}</p>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>