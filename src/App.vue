<script setup>
import { ref } from 'vue';

const textAndClass = ref('red')
const background = ref('rgb(47, 6, 105)')

function changeText() {
  if(textAndClass.value == "blue" & background.value == 'rgb(47, 6, 105)') {
    textAndClass.value = "red";
    background.value = 'rgb(156, 50, 1)'
  } else {
    textAndClass.value = "blue"
    background.value = 'rgb(47, 6, 105)'
  }
  document.body.style.backgroundColor = background.value
}
</script>

<template>
  <div class="back">
    <h1 :class="textAndClass" @click="changeText">{{textAndClass}}</h1>
  </div>
</template>

<style scoped>
.back {
  width: 100vw;
  height: 100vh;
}
.blue {
  transition: filter 1s ease;
  filter: drop-shadow(50px 50px 50px blue) 
}
.red {
  transition: filter 1s ease;
  filter: drop-shadow(16px 16px 20px red)
}
</style>
