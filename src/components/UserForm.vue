<script setup lang="ts">
import type {User} from '../types/user';
import { ref } from 'vue';
import { useUsersStore } from '../stores/useUsersStore';
import Loader from './Loader.vue';


const user = defineModel<User>('user',{required: true})
const errors = ref<{ [key: string]: string }>({})

const validate = () => {
  errors.value = {}
  if (!user.value.name) errors.value.name = 'El nombre es obligatorio'

  if (!user.value.email) errors.value.email = 'El email es obligatorio'
  else if (!/\S+@\S+\.\S+/.test(user.value.email)) errors.value.email = 'Email inválido'

  if (!user.value.role) errors.value.role = 'El rol es obligatorio'
  else if (!['user', 'admin', 'superadmin'].includes(user.value.role)) errors.value.role = 'Rol inválido'

  if (user.value.password && user.value.password.length < 6) errors.value.password = 'La contraseña debe tener al menos 6 caracteres'

  return Object.keys(errors.value).length === 0
}

defineExpose({validate})
</script>

<template>
    <input v-model="user.name" placeholder="Name" :class="['border',{'border-red-500': !user.name}]" required />
    <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
    <span v-if="!errors.name && useUsersStore().errors.name">{{ useUsersStore().errors.name[0] }}</span>

    <input v-model="user.email" placeholder="Email" type="email" :class="['border',{'border-red-500': !user.email}]" required />
    <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
    <span v-if="!errors.email && useUsersStore().errors.email" class="text-red-500 text-sm">{{ useUsersStore().errors.email[0] }}</span>

    <input v-model="user.role" placeholder="Role" :class="['border',{'border-red-500': !user.role}]" required>
    <span v-if="errors.role" class="text-red-500 text-sm">{{ errors.role }}</span>
    <span v-if="!errors.role && useUsersStore().errors.role" class="text-red-500 text-sm">{{ useUsersStore().errors.role[0] }}</span>

    <input v-model="user.password" placeholder="Password" type="password" :class="['border',{'border-red-500': !user.password}]" :required="!user.id">
    <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
    <span v-if="!errors.password && useUsersStore().errors.password" class="text-red-500 text-sm">{{ useUsersStore().errors.password[0] }}</span>

    <button type="submit">
      <Loader v-if="useUsersStore().loading" :size="18" color="text-white"/>
      <span>{{ !useUsersStore().loading ? (user.id ? 'Edit user' : 'Create user') : 'Loading...' }}</span>
    </button>
</template>