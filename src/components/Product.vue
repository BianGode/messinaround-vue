<script setup>
import { reactive, watch } from 'vue';
const props = defineProps({
  image: String,
  title: String,
  description: String,
  type: String,
})

const emitShopCart = defineEmits(['shop-cart'])

watch(props.image, () => {
  console.log(props.image);
})

</script>
<!-- TODO =  Add product to card -->
<template>
  <div class="Product">
    <img :src="props.image" alt="" srcset="">
    <li>{{ props.title }}</li>
    <li>{{ props.description }}</li>
    <li>{{ props.type }}</li>
    <div class="productHover">
      <p>View</p>
      <font-awesome-icon icon="fa-solid fa-cart-shopping" />
      <img :src="faCartShopping" @click="emitShopCart('shop-cart',props.image, props.title)" alt="" srcset="">
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media only screen and (min-width: 900px) {
  .productHover:hover {
    display: flex;
    width: 100%;
    height: 100%;
  }
}
.Product {
  background-color: darkgoldenrod;
  img {
    width: 100%;
  }
  li {
  }
  
}
li {
  list-style-type: none;
}
</style>