<script setup>
import { computed, reactive, ref } from 'vue';
import { RouterLink, RouterView } from "vue-router"

const active = reactive({
  active: '',
})

</script>
<template>
<div class="Navigation">
  <div class="hamburger">
    <span class="line"></span>
    <span class="line"></span>
    <span class="line"></span>
  </div>
  <RouterLink class="link" to="/">Home</RouterLink>
  <RouterLink class="link" to="/about">about</RouterLink>
</div>
<RouterView />
</template>

<style lang="scss" scoped>
.Navigation {
  width: 100%;
  height: 70px;
  background-image: url('./assets/header.jpeg');
  background-size: cover;
  display: flex;
  padding: 10px;
  .hamburger {
    height: 20px;
    width: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .line {
      display: block;
      width: 100%;
      height: 2px;
      background-color: black;
    }
  }
  .link {

  }
}
</style>
