<script setup>
import { ref, onMounted } from 'vue';
import { register } from '../../firebase';
import { checkSideBarFun } from '../../functions'
import router from '../../router/index'


const email = ref('')
const pass = ref('')
const secondPass = ref('')

const props = defineProps({
  shortMessageChange: Function || null
})

onMounted(() => {
  checkSideBarFun()
  // addOrder()
})

function handleRegister() {
  if (pass.value == secondPass.value) {
    register(email.value, pass.value).then(() => {
      props.shortMessageChange('Login Completed')
      router.push('/')
    }).catch((err) => {
      console.log(err);
    })
  } else {
    alert('password does not match')
  }
}

</script>
<template>
  <div class="registerPage">
    <h3>Register</h3>
    <div class="registerInputs">
      <div>
        <font-awesome-icon icon="fa-solid fa-user"/>
        <input placeholder="Email" v-model="email" type="text">
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-lock"/>
        <input v-model="pass" placeholder="Password" type="password">
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-lock"/>
        <input v-model="secondPass" placeholder="Password check" type="password">
      </div>
    </div>
    <button @click="handleRegister">Register</button>
  </div>
</template>

<style lang="scss" scoped>
.registerPage {
  // display: grid;
  // grid-template-rows: 20% 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .registerInputs {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    
    div {
      input {
        width: 80%;
      }
    }
  }
  button {
    width: fit-content;
    padding: 5px 10px;
  }
}
</style>