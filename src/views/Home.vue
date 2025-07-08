<script setup lang="ts">
    import { useCounterStore } from '../stores/useCounterStore'
    import { useUserStore } from '../stores/useUserStore';

    const counter = useCounterStore()
    const user = useUserStore()

    function simulateLogin() {
        user.login({
            name: 'Esteban Morgade',
            email: 'gadesito@gmail.com',
            token: 'abc123token'
        })
    }
</script>

<template>
    <div>
        <h1>Home</h1>
        <p>Count: {{ counter.count }}</p>
        <p>Double: {{ counter.double }}</p>
        <button @click="counter.increment">+1</button>
    </div>

    <div>
        <h2>User Store Demo</h2>
        <div v-if="user.isAuthenticated">
            <p>Welcome, {{ user.name }}</p>
            <p>{{ user.email }}</p>
            <button @click="user.logout">Logout</button>
        </div>
        <div v-else>
            <p>No estas logueado</p>
            <button @click="simulateLogin">Login simulado</button>
        </div>
    </div>
</template>
