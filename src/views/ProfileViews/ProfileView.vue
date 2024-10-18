<template>
  <div class="profile-wrap">
    <header>
      <profile-image class="profile-image"></profile-image>

      <profile-info class="profile-info" :userId="userId">
        <template #userId>{{ userId }}</template>
        <template #posts>{{ postCount }}</template>
        <template #followers></template>
        <template #follows></template>
        <template #userName>{{ userName }}</template>
      </profile-info>
    </header>

    <div class="my-posts">
      <div class="post" v-for="(image, index) in images" :key="index">
        <button
          @click="
            openModal(image.post_uuid, image.image_path, image.created_at)
          "
        >
          <img :src="image.image_path" alt="" class="fit" />
        </button>
      </div>
    </div>
    <detail-view-modal
      class="detail-view-modal"
      v-if="isDetailViewModal"
      :postId="postId"
      :imagePath="imagePath"
      :createdAt="createdAt"
      @closeModal="closeModal"
    ></detail-view-modal>
  </div>
</template>

<script setup>
import ProfileImage from "@/components/ProfileComponents/ProfileImage.vue";
import ProfileInfo from "@/components/ProfileComponents/ProfileInfo.vue";
import DetailViewModal from "@/components/Modals/PostModals/DetailViewModal.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

const authorToken = window.localStorage.getItem("user_token");
const currUrl = ref("");
const userId = ref("");
const userName = ref("");
const postId = ref("");
const imagePath = ref("");
const createdAt = ref("");
const postCount = ref("");

const isDetailViewModal = ref(false);
const images = ref([]);

onMounted(() => {
  currUrl.value = window.location.href;
  const parts = currUrl.value.split("/");
  userId.value = parts[parts.length - 1];

  axios
    .get(`/${userId.value}`)
    .then((res) => {
      userName.value = res.data.USER_NAME;
      postCount.value = res.data.total;
    })
    .catch((err) => {
      console.error(err + " 이런 젠장 발사도 안됐다!");
    });

  const infoData = {
    userId: userId.value,
    userToken: authorToken,
  };

  const formData = new FormData();
  formData.append(
    "key",
    new Blob([JSON.stringify(infoData)], { type: "application/json" })
  );

  axios
    .post("/info", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      images.value = res.data;
    })
    .catch((err) => {
      console.error(err + " 이런 젠장 발사도 안됐다!!");
    });
});

const openModal = (id, path, time) => {
  postId.value = id;
  imagePath.value = path;
  createdAt.value = time;
  isDetailViewModal.value = true;
  window.history.pushState(null, "", `/p/${id}`);
};

const closeModal = () => {
  isDetailViewModal.value = false;
  window.history.pushState(null, "", `/${userId.value}`);
};
</script>

<style>
.profile-wrap {
  display: grid;
  grid-template-columns: 1fr;
  padding: 3em;
  max-width: 1200px; /* 최대 폭 설정 */
  margin: 0 auto; /* 중앙 정렬 */
}

.profile-wrap header {
  border-bottom: 1px solid silver;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
}

.profile-image {
  grid-column: 2 / 4;
}

.profile-info {
  grid-column: 5 / 10;
}

.my-posts {
  padding-top: 2em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;
}

.post {
  border: none;
  overflow: hidden;
  height: 350px;
}

.post button {
  width: 100%;
  height: 100%;
  background: none;
  border: none;
}

.post button img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.post button:hover {
  cursor: pointer;
}

.fit {
  object-fit: cover;
}
</style>
