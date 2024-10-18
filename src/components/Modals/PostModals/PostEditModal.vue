<template>
  <div class="modal-bg" @click="closeModal">
    <div v-if="isNext == false" class="modal-content" @click.stop>
      <button class="post-update">수정</button>
      <button class="post-delete" @click="isNext = true">삭제</button>
    </div>
    <div v-if="isNext == true" class="warning-modal" @click.stop>
      <h2 class="warning-text">게시물을 삭제할까요?</h2>
      <button>
        <p class="warning-desc">이 게시물을 삭제하시겠어요?</p>
      </button>
      <button class="delete" @click="deletePost">삭제</button>
      <button class="cancle" @click="closeModal">취소</button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { defineEmits, ref, defineProps } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const isNext = ref(false);

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

const props = defineProps({
  postId: String,
});

const postId = ref(props.postId);

const deletePost = () => {
  axios
    .delete(`/p/${postId.value}`)
    .then((res) => {
      if (res.data == true) {
        closeModal();
        if (router.currentRoute.value.path === "/") {
          router.go(0);
        } else {
          router.push({
            path: "/",
          });
        }
      }
    })
    .catch((err) => {
      console.error("지우기 상태 불러오기 에러", err);
      alert(
        "지우기 데이터가 정상적으로 처리되지 않았습니다. " + err.response?.data
      );
    });
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
