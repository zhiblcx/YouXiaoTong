// https://nuxt.com/docs/api/configuration/nuxt-config
import { appConfig } from './shared/config'
export default defineNuxtConfig({
  app:{
    head:{
      title:appConfig.APP_NAME_CHINESE
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vant/nuxt'
  ]
})
