import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "bootstrap/dist/css/bootstrap.css";

// Notifications
import Notifications from "@kyvg/vue3-notification";

import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.use(Notifications);

app.mount("#app");
