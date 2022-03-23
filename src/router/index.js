import Home from '../views/Home.vue'
import { createWebHistory, createRouter } from 'vue-router';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    // {
    //     path: '/register',
    //     name: 'Register',
    //     component: () => import(/* webpackChunkName: "about" */ '../components/Registration.vue')
    // },
    {
        path: '/workspace',
        name: 'Workspace',
        component: () => import(/* webpackChunkName: "about" */ '../components/Menu.vue')
    }
    // {
    //     path: '/login',
    //     name: 'Login',
    //     component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue')
    // }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

