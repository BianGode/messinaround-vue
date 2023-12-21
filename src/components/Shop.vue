<script setup>
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getProductsWithImage, getStorageImages } from '../firebase';
import Product from './Product.vue';
import { reactive, ref, toRaw } from 'vue';
import { getStorage } from 'firebase/storage';

const auth = getAuth()
const products = ref([])

const asyncGetter = async () => {
  await getProductsWithImage().then((req) => {
  products.value.push(...req)
})
}
asyncGetter()
</script>
<template>
  <div class="shopWrap">
    <h1>Shop</h1>
    <div class="shop">
      <li v-if="products" v-for="(product, index) in products">
        <Product :image="product.image" :description="product.description" :title="product.title"
          :type="product.type" />
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