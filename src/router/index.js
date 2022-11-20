import Workspace from '../views/Workspace.vue';
import SelectWorkspace from '../views/SelectWorkspace.vue';
import NewWorkspace from '../views/NewWorkspace.vue';
import Register from '../views/Authentication/Registration.vue';
import Login from '../views/Authentication/Login.vue';
import NotFound from '../views/NotFound.vue';
import { createWebHistory, createRouter } from 'vue-router';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: SelectWorkspace,
    meta: { requiresAuth: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { guest: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guest: true },
  },
  {
    path: '/schemas',
    name: 'Schemas',
    component: () => import('../views/Workspace.vue'),
  },
  {
    path: '/workspaces',
    name: 'SelectWorkspaces',
    component: SelectWorkspace,
    meta: { requiresAuth: true },
  },
  {
    path: '/workspaces/:workspaceId',
    name: 'Workspace',
    component: Workspace,
    meta: { requiresAuth: true },
  },
  {
    path: '/workspaces/create',
    name: 'NewWorkspaces',
    component: NewWorkspace,
    meta: { requiresAuth: true },
  },
  {
    path: '/:catchAll(.*)*',
    name: 'Not Found',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Check if user is authenticated before navigating to a page
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLogin) {
      next();
      return;
    }

    next('/login');
  } else {
    next();
  }
});

// Stop user logged from accessing the route with guest meta
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isLogin) {
      next('/workspaces');
      return;
    }

    next();
  } else {
    next();
  }
});

export default router;
