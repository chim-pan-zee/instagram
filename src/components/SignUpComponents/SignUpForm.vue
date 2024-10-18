<template>
  <div class="login-wrap">
    <div class="login-form">
      <img src="/assets/icons/instalogo.png" alt="" />
      <div>
        <input
          placeholder="이메일/전화번호"
          v-model="userAddress"
          @blur="inputCheck('userAddress')"
        />
        <p v-if="userAddressError" class="error-message">
          {{ userAddressError }}
        </p>
      </div>
      <div>
        <input
          placeholder="사용자 id"
          v-model="userId"
          @blur="inputCheck('userId')"
        />
        <p v-if="userIdError" class="error-message">{{ userIdError }}</p>
      </div>
      <div>
        <input
          placeholder="성명"
          v-model="userName"
          @blur="inputCheck('userName')"
        />
        <p v-if="userNameError" class="error-message">{{ userNameError }}</p>
      </div>
      <div>
        <input
          placeholder="비밀번호"
          v-model="userPassword"
          type="password"
          @blur="inputCheck('userPassword')"
        />
        <p v-if="userPasswordError" class="error-message">
          {{ userPasswordError }}
        </p>
      </div>
      <div>
        <input
          placeholder="비밀번호 확인"
          v-model="passwordConfirm"
          type="password"
        />
        <p v-if="passwordConfirmError" class="error-message">
          {{ passwordConfirmError }}
        </p>
      </div>
      <button
        class="submit-button"
        @click="userSignUp"
        :class="{ disabled: isDisabled }"
        :disabled="isDisabled"
      >
        Sign Up
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";

const emailPattern =
  /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
const phonePattern = /^(01[0-9]{1}-?[0-9]{4}-?[0-9]{4}|01[0-9]{8})$/;
const idPattern = /^[A-Za-z0-9]{3,30}$/;
const namePattern = /^[가-힣]{2,30}|[a-zA-Z]{2,30}\s[a-zA-Z]{2,30}$/;
// var passwordPattern = /^[a-zA-Z0-9`~!@#$%^&*()-_=+|[]{};:'",.<>?]{3,24}$/;

const userAddress = ref("");
const userId = ref("");
const userName = ref("");
const userPassword = ref("");
const passwordConfirm = ref("");
const userAddressType = ref("");

const userAddressError = ref("");
const userIdError = ref("");
const userNameError = ref("");
const userPasswordError = ref("");
const passwordConfirmError = ref("");
const passwordConfirmBool = ref(false);

const isDisabled = ref(true);

const checkFormValidity = () => {
  if (
    !userAddressError.value &&
    !userIdError.value &&
    !userNameError.value &&
    !userPasswordError.value &&
    passwordConfirmBool.value &&
    userAddress.value &&
    userId.value &&
    userName.value &&
    userPassword.value &&
    passwordConfirm.value
  ) {
    isDisabled.value = false;
  } else {
    isDisabled.value = true;
  }
};

watch(
  [userAddress, userId, userName, userPassword, passwordConfirm],
  checkFormValidity
);

const inputCheck = (inputType) => {
  userAddressError.value = "";
  userIdError.value = "";
  userNameError.value = "";
  userPasswordError.value = "";
  passwordConfirmError.value = "";

  if (inputType === "userAddress") {
    if (emailPattern.test(userAddress.value)) {
      userAddressType.value = "user_email";
      dupeCheck(userAddressType.value, userAddress.value);
    } else if (phonePattern.test(userAddress.value)) {
      userAddressType.value = "user_phone";
      dupeCheck(userAddressType.value, userAddress.value);
    } else {
      userAddressError.value = "경고:정확한 주소가 아닙니다.";
    }
  } else if (inputType === "userId") {
    if (idPattern.test(userId.value)) {
      dupeCheck("user_id", userId.value);
    } else {
      userIdError.value = "경고:사용할 수 없는 사용자 이름입니다.";
    }
  } else if (inputType === "userName") {
    if (namePattern.test(userName.value)) {
      console.log("이름이 정상");
    } else {
      userNameError.value = "경고:이름을 정확히 입력하세요.";
    }
    // } else if (inputType === "userPassword") {
    //   if (passwordPattern.test(userPassword.value)) {
    //     console.log("비밀번호가 유효합니다.");
    //   } else {
    //     userPasswordError.value =
    //       "경고:올바른 형식이 아닙니다.";
    //   }
    // }
  }
};

const dupeCheck = (inputType, inputVal) => {
  axios
    .get(`/check/${inputType}/${inputVal}`)
    .then((res) => {
      console.log(res.data);
      if (res.data === false) {
        return false;
      } else {
        return true;
      }
    })
    .catch((err) => {
      console.error(err + " 이런 젠장 발사도 안됐다");
    });
};

watch([passwordConfirm, userPassword], () => {
  if (passwordConfirm.value == userPassword.value) {
    passwordConfirmBool.value = true;
  } else {
    passwordConfirmBool.value = false;
    passwordConfirmError.value = "비밀번호가 일치하지 않습니다.";
  }
});
</script>

<style scoped>
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

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

.login-wrap {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: repeat(12, minmax(0, 0.2fr));
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

  grid-template-rows: repeat(8, minmax(0, 0.2fr));
  gap: 0.5em;
  padding: 0.5em;
}

.login-form img {
  width: auto;
  height: 100%;
}

.submit-button {
  background-color: rgb(55, 162, 255);
  width: 70%;
  height: 100%;
  border-radius: 10px;
  font-size: 13pt;
  font-weight: 700;
  color: white;
  grid-row: 7;
}

.submit-button:hover {
  cursor: pointer;
}

.submit-button.disabled {
  background-color: rgb(146, 208, 255);
  cursor: default;
}

.submit-button:disabled {
  background-color: rgb(146, 208, 255);
  cursor: default;
}
</style>
