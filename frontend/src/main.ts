import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

import "primeflex/primeflex.css"; // ← utilities (p-4, bg-primary, text-white, grid, etc.)

// Router
import router from "./router";

const app = createApp(App);

app.use(createPinia());

app.use(VueQueryPlugin);

app.use(router);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount("#app");
