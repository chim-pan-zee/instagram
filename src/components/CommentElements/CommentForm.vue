<template>
  <div class="form-wrap">
    <profile-image class="profile-image"></profile-image>
    <input v-model="contents" class="base-input" placeholder="댓글 달기..." />
    <button class="upload" @click="uploadComment">게시</button>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import ProfileImage from "../ProfileComponents/ProfileImage.vue";
import axios from "axios";

const props = defineProps({
  postId: String,
});

const authorToken = window.localStorage.getItem("user_token");
const contents = ref("");

const uploadComment = () => {
  const commentData = {
    authorToken: authorToken,
    postId: props.postId,
    contents: contents.value,
  };
  axios
    .post("/comm", commentData)
    .then((res) => {
      console.log("전송됨", res.data);
    })
    .catch((err) => {
      console.error(err);
      alert(
        "글 작성이 정상적으로 처리되지 않았습니다. " +
          err.data +
          "관리자에게 문의 바랍니다."
      );
    });
};
</script>

<style scoped>
.form-wrap {
  display: grid;
  grid-template-columns: repeat(9, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));

  padding: 1em;
  gap: 1em;
}

.profile-image {
  grid-column: 1;
  grid-row: 1;
}

.base-input {
  grid-column: 2/9;
  grid-row: 1;

  text-align: left;
  border: none;
}

.upload {
  background: none;
  border: none;
  color: blue;
}

.upload:hover {
  cursor: pointer;
}
</style>
