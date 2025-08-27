<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import { useUserStore } from './stores/useUserStore';
  import { useUsersStore } from './stores/useUsersStore';
  import Navbar from './components/Navbar.vue';
  import Loader from './components/Loader.vue';
  import NotificationBar from './components/NotificationBar.vue';

  //layouts import
  
  import DefaultLayout from './components/layouts/DefaultLayout.vue';
  import AdminLayout from './components/layouts/AdminLayout.vue';
  import AuthLayout from './components/layouts/AuthLayout.vue';

  // Map layouts
  const layouts: Record<string, any> = {
    DefaultLayout,
    AdminLayout,
    AuthLayout
  }

  const route = useRoute()
  const layoutName = computed(() => route.meta.layout as keyof typeof layouts || 'DefaultLayout')

  const userStore = useUserStore()
  const usersStore = useUsersStore()
</script>

<template>
  <header>
    <Navbar/>
    <hr />
  </header>
  <component :is="layouts[layoutName]">
    <transition name="fade" mode="out-in">
      <router-view :key="$route.name" />
    </transition>
  </component>
  <footer>
    <p class="text-center text-gray-500 mt-4">© 2025 Your Company</p>
    <p class="text-center text-gray-500 mt-2">All rights reserved.</p>
    <NotificationBar />
    <Loader :show="userStore.loading || usersStore.loading"/>
  </footer>
</template>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

</style>
