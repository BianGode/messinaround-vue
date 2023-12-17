<script setup>
import { computed, reactive, ref } from 'vue';
import { RouterLink, RouterView } from "vue-router"

const active = reactive({
  active: '',
})

</script>
<template>
<div class="Navigation">
  <RouterLink  to="/">Home</RouterLink>
  <RouterLink to="/about">about</RouterLink>
</div>
<RouterView />
</template>

<style>
body {
  margin: 0;
  background-color: rgb(17, 2, 58);
}
</style>
