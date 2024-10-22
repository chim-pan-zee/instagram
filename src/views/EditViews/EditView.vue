<template>
  <div class="edit-wrapper">
    <div class="edit-menu-wrap">
      <h2 style="font-weight: 800">설정</h2>
      <button class="edit-profile">
        <profile-image class="edit-profile-image"></profile-image>
        <b>프로필 편집</b>
      </button>
      <button class="edit-account">
        <img src="/assets/icons/gearicon.png" alt="" />
        <b>계정 설정</b>
        <input
          type="file"
          class="real-upload"
          accept="image/*"
          required
          hidden
        />
      </button>
    </div>
    <div class="edit-info">
      <h2>{{ "프로필 편집" }}</h2>
    </div>
    <div class="user-info">
      <img class="profile-image" :src="selectedFile" v-if="selectedFile" />
      <b1>{{ username }}</b1>
      <b2>{{ name }}</b2>
      <button @click="triggerFileUpload">사진 변경</button>
      <input
        ref="fileInput"
        type="file"
        class="real-upload"
        accept="image/*"
        required
        hidden
        @change="handleFileChange"
      />
    </div>
    <div class="user-desc">
      <h3>소개</h3>
      <input type="text" placeholder="소개" v-model="userDesc" />
    </div>
    <div class="user-gender">
      <h3>성별</h3>
      <select name="" id="" v-model="gender">
        <option value="0">밝히고 싶지 않음</option>
        <option value="1">여성</option>
        <option value="2">남성</option>
      </select>
    </div>
    <div class="user-submit">
      <button @click="uploadUser">제출</button>
    </div>
    <div>
      <h3>계정 비활성화</h3>
      <b>주의:신중히 결정하십시오.</b>
      <button>비활성화</button>
    </div>
  </div>
</template>

<script setup>
import ProfileImage from "@/components/ProfileComponents/ProfileImage.vue";
import Cookies from "js-cookie";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const username = ref("");
const name = ref("");
const selectedFile = ref(null);
const fileInput = ref();

const userDesc = ref("");
const gender = ref("");

const formData = new FormData();

onMounted(() => {
  const nowToken = window.localStorage.getItem("user_token");
  if (!nowToken) {
    router.push("/signin");
  }

  username.value = Cookies.get("username");
  name.value = Cookies.get("name");
});

const triggerFileUpload = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = URL.createObjectURL(file);
    formData.append("image", file);
  }
};

const uploadUser = async () => {
  const authorToken = window.localStorage.getItem("user_token");
  const postData = {
    authorToken: authorToken,
    userDesc: userDesc.value,
    userGender: gender.value,
  };
  formData.append(
    "key",
    new Blob([JSON.stringify(postData)], { type: "application/json" })
  );

  axios
    .put(`/${username.value}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("이미지 데이터가 도착했습니다.", res.data);
    })
    .catch((err) => {
      console.error("이미지 불러오던 중 에러", err);
      alert("이미지 정상적으로 처리되지 않았습니다. " + err.response?.data);
    });
};
</script>

<style>
button {
  outline: none;
  background: none;
  border: none;
}
.edit-wrapper {
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  grid-template-rows: repeat(6, minmax(0, 0.2fr));
  padding: 1em;
  gap: 1em;
}

.edit-menu-wrap {
  grid-column: 1/3;
  grid-row: 1/6;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-rows: repeat(10, minmax(0, 1fr));

  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: rgb(222, 222, 222);

  padding: 1em;
  gap: 1em;

  text-align: left;
}

.edit-info {
  grid-row: 1;
  grid-column: 4/10;
  text-align: left;
  align-content: center;
}

.edit-info h2 {
  font-weight: 800;
}

.edit-profile {
  grid-row: 2;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  border-radius: 10px;
  place-items: center;
}

.edit-profile-image {
  grid-column: 1;
  grid-row: 1;
  width: 20px;
  height: 20px;
}

.edit-profile b {
  grid-column: 2/7;
  grid-row: 1;
  text-align: left;
}

.edit-profile:hover {
  cursor: pointer;
  transition: all 0.3s;
  background: #f6f6f6;
  cursor: pointer;
}

.edit-account img {
  width: 10px;
  height: 10px;
}

.user-info {
  grid-column: 4/10;
  grid-row: 2/3;

  background-color: #f5f5f5;
  border-radius: 10px;

  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));

  padding: 2em;
  padding-right: 1.5em;
  gap: 0.5em;
}

.user-info button {
  grid-row: 1/3;
  grid-column: 5;

  background-color: rgb(74, 134, 254);
  width: 100%;
  height: 100%;

  border-radius: 10px;
  font-weight: 700;
  font-size: 11pt;
  color: white;
}

.profile-image {
  grid-column: 1;
  grid-row: 1;
  height: 45px;
  width: 45px;

  align-items: center;
}

.user-info b1 {
  text-align: left;
  font-weight: 700;
  grid-column: 2;
  grid-row: 1;
}

.user-info b2 {
  text-align: left;

  grid-column: 2;
  grid-row: 2;
}

.user-desc {
  grid-column: 4/10;
  grid-row: 3/4;
}

.user-desc h3 {
  text-align: left;
  font-weight: 700;
}

.user-desc input {
  width: 100%;
  height: 100%;
  outline: none;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #e7e7e7;
}

.user-gender {
  grid-column: 4/10;
  grid-row: 5;
}

.user-gender h3 {
  text-align: left;
  font-weight: 700;
}

.user-gender select {
  width: 100%;
  height: 50%;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #e7e7e7;
  outline: none;
}

.user-submit {
  grid-column: 4/10;
  grid-row: 6/7;
  text-align: right;
}

.user-submit button {
  width: 30%;
  height: 30%;
  background-color: rgb(74, 134, 254);
  border-radius: 10px;
  outline: none;
  font-size: 11pt;
  font-weight: 600;
  color: white;
}

.user-submit button:hover {
  cursor: pointer;
}
</style>
