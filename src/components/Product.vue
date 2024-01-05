<script setup>
import { reactive, watch } from 'vue';
import { RouterLink } from 'vue-router';
const props = defineProps({
  id: Number,
  image: String,
  title: String,
  description: String,
  type: String,
  addToCart: Boolean | Function,
  price: Number
})

const emitShopCart = defineEmits(['shop-cart'])


</script>
<!-- TODO =  Add product to card -->
<template>
  <div class="Product">
    <img :src="props.image" alt="" srcset="">
    <li class="titleLi">{{ props.title }}</li>
    <li>{{ props.description }}</li>
    <li>{{ props.type }}</li>
    <li>${{ props.price }}</li>
    <!-- <li>{{ props.price }}</li> -->
    <div class="productHover">
      <RouterLink :to="'product/' + props.title">View</RouterLink>
      <font-awesome-icon class="add-cart" @click="props.addToCart(props.image, props.title)" icon="fa-solid fa-cart-shopping" />
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
// Keyframe for the onlcik 
@keyframes enlarge {
  0% {
    transform: scale(1.0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1.0);
  }
}
.Product {
  display: grid;
  height: 100%;
  
  .titleLi {
    font-weight: 700;
  }
  img {
    width: 300px;
    margin: 0 auto;

  }
  .productHover {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .add-cart {
      animation: enlarge 0.5s linear;
    }
  }
}

li {
  list-style-type: none;
}
</style>