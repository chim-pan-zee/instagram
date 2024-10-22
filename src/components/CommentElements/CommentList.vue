<template>
  <div class="comments-wrap">
    <div class="comment" v-for="(comment, index) in comments" :key="index">
      <profile-image></profile-image>
      <div class="author-id">
        <span class="bold">{{ comment.username }}</span>
        {{ comment.contents }}
      </div>
      <div class="comment-time">
        {{ convertTime(comment.created_at, currentTime) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, defineProps, onMounted, watch } from "vue";
import ProfileImage from "../ProfileComponents/ProfileImage.vue";

const props = defineProps({
  postId: String,
  contents: String,
  refreshComments: Boolean,
  author: String,
  postcreatedAt: String,
});

const comments = ref([]);
const currentTime = ref(new Date());
onMounted(() => {
  getComments();
});

watch(
  () => props.postId,
  (newPostId) => {
    if (newPostId) {
      getComments();
    }
  }
);

watch(
  () => props.refreshComments,
  (newVal) => {
    if (newVal) {
      getComments();
    }
  }
);

const getComments = () => {
  if (props.postId) {
    axios
      .get(`/comm/${props.postId}`)
      .then((res) => {
        console.log("댓글이 왔습니다.", res.data);

        if (props.contents === "") {
          comments.value = res.data;
        } else {
          comments.value = [
            {
              username: props.author,
              contents: props.contents,
              created_at: props.postcreatedAt,
            },
            ...res.data,
          ];
        }
      })
      .catch((err) => {
        console.error(err);
        alert(
          "글 작성이 정상적으로 처리되지 않았습니다. " + err.response?.data
        );
      });
  } else {
    console.warn("postId가 없습니다.");
  }
};

const convertTime = (atTime, currTime) => {
  console.log("시간이오다" + atTime + "," + currTime);
  if (atTime !== null) {
    const timeDiff = currTime - new Date(atTime);

    if (timeDiff < 0) {
      return "지금";
    }

    const sec = Math.floor(timeDiff / 1000);
    const min = Math.floor(sec / 60);
    const hours = Math.floor(min / 60);
    const days = Math.floor(hours / 24);

    if (days === 0) {
      if (hours === 0) {
        if (min === 0) {
          return sec + "초 전";
        } else {
          return min + "분 전";
        }
      } else {
        return hours + "시간 전";
      }
    } else if (days === 1) {
      return "어제";
    } else if (days < 7) {
      return days + "일 전";
    } else {
      return days / 7 + "주 전";
    }
  } else {
    return "무량공처";
  }
};
</script>
<style scoped>
.comments-wrap {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1em; /* 댓글 간의 간격 */
  padding: 1.5em;
  overflow-y: auto;
  max-height: 400px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.comments-wrap::-webkit-scrollbar {
  display: none;
}

.comment {
  height: 70px; /* 고정된 높이로 설정 */
  display: grid;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
}

.author-id {
  grid-row: 1;
  grid-column: 3/18;
  text-align: left;
  font-size: 11pt;
}

.comment-time {
  grid-row: 2;
  grid-column: 3/18;
  text-align: left;
  font-size: 9pt;
}

.bold {
  font-weight: 550;
}
</style>
