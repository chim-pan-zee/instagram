<template>
  <div class="app-wrapper">
    <menu-list
      class="menu-list"
      v-if="!isAuthPage"
      @open-modal="openMakePostModal"
    />
    <router-view class="router-view" />
    <make-post-modal
      class="make-post-modal"
      v-if="isMakePostModal"
      @close-modal="closeMakePostModal"
    ></make-post-modal>
    <div
      class="modal-background"
      v-if="isMakePostModal"
      @click="closeMakePostModal"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import MenuList from "./components/MenuComponents/MenuList.vue";
import MakePostModal from "./components/Modals/PostModals/MakePostModal.vue";

const route = useRoute();

const isAuthPage = computed(() => {
  return route.path === "/signin" || route.path === "/signup";
});

const isMakePostModal = ref(false);
let scrollPosition = 0;

const openMakePostModal = () => {
  scrollPosition = window.scrollY;
  isMakePostModal.value = true;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = "100%";
  document.body.style.overflowY = "scroll";
};

const closeMakePostModal = () => {
  isMakePostModal.value = false;
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  document.body.style.overflowY = "";
  window.scrollTo(0, scrollPosition);
};
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
  grid-row: 1 / 13;
  border-right: 1px solid #d9d9d9;
}

.router-view {
  grid-column: 3 / 13;
  grid-row: 1 / 13;
}

.make-post-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: auto;
  z-index: 1000;
  border-radius: 8px;
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
</style>

