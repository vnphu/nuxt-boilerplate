import { useAppStore } from '@/stores/app'

export const apiFetch = (request: any, opts: any) => {
  const config = useRuntimeConfig()
  const app = useAppStore()

  return useFetch(request, {
    baseURL: config.apiBase + request,
    onRequest({ request, options }) {
      // Set the request headers
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
      // console.log('onResponseError', response)
      // toast.add({ severity: 'error', summary: 'Error Message onRequestError', detail: 'Message Content', life: 3000 })
    },
    onResponse({ request, response, options }) {
      // Process the response data
      return response._data
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
      app.newError({
        //@ts-ignore
        code: response._data?.statusCode || 500,
        message: response._data.message || 'Something went wrong',
      })
      console.log('onResponseError', response)

      // toast.add({ severity: 'error', summary: 'Error Message onResponseError', detail: 'Message Content', life: 3000 })
    },
    ...opts,
  })
}
