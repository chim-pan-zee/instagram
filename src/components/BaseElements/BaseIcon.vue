<template>
  <div class="img-wrap">
    <img :src="imgPath" alt="icons" />
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import HouseSolid from "/public/assets/icons/house-solid.svg";
import SquarePlusRegular from "/public/assets/icons/square-plus-regular.svg";
import BarsSolid from "/public/assets/icons/bars-solid.svg";
import ArrowLeftSolid from "/public/assets/icons/arrow-left-solid.svg";

const props = defineProps({
  filename: String,
});

const imgPath = computed(() => {
  switch (props.filename) {
    case "house-solid.svg":
      return HouseSolid;
    case "square-plus-regular.svg":
      return SquarePlusRegular;
    case "bars-solid.svg":
      return BarsSolid;
    case "arrow-left-solid.svg":
      return ArrowLeftSolid;
    default:
      return "이미지없어";
  }
});
</script>

<style scoped>
.img-wrap {
  grid-column: 1 / 1;
  grid-row: 1 / 1;
  width: 60%;
  height: 60%;
}
</style>
