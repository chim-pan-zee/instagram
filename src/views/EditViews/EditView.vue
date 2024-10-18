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
      </button>
    </div>
    <div class="user-info">
      <profile-image class="profile-info"></profile-image>
      <b>{{ userId }}</b>
      <b>{{ userName }}</b>
      <button>사진 변경</button>
    </div>
    <div>
      <h3>소개</h3>
      <input type="text" placeholder="소개" />
    </div>
    <div>
      <h3>성별</h3>
      <select name="" id="">
        <option value="">밝히고 싶지 않음</option>
        <option value="">여성</option>
        <option value="">남성</option>
        <option value="">게이</option>
      </select>
    </div>
    <div>
      <button>제출</button>
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
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

onMounted(() => {
  const nowToken = window.localStorage.getItem("user_token");
  if (!nowToken) {
    router.push("/signin");
  }
});
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
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));

  padding: 0.5em;
  gap: 0.5em;
}

.profile-info {
  grid-column: 1;
  grid-row: 1;
  height: 70px;
  width: 70px;
}


</style>
