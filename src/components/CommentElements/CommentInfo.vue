<template>
  <div class="info-wrap">
    <div class="button-wrap">
      <button @click="increaseLikes"></button>
      <button></button>
    </div>
    <div class="info-text-wrap">
      <div class="like">좋아요 {{ likesCount }}개</div>
      <div class="date">{{ props.timeAgo }}</div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { defineProps, watch, ref } from "vue";

const props = defineProps({
  postId: String,
  timeAgo: String,
});

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

const getLikes = () => {
  console.log("좋아요 가져오기: " + postId.value);

  axios
    .get(`/likes/${postId.value}`)
    .then((res) => {
      console.log("좋아요 데이터가 도착했습니다.", res.data);
      likesCount.value = res.data;
    })
    .catch((err) => {
      console.error("좋아요 불러오던 중 에러", err);
      alert("글 작성이 정상적으로 처리되지 않았습니다. " + err.response?.data);
    });
};
</script>

<style scoped>
.info-wrap {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  padding: 1em;
}

.button-wrap {
  grid-row: 1;
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  gap: 1em;
}

.info-text-wrap {
  grid-row: 2;

  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
}

.like {
  grid-row: 1;
  text-align: left;

  font-weight: bold;
}

.date {
  grid-row: 2;
  text-align: left;
}
</style>
