import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: () => ({
    identifier: 0,
    response: null,
    selectedData: {
      x: [],
      y: [],
    },
    token: null,
    user: null,
    selectedWorkspace: null,
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
    updateToken(state, token) {
      state.token = token;
    },
    updateUser(state, user) {
      state.user = user;
    },
    updateSelectedWorkspace(state, workspace) {
      state.selectedWorkspace = workspace;
    },
  },
  getters: {
    getIdentifier(state) {
      return state.identifier;
    },
    isLogin(state) {
      return state.token && state.user;
    },
  },
  actions: {
    giveIdentifier({ commit, getters }) {
      commit("changeIdentifier");
      return getters.getIdentifier;
    },
    verifyExistanceX({ state, commit }, payload) {
      if (state.selectedData.x.length === 0) {
        commit("receiveSelectedDataX", payload);
      } else {
        const obj = state.selectedData.x.find((res) => res.id === payload.id);
        if (obj === undefined) commit("receiveSelectedDataX", payload);
        else commit("deleteSpecifiedDataX", payload);
      }
    },
    verifyExistanceY({ state, commit }, payload) {
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
    setToken({ commit }, token) {
      commit("updateToken", token);
    },
    setUser({ commit }, user) {
      commit("updateUser", user);
    },
    logout({ commit }) {
      commit("updateToken", null);
      commit("updateUser", null);
      commit("updateSelectedWorkspace", null);
    },
    setSelectedWorkspace({ commit }, workspace) {
      commit("updateSelectedWorkspace", workspace);
    },
  },
  plugins: [createPersistedState()],
});
