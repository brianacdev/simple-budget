import type { RouteRecordRaw } from 'vue-router'
import useAuthStore from '@/stores/auth'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/auth-callback',
    name: 'auth-callback',
    beforeEnter: async (to, from, next) => {
      const result = await useAuthStore().handleRedirectCallback()
      next(result)
    }
  }
] as RouteRecordRaw[]

export default routes
