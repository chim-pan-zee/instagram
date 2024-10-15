<template>
  <div class="post-contents">
    <div class="post-img fit" v-for="post in posts" :key="post.file_idx">
      <img
        class="fit"
        :src="`/upload/${post.file_name}`"
        :alt="post.file_name"
      />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { defineProps, onMounted, ref } from "vue";

const postId = ref("");

const props = defineProps({
  postId: String,
});

const posts = ref([]);

onMounted(() => {
  loadPosts();
});

const loadPosts = () => {
  postId.value = props.postId;
  axios
    .get(`/p/file/${postId.value}`)
    .then((res) => {
      posts.value = res.data;
      console.log("이미지 데이터가 도착했습니다.", res.data);
    })
    .catch((err) => {
      console.error("이미지 불러오던 중 에러", err);
      alert("이미지 정상적으로 처리되지 않았습니다. " + err.response?.data);
    });
};
</script>

<style>
.post-contents {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  border-radius: 1%;
}

.post-img {
  grid-column: 1;
  grid-row: 1;
  background-color: black;
  align-content: center;
  border-radius: 1%;
  border-style: solid;
  border-width: 1px;
  border-color: #ececec;
}

.post-img img {
  width: 100%;
  height: auto;
  max-height: 100%;
  border-radius: 1%;
}

.fit {
  object-fit: cover;
}
</style>
