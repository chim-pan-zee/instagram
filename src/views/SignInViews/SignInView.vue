<template>
  <div class="login-view-wrapper">
    <LoginForm class="view-login-form-wrap" />
    <div class="login-base-wrapper">
      <b>계정이 없습니까?</b>
      <RouterLink to="/signup" class="sign-up-link">회원가입</RouterLink>
    </div>
  </div>
</template>

<script setup>
import LoginForm from "@/components/SignInComponents/SignInForm.vue";
import { RouterLink } from "vue-router";
</script>

<style>
.login-view-wrapper {
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 0.5fr));
  grid-template-rows: repeat(10, minmax(0, 0.2fr));
}

.view-login-form-wrap {
  grid-column: 2 / 9;
  grid-row: 2 / 8;
}

.login-base-wrapper {
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: rgb(255, 255, 255);
  grid-column: 3 / 7;
  grid-row: 8;
}

.sign-up-link {
  color: rgb(34, 152, 255);
}
</style>
