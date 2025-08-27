<script setup lang="ts">
// Definimos que vamos a emitir un evento personalizado

    const emit = defineEmits<{
        (e: 'confirm'): void
    }>()
</script>

<template>
    <button @click="emit('confirm')">Delete</button>
</template>