<script setup lang="ts">
  import BreadCrumbs from '../BreadCrumbs.vue';
</script>

<template>
  <div>
    <BreadCrumbs/>
    <main class="p-6">
      <slot />
    </main>
  </div>
</template>
