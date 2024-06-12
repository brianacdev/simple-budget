import { ref } from 'vue'
import { defineStore } from 'pinia'

import { Auth0Client } from '@auth0/auth0-spa-js'
import type { User } from '@auth0/auth0-spa-js'

import { setAuthHeader } from '@/api'

const client = new Auth0Client({
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  cacheLocation: 'localstorage',
  useRefreshTokens: true,
  authorizationParams: {
    redirect_uri: `${window.location.origin}/auth-callback`,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE
  }
})

const useAuthStore = defineStore('auth', () => {
  const user = ref<User>()
  const checkIsAuthenticated = async () => {
    return await client.isAuthenticated()
  }

  const loadAccessToken = async () => {
    const token = await client.getTokenSilently()
    setAuthHeader(token)
    user.value = await client.getUser()
  }

  const login = async (returnURL = '/') => {
    await client.loginWithRedirect({
      appState: { returnURL }
    })
  }

  const logout = async () => {
    user.value = undefined
    await client.logout({ logoutParams: { returnTo: window.location.origin } })
  }

  const handleRedirectCallback = async () => {
    const result = await client.handleRedirectCallback()
    await loadAccessToken()
    if (result && result.appState && result.appState.returnURL) {
      return result.appState.returnURL
    }
    return '/'
  }

  const initialize = async () => {
    await client.checkSession()

    if (await checkIsAuthenticated()) {
      await loadAccessToken()
    }
  }

  return {
    initialize,
    checkIsAuthenticated,
    login,
    loadAccessToken,
    logout,
    handleRedirectCallback,
    user
  }
})

export default useAuthStore
