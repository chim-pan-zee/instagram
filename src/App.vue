<template>
  <div class="app-wrapper">
    <!-- <RouterLink to="/signin">로그인</RouterLink> -->
    <menu-list
      class="menu-list"
      @open-modal="isMakePostModal = true"
    ></menu-list>
    <router-view class="router-view" />
    <make-post-modal
      class="make-post-modal"
      v-if="isMakePostModal"
      @close-modal="isMakePostModal = false"
    ></make-post-modal>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import MenuList from "./components/MenuComponents/MenuList.vue";
import MakePostModal from "./components/Modals/MakePostModal.vue";

import { ref } from "vue";

const isMakePostModal = ref(false);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.app-wrapper {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 0.1fr));
  grid-template-rows: repeat(12, minmax(0, 0.1fr));
}

.menu-list {
  grid-column: 1 / 3;
  grid-row: 1/13;

  border-right-width: 1px;
  border-right-color: #d9d9d9;
  border-right-style: solid;
}

.router-view {
  grid-column: 3 / 13;
  grid-row: 1/13;
}

.make-post-modal {
  grid-column: 5 / 9;
  grid-row: 3/11;
}

.detail-view-modal {
  grid-column: 2 / 12;
  grid-row: 2/12;

  z-index: 1;
}
</style>
