<script setup>
import { getAuth } from 'firebase/auth';
import { checkSideBarFun } from '../../functions'
import { onMounted } from "vue";

const auth = getAuth()

const props = defineProps({
  user: String | null,
})
onMounted(() => {
  checkSideBarFun()
  // addOrder()
})
</script>

<template>
  <div class="profileWrap">
    <h1>Hello {{ props.user }}</h1>
    <div class="profileNav">
      <RouterLink to="/profile/orders">Orders</RouterLink>
      <RouterLink to="/profile/settings">Settings</RouterLink>
    </div>
    <div>

      <RouterView v-if="props.user" :user="props.user" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profileWrap {
  padding: 0.9rem;
  .profileNav {
    display: flex;
    background-color: rgb(41, 149, 48);
    width: fit-content;
    padding: 10px 20px;
    gap: 1rem;
    a {
      text-decoration: none;
      color: white
    }
  }
}
</style>