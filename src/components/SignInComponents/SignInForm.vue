<template>
  <div class="login-wrap">
    <div class="login-form">
      <base-input
        placeholder="이메일, 전화번호, 혹은 사용자 ID"
        class="id-input"
        v-model="userName"
        @blur="inputCheck('userName')"
      />
      <base-input
        placeholder="비밀번호"
        type="password"
        class="pw-input"
        v-model="userPassword"
        @blur="inputCheck('userPassword')"
      />
      <base-button class="submit-button" @click="signInUser"
        >Sign In</base-button
      >
    </div>
  </div>
</template>

<script setup>
import BaseInput from "@/components/BaseElements/BaseInput.vue";
import BaseButton from "@/components/BaseElements/BaseButton.vue";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

const router = useRouter();

var emailPattern =
  /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
var phonePattern = /^(01[0-9]{1}-?[0-9]{4}-?[0-9]{4}|01[0-9]{8})$/;
var idPattern = /^[A-Za-z0-9]{3,30}$/;
var passwordPattern = /^[a-zA-Z0-9`~!@#$%^&*()\-_=+|[\]{};:',.<>/?]{3,24}$/;

const userName = ref("");
const userNameType = ref(null);
const userPassword = ref("");

const inputCheck = (inputType) => {
  if (inputType == "userName") {
    if (emailPattern.test(userName.value) === true) {
      userNameType.value = "user_email";
    } else if (phonePattern.test(userName.value) === true) {
      userNameType.value = "user_phone";
    } else if (idPattern.test(userName.value) === true) {
      userNameType.value = "user_id";
    } else {
      console.log("그 무엇도 아님");
    }
  } else if (inputType == "userPassword") {
    if (passwordPattern.test(userPassword.value) === true) {
      console.log("비번맞음출력(나중에추가하겠지)");
    } else {
      console.log("비번양식틀림 " + userPassword.value);
    }
  }
};

const signInUser = () => {
  if (userNameType.value !== null) {
    const signInData = {
      userNameType: userNameType.value,
      userName: userName.value,
      userPassword: userPassword.value,
    };

    axios
      .post("/signin", signInData)
      .then((res) => {
        localStorage.setItem("user_token", res.data.user_token);
        Cookies.set("userId", res.data.user_id, { expires: 7, path: "" });
        Cookies.set("userName", res.data.user_name, { expires: 7, path: "" });
        console.log("전송됨", res.data);
        console.log("쿠키:" + Cookies.get("userId"));
        console.log("토큰:" + localStorage.getItem("user_token"));
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
        alert(
          "글 작성이 정상적으로 처리되지 않았습니다. " +
            err.data +
            "관리자에게 문의 바랍니다."
        );
      });
  } else {
    console.log("타입이 없습니다");
  }
};
</script>

<style scoped>
.login-wrap {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: repeat(12, minmax(0, 0.2fr));
  gap: 20px;
}

.login-form {
  grid-column: 3 / 9;
  grid-row: 1 / 12;

  background-color: white;
  border-style: solid;
  border-color: rgb(191, 191, 191);
  border-width: 1px;
  border-radius: 5px;

  display: grid;
  place-items: center;

  grid-template-rows: repeat(20, minmax(0, 0.2fr));
  /* gap: 20px; */
}

.id-input {
  grid-row: 5;
}

.pw-input {
  grid-row: 9;
}

.submit-button {
  grid-row: 13;
}
</style>
