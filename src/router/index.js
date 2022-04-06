import Home from '../views/Home.vue'
import { createWebHistory, createRouter } from 'vue-router';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/schemas',
        name: 'Schemas',
        component: () => import('../views/Home.vue')
    },
    // {
    //     path: '/register',
    //     name: 'Register',
    //     component: () => import(/* webpackChunkName: "about" */ '../components/Registration.vue')
    // },
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

