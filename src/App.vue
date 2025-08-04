<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  //layouts import
  import Navbar from './components/Navbar.vue';
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
</script>

<template>
  <header>
    <Navbar/>
    <hr />
  </header>
  <component :is="layouts[layoutName]">
    <router-view />
  </component>
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
