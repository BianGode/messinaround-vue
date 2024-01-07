<script setup>
import { checkSideBarFun } from '../../functions'
import { onMounted } from 'vue';
import { addOrder } from '../../firebase';
// same onMounted in everypage
onMounted(() => {
  checkSideBarFun()
  // addOrder()
})
</script>

<template>
  <div class="homepageWrap">
    <div class="bannerAndWelcome">
      <h1 class="bannerImage">Quality Speakers and Monitors!</h1>
      <!-- <img class="bannerImage" src="../../../images/homepage-sale.png" alt=""> -->
      <p class="homeInfoText">
        Welcome to our webshop, where we offer a small range of good speakers and monitors to enhance your audio and
        visual
        experience.
      </p>
    </div>
    <div class="twoColoredLine">
        <div class="line yellowLine"></div>
        <div class="line greenLine"></div>
      </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes wheewhoo {
  0% {
    transform: scale(1.0);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(0.9);
  }
  75% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1.0);
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
    text-align: center;
    .bannerImage {
      // width: 50%;
      // font-weight: 700;
      padding: 20px;
      animation: wheewhoo 1.5s 1 ease-in-out;
      border: 5px solid #005653;
      border-radius: 10px;
      color: #005653;
    }
  }
  .twoColoredLine {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    .line {
      height: 5px;
      width: 40%;
    }
    .yellowLine {
      border-radius: 5px 0 0 5px;
      background-color: #EBB001;
    }
    .greenLine {
      border-radius: 0 5px 5px 0;
      background-color: #005653;
    }
  }
}
</style>