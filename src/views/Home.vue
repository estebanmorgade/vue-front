<script setup lang="ts">
    import { useUserStore } from '../stores/useUserStore';

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
