<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useUsersStore } from '../stores/useUsersStore';
    import UserCard from '../components/UserCard.vue';
    import type { User } from '../types/user';
    

    const usersStore = useUsersStore()
    const user = new Object as User 

    function deleteUser(id: number) {
        usersStore.deleteUser(id)
    }

   async function addUser() {
        usersStore.addUser(user)
    }

    onMounted(async () => {
        usersStore.loading = true
        try {
            usersStore.fetchUsers()
        } catch (err: any) {
            err.value = 'Error al cargar usuarios'
        } finally {
            usersStore.loading = false
        }
    })
</script>

<template>
    <div>
        <h2>Listado de Usuarios</h2>

        <form @submit.prevent="addUser">
            <input v-model="user.name" placeholder="Name" required />
            <input v-model="user.email" placeholder="Email" type="email" required />
            <input v-model="user.role" placeholder="Role" required>
            <input v-model="user.password" placeholder="Password" type="password" required>
            <button type="submit">Agregar usuarios</button>
        </form>

        <div v-if="usersStore.loading">Cargando...</div>
        <div v-else-if="usersStore.error">{{ usersStore.error }}</div>
        <ul v-else>
            <li v-for="u in usersStore.users">
                <UserCard :key="u.id" :user="u" :users="usersStore.users" @delete="deleteUser"/>
            </li>
        </ul>
        
    </div>
</template>