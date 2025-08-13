<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  //layouts import
  import Navbar from './components/Navbar.vue';
  import DefaultLayout from './components/layouts/DefaultLayout.vue';
  import AdminLayout from './components/layouts/AdminLayout.vue';
  import AuthLayout from './components/layouts/AuthLayout.vue';
  import NotificationBar from './components/NotificationBar.vue';

  // Map layouts
  const layouts: Record<string, any> = {
    DefaultLayout,
    AdminLayout,
    AuthLayout
  }

  const route = useRoute()
  const layoutName = computed(() => route.meta.layout as keyof typeof layouts || 'DefaultLayout')
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
