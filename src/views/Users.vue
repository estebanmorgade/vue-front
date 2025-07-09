<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { getUsers, createUser } from '../services/api';
    import UserCard from '../components/UserCard.vue';
    import type { User } from '../types/user';
    

    const users = ref<User[]>([])
    const name = ref('')
    const email = ref('')
    const loading = ref(false)
    const error = ref('')

    function deleteUser(id: number) {
        users.value = users.value.filter(user => user.id !== id)
    }

    async function addUser() {

        try {
            const newUser = await createUser({id: Math.random(), name: name.value, email: email.value})
            users.value.unshift(newUser) // lo agregamos arriba de la lista
            name.value = ''
            email.value = ''
        } catch (e) {
            error.value = 'Error al crear usuario'
        }
        
    }

    onMounted(async () => {
        loading.value = true
        try {
            users.value = await getUsers()
        } catch (e) {
            error.value = 'Error al cargar usuarios'
        } finally {
            loading.value = false
        }
    })
</script>

<template>
    <div>
        <h2>Listado de Usuarios</h2>

        <form @submit.prevent="addUser">
            <input v-model="name" placeholder="Nombre" required />
            <input v-model="email" placeholder="Email" type="email" required />
            <button type="submit">Agregar usuarios</button>
        </form>

        <div v-if="loading">Cargando...</div>
        <div v-else-if="error">{{ error }}</div>
        <ul v-else>
            <li v-for="u in users">
                <UserCard :key="u.id" :user="u" :users="users" @delete="deleteUser"/>
            </li>
        </ul>
        
    </div>
</template>