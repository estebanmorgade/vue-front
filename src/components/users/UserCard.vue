<script setup lang="ts">
import DeleteButton from '../DeleteButton.vue'
import type { User } from '../../types/user'

function handleDelete() {
    emit('delete', props.user.id as number)
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
    <td class="p-2">{{ user.id }}</td>
    <td class="p-2">{{ user.name }}</td>
    <td class="p-2">{{ user.email }}</td>
    <td class="p-2">{{ user.role }}</td>
    <td class="p-2">
        <router-link :to="`users/${user.id}/edit`">Edit</router-link>
    </td>
    <td class="p-2">
        <DeleteButton @confirm="handleDelete"/>
    </td>
</template>