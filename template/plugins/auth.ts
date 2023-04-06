export default defineNuxtPlugin(() => {
  const { getSession } = useAuth()
  return {
    provide: {
      auth: getSession,
    },
  }
})
