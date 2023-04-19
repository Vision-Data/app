import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: () => ({
    identifier: 0,
    response: null,
    selectedData: {
      x: [],
      y: [],
      keyX: '',
      keyY: '',
    },
    unique: [],
    token: null,
    user: null,
    chart: 'unknown',
    treeStructure: [],
    selectedWorkspace: null,
  }),
  mutations: {
    receiveSelectedDataX(state, value) {
      state.selectedData.x = [...state.selectedData.x, value];
      state.selectedData.keyX = value?.key;
    },
    receiveSelectedDataY(state, value) {
      state.selectedData.y = [...state.selectedData.y, value];
      state.selectedData.keyY = value?.key;
    },
    receiveSelectedDataUnique(state, value) {
      state.unique = [...state.unique, value];
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
    resetStateIdentifier(state) {
      state.identifier = 0;
    },
    resetChart(state) {
      state.chart = 'unknown';
    },
    resetSelectedData(state) {
      state.unique = [];
      state.selectedData = {
        x: [],
        y: [],
      };
    },
    setResponse(state, value) {
      state.response = value;
    },
    setStructure(state, value) {
      state.treeStructure = value;
    },
    updateToken(state, token) {
      state.token = token;
    },
    updateChart(state, chart) {
      state.chart = chart;
    },
    updateUser(state, user) {
      state.user = user;
    },
    updateSelectedWorkspace(state, workspace) {
      state.selectedWorkspace = workspace;
    },
  },
  getters: {
    getSelectedDataX(state) {
      return state.selectedData.x;
    },
    getIdentifier(state) {
      return state.identifier;
    },
    isLogin(state) {
      return state.token && state.user;
    },
  },
  actions: {
    giveIdentifier({ commit, getters }) {
      commit('changeIdentifier');
      return getters.getIdentifier;
    },
    verifyExistanceX({ state, commit }, payload) {
      if (state.selectedData.x.length === 0) {
        commit('receiveSelectedDataX', payload);
      } else {
        const obj = state.selectedData.x.find((res) => res.id === payload.id);
        if (obj === undefined) commit('receiveSelectedDataX', payload);
        else commit('deleteSpecifiedDataX', payload);
      }
    },
    verifyExistanceY({ state, commit }, payload) {
      if (state.selectedData.y.length === 0) {
        commit('receiveSelectedDataY', payload);
      } else {
        const obj = state.selectedData.y.find((res) => res.id === payload.id);
        if (obj === undefined) commit('receiveSelectedDataY', payload);
        else commit('deleteSpecifiedDataY', payload);
      }
    },
    verifyExistanceUnique({ commit }, payload) {
      commit('receiveSelectedDataUnique', payload);
    },
    sendRequest({ commit }, payload) {
      commit('resetSelectedData');
      commit('setResponse', payload);
    },
    sendStructure({ commit }, payload) {
      commit('setStructure', payload);
    },
    setToken({ commit }, token) {
      commit('updateToken', token);
    },
    setChart({ commit }, chart) {
      commit('updateChart', chart);
    },
    setUser({ commit }, user) {
      commit('updateUser', user);
    },
    logout({ commit }) {
      commit('updateToken', null);
      commit('updateUser', null);
      commit('updateSelectedWorkspace', null);
      commit('resetSelectedData');
      commit('setResponse', null);
      commit('resetStateIdentifier');
      commit('setStructure', []);
    },
    setSelectedWorkspace({ commit }, workspace) {
      commit('updateSelectedWorkspace', workspace);
    },
    resetSelectedData({ commit }) {
      commit('resetSelectedData');
    },
    resetChartData({ commit }) {
      commit('resetChart');
    },
  },
  plugins: [createPersistedState()],
});
