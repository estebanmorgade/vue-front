<template>

  <div class="min-h-screen bg-gray-100 flex">
    <aside class="w-64 bg-white shadow"> <!-- Sidebar admin --> </aside>
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