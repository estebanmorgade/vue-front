<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { useUsersStore } from '../stores/useUsersStore';
    import type { User } from '../types/user';

    const route = useRoute()
    const user = useUsersStore().users.find(u => u.id === Number(route.params.id)) || new Object as User

    async function editUser() {
        useUsersStore().editUser(user)
    }

</script>

<template>
    <div>
        <form @submit.prevent="editUser">
            <input v-model="user.name" placeholder="Name" required/>
            <input v-model="user.email" placeholder="Email" type="email" required/>
            <input v-model="user.role" placeholder="Role" required/>
            <input v-model="user.password" placeholder="Password" type="password" required/>
            <button type="submit">Editar usuario</button>
        </form>
    </div>
</template>