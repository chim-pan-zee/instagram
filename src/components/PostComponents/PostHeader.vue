<template>
  <div class="post-header">
    <button class="user-profile-img">
      <profile-image class="profile-image"></profile-image>
    </button>
    <button class="user-id">
      {{ userId }}<b> • {{ convertTime(props.createdAt, currentTime) }}</b>
    </button>

    <button
      class="post-option"
      @click="controlModal"
      v-if="userId == Cookies.get('userId')"
    >
      <img src="/assets/icons/ellipsis-8.svg" alt="" />
    </button>
    <post-edit-modal
      @close="controlModal"
      @update="updatePostModal"
      :postId="props.postId"
      v-if="isModalVisible"
    ></post-edit-modal>
  </div>
</template>

<script setup>
import ProfileImage from "../ProfileComponents/ProfileImage.vue";
import PostEditModal from "../Modals/PostModals/PostEditModal.vue";
import { ref, defineProps, onMounted, defineEmits } from "vue";
import Cookies from "js-cookie";

const userId = ref("");
const userUUID = ref("");
const isModalVisible = ref(false);

const emit = defineEmits(["updatePost"]);

const updatePostModal = () => {
  console.log("업뎃ㄱ");
  emit("updatePost");
};

const props = defineProps({
  userId: String,
  userUUID: String,
  createdAt: String,
  postId: String,
});

onMounted(() => {
  userId.value = props.userId;
  userUUID.value = props.userUUID;
});

const controlModal = () => {
  isModalVisible.value = !isModalVisible.value;
};

const currentTime = ref(new Date());
const convertTime = (atTime, currTime) => {
  if (atTime !== null) {
    const timeDiff = currTime - new Date(atTime);

    if (timeDiff < 0) {
      return "지금";
    }

    const sec = Math.floor(timeDiff / 1000);
    const min = Math.floor(sec / 60);
    const hours = Math.floor(min / 60);
    const days = Math.floor(hours / 24);

    if (days === 0) {
      if (hours === 0) {
        if (min === 0) {
          return sec + "초 전";
        } else {
          return min + "분 전";
        }
      } else {
        return hours + "시간 전";
      }
    } else if (days === 1) {
      return "어제";
    } else if (days < 7) {
      return days + "일 전";
    } else {
      return days / 7 + "주 전";
    }
  } else {
    return "무량공처";
  }
};
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
  grid-column: 2/ 8;
  text-align: left;
  border: none;
  background: none;
  outline: none;
}

.user-id b {
  color: rgb(110, 110, 110);
}

.post-option {
  grid-column: 10/11;
  border: none;
  background: none;
  outline: none;
}

.post-option img {
  width: 100%;
  height: auto;
}

.post-option:hover {
  cursor: pointer;
}
</style>
