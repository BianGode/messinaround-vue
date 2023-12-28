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
    <li class="titleLi">{{ props.title }}</li>
    <li>{{ props.description }}</li>
    <li>{{ props.type }}</li>
    <div class="productHover">
      <p>View</p>
      <font-awesome-icon @click="emitShopCart('shop-cart', props.image, props.title)" icon="fa-solid fa-cart-shopping" />
      <!-- <img :src="faCartShopping"  alt="" srcset=""> -->
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

.ProductWrap {

}

.Product {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: darkgoldenrod;

  .productHover {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .titleLi {
    font-weight: 700;
  }

  img {
    width: 100%;
  }

}

li {
  list-style-type: none;
}
</style>