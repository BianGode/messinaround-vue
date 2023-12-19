<script setup>
import { ref } from 'vue'
import { login } from '../firebase';

const email = ref('')
const pass = ref('')

</script>

<template>
  <div class="loginPage">
    <h3>Login</h3>
    <div>
      <p>Email</p>
      <input v-model="email" type="text">
      <p>Password</p>
      <input v-model="pass" type="password">
    </div>
    <button @click="login(email, pass)">Login</button>
  </div>
</template>

<style lang="scss" scoped>

</style>