<script setup lang="ts">
    import  { useUserStore } from '../stores/useUserStore'
    import { useRouter } from 'vue-router';

    const user = useUserStore()
    const router = useRouter()

    function doLogin() {
        user.login({
            name: 'Esteban',
            email: 'gadesito@gmail.com',
            token: 'mock123'
        })

        router.push('/users')
    }

</script>


<template>
    <div>
        <h2>Login</h2>
        <button @click="doLogin">Simular login</button>
    </div>
</template>