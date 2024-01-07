<script setup>
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getProducts, getSpeakers, getMonitors } from '../../firebase';
import Product from '../Product.vue';
import ProductPage from '../ProductPage.vue';
import { reactive, onMounted, toRaw, watch, watchEffect} from 'vue';
import {ref as reference} from 'vue' 
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { checkSideBarFun } from '../../functions';

const products = reactive({
  list: []
})
const sort = reference('monitors')
const props = defineProps({
  addToCart: Boolean | Function,
});

// function to get the all the products with the images from firebase.js file
const asyncGetter = async () => {
  if (sort.value == 'monitors') {
    await getMonitors().then((res) => {
      products.list.push(...res)
    }).then(() => {
      products.list.forEach((el, inx) => {
        const storage = getStorage()
        getDownloadURL(ref(storage, 'products/' + el.image))
          .then((url) => {
            console.log(url);
            products.list[inx].image = url
          })
      })
    }).catch((err) => {
      console.log(err);
    })
  } else if (sort.value == 'speakers') {
    await getSpeakers().then((res) => {
      products.list.push(...res)
    }).then(() => {
      products.list.forEach((el, inx) => {
        const storage = getStorage()
        getDownloadURL(ref(storage, 'products/' + el.image))
          .then((url) => {
            products.list[inx].image = url
          })
      })
    }).catch((err) => {
      console.log(err);
    })
  }
}

// watch(sort.value, async () => {
  // return await asyncGetter()
// })
// asyncGetter()
const emitShopCart = defineEmits(['shop-cart'])
// when the component is done loading check if the sidebar is still on and disable it
onMounted(() => {
  checkSideBarFun()
  asyncGetter()
})

const changeSort = (type) => {
  sort.value = type
  products.list = []
  asyncGetter()
}

</script>
<template>
  <div class="shopWrap">
    <h1>Shop</h1>
    <div class="shop">
      <div class="sort">
        <li @click="changeSort('monitors')">Monitors</li>
        <li @click="changeSort('speakers')">Speakers</li>
      </div>
      <div class="row-one">
        <!-- TODO = Render the correct data and clean css -->
        <div class="productWrap" v-for="(product, index) in products.list">
          <Product :id="product.id" :image="product.image" :description="product.description" :title="product.title"
            :type="product.type" :addToCart="props.addToCart" :price="product.price" />
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
  }
}
</style>