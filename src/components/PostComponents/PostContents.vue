<template>
  <div>
    <!-- <div class="post-img fit" v-for="post in posts" :key="post.file_idx">
      <img
        class="fit"
        :src="`/upload/${post.file_name}`"
        :alt="post.file_name"
      />
    </div> -->
    <div class="post-image-contents">
      <div class="post-img-wrap fit">
        <img
          v-if="images.length > 0 && images[currentIndex]"
          :src="`/upload/${images[currentIndex].file_name}`"
          alt="image"
          class="full-image fit"
          @dblclick="$emit('postLike')"
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
  </div>
</template>

<script setup>
import axios from "axios";
import { defineProps, onMounted, ref } from "vue";

const postId = ref("");
const images = ref([]);
const currentIndex = ref(0);

const props = defineProps({
  postId: String,
});

// const posts = ref([]);

onMounted(() => {
  loadPosts();
});

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
</script>

<style>
.post-img-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid #ececec;
}

.post-img-wrap img {
  width: 100%;
  height: 540px;
  object-fit: cover;
  border-radius: 1%;
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

.fit {
  object-fit: cover;
}
</style>
