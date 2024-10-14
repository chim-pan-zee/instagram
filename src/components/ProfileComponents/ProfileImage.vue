<template>
  <div class="profile-img-wrap">
    <img :src="imgPath" alt="프로필 이미지" />
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import DefaultProfileImg from "@/assets/defaults/Default_pfp.svg";

const props = defineProps({
  filename: String,
});

const imgPath = computed(() => {
  switch (props.filename) {
    default:
      return DefaultProfileImg;
  }
});
</script>

<style scoped>
.profile-img-wrap img {
  border-radius: 9999px;
  width: 100%;
  height: auto;
  border-style: solid;
  border-width: 1px;
  border-color: silver;
}
</style>
