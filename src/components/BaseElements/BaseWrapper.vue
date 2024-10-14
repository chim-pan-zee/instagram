<template>
  <wrapper>
    <slot class="text-slot" name="text-slot"></slot>
  </wrapper>
</template>

<script setup></script>

<style scoped>
.wrapper {
  border-style: solid;
  border-color: rgb(191, 191, 191);
  border-width: 1px;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
}
</style>
