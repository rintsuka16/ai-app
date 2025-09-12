import Vue from 'vue'
import VueRouter from 'vue-router'
import AIView from '../views/AIView.vue'
import SignupView from '../views/SignupView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../views/IndexView.vue')

  },
  {
    path: '/aiview',
    name: '/aiview',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
        component: AIView

  },
  {
    path: '/signupview',
    name: '/signupview',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
        component: SignupView

  },
  {
    path: '/%E5%8F%8E%E5%85%A5',
    name: 'income',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/IncomeView.vue')
  },
  {
    path: '/%E6%94%AF%E5%87%BA%E5%85%A5%E5%8A%9B',
    name: 'addexpense',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AddExpenseView.vue')
  },
  {
    path: '/%E5%8F%8E%E5%85%A5%E5%85%A5%E5%8A%9B',
    name: 'addincome',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AddIncomeView.vue')
  },
  {
    path: '/%E6%94%AF%E5%87%BA',
    name: 'expense',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ExpenseView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
