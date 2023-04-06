// https://nuxt.com/docs/api/configuration/nuxt-config
import ruleUnoCss from './utils/ruleUnoCss'
import { ConfigByEnvs } from './env.config'

// Load config by environment
// @_@ need to trim else we get something like "local " or "dev "
//@ts-ignore
const curEnv = process.env.NODE_ENV.trim() || 'development'
//@ts-ignore
const configByEnv = ConfigByEnvs[curEnv]
console.log(process.env.NODE_ENV)
console.log(configByEnv)

export default defineNuxtConfig({
  ssr: false,
  modules: ['@unocss/nuxt', '@vueuse/nuxt', '@sidebase/nuxt-auth', '@pinia/nuxt'],
  buildModules: ['@nuxtjs/moment'],

  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`
    attributify: true, // enabled `@unocss/preset-attributify`,
    shortcuts: [],
    // @ts-ignore
    rules: ruleUnoCss,
  },
  sourcemap: {
    server: true,
    client: false,
  },
  runtimeConfig: {
    authSecret: configByEnv.AUTH_SECRET, // can be overridden by NUXT_AUTH_SECRET environment variable
    apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    apiBase: configByEnv.API_URL,
    public: {
      apiBase: configByEnv.API_URL, // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    },
  },
  // axios: {
  //   baseURL: process.env.API_URL,
  // },

  auth: {
    enableGlobalAppMiddleware: true,
    // origin: configByEnv.API_URL,
    basePath: '/api',
    addDefaultCallbackUrl: false,
    globalMiddlewareOptions: {
      allow404WithoutAuth: true,
      addDefaultCallbackUrl: false,
    },
  },

  css: [
    'primevue/resources/themes/lara-light-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
  ],
  build: {
    transpile: ['primevue'],
  },
})
