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

const app = createApp(App);
app.use(store);
app.use(i18n);
app.use(router);
app.mount("#app");
