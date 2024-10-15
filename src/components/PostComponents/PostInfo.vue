<template>
  <div class="post-info">
    <div class="post-buttons">
      <button class="like" @click="increaseLikes" :disabled="isAnimating">
        <img
          v-show="!isLiked"
          src="/assets/icons/heart-regular.svg"
          alt=""
          :class="{ bounce: isAnimating }"
        />
        <img
          v-show="isLiked"
          src="/assets/icons/heart-solid.svg"
          alt=""
          :class="{ bounce: isAnimating }"
        />
      </button>
      <button
        class="comment"
        :disabled="isAnimating"
        @click="$emit('openModal')"
      >
        <img src="/assets/icons/comment.svg" alt="" />
      </button>
    </div>
    <div class="post-likes">좋아요 {{ likesCount }} 개</div>
    <div class="contents">
      <b style="font-weight: 600; font-size: 11pt">{{ userId }}</b>
      {{ contents }}
    </div>
    <div class="comment-form">
      <input type="text" placeholder="댓글 달기..." />
      <button>전송</button>
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
const isLiked = ref(false);
const isAnimating = ref(false);

watch(
  () => props.postId,
  (newPostId) => {
    postId.value = newPostId;
    getLikes();
  }
);

const increaseLikes = () => {
  isLiked.value = !isLiked.value;
  isAnimating.value = true;

  setTimeout(() => {
    isAnimating.value = false;
  }, 300);

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
  grid-template-rows: repeat(5, minmax(0, 1fr));
  padding-top: 0.5em;
  gap: 0.5em;
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

.contents {
  grid-row: 3;
  text-align: left;
}

.comment-form {
  grid-row: 4;
  display: grid;
  grid-template-columns: repeat(13, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  padding-bottom: 0.5em;
  border-bottom-style: solid;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
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
  color: rgb(19, 152, 254);
}

.comment-form button:hover {
  cursor: pointer;
}

.like {
  border: none;
  outline: none;
  background: none;
  text-align: left;
}

.like:hover {
  cursor: pointer;
}

.like img {
  width: auto;
  height: 100%;
  object-fit: cover;
}

.comment {
  border: none;
  outline: none;
  background: none;
  text-align: left;
}

.comment:hover {
  cursor: pointer;
}

.comment img {
  width: auto;
  height: 100%;
  object-fit: cover;
}

.like:disabled {
  cursor: default;
}

.bounce {
  animation: bounce 0.3s forwards;
}

@keyframes bounce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
