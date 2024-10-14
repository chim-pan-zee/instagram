<template>
  <div class="wrapper">
    <!-- <InfoBanner class="info-banner" /> -->
    <SignUpForm class="login-form-wrap" />
    <BaseWrapper class="base-wrapper">
      <template v-slot:text-slot>
        <p>계정이 있으세요?</p>
        <RouterLink to="/signin">로그인</RouterLink>
      </template>
    </BaseWrapper>
  </div>
</template>

<script setup>
import SignUpForm from "@/components/SignUpComponents/SignUpForm.vue";
// import InfoBanner from "@/components/BaseElements/BaseInfoBanner.vue";
import BaseWrapper from "@/components/BaseElements/BaseWrapper.vue";
import { RouterLink } from "vue-router";
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

.wrapper {
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 0.5fr));
  grid-template-rows: repeat(5, minmax(0, 0.2fr));
  gap: 10px;
}

.info-banner {
  grid-column: 2 / 2;
  grid-row: 1 / 1;
  width: 500px;
  height: 550px;
  object-fit: cover;
}

.login-form-wrap {
  grid-column: 6 / 12;
  grid-row: 1 / 4;
}

.base-wrapper {
  grid-column: 7 / 9;
  grid-row: 4 / 5;
}
</style>
