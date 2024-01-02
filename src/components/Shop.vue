<script setup>
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getProducts } from '../firebase';
import Product from './Product.vue';
import { reactive, toRaw, watch, watchEffect } from 'vue';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';


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
  }).then(() => {
    products.list.forEach((el, inx) => {
      const storage = getStorage()
      getDownloadURL(ref(storage, 'products/' + el.image))
        .then((url) => {
          products.list[inx].image = url
        })
    })
  })
  .catch((err) => {
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
          <Product :image="product.image" :description="product.description" :title="product.title" :type="product.type"
            :addToCart="props.addToCart" />
          <!-- @click="emitShopCart('shop-cart', product.image, product.title)" -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.productWrap {
  text-align: center;
}

@media only screen and (min-width: 900px) {
  .row-one {
    display: grid;
    width: fit-content;
    margin: 0 auto;
    grid-template-columns: 50% 50%;

    .productWrap {
      width: 100%;
      // height: 500px;
      text-align: center;
      border: 1px solid black;
      border-radius: 10px;

      img {
        width: 300px;
        margin: 0 auto;
      }
    }

    // 1st product oragne second white for contast
  }

}
</style>