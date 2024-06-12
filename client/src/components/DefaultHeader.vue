<script setup lang="ts">
import useAuthStore from '@/stores/auth'
import { useRoute } from 'vue-router'
const route = useRoute()
const authStore = useAuthStore()

const onClickLogin = async () => {
  await authStore.login(route.fullPath)
}

const onClickLogout = async () => {
  await authStore.logout()
}
</script>

<template>
  <nav class="shadow bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="text-2xl">Simple Budget App</div>
        <div v-if="!authStore.user">
          <button class="btn btn-ghost" @click="onClickLogin">Login</button>
        </div>
        <div v-else>
          <div class="flex items-center">
            <div class="mr-4">{{ authStore.user?.name }}</div>
            <button class="btn btn-ghost" @click="onClickLogout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
