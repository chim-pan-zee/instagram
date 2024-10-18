<template>
  <div class="modal-bg" @click.self="closeModal">
    <div class="modal-content">
      <button class="edit">설정</button>
      <button class="book-mark"></button>
      <button class="mode-switch"></button>
      <button class="report">.</button>
      <button class="sign-out" @click="$emit('logOut')">로그아웃</button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>

<style scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 10;
}

.modal-content {
  background-color: white;
  width: 260px;
  height: 360px;
  margin-top: 50px;
  padding: 20px;
  border-radius: 5%;
  box-shadow: 0px 0px 8px #c3c3c3;
  position: absolute;
  left: 1%;
  bottom: calc(100vh - 100% + 10%);

  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-rows: repeat(6, minmax(0, 1fr));
  padding: 1em;
  gap: 1em;

  align-content: center;
}

.modal-content button {
  font-size: 11pt;
  border: none;
  outline: none;
  background: none;
  border-radius: 5%;
  text-align: left;
}

.edit {
  grid-row: 1;
}

.sign-out {
  grid-row: 5;
}

.modal-content button:hover {
  transition: all 0.3s;
  background: #f6f6f6;
  cursor: pointer;
}
</style>
