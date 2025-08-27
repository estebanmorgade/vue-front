<script setup lang="ts">
  import BreadCrumbs from '../BreadCrumbs.vue';
</script>

<template>
  <div>
    <main class="p-6">
      <BreadCrumbs/>
      <slot />
    </main>
  </div>
</template>
