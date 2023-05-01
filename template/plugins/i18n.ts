import { createI18n } from 'vue-i18n'
import en from '~/locales/en'
import vi from '~/locales/vi'
export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages: {
      en: en,
      vi: vi,
    },
  })

  vueApp.use(i18n)
})
