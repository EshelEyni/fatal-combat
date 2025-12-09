import { createApp } from "vue";
import App from "./App.vue";
import "./assets/fonts/fonts.css";
import "./style.css";

import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import PrimeVue from "primevue/config";

import "primeflex/primeflex.css"; // ← utilities (p-4, bg-primary, text-white, grid, etc.)

import router from "./router";
import { StreetFighterTheme } from "./theme";

const app = createApp(App);

app.use(createPinia());

app.use(VueQueryPlugin);

app.use(router);

app.use(PrimeVue, { theme: StreetFighterTheme });

app.mount("#app");
