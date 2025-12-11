import { createApp, h } from "vue";
import App from "./App.vue";
import "./assets/fonts/fonts.css";
import "./style.css";

import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import PrimeVue from "primevue/config";
import ErrorBoundary from "./components/ErrorBoundary.vue";

import "primeflex/primeflex.css"; // ← utilities (p-4, bg-primary, text-white, grid, etc.)

import router from "./router";
import { StreetFighterTheme } from "./theme";

const app = createApp({
   render() {
      return h(ErrorBoundary, null, { default: () => h(App) });
   },
});

app.use(createPinia());

app.use(VueQueryPlugin);

app.use(router);

app.use(PrimeVue, { theme: StreetFighterTheme });

app.config.errorHandler = (err, _, info) => {
   console.error("Global Vue error:", err, info);
};

app.mount("#app");
