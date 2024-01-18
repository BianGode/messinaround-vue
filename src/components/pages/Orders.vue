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
    <div class="ordersWrap">
      <!-- Was busy with rendering the order per user but did not have time for it yet -->
      <div class="order" v-if="orders.list.length > 0" v-for="order in orders.list">
        <div>
        <h3>{{ order.date }}</h3>
        <h3>{{ order.fullPrice }}</h3>
      </div>
        <div class="orderProducts">
          <div v-if="order.items" class="orderProduct" v-for="product in order.items">
            <img :src="product.image" alt="" srcset="">
            <p>{{ product.title }}</p>
            <p>${{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.accountOrders {
  .ordersWrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .order {
      .orderProducts {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        text-align: center;
        .orderProduct {
          display: flex;
          justify-content: space-between;
          align-items: center;
          img {
            width: 100px;
          }
        }
      }

    }
  }
}
</style>