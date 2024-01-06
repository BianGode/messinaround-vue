<script setup>
import { useRouter } from 'vue-router';
import { getSingleProduct } from '../firebase'
import { onMounted, reactive } from 'vue';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { checkSideBarFun } from '../functions'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const recieviedProd = reactive({
  product: {},
});

const singleProduct = async () => {
  const storage = getStorage()
  await getSingleProduct().then((res) => {
    recieviedProd.product = res
    // get the image based on the document value
    console.log(res);
    getDownloadURL(ref(storage, 'products/' + res[0].image))
      .then((url) => {
        recieviedProd.product[0].image = url
        console.log(url);
      }).catch((err) => {
        console.log(err);
      })
  }).catch((err) => {
    console.log(err)
  })
}
singleProduct()

// same onMounted in everypage
onMounted(() => {
  checkSideBarFun()
})

</script>
<template>
    <!-- Here comes the product main page when clicked on the product -->
    <div v-for="prod in recieviedProd.product" class="singleProdWrap">
      <h3>{{ prod.title }}</h3>
      <img class="singleImage" :src="prod.image" :alt="prod.title" srcset="">
      <p>{{ prod.description }}</p>
      <p>${{ prod.price }}</p>
    </div>
    <div class="productActions">
      <button>Add to cart<font-awesome-icon @click="toggleShoppingCart" icon="fa-solid fa-cart-shopping" /></button>
    </div>
</template>

<style lang="scss" scoped>
.singleProdWrap {
  //height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  .singleImage {
    width: 70%;
  }
}

</style>