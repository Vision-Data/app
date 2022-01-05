import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import "./styles/tailwind.css";
import "./styles/global.css";

const store = createStore({
  state: () => ({
    identifier: 0,
    response: null,
    selectedData: [],
  }),
  mutations: {
    receiveSelectedData(state, value) {
      state.selectedData.push(value);
    },
    deleteSpecifiedData(state, value) {
      state.selectedData = state.selectedData.filter(
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
    verifyExistance({ state, commit }, payload) {
      if (state.selectedData.length === 0)
        commit("receiveSelectedData", payload);
      else {
        const obj = state.selectedData.find((res) => res.id === payload.id);
        if (obj === undefined) commit("receiveSelectedData", payload);
        else commit("deleteSpecifiedData", payload);
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
