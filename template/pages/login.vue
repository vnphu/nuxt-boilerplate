<template>
  <div>
    login
    <input type="text" v-model="username">
    <input type="text" v-model="password">
    <button @click="login">login</button>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  auth: false,
});
const toast = useToast()
const username = ref('')
const password = ref('')


const login = async () => {
  const data = await apiFetch('/admin/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: { username, password },
  })
  // toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
  console.log('login')
}
</script>

<style scoped></style>
