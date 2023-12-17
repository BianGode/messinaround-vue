<script setup>
import { computed, ref } from 'vue';
import { RouterLink, RouterView } from "vue-router"
const fName = ref('Bian')
const lName = ref('Goole')

const compFullName = computed(() => {
  return fName.value + ' ' + lName.value
})

</script>

<template>
<div>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">about</RouterLink>
</div>
<RouterView />
</template>

<style scoped>
</style>
