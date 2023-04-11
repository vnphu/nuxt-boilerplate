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
  modules: ['@unocss/nuxt', '@vueuse/nuxt', '@pinia/nuxt', '@nuxt-alt/auth'],
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
    apiBase: configByEnv.API_URL,
  },
  axios: {
    baseURL: configByEnv.API_URL,
  },

  auth: {
    globalMiddleware: true,
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/',
    },
    strategies: {
      mighty: {
        scheme: 'local',
        endpoints: {
          login: {
            url: `auth/login`,
          },
          logout: false,
          refresh: {
            url: `auth/refresh-token`,
          },
          user: {
            url: `customer/user-info`,
          },
        },
        token: {
          property: 'result.access_token',
          type: 'Bearer',
          maxAge: 60 * 60 * 24 * 30,
        },
        refreshToken: {
          property: 'result.refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 2,
        },
        user: {
          property: 'result',
        },
      },
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
