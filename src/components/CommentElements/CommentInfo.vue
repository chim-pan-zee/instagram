<template>
  <div class="info-wrap">
    <div class="button-wrap">
      <button class="like" @click="increaseLikes" :disabled="isAnimating">
        <img
          v-show="!isLiked"
          src="/assets/icons/heart-regular.svg"
          alt="좋아요 버튼"
          :class="{ bounce: isAnimating }"
        />
        <img
          v-show="isLiked"
          src="/assets/icons/heart-solid.svg"
          alt="좋아요 완료 버튼"
          :class="{ bounce: isAnimating }"
        />
      </button>
      <button class="comment" @click="$emit('focusCommentForm')">
        <img src="/assets/icons/comment.svg" alt="댓글 버튼" />
      </button>
    </div>
    <div class="info-text-wrap">
      <div class="like">좋아요 {{ likesCount }}개</div>
      <div class="date">{{ timeAgo }}</div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const postId = ref(route.params.id);
const likesCount = ref("0");
const isLiked = ref(false);
const isAnimating = ref(false);

const timeAgo = ref("");

const checkLiked = () => {
  const authorToken = window.localStorage.getItem("user_token");

  console.log("좋아요 불러오기 중");
  const likeData = {
    postId: postId.value,
    authorToken: authorToken,
  };
  axios
    .post(`/likes/check`, likeData)
    .then((res) => {
      isLiked.value = res.data;
      console.log("좋아요 상태: " + res.data);
    })
    .catch((err) => {
      console.error("좋아요 상태 불러오기 에러", err);
      alert("좋아요 데이터 불러오기 실패: " + err.response?.data);
    });
};

const increaseLikes = () => {
  const authorToken = window.localStorage.getItem("user_token");

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
      console.log("좋아요 처리됨", res.data);
    })
    .catch((err) => {
      console.error(err);
      alert("좋아요 처리 실패: " + err.response?.data);
    });
};

const getLikes = () => {
  console.log("좋아요 가져오기: " + postId.value);

  axios
    .get(`/likes/${postId.value}`)
    .then((res) => {
      console.log("좋아요 개수: ", res.data);
      likesCount.value = res.data;
    })
    .catch((err) => {
      console.error("좋아요 불러오기 에러", err);
      alert("좋아요 개수 불러오기 실패: " + err.response?.data);
    });
};

onMounted(() => {
  checkLiked();
  getLikes();
});
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
  border: none;
  outline: none;
  background: none;
  text-align: left;
}

.like:hover {
  cursor: pointer;
}

.like img {
  width: 100%;
  height: auto;
  object-fit: cover;
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

.date {
  grid-row: 2;
  text-align: left;
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
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
