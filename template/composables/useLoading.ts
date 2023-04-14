export default () => {
  const loading = ref(false)

  const toggleLoading = () => {
    loading.value = !loading.value
  }

  return {
    loading,
    toggleLoading,
  }
}
