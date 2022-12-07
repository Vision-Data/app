import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import { Notyf } from 'notyf';

import './styles/tailwind.css';
import './styles/chartist.css';
import './styles/global.css';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  duration: 4000,
  position: { x: 'center', y: 'top' },
});

axios.defaults.baseURL = process.env.VUE_APP_HOST_API;

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const isVisionApi = axios
      .getUri(error.config)
      .includes(axios.defaults.baseURL);

    if (!isVisionApi) {
      return notyf.error('Une erreur est survenue. Veuillez réessayer.');
    }

    switch (error.response.status) {
      case 401:
        store.dispatch('logout');
        router.push('/login');
        break;
      case 403:
        notyf.error("Vous n'avez pas les droits pour effectuer cette action.");
        router.push('/workspaces');
        break;
      case 404:
        router.push('/404');
        break;
      default:
        notyf.error('Une erreur est survenue. Veuillez réessayer.');
        break;
    }

    return Promise.reject(error);
  }
);

const app = createApp(App);

app.config.globalProperties.$notyf = notyf;

app.use(store);
app.use(router);
app.mount('#app');
