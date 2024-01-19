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
    }).finally(() => {
      document.querySelectorAll('.orderProducts')[0].classList.toggle('on')
      document.querySelectorAll('.orderProducts')[0].classList.toggle('off')

    })
  })
    .catch((err) => {
      console.log(err);
    })
    .catch((err) => {
      console.log(err);
    })
}

asyncGetter()

const openOrder = (inx) => {
  const orderProducts = document.querySelectorAll('.orderProducts')[inx]
  orderProducts.classList.toggle('on')
  orderProducts.classList.toggle('off')
}

</script>
<template>
  <div class="accountOrders">
    <h1>orders</h1>
    <div class="ordersWrap">
      <!-- Was busy with rendering the order per user but did not have time for it yet -->
      <div class="order" v-if="orders.list.length > 0" v-for="( order , index) in orders.list">
        <div class="orderInfo">
          <h3>{{ order.date }}</h3>
          <h3>$ {{ order.fullPrice }}</h3>
          <font-awesome-icon icon="fa-solid fa-angle-down" @click="openOrder(index)" />
        </div>
        <div class="orderProducts off">
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
    justify-content: center;
    flex-direction: column;
    .order {
      flex-direction: column;
      width: 100%;

      .orderInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      // animation for on off order
      .orderProducts.on {
        transform: scaleY(1);
      }
      .orderProducts {
        flex-direction: column;
        gap: 1rem;
        text-align: center;

        transform: scaleY(0);
        transform-origin: top;
        transition: transform 0.26s ease;
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
}</style>