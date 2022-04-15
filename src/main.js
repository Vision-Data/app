import { createApp } from "vue";
import App from "./App.vue";
import "./styles/tailwind.css";
import "./styles/chartist.css";
import router from "./router";
import store from "./store";

import "./styles/global.css";
import i18n from "./i18n";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
  duration: 4000,
  position: { x: "center", y: "top" },
});

axios.defaults.baseURL = process.env.VUE_APP_HOST_API;

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    const { t } = i18n.global;
    switch (error.response.status) {
      case 401:
        store.dispatch("logout");
        router.push("/login");
        break;
      case 403:
        notyf.error(t("notifications.forbidden"));
        router.push("/workspaces");
        break;
      case 404:
        router.push("/404");
        break;
      default:
        notyf.error(t("notifications.errorServer"));
        break;
    }

    return Promise.reject(error);
  }
);

const app = createApp(App);
app.use(store);
app.use(i18n);
app.use(router);
app.provide("notyf", notyf);
app.mount("#app");
