import { createApp } from "vue";
import axios from "axios";
import router from "@/router";
import App from "@/App.vue";
import "@/assets/main.css";

/* import the fontawesome core */

/* import font awesome icon component */

/* import specific icons */

/* add icons to the library */

axios.defaults.baseURL = "http://localhost:8083";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(router);
app.mount("#app");
