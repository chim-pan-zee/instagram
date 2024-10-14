<template>
  <base-button>
    <base-icon
      class="img-wrap"
      :filename="props.filename"
      v-if="props.filename != 'profileImg'"
    />
    <profile-image v-else class="img-wrap"></profile-image>
    <div class="text-wrap"><slot name="text">로드 중</slot></div>
  </base-button>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import ProfileImage from "../ProfileComponents/ProfileImage.vue";
import { defineProps } from "vue";

const props = defineProps({
  filename: String,
});
</script>

<style scoped>
.button {
  background-color: rgb(255, 255, 255);
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;

  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  align-items: center;
}

.button:hover {
  transition: all 0.3s;
  background: #f6f6f6;
  cursor: pointer;
}

.img-wrap {
  grid-column: 1 / 1;
  grid-row: 1 / 1;
  width: 60%;
  height: 60%;
}

.text-wrap {
  grid-column: 2 / 5;
  grid-row: 1 / 1;
  color: black;
  font-size: medium;
  text-align: left;
}
</style>
