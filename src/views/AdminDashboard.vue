<template>
    <div class="p-6 max-w-xl mx-auto">
        <h1 class="text-2xl font-bold m-4">Admin Dashboard</h1>

        <div class="bg-white rounded-xl shadow p-4 space-y-2">
            <p class="text-gray-700">
                Welcome, <strong>{{ user?.name || 'Usuario' }}</strong>
            </p>
            <p>Email: <strong>{{ user?.email }}</strong></p>

            <button @click="logout" class="mt-4 px-4 py-2 bg-reed-600 text-white rounded hover:bg-red-700 transition">
                Logout
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useUserStore } from '../stores/useUserStore';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const userStore = useUserStore()
const router = useRouter()

const user = userStore.user

const logout = async () => {
    await userStore.logout()
    router.push('/login')
}

//force refetch if there is not user (extra security)

onMounted(() => {
    if(!userStore.user) userStore.fetchUser()
})
</script>