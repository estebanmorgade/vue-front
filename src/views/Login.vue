<script setup lang="ts">
    import { ref } from 'vue';
    import  { useUserStore } from '../stores/useUserStore'

    const email = ref('')
    const password = ref('')
    const userStore = useUserStore()

    const submit = () => {
        userStore.login(email.value, password.value)
    }
</script>


<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="submit">
            <input type="email" v-model="email" placeholder="Email" />
            <input type="password" v-model="password" placeholder="Password" />
            <button :disabled="userStore.loading">Login</button>
            <p v-if="userStore.error" class="text-red-500">{{  userStore.error }}</p>
        </form>
    </div>
</template>