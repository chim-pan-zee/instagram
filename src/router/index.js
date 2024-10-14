import { createRouter, createWebHistory } from "vue-router";
import SignInView from "@/views/SignInViews/SignInView.vue";
import SignUpView from "@/views/SignUpViews/SignUpView.vue";
import PostView from "@/views/PostViews/PostView.vue";
import PostDetailView from "@/views/PostViews/PostDetailView.vue";
import ProfileView from "@/views/ProfileViews/ProfileView.vue";
import EditView from "@/views/EditViews/EditView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: PostView,
    },
    {
      path: "/signin",
      name: "signin",
      component: SignInView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
    },
    {
      path: "/:id",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/edit",
      name: "edit",
      component: EditView,
    },
    {
      path: "/p/:id",
      name: "postdetailview",
      component: PostDetailView,
    },
  ],
});

export default router;
