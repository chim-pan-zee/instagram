<template>
  <div class="home-wrap">
    <div class="posts-wrap">
      <div class="posts" v-for="(post, index) in posts" :key="index">
        <post-header
          :userUUID="post.user_uuid"
          :userId="post.user_id"
          class="post-header"
        ></post-header>
        <post-contents
          :postId="post.post_uuid"
          class="post-content"
        ></post-contents>
        <post-info
          :postId="post.post_uuid"
          :contents="post.content"
          :userId="post.user_id"
          class="post-info"
        ></post-info>
      </div>
    </div>
    <div class="follow-wrap"></div>
  </div>
</template>

<script setup>
import PostHeader from "@/components/PostComponents/PostHeader.vue";
import PostInfo from "@/components/PostComponents/PostInfo.vue";
import PostContents from "@/components/PostComponents/PostContents.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

const posts = ref([]);

onMounted(() => {
  loadPosts();
});

const loadPosts = () => {
  axios
    .get("/post")
    .then((res) => {
      console.log("글목록 데이터가 도착했습니다.", res.data);
      posts.value = res.data;
    })
    .catch((err) => {
      console.error("포스트 불러오던 중 에러", err);
      alert("글 작성이 정상적으로 처리되지 않았습니다. " + err.response?.data);
    });
};
</script>

<style>
.home-wrap {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  height: 100vh;
  height: 100%;
}

.posts-wrap {
  grid-column: 1 / 7;
  grid-row: 1;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(1fr, 1fr));
  padding-left: 14em;
  padding-right: 14em;
}

.posts {
  grid-column: 1;
  grid-row: auto;
  margin-top: 1em;
  height: 800px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  border-bottom-style: solid;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;

  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-rows: repeat(13, minmax(0, 1fr));
}

.post-header {
  grid-column: 1;
  grid-row: 1;
}

.post-content {
  grid-column: 1;
  grid-row: 2/12;
  background-color: #e2e2e2;
}

.post-info {
  grid-column: 1;
  grid-row: 12/14;
}

.follow-wrap {
  grid-column: 7 / 9;
  grid-row: 1;
}
</style>
