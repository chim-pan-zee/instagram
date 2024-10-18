import PostView from "@/views/PostViews/PostView.vue";
import PostDetailView from "@/views/PostViews/PostDetailView.vue";

const postRoutes = [
  {
    path: "/",
    name: "home",
    component: PostView,
  },
  {
    path: "/p/:id",
    name: "postdetailview",
    component: PostDetailView,
  },

];

export default postRoutes;
