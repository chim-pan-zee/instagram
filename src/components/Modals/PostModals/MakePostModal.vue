<template>
  <div :class="['modal-wrap', { 'expanded-modal': isNext }]">
    <div class="text-wrap">
      <p class="text" v-if="!images.length">새 게시물 만들기</p>
      <p class="text" v-if="images.length && !isNext">추가</p>
      <p class="text" v-if="images.length && isNext">새 게시물 업로드</p>
      <button class="backward-button" v-if="images.length">
        <base-icon class="base-icon" filename="arrow-left-solid.svg" />
      </button>
      <button @click="isNext = true" v-if="images.length && !isNext">
        <p style="color: blue">다음</p>
      </button>
      <button @click="uploadPost" v-if="images.length && isNext">
        <p style="color: blue">업로드</p>
      </button>
    </div>

    <div
      class="upload-wrap"
      @drop.prevent="dropInputTag($event)"
      @dragover.prevent
    >
      <input
        ref="imageInput"
        id="input"
        type="file"
        name="image"
        accept="image/*"
        multiple
        hidden
        @change="uploadImage"
        v-if="!images.length"
      />

      <img
        class="upload-icon"
        src="/assets/icons/img-n-video.png"
        alt="upload icon"
        v-if="!images.length"
      />
      <p class="upload-text" v-if="!images.length">
        사진과 동영상을 여기에 끌어다 놓으세요
      </p>
      <base-button
        class="upload-button"
        @click="clickInputTag"
        v-if="!images.length"
      >
        컴퓨터에서 선택
      </base-button>
      <div v-if="images.length" class="image-wrap">
        <img
          v-for="(img, index) in images"
          :key="index"
          :src="img"
          alt="image"
          class="full-image"
        />
        <button class="add-image-button" v-if="images.length">
          <img
            class="add-image-icon"
            src="/assets/icons/pi7_copy.svg"
            alt="add-image-icon"
          />
        </button>
      </div>

      <div v-if="images.length && isNext" class="content-wrap">
        <div class="right-panel">
          <input
            type="text"
            v-model="contents"
            placeholder="내용을 입력하세요..."
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import BaseButton from "../../BaseElements/BaseButton.vue";
import BaseIcon from "../../BaseElements/BaseIcon.vue";
import { ref, defineEmits } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

const router = useRouter();
const emit = defineEmits(["submit"]);

const images = ref([]);
const imageInput = ref(null);
const imageFiles = ref([]);
const isNext = ref(false);
const formData = new FormData();

const userId = ref(Cookies.get("userId"));
const authorToken = window.localStorage.getItem("user_token");
const contents = ref("");

const uploadImage = (event) => {
  console.log("!");
  const files = event.target.files;
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const image = files[i];
      imageFiles.value.push(image);
      let reader = new FileReader();

      reader.onload = (e) => {
        images.value.push(e.target.result);
      };

      reader.readAsDataURL(image);
    }
    console.log(files); //잘 옴 파일여러개
  }
};

const dropInputTag = (event) => {
  console.log("?");

  const files = event.dataTransfer.files;
  if (files.length > 0) {
    uploadImage({ target: { files } });
  }
};

const clickInputTag = () => {
  console.log(";;");

  if (imageInput.value) {
    imageInput.value.click();
  }
};

const uploadPost = () => {
  console.log("k");

  const postData = {
    authorToken: authorToken,
    contents: contents.value,
  };

  imageFiles.value.forEach((file) => {
    formData.append("files[]", file);
  });

  formData.append(
    "key",
    new Blob([JSON.stringify(postData)], { type: "application/json" })
  );

  axios
    .post(`/p/${userId.value}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      closeModal();
      router.push({ name: "profile", params: { id: userId.value } });
      console.log("전송됨", res.data);
    })
    .catch((err) => {
      console.error(err);
      alert(
        "글 작성이 정상적으로 처리되지 않았습니다. " +
          err.data +
          "관리자에게 문의 바랍니다."
      );
    });
};

const closeModal = () => {
  emit("closeModal");
};
</script>

<style scoped>
.button {
  background-color: rgb(19, 152, 254);
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
}

.modal-wrap {
  border-radius: 10px;
  border-style: solid;
  border-color: rgb(191, 191, 191);
  border-width: 1px;
  background-color: rgb(255, 255, 255);

  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-template-rows: repeat(8, minmax(0, 1fr));
  height: 500px;
  transition: width 0.3s ease-in-out;
}

.text-wrap {
  grid-column: 1/6;
  grid-row: 1/2;
  font-weight: bold;
  font-size: 15pt;

  white-space: nowrap;
  overflow: hidden;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: rgb(191, 191, 191);
  place-items: center;
  display: grid;
  grid-template-columns: repeat(9, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
}

.base-icon {
  grid-column: 1;
  grid-row: 1;
}

.upload-wrap {
  grid-column: 1/6;
  grid-row: 2/9;

  display: grid;
  grid-template-columns: repeat(12, minmax(0, 0.2fr));
  grid-template-rows: repeat(12, minmax(0, 0.2fr));
}

.upload-icon {
  grid-column: 6/8;
  grid-row: 5/6;
  width: 100%;
  height: auto;
}

.upload-button {
  grid-column: 5/9;
  grid-row: 8/9;
  border-radius: 8px;
}

.upload-button:hover {
  cursor: pointer;
}

.upload-text {
  grid-column: 1/13;
  grid-row: 7/8;
}

.text:not(backward-button) {
  grid-column: 1/10;
  grid-row: 2;
  font-weight: 600;
}

.backward-button {
  grid-column: 1/2;
  grid-row: 2;
}

.image-wrap {
  grid-column: 1 / 13;
  grid-row: 1 / 13;
  width: 100%;
  height: auto;

  display: grid;
  grid-template-columns: repeat(12, minmax(0, 0.2fr));
  grid-template-rows: repeat(12, minmax(0, 0.2fr));
}

.image-wrap img {
  width: 100%;
  height: 100%;
  grid-column: 1 / 13;
  grid-row: 1 / 13;
  object-fit: contain;
}

.full-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.add-image-button {
  grid-column: 12 / 13;
  grid-row: 12 / 13;

  width: 100%;
  height: 100%;

  border-radius: 99px;
  border: none;
  background-color: rgba(0, 0, 0, 0.8);
}

.add-image-button:hover {
  cursor: pointer;
}

.add-image-button img {
  filter: grayscale(100%);
}

.expanded-modal {
  width: 700px;
  grid-template-columns: repeat(6, minmax(0, 1fr));
}

.right-panel {
  grid-column: 6 / 7;
  grid-row: 2 / 9;
}

.content-wrap {
  grid-column: 1 / 6;
  grid-row: 1 / 9;
}

.content-wrap input {
  grid-column: 1 / 6;
  grid-row: 1 / 9;
  width: 100%;
  border: 1px solid rgb(191, 191, 191);
  border-radius: 5px;
  padding: 8px;
}
</style>
