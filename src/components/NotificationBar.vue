<template>
    <div v-if="message" :class="type === 'success' ? 'bg-green-500' : 'bg-red-500'" class="fixed top-4 right-4 p-3 rounded text-white shadow">
        {{ message }}
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useNotificationStore } from '../stores/useNotificationStore';

    const { message, type } = storeToRefs(useNotificationStore());
</script>