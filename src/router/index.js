import Home from '../views/Home.vue'
import { createWebHistory, createRouter } from 'vue-router';


const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/chart',
        name: 'Chart',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/DChart.vue')
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