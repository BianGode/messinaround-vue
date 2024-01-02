<script setup>
import { useRouter } from 'vue-router';
import { getSingleProduct } from '../firebase'
import { reactive } from 'vue';

const recieviedProd = reactive({
  product: []
});

const singleProduct = async () => {
  await getSingleProduct().then((res) => {
    // recieviedProd.product.push(res)
    console.log(res);
  }).catch((err) => {
    console.log(err)
  })
}
singleProduct()
getSingleProduct().then((res) => {
  console.log(res);
})
</script>
<template>
  <!-- Here comes the product main page when clicked on the product -->
  <div>
  </div>
</template>

<style scoped></style>