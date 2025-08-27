<!-- src/views/Users/UserCreate.vue -->
<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
      
      <!-- Título -->
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">New User</h2>

      <!-- Formulario -->
      <form @submit.prevent="addUser" class="space-y-5">
        
        <UserForm v-model:user="user" ref="formRef" />

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from 'vue-router';
import { useUsersStore } from '../../stores/useUsersStore';
import UserForm from '../../components/users/UserForm.vue';
import type { User } from '../../types/user';

const router = useRouter()
const usersStore = useUsersStore()
const user = ref<User>({
        name: '',
        email: '',
        password: null,
        role: 'user'
    })

const formRef = ref()

async function addUser() {
        usersStore.loading = true
        const valid = await formRef.value.validate()

        if (!valid) {
            usersStore.loading = false
            return
        }

        try {
            await usersStore.addUser(user.value)
        } catch (error) {
            alert(usersStore.errors)
        } finally {
            if (Object.keys(usersStore.errors).length === 0) {
                router.push("/adminDashboard/users")
            }
            usersStore.loading = false
        } 
        
    }
</script>
