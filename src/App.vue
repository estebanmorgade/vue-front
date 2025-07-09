<script setup lang="ts">
import { useUserStore } from './stores/useUserStore';
import { useRouter } from 'vue-router';

const user = useUserStore()
const router = useRouter()

function handleLogout() {
        user.logout()
        router.push('/login')
    }
</script>

<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <div v-if="user.isAuthenticated">
        <router-link to="/about">About</router-link> |
        <router-link to="/users">Users</router-link> |
        <button @click="handleLogout">Logout</button>
      </div>
      <router-link v-else to="/login">Login</router-link>
      
    </nav>
    <hr />
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
