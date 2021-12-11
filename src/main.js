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
        }
    },
})


const app = createApp(App)
app.use(store)
app.mount('#app')
