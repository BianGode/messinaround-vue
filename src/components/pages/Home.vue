<script setup>
import { checkSideBarFun } from '../../functions'
import { onMounted } from 'vue';
// same onMounted in everypage
onMounted(() => {
  checkSideBarFun()
})
</script>

<template>
<h1>Home</h1>
<img class="bannerImage" src="" alt="">
<p class="homeInfoText">
  Welcome to our webshop, where we offer a wide range of speakers and monitors to enhance your audio and visual experience. Whether you're a music enthusiast, a gamer, or a professional in need of high-quality audio and visual equipment, we have the perfect solution for you.
</p>
</template>

<style lang="scss" scoped>

</style>