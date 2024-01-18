<script setup>
import { getProducts, getSpeakers, getMonitors } from '../../firebase';
import Product from '../Product.vue';
import { reactive, onMounted, toRaw, watch, watchEffect } from 'vue';
import { ref as reference } from 'vue'
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { checkSideBarFun, toggleShoppingCart } from '../../functions';

const products = reactive({
  list: []
})
const sort = reference('monitors')
const props = defineProps({
  addToCart: Boolean | Function,
});

// function to get the all the products with the images from firebase.js file
// sorry a bit of a mess
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
      })
      .catch((err) => {
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
    <h3>In search for a nice screen or a good sound system?</h3>
    <div class="shop">
      <div class="sort">
        <li @click="changeSort('monitors')" :class="sort == 'monitors' ? 'bold' : ''">Monitors</li>
        <li @click="changeSort('speakers')" :class="sort == 'speakers' ? 'bold' : ''">Speakers</li>
        <!-- For the future add other sort here -->
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
    grid-template-columns: 45% 45%;
    gap: 1rem;
    .productWrap {
      width: 100%;
      // height: 500px;
      text-align: center;
      border-radius: 10px;
      background-color: rgb(236, 255, 236);
      padding: 5px;
      img {
        width: 300px;
        margin: 0 auto;
      }
    }
  }
}

.shopWrap {
  // style the top h3
  h3 {
    color: rgb(26, 86, 41);
    margin: 10px auto;
    margin: 1rem;
    font-weight: 400;
  }
  .shop {
    .sort {
      display: flex;
      gap: 1rem;
      padding: 10px 20px;
      background-color: rgb(130, 203, 135);
      width: fit-content;
      margin: 1rem;
      li {
        list-style-type: none;
        color: rgb(25, 68, 25);
      }
      .bold {
        font-weight: 700;
      }
    }
  }
}
</style>