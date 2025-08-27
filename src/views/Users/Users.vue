<script setup lang="ts">
    import { onMounted} from 'vue';
    import { useUsersStore } from '../../stores/useUsersStore';
    import UserCard from '../../components/users/UserCard.vue';
    

    const usersStore = useUsersStore()

    function deleteUser(id: number) {
        usersStore.deleteUser(id)
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
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">User list</h2>

        <div class="flex justify-end mb-4">
            <RouterLink 
                to="users/create"
                class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition"
            >
                <!-- Ícono + texto -->
                <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" 
                    stroke-width="2" stroke="currentColor" 
                    class="w-5 h-5 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" 
                        d="M12 4v16m8-8H4" />
                </svg>
                Crear Usuario
            </RouterLink>
        </div>


        <table class="w-full bg-white shadow rounded">
            <thead>
                <tr class="bg-gray-200">
                    <th class="p-2">ID</th>
                    <th class="p-2">Name</th>
                    <th class="p-2">Email</th>
                    <th class="p-2">Role</th>
                    <th class="p-2">&nbsp;</th>
                    <th class="p-2">&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="u in usersStore.users" :key="u.id" class="border-b">
                    <UserCard :key="u.id" :user="u" :users="usersStore.users" @delete="deleteUser"/>
                </tr>
            </tbody>
        </table>
        <!--
        <ul v-else>
            <li v-for="u in usersStore.users">
                <UserCard :key="u.id" :user="u" :users="usersStore.users" @delete="deleteUser"/>
            </li>
        </ul>
    -->
    </div>
</template>