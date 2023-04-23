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
  app: {
    head: {
      link: [
        // { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
      ],
      title: 'Nuxt Boilerplate',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Nuxt Boilerplate',
        },
        { property: 'og:image', content: '/favicon.svg' },
        { property: 'og:title', content: 'Nuxt Boilerplate' },
        {
          property: 'og:description',
          content: 'Nuxt Boilerplate',
        },
      ],
    },
  },

  modules: ['@unocss/nuxt', '@vueuse/nuxt', '@pinia/nuxt', '@nuxt-alt/auth', '@nuxtjs/i18n'],
  buildModules: ['@nuxtjs/moment'],
  i18n: {
    vueI18n: './i18n.config.js', // if you are using custom path, default
  },
  components: [{ path: '~/components/Common', prefix: '' }],
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
    public: {
      apiBase: configByEnv.API_URL,
      urlLogin: configByEnv.URL_LOGIN,
    },
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
      local1: {
        scheme: 'local',
        endpoints: {
          login: {
            url: `${configByEnv.API_URL}/api/auth/login`,
          },
          logout: false,
          refresh: {
            url: `${configByEnv.API_URL}/api/auth/refresh-token`,
          },
          user: {
            url: `${configByEnv.API_URL}/api/customer/user-info`,
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
    '@/assets/styles/reset.css',
    '@/assets/styles/prime-lara.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    '@/assets/styles/all.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@import "@/assets/styles/all.scss";',
        },
      },
    },
  },
  build: {
    transpile: ['primevue'],
  },
})
