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

// Intercepts 401 response and logout user
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      store.dispatch("logout");
      router.push("/login");
    } else if (error.response.status === 500) {
      const { t } = i18n.global;
      notyf.error(t("errors.errorServer"));
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
