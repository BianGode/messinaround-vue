<script setup>
import { ref, onMounted } from 'vue'
import { login } from '../../firebase';
import { checkSideBarFun } from '../../functions';

import router from '../../router/index'

const email = ref('')
const pass = ref('')

const props = defineProps({
  shortMessageChange: Function || null
})

const handleLogin = (email, pass) => {
  login(email, pass).then(() => {
    props.shortMessageChange('Login Completed')
    // setTimeout(() => {
    router.push('/')
    // }, 1000)
  }).catch((err) => {
    console.log(err);
  })
}
onMounted(() => {
  checkSideBarFun()
})
</script>

<template>
  <div class="loginPage regLog">
    <div class="loginContentWrap">
      <h3>&lt;Logo&gt;</h3>
      <div class="loginInputs">
        <div>
          <font-awesome-icon icon="fa-solid fa-user" />
          <input v-model="email" type="text">
        </div>
        <div>
          <font-awesome-icon icon="fa-solid fa-lock" />
          <input v-model="pass" type="password">
        </div>
      </div>
      <button @click="handleLogin(email, pass)">Login</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loginPage {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: calc(100vh - 100px - 70px);

  .loginContentWrap {
    .loginInputs {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      div {
        input {
          width: 80%;
        }
      }
    }
  }
}

@media only screen and (min-width: 900px) {
  //  desktop style here
}</style>