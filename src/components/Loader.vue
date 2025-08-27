<!--
<template>
  <svg
    class="animate-spin"
    :class="spinnerColor"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    :width="spinnerSize"
    :height="spinnerSize"
    viewBox="0 0 24 24"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    />
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
</template>
-->
<script setup lang="ts">
const props = defineProps<{
  size?: number
  color?: string
  show: boolean
}>()

const spinnerSize = props.size || 40
const spinnerColor = props.color || "text-blue-600"
</script>

<template>
  <!-- Solo mostrar si `show` es true -->
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="flex flex-col items-center space-y-4">
      <!-- Spinner -->
      <svg
        class="animate-spin"
        :class="spinnerColor"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        :width="spinnerSize"
        :height="spinnerSize"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>

      <!-- Texto opcional -->
      <p class="text-white font-medium">Loading...</p>
    </div>
  </div>
</template>
