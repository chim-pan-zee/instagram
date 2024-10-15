<template>
  <div class="profile-info-wrap">
    <div class="user-id">
      <p><slot name="userId">loading</slot></p>
    </div>
    <base-button class="profile-edit-button" @click="toEdit"
      >프로필 편집</base-button
    >
    <div class="post-count">게시물 <slot name="posts">0</slot></div>
    <div class="followers">팔로워 <slot name="followers">0</slot></div>
    <div class="follows">팔로우 <slot name="follows">0</slot></div>
    <div class="user-name"><slot name="userName">로딩중</slot></div>
  </div>
</template>

<script setup>
import BaseButton from "../BaseElements/BaseButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const toEdit = () => {
  router.push("/edit");
};
</script>

<style scoped>
.profile-info-wrap {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-template-rows: repeat(8, minmax(0, 1fr));

  align-items: center;
}

.user-id {
  grid-column: 1/ 2;
  grid-row: 2;

  font-size: 20pt;
  text-align: left;
}

.profile-edit-button {
  grid-column: 3/ 4;
  grid-row: 2;
  background-color: silver;
  color: black;
}

.profile-edit-button:hover {
  cursor: pointer;
}

.post-count {
  grid-column: 1/ 2;
  grid-row: 4;
  text-align: left;
  font-size: 12pt;
}

.followers {
  grid-column: 2/ 3;
  grid-row: 4;
  text-align: left;
  font-size: 12pt;
}

.follows {
  grid-column: 3/ 4;
  grid-row: 4;
  text-align: left;
  font-size: 12pt;
}

.user-name {
  grid-column: 1/ 2;
  grid-row: 6;
  text-align: left;
  font-size: 12pt;
  font-weight: bold;
}
</style>
