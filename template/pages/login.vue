<template>
  <div>
    <p>Sign-In Options:</p>
    <!-- NOTE: Here we hard-coded username and password, on your own page this should probably be connected to two inputs for username + password -->
    <button @click="signIn('credentials', { username: 'admin@workid.ca', password: '123456' })">Username and
      Password</button>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  auth: false
})
const { signIn } = useAuth()
</script>