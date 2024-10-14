<template>
  <input type="text" v-model="model" class="input" placeholder="입력하세요." />
</template>

<script setup>
import { defineModel } from "vue";

const model = defineModel();
</script>

<style scoped>
.input {
  border-style: solid;
  border-color: rgb(191, 191, 191);
  border-width: 1px;
  border-radius: 5px;
  background-color: rgb(241, 241, 241);
}
</style>
