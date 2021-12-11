import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './styles/tailwind.css'

import bidoof from "./assets/bidoof.json";

const store = createStore({
    state: () => ({
        identifier: 0,
        response: bidoof,
        selectedData: [],
    }),
    mutations: {
        receiveSelectedData(state, value) {
            state.selectedData.push(value);
        },
        deleteSpecifiedData(state, value) {
            state.selectedData = state.selectedData.filter(elt => elt.id !== value.id);
        },
        changeIdentifier(state) {
            state.identifier++;
        }
    },
    getters: {
        getIdentifier(state) {
            return state.identifier
        }
    },
    actions: {
        giveIdentifier({commit, getters}) {
            commit('changeIdentifier')
            return getters.getIdentifier;
        },
        verifyExistance({ state, commit }, payload) {
            if(state.selectedData.length === 0) commit('receiveSelectedData', payload);
            else {
                const obj = state.selectedData.find(res => res.id === payload.id)
                if (obj === undefined) commit('receiveSelectedData', payload);
                else commit('deleteSpecifiedData', payload);
                console.log(state.selectedData);
            }
        }
    },
})


const app = createApp(App)
app.use(store)
app.mount('#app')
