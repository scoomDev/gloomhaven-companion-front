import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Characters from '../views/CharacterList.vue'
import Team from '../views/Team'
import HeroCompanion from "../views/HeroCompanion"
import Axios from 'axios'

Vue.use(VueRouter)

Axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.data.code === 401) {
    store.dispatch('logout')
    router.push('/login')
  }
  return Promise.reject(error)
})

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/team/:id',
    name: 'team',
    component: Team,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/characters',
    name: 'characters',
    component: Characters,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/hero/:id',
    name: 'hero',
    component: HeroCompanion,
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.getters.isLoggedIn) next()
    else next('/login')
  } else next()
})

export default router
