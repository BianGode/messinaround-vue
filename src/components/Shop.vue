<script setup>
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getProducts, getStorageImages } from '../firebase';
import Product from './Product.vue';
import { reactive, ref, toRaw, watchEffect } from 'vue';
import { getStorage } from 'firebase/storage';

const products = reactive({
  list: []
})
const images = reactive({
  list: []
})

// const asyncGetter = async () => {
//   let tempArr = []
//   await getProductsWithImage().then((req, res) => {
//     products.push(...req)
//   }).catch((err) => {
//     console.log(err);
//   })
// }
// asyncGetter()
getProducts().then((res) => {
  products.list.push(...res)

}).catch((err) => {
  console.log(err);
})


getStorageImages(products.list).then((res) => {
  images.list.push(...res)
}).catch((err) => {
  console.log(err);
})


</script>
<template>
  <div class="shopWrap">
    <h1>Shop</h1>
    <div v-if="images.list.length > 0" class="shop">
      <li v-for="(product, index) in products.list">
        <Product :image="images.list[index]" :description="product.description" :title="product.title" :type="product.type" />
      </li>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  color: black;
}

.shopWrap {
  display: flex;
}
</style>