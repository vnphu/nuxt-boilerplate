import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { $auth: auth, $i18n: i18n }: any = nuxtApp
  const func = () => {
    console.log('check')
    if (auth.loggedIn) {
      i18n.locale = auth?.user?.account?.language || 'en'
    }
  }
  func()
  nuxtApp.provide('checkI18n', () => func())
  // const { locale } = useI18n()
})
