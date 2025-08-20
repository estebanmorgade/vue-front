<script setup lang="ts">
    import { useUserStore } from '../stores/useUserStore';
    import { useHead } from '@vueuse/head';

    useHead({
        title: 'Home',
        meta: [
            { name: 'description', content: 'Welcome to the home page' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]
    });

    const userUser = useUserStore()
</script>

<template>
    <div>
        <h1>Home</h1>
        <p v-if="userUser.isLoggedIn">
            Welcome back, {{ userUser.user?.name }}. Access your <router-link to="/dashboard">Dashboard</router-link>
        </p>
        <p v-else>Login to see your dashboard</p>
    </div>
</template>
