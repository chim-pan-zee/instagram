<template>
  <div class="form-wrap">
    <profile-image :filename="username" class="profile-image"></profile-image>
    <input
      v-model="content"
      class="base-input"
      placeholder="댓글 달기..."
      maxlength="1000"
      ref="commentRef"
    />
    <button
      class="upload"
      :class="{ disabled: isDisabled }"
      @click="uploadComment"
      :disabled="isDisabled"
    >
      게시
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import ProfileImage from "../ProfileComponents/ProfileImage.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
const username = Cookies.get("username");

const router = useRouter();

const props = defineProps({
  postId: String,
  focusCommentForm: String,
});

const emit = defineEmits(["uploadedComment"]);

const authorToken = window.localStorage.getItem("user_token");
const content = ref("");
const isDisabled = ref(true);
const commentRef = ref(null);

watch(content, (newValue) => {
  isDisabled.value = newValue.trim() === "";
});

const uploadComment = () => {
  const commentData = {
    authorToken: authorToken,
    postId: props.postId,
    contents: content.value,
  };
  axios
    .post("/comm", commentData)
    .then((res) => {
      if (res.data != false) {
        console.log("전송됨", res.data);
        emit("uploadedComment");
        content.value = "";
        isDisabled.value = true;

        setTimeout(() => {
          isDisabled.value = false;
          commentRef.value.focus();
        }, 1000);
      } else {
        router.push("/signin");
      }
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

watch(
  () => props.focusCommentForm,
  () => {
    commentRef.value.focus();
  }
);
</script>

<style scoped>
.form-wrap {
  display: grid;
  grid-template-columns: repeat(9, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  padding: 1em;
  gap: 1em;
}

.profile-image {
  grid-column: 1;
  grid-row: 1;
}

.base-input {
  grid-column: 2/8;
  grid-row: 1;
  text-align: left;
  border: none;
  outline: none;
}

.upload {
  grid-column: 8/10;
  background: none;
  border: none;
  color: rgb(19, 152, 254);
}

.upload:hover {
  cursor: pointer;
}

.upload.disabled {
  color: rgb(146, 208, 255);
  cursor: default;
}

.upload:disabled {
  color: rgb(146, 208, 255);
  cursor: default;
}
</style>
