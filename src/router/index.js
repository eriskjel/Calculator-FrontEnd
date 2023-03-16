import { createRouter, createWebHistory } from 'vue-router'
import CalculatorApp from '../views/CalculatorView.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/contact-form',
    name: 'contact-form',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ContactFormView.vue')
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: CalculatorApp
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
