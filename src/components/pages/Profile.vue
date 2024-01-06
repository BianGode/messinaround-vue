<script setup>
import { getAuth } from 'firebase/auth';

const auth = getAuth()

const props = defineProps({
  user: String | null,
})
</script>

<template>
  <h1>Hello {{ props.user }}</h1>
  <div class="profileNav">
    <RouterLink to="orders">Orders</RouterLink>
    <RouterLink to="settings">Settings</RouterLink>
  </div>
  <div>
    
    <RouterView/>
  </div>
</template>

<style lang="scss" scoped>

</style>