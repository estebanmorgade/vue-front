<template>
  <nav aria-label="breadcrumb" class="text-sm text-gray-500">
    <ol class="flex items-center space-x-2">
      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
        <RouterLink v-if="index < breadcrumbs.length - 1" :to="crumb.to" class="hover:underline">
          {{ crumb.label }}
        </RouterLink>
        <span v-else class="text-gray-800 font-medium">
          {{ crumb.label }}
        </span>
        <span v-if="index < breadcrumbs.length - 1" class="mx-2">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const breadcrumbs = computed(() => {
  return route.matched
    .filter(r => r.meta && r.meta.breadcrumb)
    .map(r => {
      const crumb = r.meta.breadcrumb
      const label = typeof crumb === 'function' ? crumb(route) : crumb
      return {
        label,
        to: r.path.includes(':') ? undefined : r.path // solo link si no tiene :id dinámico
      }
    })
})
</script>

<style scoped>
nav a {
  text-transform: capitalize;
}
</style>
