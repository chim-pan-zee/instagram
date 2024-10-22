<template>
  <div class="home-wrap">
    <div class="posts-wrap">
      <div
        class="posts"
        v-for="(post, index) in posts"
        :key="index"
        :id="'post-' + index"
      >
        <post-header
          :userUUID="post.user_uuid"
          :userId="post.username"
          :created-at="post.created_at"
          :postId="post.post_uuid"
          @updatePost="openUpdateModal(post.post_uuid, post.post_content)"
          class="post-header"
        ></post-header>
        <post-contents
          :postId="post.post_uuid"
          class="post-content fit"
          @postLike="postLike = !postLike"
        ></post-contents>
        <post-info
          :postId="post.post_uuid"
          :contents="post.content"
          :userId="post.username"
          :postLike="postLike"
          class="post-info"
          @openModal="openModal(post.post_uuid)"
        ></post-info>
      </div>
    </div>
    <div class="follow-wrap"></div>
    <detail-view-modal
      class="detail-view-modal"
      v-if="isDetailViewModal"
      :postId="postId"
      @closeModal="closeModal"
    ></detail-view-modal>
    <update-post-modal
      v-if="isUpdateModal == true"
      :postId="postId"
      :postContent="postContent"
      @closeModal="isUpdateModal = false"
    ></update-post-modal>
  </div>
</template>

<script setup>
import PostHeader from "@/components/PostComponents/PostHeader.vue";
import PostInfo from "@/components/PostComponents/PostInfo.vue";
import PostContents from "@/components/PostComponents/PostContents.vue";
import DetailViewModal from "@/components/Modals/PostModals/DetailViewModal.vue";
import UpdatePostModal from "@/components/Modals/PostModals/UpdatePostModal.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const authorToken = window.localStorage.getItem("user_token");

const posts = ref([]);
const isDetailViewModal = ref(false);
const isUpdateModal = ref(false);
const postId = ref("");
const postContent = ref("");
const postLike = ref(false);
let isLoading = false;
let page = ref(0);

const openUpdateModal = (id, contents) => {
  console.log("연다");
  isUpdateModal.value = true;
  postId.value = id;
  postContent.value = contents;
};

onMounted(() => {
  if (!authorToken) {
    router.push("/signin");
  }

  loadPosts();
  window.addEventListener("scroll", handleScroll);
});

const loadPosts = () => {
  if (isLoading) return;

  isLoading = true;
  const userData = {
    page: page.value,
  };

  axios
    .post("/p", userData)
    .then((res) => {
      if (res.data && res.data.length > 0) {
        posts.value = [...posts.value, ...res.data];
        page.value++;
      }
      isLoading = false;
    })
    .catch((err) => {
      console.error("포스트 불러오던 중 에러", err);
      alert("글 작성이 정상적으로 처리되지 않았습니다. " + err.response?.data);
      isLoading = false;
    });
};

const checkVisible = (elementId) => {
  const element = document.getElementById(elementId);

  if (!element) {
    return false;
  } else {
    const viewportHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;
    const y = element.getBoundingClientRect().top + scrollTop;
    const elementHeight = element.offsetHeight;

    return y < viewportHeight + scrollTop && y > scrollTop - elementHeight;
  }
};

const handleScroll = () => {
  const targetId = `post-${posts.value.length - 1}`;

  if (checkVisible(targetId)) {
    loadPosts();
  }
};

const openModal = (id) => {
  postId.value = id;
  isDetailViewModal.value = true;
  console.log(postId.value);
  window.history.pushState(null, "", `/p/${id}`);
};

const closeModal = () => {
  isDetailViewModal.value = false;
  window.history.pushState(null, "", `/`);
};
</script>

해당 코드에서, v-for의 post의 댓글을 눌러

<style>
.observer-target {
  height: 1px;
}
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
  grid-row: 2/11;
  background-color: #e2e2e2;
}

.post-info {
  grid-column: 1;
  grid-row: 11/14;
}

.follow-wrap {
  grid-column: 7 / 9;
  grid-row: 1;
}

.fit {
  object-fit: cover;
}
</style>
