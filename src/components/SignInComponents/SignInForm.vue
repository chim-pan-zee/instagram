<template>
  <div class="login-wrap">
    <div class="login-form">
      <img src="/assets/icons/instalogo.png" alt="" />

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

const fileName = ref("");

const inputCheck = (inputType) => {
  if (inputType == "userName") {
    if (emailPattern.test(userName.value) === true) {
      userNameType.value = "email";
    } else if (phonePattern.test(userName.value) === true) {
      userNameType.value = "phone";
    } else if (idPattern.test(userName.value) === true) {
      userNameType.value = "username";
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
        localStorage.setItem("user_uuid", res.data.user_uuid);
        localStorage.setItem("user_refresh_uuid", res.data.user_refresh_uuid);
        Cookies.set("username", res.data.username, { path: "" });
        Cookies.set("name", res.data.name, { path: "" });
        Cookies.set("tokenReceivedTime", Math.floor(Date.now() / 1000));
        console.log(
          Cookies.get("tokenReceivedTime"),
          "이봐 이 토큰리시브타임이라는거 정말 좋은데"
        );
        getUserProfileImage(res.data.username);
        // console.log(localStorage.getItem("user_uuid") + "로컬스토리지토큰");
        console.log(localStorage.getItem("user_uuid") + "로컬스토리지uuid");
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

const getUserProfileImage = (username) => {
  axios
    .get(`/file/${username}`)
    .then((res) => {
      if (res.data != null) {
        fileName.value = res.data;
        console.log("넓입니다" + res.data);
        Cookies.set("fileName", fileName.value);
      } else {
        fileName.value = null;
        console.log("넓입니다" + res.data);
        Cookies.set("fileName", fileName.value);
      }
    })
    .catch((err) => {
      console.error("이미지 불러오던 중 에러", err);
      alert("이미지 정상적으로 처리되지 않았습니다. " + err.response?.data);
    });
};
</script>

<style scoped>
.login-wrap {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: repeat(12, minmax(0, 0.2fr));
  gap: 1em;
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

  grid-template-rows: repeat(20, minmax(0, 0.05fr));
  /* gap: 20px; */
}

.login-form img {
  width: auto;
  height: 100%;
}

.id-input {
  grid-row: 2/5;
}

.pw-input {
  grid-row: 6/9;
}

input {
  border-width: 1px;
  border-radius: 5px;
  background-color: rgb(230, 230, 230);
  border-color: rgb(192, 192, 192);
  width: 70%;
  height: 100%;
  outline: none;
  border-style: solid;
}
.submit-button {
  background-color: rgb(55, 162, 255);
  width: 70%;
  height: 100%;
  border-radius: 10px;
  font-size: 13pt;
  font-weight: 700;
  color: white;
  grid-row: 10/13;
}
</style>
