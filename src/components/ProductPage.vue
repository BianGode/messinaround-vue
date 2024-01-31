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

const props = defineProps({
  addToCart: Function
})
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
    <div class="productActions">
      <button @click="props.addToCart(prod.image, prod.title, prod.price)">Add to cart<font-awesome-icon icon="fa-solid fa-cart-shopping" /></button>
    </div>
  </div>
  <div class="reviewsWrap">
    <!-- leave review -->
    <div class="leaveReview">
      <textarea name="review" id="review" cols="30" rows="10">
        Write review here   
      </textarea>
      <button>Leave Review</button>
    </div>
    <!-- read reviews -->
    <div class="readReviews">

    </div>
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

.productActions {
  button {
    background-color: white;
    border: #006457 2px solid;
    color: #006457;
    transition: all 0.2s ease;
    padding: 5px 10px;
    font-size: 1rem;
  }
  button:hover {
    background-color: #006457;
    border: #006457 2px solid;
    color: white;
    transition: all 0.2s ease;
  }
}
@media only screen and (min-width: 900px) {
  .singleProdWrap {
    width: 50%;
    margin: 0 auto;
    
  }
}
</style>