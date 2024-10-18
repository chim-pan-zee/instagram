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
      <button
        @click="uploadPost"
        v-if="images.length && isNext"
        class="upload-excute-button"
      >
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
        <div class="full-image-wrap">
          <img :src="images[currentIndex]" alt="image" class="full-image" />
          <button
            class="left-button"
            @click="previewImage"
            :disabled="currentIndex === 0"
          >
            <img
              style="width: 100%; height: 100%"
              src="/assets/icons/leftarrow.png"
              alt=""
            />
          </button>
          <button
            class="right-button"
            @click="nextImage"
            :disabled="currentIndex === images.length - 1"
          >
            <img
              style="width: 100%; height: 100%"
              src="/assets/icons/rightarrow.png"
              alt=""
            />
          </button>
        </div>

        <div v-if="images.length && isAddFiles" class="added-image-wrap">
          <div
            v-for="(img, index) in previewImgs"
            :key="index"
            class="added-image-container"
            @click="currentIndex = index"
          >
            <img :src="img" alt="이미지 미리보기" class="added-image" />
            <button class="delete-image" @click="removeImage(index)">X</button>
          </div>
          <button class="add-image" @click="clickInputTag">
            <img
              style="width: 100%; height: 100%"
              src="/assets/icons/plusincircle.png"
              alt=""
            />
          </button>
        </div>

        <button
          class="add-image-button"
          v-if="images.length"
          @click="isAddFiles = !isAddFiles"
        >
          <img
            class="add-image-icon"
            src="/assets/icons/pi7_copy.svg"
            alt="add-image-icon"
          />
        </button>
      </div>
    </div>
    <!-- 글내용작성 -->
    <div v-if="images.length && isNext" class="content-wrap">
      <div class="right-panel">
        <input
          type="text"
          v-model="contents"
          placeholder="내용을 입력하세요..."
          maxlength="1000"
        />
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
const previewImgs = ref([]);
const imageInput = ref(null);
const imageFiles = ref([]);
const isAddFiles = ref(false);
const isNext = ref(false);
const currentIndex = ref(0);
const formData = new FormData();

const userId = ref(Cookies.get("userId"));
const authorToken = window.localStorage.getItem("user_token");
const contents = ref("");

const uploadImage = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const image = files[i];
      imageFiles.value.push(image);
      let reader = new FileReader();

      reader.onload = (e) => {
        images.value.push(e.target.result);
        previewImgs.value.push(e.target.result);
      };

      reader.readAsDataURL(image);
    }
  }
};

const dropInputTag = (event) => {
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    uploadImage({ target: { files } });
  }
};

const clickInputTag = () => {
  if (imageInput.value) {
    imageInput.value.click();
  }
};

const uploadPost = () => {
  const postData = {
    authorToken: authorToken,
    contents: contents.value,
  };

  imageFiles.value.forEach((file) => {
    formData.append("files", file);
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
      if (router.currentRoute.value.path === "/") {
        router.go(0);
      } else {
        router.push({
          path: "/",
        });
      }
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

const previewImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const removeImage = (index) => {
  images.value.splice(index, 1);
  previewImgs.value.splice(index, 1);
};

const nextImage = () => {
  if (currentIndex.value < images.value.length - 1) {
    currentIndex.value++;
  }
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
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 0.2fr));
  grid-template-rows: repeat(12, minmax(0, 0.2fr));
}

.added-image-wrap {
  position: absolute;
  bottom: 50px;
  right: 10%;
  width: 70%;
  height: 110px;
  display: flex;
  overflow-x: auto;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.547);
  border-radius: 5px;
}

.full-image-wrap {
  grid-column: 1 / 13;
  grid-row: 1 / 13;
  width: 100%;
  height: 100%;
  position: relative;
}

.full-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.left-button,
.right-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  padding: 10px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  background: none;
  opacity: 0.83;
}

.left-button {
  left: 10px;
}

.right-button {
  right: 10px;
}

.left-button:disabled,
.right-button:disabled {
  opacity: 0;
  cursor: default;
}

.add-image {
  background: none;
  width: 30px;
  height: 30px;
  outline: none;
  border: none;
}

.add-image:hover {
  cursor: pointer;
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
  grid-column: 5 / 6;
  grid-row: 2 / 9;
  justify-self: end;
}

.content-wrap {
  grid-column: 1 / 6;
  grid-row: 1 / 9;
}

.added-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;

  overflow: scroll;
  overflow: auto;
  white-space: nowrap;
}

.added-image-wrap::-webkit-scrollbar {
  height: 8px;
}

.added-image-container {
  position: relative;
}

.delete-image {
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 999px;
}

.upload-excute-button {
  z-index: 1000;
}
</style>
