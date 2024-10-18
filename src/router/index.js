import { createRouter, createWebHistory } from "vue-router";
import signRouter from "./signRouter";
import postRouter from "./postRouter";
import profileRouter from "./profileRouter";

const router = createRouter({
  history: createWebHistory(),
  routes: [...signRouter, ...postRouter, ...profileRouter],
});

export default router;
