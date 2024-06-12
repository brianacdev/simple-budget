import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import useAuthStore from '@/stores/auth'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const init = async () => {
  app.use(createPinia())

  await useAuthStore().initialize()

  app.use(router)

  app.mount('#app')
}

init()
