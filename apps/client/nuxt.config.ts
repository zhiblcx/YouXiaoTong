// https://nuxt.com/docs/api/configuration/nuxt-config
import { appConfig } from './shared/config'
export default defineNuxtConfig({
  app: {
    head: {
      title: appConfig.APP_NAME_CHINESE
    }
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:8000/api',
        changeOrigin: true,
        prependPath: true
      }
    },
    routeRules: {
      '/api/**': {
        proxy: 'http://localhost:8000/api/**'
      }
    }
  },
  devServer: {
    https: {
      key: './cert.key',
      cert: './cert.crt'
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxtjs/tailwindcss', '@vant/nuxt']
})
