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
    // {
    //     path: '/login',
    //     name: 'Login',
    //     component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue')
    // }
    {
        path: '/newworkspace',
        name: 'NewWorkspace',
        component: () => import(/* webpackChunkName: "about" */ '../components/NewWorkspace.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

