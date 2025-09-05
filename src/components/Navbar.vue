<script setup lang="ts">
    import { ref } from 'vue';
    import { useUserStore } from '../stores/useUserStore';
    import { useRouter } from 'vue-router';

    const userStore = useUserStore()
    const router = useRouter()
    const isOpen = ref(false)

    async function handleLogout() {
        await userStore.logout()
        router.push('/login')
        isOpen.value = false
    }
</script>

<template>
  <nav class="bg-gray-900 text-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Brand name -->
        <div class="flex-shrink-0 text-2xl font-bold tracking-wide">
          <router-link to="/">MyApp</router-link>
        </div>

        <!-- Desktop menu -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link to="/about" class="hover:text-blue-400 transition">About</router-link>

          <router-link
            v-if="['admin','superadmin'].includes(userStore.user?.role ?? '')"
            to="/adminDashboard"
            class="hover:text-blue-400 transition"
          >
            Admin
          </router-link>

          <router-link
            v-if="userStore.isLoggedIn"
            to="/profile"
            class="hover:text-blue-400 transition"
          >
            Profile
          </router-link>

          <!-- User info -->
          <span v-if="userStore.isLoggedIn" class="text-sm text-gray-300">
            Hola, <span class="font-medium">{{ userStore.user?.name }}</span>
          </span>

          <!-- Auth buttons -->
          <button
            v-if="userStore.isLoggedIn"
            @click="handleLogout"
            class="bg-red-500 px-4 py-1 rounded-lg text-sm font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
          <router-link
            v-else
            to="/login"
            class="bg-blue-600 px-4 py-1 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Login
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="isOpen = !isOpen"
            class="focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              v-if="!isOpen"
              class="h-7 w-7 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              v-else
              class="h-7 w-7 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu dropdown -->
    <div v-if="isOpen" class="md:hidden bg-gray-800 px-4 pb-4 space-y-2">
      <router-link to="/" class="block py-2 hover:text-blue-400">Home</router-link>
      <router-link to="/about" class="block py-2 hover:text-blue-400">About</router-link>

      <router-link
        v-if="['admin','superadmin'].includes(userStore.user?.role ?? '')"
        to="/adminDashboard"
        class="block py-2 hover:text-blue-400"
      >
        Admin
      </router-link>

      <router-link
        v-if="userStore.isLoggedIn"
        to="/profile"
        class="block py-2 hover:text-blue-400"
      >
        Profile
      </router-link>

      <span
        v-if="userStore.isLoggedIn"
        class="block text-sm text-gray-300"
      >
        Hola, {{ userStore.user?.name }}
      </span>

      <button
        v-if="userStore.isLoggedIn"
        @click="handleLogout"
        class="w-full bg-red-500 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
      >
        Logout
      </button>
      <router-link
        v-else
        to="/login"
        class="block w-full text-center bg-blue-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
      >
        Login
      </router-link>
    </div>
  </nav>
</template>
