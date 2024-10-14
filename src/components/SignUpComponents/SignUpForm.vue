<template>
  <div class="login-wrap">
    <div class="login-form">
      <base-input
        placeholder="이메일/전화번호"
        v-model="userAddress"
        @blur="inputCheck('userAddress')"
      />
      <base-input
        placeholder="사용자 id"
        v-model="userId"
        @blur="inputCheck('userId')"
      />
      <base-input
        placeholder="성명"
        v-model="userName"
        @blur="inputCheck('userName')"
      />
      <base-input
        placeholder="비밀번호"
        v-model="userPassword"
        type="password"
        @blur="inputCheck('userPassword')"
      />
      <base-input
        placeholder="비밀번호 확인"
        v-model="passwordConfirm"
        type="password"
      />
      <BaseButton class="submit-button" @click="userSignUp">Sign Up</BaseButton>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "@/components/BaseElements/BaseInput.vue";
import BaseButton from "@/components/BaseElements/BaseButton.vue";
import { ref, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

var emailPattern =
  /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
var phonePattern = /^(01[0-9]{1}-?[0-9]{4}-?[0-9]{4}|01[0-9]{8})$/;
var idPattern = /^[A-Za-z0-9]{3,30}$/;
var namePattern = /^[가-힣]{2,30}|[a-zA-Z]{2,30}\s[a-zA-Z]{2,30}$/;
var passwordPattern = /^[a-zA-Z0-9`~!@#$%^&*()-_=+|[]{};:'",.<>?]{3,24}$/;

const userAddress = ref("");
const userAddressType = ref("");
const userId = ref("");
const userName = ref("");
const userPassword = ref("");
const passwordConfirm = ref("");
const passwordConfirmBool = ref(false);

const inputCheck = (inputType) => {
  if (inputType == "userAddress") {
    if (emailPattern.test(userAddress.value) === true) {
      userAddressType.value = "user_email";
      dupeCheck(userAddressType.value, userAddress.value);
    } else if (phonePattern.test(userAddress.value) === true) {
      userAddressType.value = "user_phone";
      dupeCheck(userAddressType.value, userAddress.value);
    } else {
      console.log("그 무엇도 아님");
    }
  } else if (inputType == "userId") {
    if (idPattern.test(userId.value) === true) {
      dupeCheck("user_id", userId.value);
    } else {
      console.log("경고출력(나중에추가하겠지) + " + userId.value);
    }
  } else if (inputType == "userName") {
    if (namePattern.test(userName.value) === true) {
      console.log("이름이 정상");
    }
  } else if (inputType == "userPassword") {
    if (passwordPattern.test(userPassword.value) === true) {
      console.log("비번맞음출력(나중에추가하겠지)");
    }
  }
};

const dupeCheck = (inputType, inputVal) => {
  axios
    .get(`/check/${inputType}/${inputVal}`) 
    .then((res) => {
      console.log(res.data);
      console.log(inputType, inputVal);
      if (res.data == false) {
        return false; 
      } else {
        return true;
      }
    })
    .catch((err) => {
      console.error(err + " 이런 젠장 발사도 안됐다");
    });
};

const userSignUp = () => {
  if (passwordConfirmBool.value === true) {
    const newUser = {
      userUUID: null,
      userAddress: userAddress.value,
      userEmail: null,
      userPhone: null,
      userId: userId.value,
      userName: userName.value,
      userPassword: userPassword.value,
    };
    axios
      .post("/signup", newUser)
      .then((res) => {
        if (res.data === true) {
          router.push("/signin");
        }
        console.log("전송됨", newUser.value);
      })
      .catch((err) => {
        console.error(err);
        alert(
          "글 작성이 정상적으로 처리되지 않았습니다. " +
            err.data +
            "관리자에게 문의 바랍니다."
        );
      });
  }
};

watch(passwordConfirm, async () => {
  if (passwordConfirm.value == userPassword.value) {
    passwordConfirmBool.value = true;
    console.log(
      "같다같아 1:" + userPassword.value + ", 2:" + passwordConfirm.value
    );
  } else {
    console.log(
      "다르다달라 1:" + userPassword.value + ", 2:" + passwordConfirm.value
    );
  }
});

watch(userPassword, async () => {
  if (passwordConfirm.value == userPassword.value) {
    passwordConfirmBool.value = true;
    console.log(
      "같다같아 1:" + userPassword.value + ", 2:" + passwordConfirm.value
    );
  } else {
    console.log(
      "다르다달라 1:" + userPassword.value + ", 2:" + passwordConfirm.value
    );
  }
});
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

  grid-template-rows: repeat(8, minmax(0, 0.2fr));
  gap: 5px;
}

.id-input {
  grid-row: 5;
}

.pw-input {
  grid-row: 9;
}

.submit-button {
  grid-row: 7;
}
</style>
