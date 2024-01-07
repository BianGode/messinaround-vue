<!-- page to get all the orders from this person -->
<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getOrders, getOrdersProducts } from '../../firebase'
import { reactive } from 'vue';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';

const orders = reactive([

])
const storage = getStorage()


onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    getOrders().then((res) => {
      getOrdersProducts(res).then((finalResult) => {
        console.log(finalResult);
        orders.push(finalResult)
        console.log('orders = ');
        console.log(orders[0]);
        // get the images and assign the correct image to the correct item
        // orders.forEach((order, inx) => {
          for (let y = 0; y < orders.length; y++) {

            for (let i = 0; i < orders[y].items.length; i++) {
            getDownloadURL(ref(storage, 'products/' + orders[y].items[i].image))
              .then((url) => {
                // console.log(url);
                orders[y].items[i].image = url
              })
          }
        }
          // order.items.forEach((item, index) => {
          //   console.log(item);
          //   getDownloadURL(ref(storage, 'products/' + item.image))
          //     .then((url) => {
          //       console.log(url);
          //       orders[inx].items[index].image = url
          //     })
          // })
        // })
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })

  } else {
    console.log('not logged in yet');
  }
})
</script>
<template>
  <div class="accountOrders">
    <h1>orders</h1>
    <div v-if="orders.length > 0" v-for="order in orders">
      {{ order }}
      <!-- <div v-for="prod in order.items"> -->
        <!-- {{ prod }} -->
      <!-- </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped></style>