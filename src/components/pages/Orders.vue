<!-- page to get all the orders from this person -->
<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getOrders, getOrdersProducts } from '../../firebase'
import { onMounted, reactive, watch } from 'vue';
import { getStorage, getDownloadURL, ref, list } from 'firebase/storage';

const props = defineProps({
  user: String || null
})
const orders = reactive({
  list: []
})
const storage = getStorage()
const user = ref(false)

function asyncGetter() {
  getOrders().then((res) => {
    getOrdersProducts(res).then((finalResult) => {
      orders.list.push(...finalResult)
      for (let y = 0; y < finalResult.length; y++) {
        console.log(y);
        for (let i = 0; i < finalResult[y].items.length; i++) {
          console.log('i = ' + i);
          getDownloadURL(ref(storage, 'products/' + finalResult[y].items[i].image))
            .then((url) => {
              orders.list[y].items[i].image = url
              console.log(finalResult[y].items[i].image);
            }).catch((err) => {
              console.log(err);
            })
        }
      }
      // console.log(finalResult);
    })
  }).then(() => {
    // get the images and assign the correct image to the correct item
  })
    .catch((err) => {
      console.log(err);
    })
    .catch((err) => {
      console.log(err);
    })
}

asyncGetter()
</script>
<template>
  <div class="accountOrders">
    <h1>orders</h1>
    <!-- Was busy with rendering the order per user but did not have time for it yet -->
    <div class="order" v-if="orders.list.length > 0" v-for="order in orders.list">
      <p>{{ order.date }}</p>
      <div class="orderProducts">
        <div v-if="order.items" v-for="product in order.items">
          <p>{{ product.title }}</p>
          <img :src="product.image" alt="" srcset="">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.accountOrders {
  .order {
    .orderProducts {
      
    }
  }
}
</style>