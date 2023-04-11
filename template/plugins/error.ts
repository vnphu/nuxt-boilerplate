export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error: any, context) => {
    console.log(error, 'error handle')
    if (error?.statusCode === 401) {
      navigateTo('/login')
    }
    // ...
  }
})
