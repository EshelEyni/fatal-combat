import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import GamePage from "./pages/GamePage/GamePage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/game", component: GamePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
