<script setup lang="ts">
    import { ref } from 'vue';
    import { useUserStore } from '../stores/useUserStore';
    import { useRouter } from 'vue-router';

    const userStore = useUserStore()
    const router = useRouter()
    const isOpen = ref(false)

    async function handleLogout() {
        await userStore.logout()
        router.push('/login')
        isOpen.value = false
    }
</script>
<template>
    <nav class="bg-gray-800 text-white px-4 py-3 shadow-md">
        <div class="felx justify-between items-center max-w-6xl mx-auto">
            <!-- Brand name -->
            <div class="text-lg font-semibold">
                <router-link to="/">MyApp</router-link>
            </div>

            <!-- Links -->
            <div class="hidden md:flex space-x-4 items-center">
                <router-link v-if="userStore.isLoggedIn" to="/about" class="hover:text-blue-300">About</router-link>
                <router-link v-if="userStore.isLoggedIn" to="/users" class="hover:text-blue-300">Users</router-link>
                <span v-if="userStore.isLoggedIn" class="text-sm text-gray-300">Hola, {{ userStore.user?.name }}</span>
                <button v-if="userStore.isLoggedIn" type="button" @click="handleLogout" class="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm">Logout</button>
                <router-link v-else to="/login" class="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 text-sm">Login</router-link>
            </div>

            <!-- Menu button (mobile) -->
            <button type="button" class="md:hidden focus:outline-none" @click="isOpen = !isOpen">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>

        <!-- Menu Mobile -->
        <div v-if="isOpen" class="md:hidden mt-2 space-y-2 text-center">
            <router-link to="/" class="block">Home</router-link>
            <div v-if="userStore.isLoggedIn">
                <router-link to="/about" class="block">About</router-link>
                <router-link to="/users" class="block">Users</router-link>
                <span class="blocktext-sm text-gray-300">Hola, {{ userStore.user?.name }}</span>
                <button type="button" @click="handleLogout" class="bg-red-500 w-full px-3 py-1 rounded hover:bg-red-600 text-sm">Logout</button>
            </div>
            <router-link v-else to="/login" class="bg-blue-500 block w-full px-3 py-1 rounded hover:bg-blue-600 text-sm">Login</router-link>
        </div>
    </nav>
</template>