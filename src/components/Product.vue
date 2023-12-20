<script setup>
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { reactive } from 'vue';
import { getStorageImages } from '../firebase';
const props = defineProps({
  image: String,
  title: String,
  description: String,
  type: String
})
const imagesList = reactive({
  img: [],
})

const storage = getStorage()
const mainRef = ref(storage, '/products/')
const imageRef = ref(storage, 'products/' + props.image)

async function getProductsTwo() {

getStorageImages()
}

console.log(imagesList);
</script>
<template>
  <div class="Product">
    <img :src="props.image" alt="" srcset="">
    <li>{{ props.title }}</li>
    <li>{{ props.description }}</li>
    <li>{{ props.type }}</li>
  </div>
</template>

<style lang="scss" scoped></style>