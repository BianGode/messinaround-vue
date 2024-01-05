<script setup>
import { checkSideBarFun } from '../../functions'
import { onMounted } from 'vue';
// same onMounted in everypage
onMounted(() => {
  checkSideBarFun()
})
</script>

<template>
  <div class="homepageWrap">
    <div class="bannerAndWelcome">
      <img class="bannerImage" src="../../../public/images/homepage-sale.png" alt="">
      <p class="homeInfoText">
        Welcome to our webshop, where we offer a small range of good speakers and monitors to enhance your audio and
        visual
        experience.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes wheewhoo {
  0% {
    padding: 0px;
    background-color: black;
  }

  50% {
    padding: 50px;
    background-color: black;
  }

  100% {
    padding: 0px;
    background-color: black;
  }
}
.homepageWrap {
  padding-top: 1rem;
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .bannerAndWelcome {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bannerImage {
      border-radius: 180px;
      width: 50%;
      animation: wheewhoo 2s 4 ease-in-out;
    }
  }
}
</style>