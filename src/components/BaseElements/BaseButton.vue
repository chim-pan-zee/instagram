<template>
  <button class="button">
    <slot>로드 중</slot>
  </button>
</template>

<script setup></script>

<style scoped>
.button {
  background-color: rgb(19, 152, 254);
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
}
</style>
