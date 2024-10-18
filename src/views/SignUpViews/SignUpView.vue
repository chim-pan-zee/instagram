<template>
  <div class="signup-view-wrapper">
    <SignUpForm class="view-signup-form-wrap" />
    <div class="signup-base-wrapper">
      <b>계정이 있으세요?</b>
      <RouterLink to="/signin" class="sign-in-link">로그인</RouterLink>
    </div>
  </div>
</template>

<script setup>
import SignUpForm from "@/components/SignUpComponents/SignUpForm.vue";
import { RouterLink } from "vue-router";
</script>

<style>
.signup-view-wrapper {
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 0.5fr));
  grid-template-rows: repeat(10, minmax(0, 0.2fr));
}

.view-signup-form-wrap {
  grid-column: 2 / 9;
  grid-row: 2 / 8;
}

.signup-base-wrapper {
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: rgb(255, 255, 255);
  grid-column: 3 / 7;
  grid-row: 8;
}

.login-form-wrap {
  grid-column: 6 / 12;
  grid-row: 1 / 4;
}

.sign-in-link {
  color: rgb(34, 152, 255);
}
</style>
