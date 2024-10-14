<template>
  <div class="menu-wrap">
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
    <base-menu-button filename="bars-solid.svg" class="more-button">
      <template v-slot:text>
        <p>더보기</p>
      </template>
    </base-menu-button>
  </div>
</template>

<script setup>
import BaseMenuButton from "@/components/BaseElements/BaseMenuButton.vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { ref } from "vue";

const router = useRouter();

const pushHome = () => {
  router.push({
    path: "/",
  });
};

const pushProfile = () => {
  const userId = ref(Cookies.get("userId"));

  router.push({ name: "profile", params: { id: userId.value } });
};
</script>

<style scoped>
.menu-wrap {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-rows: repeat(12, minmax(0, 1fr));
  padding: 5%;
  position: sticky;
  top: 0;
  height: 100vh;
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
