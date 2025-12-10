import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage/HomePage.vue";
import { getIsUserLoggedIn } from "./services/utils/getIsUserLoggedIn";

const routes = [
   { path: "/", component: HomePage },
   {
      path: "/game-single",
      component: () => import("./pages/GameSinglePage/GamePage.vue"),
   },
   {
      path: "/game-online",
      component: () => import("./pages/GameOnlinePage/GamePage.vue"),
      meta: { requiresAuth: true },
   },
   {
      path: "/game-local",
      component: () => import("./pages/GameLocalPage/GamePage.vue"),
   },
   {
      path: "/game-mode",
      component: () => import("./pages/GameModePage/GameModePage.vue"),
   },
   {
      path: "/login",
      component: () => import("./pages/LoginPage/LoginPage.vue"),
   },
   {
      path: "/signup",
      component: () => import("./pages/SignupPage/SignupPage.vue"),
   },
   {
      path: "/about",
      component: () => import("./pages/AboutPage/AboutPage.vue"),
   },
   {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("./pages/NotFoundPage/NotFoundPage.vue"),
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

router.beforeEach(async (to, from, next) => {
   if (!to.meta.requiresAuth) return next();
   const user = await getIsUserLoggedIn();
   if (!user) return next("/");
   next();
});

export default router;
