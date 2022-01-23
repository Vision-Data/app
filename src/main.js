import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import "./styles/tailwind.css";
import "./styles/chartist.css";

import "./styles/global.css";

const store = createStore({
  state: () => ({
    identifier: 0,
    response: null,
    selectedData: {
      x:[],
      y:[]
    },
  }),
  mutations: {
    receiveSelectedDataX(state, value) {
      state.selectedData.x = [...state.selectedData.x, value];
    },
    receiveSelectedDataY(state, value) {
      state.selectedData.y = [...state.selectedData.y, value];
    },
    deleteSpecifiedDataX(state, value) {
      state.selectedData.x = state.selectedData.x.filter(
        (elt) => elt.id !== value.id
      );
    },
    deleteSpecifiedDataY(state, value) {
      state.selectedData.y = state.selectedData.y.filter(
        (elt) => elt.id !== value.id
      );
    },
    changeIdentifier(state) {
      state.identifier++;
    },
    setResponse(state, value) {
      state.response = value;
    },
  },
  getters: {
    getIdentifier(state) {
      return state.identifier;
    },
  },
  actions: {
    giveIdentifier({ commit, getters }) {
      commit("changeIdentifier");
      return getters.getIdentifier;
    },
    verifyExistanceX({ state, commit }, payload) {
      console.log(payload);
      if (state.selectedData.x.length === 0) {
        commit("receiveSelectedDataX", payload);
      } else {
        const obj = state.selectedData.x.find((res) => res.id === payload.id);
        if (obj === undefined) commit("receiveSelectedDataX", payload);
        else commit("deleteSpecifiedDataX", payload);
      }
    },
    verifyExistanceY({ state, commit }, payload) {
      console.log(payload);
      if (state.selectedData.y.length === 0) {
        commit("receiveSelectedDataY", payload);
      } else {
        const obj = state.selectedData.y.find((res) => res.id === payload.id);
        if (obj === undefined) commit("receiveSelectedDataY", payload);
        else commit("deleteSpecifiedDataY", payload);
      }
    },
    sendRequest({ commit }, payload) {
      commit("setResponse", payload);
    },
  },
});

const app = createApp(App);
app.use(store);
app.mount("#app");
