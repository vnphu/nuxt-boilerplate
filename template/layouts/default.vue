<script lang="ts" setup>
import { useAppStore } from '@/stores/app'
const toast = useToast()
const appStore = useAppStore()
const newError = appStore.newError
watch(() => appStore.error, (error) => {
  if (error) {
    //@ts-ignore
    toast.add({ severity: 'error', summary: 'Error Message', detail: + error.code + ': ' + error.message, life: 10000 })
    //@ts-ignore
    appStore.error = null
  }
})
</script>

<template>
  <div class="layout">
    <Toast />
    <NuxtPage />
  </div>
</template>

<style scoped lang="scss"></style>
