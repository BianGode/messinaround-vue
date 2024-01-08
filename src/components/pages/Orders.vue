<!-- page to get all the orders from this person -->
<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getOrders, getOrdersProducts } from '../../firebase'
import { onMounted, reactive } from 'vue';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';

const orders = reactive({
  list: []
})
const storage = getStorage()
const user = ref(false)

const asyncGetter = async () => {
  await getOrders().then((res) => {
    getOrdersProducts(res).then((finalResult) => {
      orders.list.push(...finalResult)
      // get the images and assign the correct image to the correct item
    }).then(() => {
      for (let y = 0; y < orders.list.length; y++) {
        console.log(orders.list);
        for (let i = 0; i < orders.list[y].items.length; i++) {
          getDownloadURL(ref(storage, 'products/' + orders.list[y].items[i].image))
            .then((url) => {
              console.log(url);
              orders.list[y].items[i].image = url
          })
        }
      }
    })
      .catch((err) => {
        console.log(err);
      })
  }).catch((err) => {
    console.log(err);
  })
}

onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    asyncGetter()
  } else {
    console.log('not logged in yet');
  }
})

</script>
<template>
  <div class="accountOrders">
    <h1>orders</h1>
    <p v-if="orders.list.length > 0">{{ orders.list[0] }}</p>
    <div v-if="orders.list.length > 0" v-for="order in orders.list">
    </div>
  </div>
</template>

<style lang="scss" scoped></style>