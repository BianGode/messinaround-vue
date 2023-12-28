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
.loginPage {
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  align-items: center;
  gap: 1rem;
  div {
    input {
      width: 80%;
    }
  }
  button {
    padding: 10px 30px;
    border: none;
    border-radius: 10px;
    font-weight: 500;
    background-color: rgb(65, 136, 65);
  }
}
@media only screen and (min-width: 900px) {
   
}
</style>