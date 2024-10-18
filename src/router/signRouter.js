import SignInView from "@/views/SignInViews/SignInView.vue";
import SignUpView from "@/views/SignUpViews/SignUpView.vue";

const authRoutes = [
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
];

export default authRoutes;
