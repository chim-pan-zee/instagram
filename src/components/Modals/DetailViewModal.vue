<template>
  <div class="modal-wrap">
    <div class="img-wrap">
      <img :src="imagePath" alt="이미지" />
    </div>
    <div class="contents-wrap">
      <header>
        <button><profile-image class="profile-image"></profile-image></button>
        <button>{{ userId }}</button>
      </header>
      <comment-list
        :postId="postId"
        :comments="comments"
        :contents="contents"
        :author="userId"
        :refreshComments="refreshComments"
        class="comments"
      ></comment-list>
      <comment-info
        :postId="postId"
        :timeAgo="timeAgo"
        class="info"
      ></comment-info>
      <comment-form
        :postId="postId"
        class="comment-input"
        @submitComment="handleCommentSubmit"
      ></comment-form>
    </div>
  </div>
</template>

<script setup>
import ProfileImage from "../ProfileComponents/ProfileImage.vue";
import CommentList from "../CommentElements/CommentList.vue";
import CommentInfo from "../CommentElements/CommentInfo.vue";
import CommentForm from "../CommentElements/CommentForm.vue";

import { ref, defineProps, defineEmits, onMounted } from "vue";
import axios from "axios";

const props = defineProps({
  postId: String,
  imagePath: String,
});
const emit = defineEmits(["uploadComment"]);

const postId = ref("");
const imagePath = ref("");
const comments = ref([]);
const refreshComments = ref(false);
const createdAt = ref("");
const timeAgo = ref("");
const userId = ref("");
const contents = ref("");

const convertTime = (atTime, currTime) => {
  if (atTime !== null) {
    const timeDiff = currTime - atTime;
    const sec = Math.floor(timeDiff / 1000);
    const min = Math.floor(sec / 60);
    const hours = Math.floor(min / 60);
    const days = Math.floor(hours / 24);

    if (days === 0) {
      if (hours === 0) {
        if (min === 0) {
          timeAgo.value = sec + "초 전";
        } else {
          timeAgo.value = min + "분 전";
        }
      } else {
        timeAgo.value = hours + "시간 전";
      }
    } else if (days === 1) {
      timeAgo.value = "어제";
    } else if (days < 7) {
      timeAgo.value = days + "일 전";
    } else {
      timeAgo.value = days + "주 전";
    }
  } else {
    timeAgo.value = "무량공처";
  }
};

const getContents = () => {
  axios
    .get(`/p/${postId.value}`)
    .then((res) => {
      console.log("콘텐츠 받음:", res.data);
      userId.value = res.data.user_id;
      contents.value = res.data.content;
      if (res.data.created_at) {
        createdAt.value = new Date(res.data.created_at);
      } else {
        createdAt.value = null;
      }

      if (createdAt.value) {
        const currentTime = new Date();
        convertTime(createdAt.value, currentTime);
      } else {
        console.error("날짜값이무량공처");
      }
    })
    .catch((err) => {
      console.error("콘텐츠 조회불가:", err);
      alert("글 작성이 정상적으로 처리되지 않았습니다. " + err.response?.data);
    });
};

onMounted(() => {
  postId.value = props.postId;
  imagePath.value = `/upload/${props.imagePath.split("/").pop()}`;

  getContents();
});

const handleCommentSubmit = (newComment) => {
  comments.value.push(newComment);
  refreshComments.value = true;
  emit("uploadComment", newComment);

  setTimeout(() => {
    refreshComments.value = false;
  }, 1000);
};
</script>

<style scoped>
.modal-bg {
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.modal-wrap {
  border-radius: 5px;
  border-style: solid;
  border-color: rgb(191, 191, 191);
  border-width: 1px;
  background-color: rgb(255, 255, 255);

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  transition: width 0.3s ease-in-out;

  max-height: 650px;

  z-index: 1;
}

.img-wrap {
  grid-column: 1;
  grid-row: 1;
}

.img-wrap img {
  width: 100%;
  height: auto;
}

.contents-wrap {
  grid-column: 2;
  grid-row: 1;

  display: grid;
  grid-template-rows: repeat(11, minmax(0, 1fr));
}

.comments {
  grid-row: 2/9;
  border-bottom-color: silver;
  border-bottom-style: solid;
  border-bottom-width: 1px;

  overflow-y: scroll;
  height: 100%;
}

.info {
  grid-row: 9/11;
  border-bottom-color: silver;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

.comment-input {
  grid-row: 11/12;
}

.contents-wrap header {
  grid-row: 1/2;

  display: grid;
  grid-template-rows: repeat(1, minmax(0, 1fr));
  grid-template-columns: repeat(9, minmax(0, 1fr));
  padding-left: 1em;
  padding-right: 1em;
  gap: 1em;

  align-items: center;

  border-bottom-color: silver;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

.profile-image {
  grid-column: 1;
}

.contents-wrap header button {
  background: none;
  border: none;
  font-size: 12pt;
  text-align: left;
}

.contents-wrap header button:hover {
  cursor: pointer;
}
</style>
