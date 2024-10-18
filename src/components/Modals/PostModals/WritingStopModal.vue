<template>
  <div class="modal-bg" @click="closeModal">
    <div class="warning-modal" @click.stop>
      <h2 class="warning-text">게시물을 삭제할까요?</h2>
      <button>
        <p class="warning-desc">이 게시물을 삭제하시겠어요?</p>
      </button>
      <button class="delete" @click="closePost">삭제</button>
      <button class="cancle" @click="closeModal">취소</button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

const closePost = () => {
  emit("closePost");
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

.warning-modal {
  position: fixed;

  background-color: white;
  width: 300px;
  height: 200px;
  top: 35%;
  left: 40%;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-rows: repeat(4, minmax(0, 1fr));
}

.warning-text {
  grid-row: 1;
}

.warning-desc {
  grid-row: 2;
}

.delete {
  grid-row: 3;
  color: red;
  font-weight: bold;
  border-bottom: none;
}

.cancle {
  grid-row: 4;
}
</style>
