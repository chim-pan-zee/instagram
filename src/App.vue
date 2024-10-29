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
import Cookies from "js-cookie";
import axios from "axios";
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

const checkTokenExpiration = () => {
  const accessUUID = localStorage.getItem("user_uuid");
  const tokenReceivedTime = Cookies.get("tokenReceivedTime");
  if (accessUUID) {
    const currentTime = Math.floor(Date.now() / 1000);
    console.log(tokenReceivedTime);
    console.log(currentTime);
    console.log(currentTime - tokenReceivedTime);
    if (currentTime - tokenReceivedTime > 30) {
      //30분 조금 안되는 시간
      const refreshUUID = localStorage.getItem("user_refresh_uuid");
      refreshTokenRequire(accessUUID, refreshUUID);
    }
  }
};

const refreshTokenRequire = (accessUUID, refreshUUID) => {
  const UUIDs = {
    accessUUID: accessUUID,
    refreshUUID: refreshUUID,
  };
  axios
    .post("/refresh", UUIDs)
    .then((res) => {
      localStorage.setItem("user_uuid", res.data.user_uuid);
      localStorage.setItem("user_refresh_uuid", res.data.user_refresh_uuid);
      Cookies.set("tokenReceivedTime", Math.floor(Date.now() / 1000));
    })
    .catch((err) => {
      console.error("토큰 불러오던 중 에러", err);
      alert("글 작성이 정상적으로 처리되지 않았습니다. " + err.response?.data);
    });
};

// setInterval(() => {
//   checkTokenExpiration();
// }, 30000); //30초마다 확인함

setInterval(() => {
  checkTokenExpiration();
}, 10000); //30초마다 확인함

//spring에 존재하는 토큰의 제한시간은 30분임.
//약 27분 쯤에 토큰을 다시 불러야 함.
//30초마다 토큰의 남은 시간을 체크하고, 남은 시간이 3분 이하일 경우 서버로 호출.
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
