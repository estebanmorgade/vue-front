<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useProjectsStore } from "../../stores/useProjectsStore"
import type { Project } from "../../types/project"

const projectsStore = useProjectsStore()
const route = useRoute()


const project = ref<Project | null>(null)

onMounted(() => {
  const id = Number(route.params.id)
  project.value = projectsStore.projects.find(p => p.id === id) || null
  if(project.value) {
    project.value.image = import.meta.env.VITE_IMG_URL + project.value.image
  }
})
</script>

<template>
  <div class="pb-10">
    <div v-if="project" class="max-w-5xl mx-auto">
      <div class="relative">
        <img
          :src="project.image"
          :alt="project.title"
          class="w-full aspect-[16/9] object-cover rounded-b-2xl"
        />
      </div>

      <div class="px-6 mt-6">
        <h1 class="text-3xl font-bold mb-3 text-gray-900">
          {{ project.title }}
        </h1>
        <p class="text-gray-700 leading-relaxed">
          {{ project.description }}
        </p>

        <div class="mt-6">
          <router-link
            to="/projects"
            class="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            ← Back to Projects
          </router-link>
        </div>
      </div>
    </div>

    <div v-else class="max-w-5xl mx-auto p-6 text-gray-600">
      Project not found.
    </div>
  </div>
</template>
