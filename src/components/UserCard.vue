<script setup lang="ts">
import DeleteButton from './DeleteButton.vue'
import type { User } from '../types/user'

function handleDelete() {
    emit('delete', props.user.id)
}

const emit = defineEmits<{
    (e: 'delete', id: number): void
}>()

// Definimos props que va a escribir este componente

const props = defineProps<{
    user:User
}>()
</script>

<template>
    <div style="border: 1px solid #ccc; padding: 1rem; margin-bottom: 1rem;">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
    </div>
    <div>
        <DeleteButton @confirm="handleDelete"/>
    </div>
</template>