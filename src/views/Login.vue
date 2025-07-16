<script setup lang="ts">
    import { ref } from 'vue';
    import  { useUserStore } from '../stores/useUserStore'
    import { useRouter } from 'vue-router';

    const email = ref('')
    const password = ref('')
    const userStore = useUserStore()
    const router = useRouter()

    const submit = async () => {
        await userStore.login(email.value, password.value)

        if(userStore.isLoggedIn)
            router.push('/dashboard')
    }
</script>


<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="submit">
            <input type="email" v-model="email" placeholder="Email" />
            <input type="password" v-model="password" placeholder="Password" />
            <button :disabled="userStore.loading">
                <svg
                    v-if="userStore.loading"
                    class="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    >
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <span>{{ userStore.loading ? 'Loading...' : 'Login' }}</span>
            </button>
            <p v-if="userStore.error" class="text-red-500">{{  userStore.error }}</p>
        </form>
    </div>
</template>