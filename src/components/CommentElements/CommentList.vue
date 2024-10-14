<template>
  <div class="comments-wrap">
    <div class="comment" v-for="(comment, index) in comments" :key="index">
      <profile-image></profile-image>
      <div class="author-id">
        {{ comment.user_id }}ㅤ
        {{ comment.contents }}
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, defineProps, onMounted, watch } from "vue";

const props = defineProps({
  postId: String,
  contents: String,
  refreshComments: Boolean,
  author: String,
});

const comments = ref([]);

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
            { user_id: props.author, contents: props.contents },
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
</script>

<style scoped>
.comments-wrap {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1em;
  padding: 1.5em;
  overflow-y: auto;
  max-height: 400px;
}

.comment {
  display: grid;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
}

.author-id {
  grid-row: 1/4;
  grid-column: 3/18;
  text-align: left;
}
</style>
