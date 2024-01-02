<script setup>
import { ref } from 'vue';
import { register } from '../../firebase';


const email = ref('')
const pass = ref('')
const secondPass = ref('')

function handleRegister()  {
  if (pass.value == secondPass.value) {
    register(email.value, pass.value)
  } else {
    alert('password does not match')
  }
}

</script>
<template>
  <div class="registerPage">
    <h3>Register</h3>
    <div>
      <p>Email</p>
      <input v-model="email" type="text">
      <p>Password</p>
      <input v-model="pass" type="password">
      <p>Password</p>
      <input v-model="secondPass" type="password">
    </div>
    <button @click="handleRegister">Register</button>
  </div>
</template>

<style lang="scss" scoped>
.registerPage {
  display: grid;
  grid-template-rows: 20% 80%;
}
</style>