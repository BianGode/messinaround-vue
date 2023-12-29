<script setup>
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getProducts } from '../firebase';
import Product from './Product.vue';
import { reactive, ref, toRaw, watch, watchEffect } from 'vue';
import { getStorage } from 'firebase/storage';

const products = reactive({
  list: []
})
const images = reactive({
  list: []
})

const props = defineProps({
    addToCart: Boolean | Function,
});

const asyncGetter = async () => {
  await getProducts().then((res) => {
    products.list.push(...res)
  }).catch((err) => {
    console.log(err);
  })
}
asyncGetter()
const emitShopCart = defineEmits(['shop-cart'])

</script>
<template>
  <div class="shopWrap">
    <h1>Shop</h1>
    <div class="shop">
      <div class="row-one">
        <!-- TODO = Render the correct data and clean css -->
        <div class="productWrap" v-for="(product, index) in products.list">
          <Product :image="product.image" :description="product.description" :title="product.title"
            :type="product.type" :addToCart="props.addToCart"/>
            <!-- @click="emitShopCart('shop-cart', product.image, product.title)" -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
 @media only screen and (min-width: 600px) {
    .row-one {
      display: flex;
      width: 100%;
      justify-content: space-evenly;
      .productWrap {
        width: 20%;
        height: 500px;
      }
    }
}
h1 {
  color: black;
}
</style>