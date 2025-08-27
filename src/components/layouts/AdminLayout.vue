<template>

  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar admin -->
    <aside class="w-64 bg-white shadow">
      <nav class="p-4">
        <ul>
          <li class="mb-4">
            <router-link to="/adminDashboard/users" class="text-gray-700 hover:text-blue-500">Users</router-link>
          </li>
          <li class="mb-4">
            <router-link to="/adminDashboard/projects" class="text-gray-700 hover:text-blue-500">Projects</router-link>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="flex-1 p-6">
      <router-view/>
    </main>
  </div>
</template>

<script setup lang="ts">

import { useUserStore } from '../../stores/useUserStore';
import { onMounted } from 'vue';

const userStore = useUserStore()


//force refetch if there is not user (extra security)

onMounted(() => {
    if(!userStore.user) userStore.fetchUser()
})
</script>