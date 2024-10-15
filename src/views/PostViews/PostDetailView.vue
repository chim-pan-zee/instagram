<template>
  <div class="profile-wrap">
    <div class="my-posts">
      <div class="post" v-for="(image, index) in images" :key="index">
        <button
          @click="
            [openModal(image.post_uuid, image.image_path, image.created_at)]
          "
        >
          <img :src="image.image_path" alt="" />
        </button>
      </div>
    </div>
    <detail-view-modal
      class="detail-view-modal"
      v-if="isDetailViewModal"
      :postId="postId"
      :imagePath="imagePath"
      :createdAt="createdAt"
    ></detail-view-modal>
  </div>
</template>

<script setup>
import DetailViewModal from "@/components/Modals/PostModals/DetailViewModal.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

// const router = useRouter();

const authorToken = window.localStorage.getItem("user_token");
const currUrl = ref("");
const userId = ref("");
const userName = ref("");
const postId = ref("");
const imagePath = ref("");
const createdAt = ref("");

const isDetailViewModal = ref(false);

const formData = new FormData();

const images = ref([]);

onMounted(() => {
  currUrl.value = window.location.href;
  const parts = currUrl.value.split("/");
  userId.value = parts[parts.length - 1];

  console.log("아이디 " + userId.value);

  axios
    .get(`/${userId.value}`)
    .then((res) => {
      userName.value = res.data.USER_NAME;
    })
    .catch((err) => {
      console.error(err + " 이런 젠장 발사도 안됐다!");
    });

  const infoData = {
    userId: userId.value,
    userToken: authorToken,
  };

  formData.append(
    "key",
    new Blob([JSON.stringify(infoData)], { type: "application/json" })
  );

  axios
    .post(`/${userId.value}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      console.log("전송됨", res.data);
      images.value = res.data;
      console.log("경로는: " + images.value);
    })
    .catch((err) => {
      console.error(err + " 이런 젠장 발사도 안됐다!!");
    });
});

const openModal = (id, path, time) => {
  postId.value = id;
  imagePath.value = path;
  createdAt.value = time;

  console.log("아디는:" + postId.value + " 경로는: " + imagePath.value);

  isDetailViewModal.value = true;

  window.history.pushState(null, "", `/p/${id}`);
};
</script>

<style></style>
