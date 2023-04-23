import en from '~/locales/en'
import vi from '~/locales/vi'
export default defineI18nConfig((nuxt) => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: en,
    vi: vi,
  },
}))
