<template>
  <div class="modal-bg" @click="closeModal">
    <div class="modal-content">
      <button class="post-update">수정</button>
      <button class="post-delete">삭제</button>
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
button {
  background: none;
  outline: none;
  border: none;
  font-size: 11pt;
}
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 10;
}

.modal-content {
  position: fixed;

  background-color: white;
  width: 300px;
  height: 100px;
  top: 40%;
  left: 40%;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
}

.post-update {
  border-bottom-color: rgb(235, 235, 235);
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

.post-delete {
  color: red;
  font-weight: bold;
}

button:hover {
  cursor: pointer;
}
</style>
