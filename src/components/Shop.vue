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

const asyncGetter = async () => {
  await getProducts().then((res) => {
    products.list.push(...res)
  }).catch((err) => {
    console.log(err);
  })
}
asyncGetter()





</script>
<template>
  <div class="shopWrap">
    <h1>Shop</h1>
    <div class="shop">
      <li v-for="(product, index) in products.list">
        <Product :image="product.image" :description="product.description" :title="product.title" :type="product.type" />
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