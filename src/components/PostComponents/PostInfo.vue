<template>
  <div class="post-info">
    <div class="post-buttons">
      <button class="like" @click="increaseLikes"></button>
      <button class="comment"></button>
    </div>
    <div class="post-likes">좋아요 {{ likesCount }} 개</div>
    <div class="post-contents">
      <div class="contents">
        <b>{{ userId }}</b>
        {{ contents }}
      </div>
      <div class="comment-form">
        <input type="text" name="" id="" placeholder="댓글 달기..." />
        <button>전송</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { defineProps, onMounted, ref, watch } from "vue";

const props = defineProps({
  userId: String,
  contents: String,
  postId: String,
});

onMounted(() => {
  getLikes();
});

const userId = ref(props.userId);
const contents = ref(props.contents);
const postId = ref(props.postId);
const authorToken = window.localStorage.getItem("user_token");
const likesCount = ref("");

watch(
  () => props.postId,
  (newPostId) => {
    postId.value = newPostId;
    getLikes();
  }
);

const increaseLikes = () => {
  const likeData = {
    postId: postId.value,
    authorToken: authorToken,
  };
  axios
    .post("/likes", likeData)
    .then((res) => {
      if (res.data > 0) {
        getLikes();
      }
      console.log("좋아요 전송됨", res.data);
    })
    .catch((err) => {
      console.error("좋아요 전송 에러", err);
      alert(
        "좋아요가 정상적으로 처리되지 않았습니다. " +
          err.response?.data +
          " 관리자에게 문의 바랍니다."
      );
    });
};

const getLikes = () => {
  console.log("좋아요 가져오기: " + postId.value);

  axios
    .get(`/likes/${postId.value}`)
    .then((res) => {
      console.log("좋아요 데이터가 도착했습니다.", res.data);
      likesCount.value = res.data;
    })
    .catch((err) => {
      console.error("좋아요 불러오기 에러", err);
      alert(
        "좋아요 데이터가 정상적으로 처리되지 않았습니다. " + err.response?.data
      );
    });
};
</script>

<style>
.post-info {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
}

.post-buttons {
  grid-row: 1;

  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
}

.post-likes {
  grid-row: 2;
  align-content: center;
  text-align: left;
  font-weight: bold;
}

.post-contents {
  grid-row: 3;

  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
}

.contents {
  grid-row: 1;
  text-align: left;
}

.comment-form {
  grid-row: 2;
  display: grid;
  grid-template-columns: repeat(13, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
}

.comment-form input {
  grid-column: 1/12;
  border: none;
  outline: none;
}

.comment-form button {
  grid-column: 12/14;

  border: none;
  outline: none;
  background: none;
  color: #0095f6;
}

.comment-form button:hover {
  cursor: pointer;
}
</style>
