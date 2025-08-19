<script setup lang="ts">
    import { ref } from 'vue';
    import  { useUserStore } from '../stores/useUserStore'
    import { useRouter } from 'vue-router';
    import InputForm from '../components/InputForm.vue';

    const email = ref('')
    const password = ref('')
    const userStore = useUserStore()
    const router = useRouter()

    const submit = async () => {
        await userStore.login(email.value, password.value)

        if(userStore.isLoggedIn)
            if(userStore.user?.role === 'admin' || userStore.user?.role === 'superadmin')
                router.push('/adminDashboard')
            else
                router.push('/dashboard')
    }
</script>


<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="submit">
            <InputForm
                v-model="email"
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                :required="true"
            />

            <InputForm
                v-model="password"
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                :required="true"
            />
            <button :disabled="userStore.loading" type="submit">
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