<template>
  <div class="profile-img-wrap">
    <img v-if="!fileName" :src="selectedFile" alt="프로필 이미지" />
    <img v-else :src="`/upload/${fileName}`" alt="프로필 이미지" />
  </div>
</template>

<script setup>
import axios from "axios";
// import Cookies from "js-cookie";
import { ref, defineProps, watch } from "vue";

// import { defineProps, computed } from "vue";
// import DefaultProfileImg from "";

const props = defineProps({
  filename: String,
});

// const imgPath = computed(() => {
//   switch (props.filename) {
//     default:
//       return DefaultProfileImg;
//   }
// });
const selectedFile = ref("/assets/icons/Default_pfp.svg");
// const otherFileName = ref("");
// const isLocalImg = ref(true);
const fileName = ref("");
watch(
  () => {
    return props.filename;
  },
  (newVal) => {
    console.log(newVal + " 이름이,");
    // if (newVal != Cookies.get("username")) {
    // console.log("다르다");
    // isLocalImg.value = false;
    getUserProfileImage(newVal);
    // } else {
    //   isLocalImg.value = true;
    // }
  }
);

const getUserProfileImage = (username) => {
  console.log("프로필사진이름왔습니다", username);
  axios
    .get(`/file/${username}`)
    .then((res) => {
      if (res.data != null) {
        fileName.value = res.data;
        console.log("받았습니다", res.data);
      } else {
        fileName.value = "";
        console.log("넓입니다" + res.data);
      }
    })
    .catch((err) => {
      console.error("이미지 불러오던 중 에러", err);
      alert("이미지 정상적으로 처리되지 않았습니다. " + err.response?.data);
    });
};
</script>

<style scoped>
.profile-img-wrap img {
  border-radius: 9999px;
  width: 100%;
  height: 100%;
  border-style: solid;
  border-width: 1px;
  border-color: silver;
}
</style>
