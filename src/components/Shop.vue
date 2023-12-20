<script setup>
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getProducts, getStorageImages } from '../firebase';
import Product from './Product.vue';
import { reactive, ref } from 'vue';
import { getStorage } from 'firebase/storage';
const auth = getAuth()
const test = reactive({
  products: [],
  images: []
})
getProducts().then((data) => {
  console.log(data);
  test.products = [...data]
  getStorageImages(test.products).then((img) => {
    test.images = [...img]
})
})
</script>
<template>
  <div class="shopWrap">
    <h1>Shop</h1>
    <div class="shop">
      <li v-for="(product, index) in test.products">
        <Product :image="images.image[index]" :description="product.description" :title="product.title" :type="product.type" />
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