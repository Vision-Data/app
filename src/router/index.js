import Home from "../views/Home.vue";
import SelectWorkspace from "../views/SelectWorkspace.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/workspace",
    name: "Workspace",
    component: SelectWorkspace,
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
