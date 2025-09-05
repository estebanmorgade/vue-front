<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const errors = ref<{ [key: string]: string }>({})

const handleSubmit = () => {
  errors.value = {}

  if (!name.value.trim()) {
    errors.value.name = 'El nombre es obligatorio'
  }
  if (!email.value.trim()) {
    errors.value.email = 'El email es obligatorio'
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
    errors.value.email = 'El email no es válido'
  }
  if (!message.value.trim()) {
    errors.value.message = 'El mensaje es obligatorio'
  }

  if (Object.keys(errors.value).length === 0) {
    // 👉 Acá llamás a tu API o backend
    console.log({
      name: name.value,
      email: email.value,
      message: message.value,
    })
    alert('Mensaje enviado con éxito 🚀')
    
    // Reset form
    name.value = ''
    email.value = ''
    message.value = ''
  }
}
</script>

<template>
  <div class="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Contacto</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Nombre -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          v-model="name"
          type="text"
          placeholder="Tu nombre"
          class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="tucorreo@mail.com"
          class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
      </div>

      <!-- Mensaje -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Mensaje</label>
        <textarea
          v-model="message"
          rows="5"
          placeholder="Escribe tu mensaje..."
          class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <p v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</p>
      </div>

      <!-- Botón -->
      <button
        type="submit"
        class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Enviar
      </button>
    </form>
  </div>
</template>
