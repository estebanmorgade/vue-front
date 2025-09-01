<script setup lang="ts">
import { onMounted } from "vue"
import { useProjectsStore } from "../../stores/useProjectsStore"

const projectsStore = useProjectsStore()

onMounted(async () => {
    await projectsStore.fetchProjects()
})

const url = import.meta.env.VITE_IMG_URL
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Projects</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link
        v-for="project in projectsStore.projects"
        :key="project.id"
        :to="`/project/${project.id}`"
        class="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
      >
        <div class="relative">
          <img
            :src="url+project.image"
            :alt="project.title"
            class="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>

        <div class="p-5">
          <h2 class="text-lg font-semibold mb-2 text-gray-900">
            {{ project.title }}
          </h2>
          <p class="text-gray-600 text-sm">
            {{ project.description }}
          </p>

          <span class="inline-flex items-center text-blue-600 font-medium mt-3">
            Ver más →
          </span>
        </div>
      </router-link>
    </div>
  </div>
</template>
