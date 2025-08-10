<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useUsersStore } from '../stores/useUsersStore';
    import UserCard from '../components/UserCard.vue';
    import type { User } from '../types/user';
    import UserForm from '../components/UserForm.vue';
    

    const usersStore = useUsersStore()
    const user = ref<User>({
        name: '',
        email: '',
        password: null,
        role: 'user'
    })

    const formRef = ref()

    function deleteUser(id: number) {
        usersStore.deleteUser(id)
    }

   async function addUser() {
        usersStore.loading = true
        const valid = await formRef.value.validate()

        if (!valid) return

        try {
            await usersStore.addUser(user.value)
        } catch (error) {
            alert(usersStore.errors)
        } finally {
            usersStore.loading = false
        } 
        
    }

    onMounted(async () => {
        usersStore.loading = true
        try {
            usersStore.fetchUsers()
        } catch (err: any) {
            alert(err || 'Fetch user error')
        } finally {
            usersStore.loading = false
        }
    })
</script>

<template>
    <div>
        <h2>Listado de Usuarios</h2>

        <form @submit.prevent="addUser">
            <UserForm v-model:user="user" ref="formRef" />
        </form>

        <div v-if="usersStore.loading">Cargando...</div>
        <div v-else-if="Object.keys(usersStore.errors).length !== 0">{{ usersStore.errors }}</div>
        <ul v-else>
            <li v-for="u in usersStore.users">
                <UserCard :key="u.id" :user="u" :users="usersStore.users" @delete="deleteUser"/>
            </li>
        </ul>
        
    </div>
</template>