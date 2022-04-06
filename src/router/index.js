import Home from "../views/Home.vue";
import Register from "../views/Registration.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
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
