<script setup lang="ts">
import type {User} from '../../types/user';
import { ref } from 'vue';
import { useUsersStore } from '../../stores/useUsersStore';
import InputForm from '../InputForm.vue';


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
    <InputForm
        v-model="user.name"
        label="Name"
        name="name"
        placeholder="Enter your name"
        :required="true"
        :error="errors.name || useUsersStore().errors.name?.[0]"
    />

    <InputForm
        v-model="user.email"
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        :required="true"
        :error="errors.email || useUsersStore().errors.email?.[0]"
    />

    <InputForm
        v-model="user.role"
        label="Role"
        name="role"
        placeholder="Chose a role"
        :required="true"
        :error="errors.role || useUsersStore().errors.role?.[0]"
    />

    <InputForm
        v-model="user.password"
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        :required="!user.id"
        :error="errors.password || useUsersStore().errors.password?.[0]"
    />

    <button type="submit" :disabled="useUsersStore().loading" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
      <span>{{ user.id ? 'Edit user' : 'Create user' }}</span>
    </button>
</template>