<template>
  <div class="menu-wrap">
    <div class="banner">
      <img src="/assets/icons/instalogo.png" alt="" />
    </div>
    <base-menu-button
      filename="house-solid.svg"
      class="home-button"
      @click="pushHome"
    >
      <template v-slot:text>
        <p>홈</p>
      </template>
    </base-menu-button>
    <base-menu-button
      filename="square-plus-regular.svg"
      class="make-button"
      @click="$emit('openModal')"
    >
      <template v-slot:text>
        <p>만들기</p>
      </template>
    </base-menu-button>
    <base-menu-button
      filename="profileImg"
      class="profile-button"
      @click="pushProfile"
    >
      <template v-slot:text>
        <p>프로필</p>
      </template>
    </base-menu-button>
    <base-menu-button
      filename="bars-solid.svg"
      class="more-button"
      @click="openMoreModal"
    >
      <template v-slot:text>
        <p>더보기</p>
      </template>
    </base-menu-button>
    <more-modal
      class="more-modal"
      v-if="isMoreModalVisible"
      @close="closeMoreModal"
      @logOut="logOut()"
    />
  </div>
</template>

<script setup>
import BaseMenuButton from "@/components/BaseElements/BaseMenuButton.vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { ref } from "vue";
import MoreModal from "@/components/Modals/MoreModal.vue";
import axios from "axios";

const router = useRouter();

const pushHome = () => {
  if (router.currentRoute.value.path === "/") {
    router.go(0);
  } else {
    router.push({
      path: "/",
    });
  }
};

const pushProfile = () => {
  const username = Cookies.get("username");

  if (router.currentRoute.value.name === "profile") {
    router.replace({ name: "profile", params: { id: username } });
    window.location.href = `/${username}`;
  } else {
    router.push({ name: "profile", params: { id: username } });
  }
};

const isMoreModalVisible = ref(false);

const openMoreModal = () => {
  isMoreModalVisible.value = true;
};

const closeMoreModal = () => {
  isMoreModalVisible.value = false;
};

const logOut = () => {
  localStorage.setItem("user_uuid", null);
  Cookies.set("username", null);
  Cookies.set("name", null);
  // router.push({
  //   path: "/signin",
  // });
  axios
    .post("/signout", localStorage.getItem("user_uuid"))
    .then((res) => {
      console.log(localStorage.getItem("user_uuid") + "로컬스토리지토큰" + res);
      localStorage.setItem("user_uuid", null);

      router.push("/signin");
    })
    .catch((err) => {
      console.error(err);
      alert(
        "로그아웃이 정상적으로 처리되지 않았습니다. " +
          err.data +
          "관리자에게 문의 바랍니다."
      );
    });
};
</script>

<style scoped>
button {
  outline: none;
}

.menu-wrap {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-rows: repeat(12, minmax(0, 1fr));
  padding: 5%;
  position: sticky;
  top: 0;
  height: 100vh;
}

.banner {
  grid-column: 1;
  grid-row: 1;
  object-fit: cover;
}

.banner img {
  width: 100%;
  height: 100%;
}

.home-button {
  grid-column: 1;
  grid-row: 2;
}

.make-button {
  grid-column: 1;
  grid-row: 3;
}

.profile-button {
  grid-column: 1;
  grid-row: 11;
}

.more-button {
  grid-column: 1;
  grid-row: 12;
}
</style>
