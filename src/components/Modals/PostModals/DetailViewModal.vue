<template>
  <div class="modal-bg" @click="closeModal">
    <div class="modal-wrap" @click.stop>
      <div class="detail-img-wrap">
        <div class="detail-img fit">
          <img
            v-if="images.length > 0 && images[currentIndex]"
            :src="`/upload/${images[currentIndex].file_name}`"
            alt="image"
            class="full-image fit"
          />
          <button
            class="left-button"
            @click="previewImage"
            :disabled="currentIndex === 0"
          >
            <img
              style="width: 100%; height: 100%"
              src="/assets/icons/leftarrow.png"
              alt=""
            />
          </button>
          <button
            class="right-button"
            @click="nextImage"
            :disabled="currentIndex === images.length - 1"
          >
            <img
              style="width: 100%; height: 100%"
              src="/assets/icons/rightarrow.png"
              alt=""
            />
          </button>
        </div>
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
          :postcreatedAt="postcreatedAt"
          :refreshComments="refreshComments"
          class="comments"
        ></comment-list>
        <comment-info
          :postId="postId"
          :timeAgo="timeAgo"
          class="info"
          @focusCommentForm="focusCommentForm = true"
        ></comment-info>
        <comment-form
          :postId="postId"
          :focusCommentForm="focusCommentForm"
          class="comment-input"
          @uploaded-comment="handleCommentSubmit"
        ></comment-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfileImage from "../../ProfileComponents/ProfileImage.vue";
import CommentList from "../../CommentElements/CommentList.vue";
import CommentInfo from "../../CommentElements/CommentInfo.vue";
import CommentForm from "../../CommentElements/CommentForm.vue";

import { ref, defineProps, defineEmits, onMounted, onBeforeUnmount } from "vue";

import axios from "axios";

const props = defineProps({
  postId: String,
});
const emit = defineEmits(["uploadComment", "closeModal"]);

const images = ref([]);
const currentIndex = ref(0);

const postId = ref("");
const comments = ref([]);
const refreshComments = ref(false);
const createdAt = ref("");
const timeAgo = ref("");
const userId = ref("");
const contents = ref("");
const postcreatedAt = ref("");
const focusCommentForm = ref(false);

let scrollY = 0;

const disableScroll = () => {
  scrollY = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
  document.body.style.top = `-${scrollY}px`;
};

const enableScroll = () => {
  document.body.style.position = "";
  document.body.style.width = "";
  document.body.style.top = "";
  window.scrollTo(0, scrollY);
};

const closeModal = () => {
  enableScroll();
  emit("closeModal");
};

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
      timeAgo.value = days / 7 + "주 전";
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
      userId.value = res.data.username;
      contents.value = res.data.content;
      postcreatedAt.value = res.data.created_at;
      if (res.data.created_at) {
        createdAt.value = new Date(res.data.created_at);
      } else {
        createdAt.value = null;
      }

      if (createdAt.value) {
        const currentTime = new Date();
        convertTime(createdAt.value, currentTime);
      } else {
        console.error("날짜값이 무량공처");
      }
    })
    .catch((err) => {
      console.error("콘텐츠 조회 불가:", err);
      alert("글 작성이 정상적으로 처리되지 않았습니다. " + err.response?.data);
    });
};

onMounted(() => {
  loadPosts();
  disableScroll();
  getContents();
});

const loadPosts = () => {
  postId.value = props.postId;
  axios
    .get(`/p/file/${postId.value}`)
    .then((res) => {
      images.value = res.data;
      console.log("이미지 데이터가 도착했습니다.", res.data);
      console.log("인덱스" + currentIndex.value);
      console.log(
        "사진 데이터가 도착했습니다.",
        images.value[currentIndex.value]?.file_name
      );
    })
    .catch((err) => {
      console.error("이미지 불러오던 중 에러", err);
      alert("이미지 정상적으로 처리되지 않았습니다. " + err.response?.data);
    });
};

onBeforeUnmount(() => {
  enableScroll();
});

const handleCommentSubmit = (newComment) => {
  comments.value.push(newComment);
  refreshComments.value = true;
  emit("uploadComment", newComment);

  setTimeout(() => {
    refreshComments.value = false;
  }, 1000);
};

const previewImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const nextImage = () => {
  if (currentIndex.value < images.value.length - 1) {
    currentIndex.value++;
  }
};
</script>

<style scoped>
.modal-bg {
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.modal-wrap {
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  max-height: 650px;
  width: 1000px;
  max-width: 1400px;
  display: flex;
  flex-direction: row;
}

.contents-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.comments {
  flex-grow: 1;
  overflow-y: auto;
  border-bottom: 1px solid silver;
}

.info {
  border-bottom: 1px solid silver;
}

.comment-input {
  margin-top: 1em;
}

.contents-wrap header {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  padding: 1em;
  border-bottom: 1px solid silver;
  align-items: center;
}

.profile-image {
  margin-right: 1em;
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

.detail-img-wrap {
  object-fit: cover;
  align-content: center;
  flex: 1;
  background-color: black;
}

.detail-post-img img {
  width: 100%;
  height: auto;
  max-height: 600px;
  border: none;
  align-content: center;
}

.detail-img {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  position: relative;
  width: 100%;
  height: 100%;
}

.detail-img img {
  width: 100%;
  height: 600px;
  object-fit: cover;
}

.left-button,
.right-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  padding: 10px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  background: none;
  opacity: 0.83;
}

.left-button {
  left: 10px;
}

.right-button {
  right: 10px;
}

.left-button:disabled,
.right-button:disabled {
  opacity: 0;
  cursor: default;
}
</style>
