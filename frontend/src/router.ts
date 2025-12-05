import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage/HomePage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/game", component: () => import("./pages/GamePage/GamePage.vue") },
  { path: "/login", component: () => import("./pages/LoginPage/LoginPage.vue") },
  { path: "/signup", component: () => import("./pages/SignupPage/SignupPage.vue") },
  { path: "/about", component: () => import("./pages/AboutPage/AboutPage.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
