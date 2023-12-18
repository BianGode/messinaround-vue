<script setup>
import { ref } from 'vue'

const email = ref('test@test.nl')
const pass = ref('')

</script>

<template>
  <div class="loginPage">
    <h3>Login</h3>
    <div>
      <p>Email</p>
      <input type="text">
      <p>Password</p>
      <input type="password">
      <p>Password</p>
      <input type="password">
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>