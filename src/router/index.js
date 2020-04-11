import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { isLogin } from '@/services'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/department',
    name: 'Department',
    component: () => import(/* webpackChunkName: "department" */ '../views/Department.vue')
  },
  {
    path: '/query',
    name: 'Query',
    meta: {
      requireLogin: true
    },
    component: () => import(/* webpackChunkName: "query" */ '../views/Query.vue')
  },
  {
    path: '/querydetail',
    name: 'QueryDetail',
    meta: {
      requireLogin: true
    },
    component: () => import(/* webpackChunkName: "querydetail" */ '../views/QueryDetail.vue')
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      requireLogin: true
    },
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
  },
  {
    path: '/affair',
    name: 'Affair',
    component: () => import(/* webpackChunkName: "affair" */ '../views/Affair.vue')
  },
  {
    path: '/affairchild',
    name: 'AffairChild',
    component: () => import(/* webpackChunkName: "affairchild" */ '../views/AffairChild.vue')
  },
  {
    path: '/affairdetail',
    name: 'AffairDetail',
    component: () => import(/* webpackChunkName: "affairdetail" */ '../views/AffairDetail.vue')
  },
  {
    path: '/affairappoint',
    name: 'AffairAppoint',
    meta: {
      requireLogin: true
    },
    component: () => import(/* webpackChunkName: "affairappoint" */ '../views/AffairAppoint.vue')
  },
  {
    path: '/affairappointdetail',
    name: 'AffairAppointDetail',
    meta: {
      requireLogin: true
    },
    component: () => import(/* webpackChunkName: "affairappointdetail" */ '../views/AffairAppointDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 注册全局路由守卫，进行登陆拦截
router.beforeEach((to, from, next) => {
  const user = isLogin()

  // 路由需要登陆 且 未登陆
  if (to.meta.requireLogin && !user) {
    next('login?from=' + window.location.href)
  }

  next()
})

export default router
