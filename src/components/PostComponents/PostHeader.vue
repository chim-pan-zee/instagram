<template>
  <div class="post-header">
    <button class="user-profile-img">
      <profile-image class="profile-image"></profile-image>
    </button>
    <button class="user-id">{{ userId }}</button>
  </div>
</template>

<script setup>
import ProfileImage from "../ProfileComponents/ProfileImage.vue";
import { ref, defineProps, onMounted } from "vue";

const userId = ref("");
const userUUID = ref("");

const props = defineProps({
  userId: String,
  userUUID: String,
});

onMounted(() => {
  userId.value = props.userId;
  userUUID.value = props.userUUID;
});
</script>

<style>
.post-header {
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  gap: 0.5em;
}

.user-profile-img {
  border: none;
  background: none;
  outline: none;
}

.user-id {
  grid-column: 2/ 4;
  text-align: left;
  border: none;
  background: none;
  outline: none;
}
</style>
