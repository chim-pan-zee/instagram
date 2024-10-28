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
    <div
      class="comment-count"
      v-if="commentCount > 0"
      @click="$emit('openModal')"
    >
      <b>댓글 {{ commentCount }}개 모두 보기</b>
    </div>
    <div class="comment-form">
      <input
        type="text"
        placeholder="댓글 달기..."
        maxlength="1000"
        ref="commentRef"
        v-model="comment"
      />
      <button
        v-if="comment"
        class="upload"
        :class="{ disabled: isDisabled }"
        @click="uploadComment"
        :disabled="isDisabled"
      >
        게시
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { defineProps, onMounted, ref, watch, defineEmits } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  userId: String,
  contents: String,
  postId: String,
});

const emit = defineEmits(["uploadedComment"]);

onMounted(() => {
  getLikes();
  checkLiked();
  getCommentCount();
});

const userId = ref(props.userId);
const contents = ref(props.contents);
const postId = ref(props.postId);
const authorUUID = window.localStorage.getItem("user_uuid");
const likesCount = ref("");
const commentCount = ref("");
const isLiked = ref(false);
const isAnimating = ref(false);
const isDisabled = ref(false);

const comment = ref("");

const commentRef = ref("");

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
    authorUUID: authorUUID,
  };
  axios
    .post("/likes", likeData)
    .then((res) => {
      if (res.data > 0) {
        getLikes();
      } else {
        router.push("/signin");
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

const getCommentCount = () => {
  axios
    .get(`/comment/${postId.value}`)
    .then((res) => {
      console.log("좋아요 데이터가 도착했습니다.", res.data);
      commentCount.value = res.data;
    })
    .catch((err) => {
      console.error("좋아요 불러오기 에러", err);
      alert(
        "좋아요 데이터가 정상적으로 처리되지 않았습니다. " + err.response?.data
      );
    });
};

const checkLiked = () => {
  console.log("좋아요 불러오기 중");
  const likeData = {
    postId: postId.value,
    authorUUID: authorUUID,
  };
  axios
    .post(`/likes/check`, likeData)
    .then((res) => {
      isLiked.value = res.data;
    })
    .catch((err) => {
      console.error("좋아요 상태 불러오기 에러", err);
      alert(
        "좋아요 데이터가 정상적으로 처리되지 않았습니다. " + err.response?.data
      );
    });
};

const uploadComment = () => {
  const commentData = {
    authorUUID: authorUUID,
    postId: props.postId,
    contents: comment.value,
  };

  axios
    .post("/comm", commentData)
    .then((res) => {
      console.log("전송됨", res.data);
      isDisabled.value = true;
      emit("uploadedComment", comment.value);
      setTimeout(() => {
        isDisabled.value = false;
        commentRef.value.focus();
      }, 1000);
      comment.value = "";
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

<style>
.post-info {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-rows: repeat(6, minmax(0, 1fr));
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

.comment-count {
  grid-row: 4;
  text-align: left;
  color: #939393;
  background: none;
}

.comment-count:hover {
  cursor: pointer;
}

.comment-form {
  grid-row: 5;
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

.upload:hover {
  cursor: pointer;
}

.upload.disabled {
  color: rgb(146, 208, 255);
  cursor: default;
}

.upload:disabled {
  color: rgb(146, 208, 255);
  cursor: default;
}
</style>
