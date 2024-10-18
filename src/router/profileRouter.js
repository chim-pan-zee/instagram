import ProfileView from "@/views/ProfileViews/ProfileView.vue";
import EditView from "@/views/EditViews/EditView.vue";

const profileRoutes = [
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
];

export default profileRoutes;
