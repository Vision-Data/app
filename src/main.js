import { createApp } from "vue";
import App from "./App.vue";
import "./styles/tailwind.css";
import "./styles/chartist.css";
import router from "./router";
import store from "./store";

import "./styles/global.css";
import i18n from "./i18n";
import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_HOST_API;

// Intercepts 401 response and logout user
axios.interceptors.response.use(undefined, async (error) => {
  if (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (store.getters.isLogin) {
        store.dispatch("logout");
      }

      router.push("/login");
    }
  }
});

const app = createApp(App);
app.use(store);
app.use(i18n);
app.use(router);
app.mount("#app");
