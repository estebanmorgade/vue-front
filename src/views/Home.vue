<script setup lang="ts">
    import { useHead } from '@vueuse/head';

    useHead({
        title: 'Home',
        meta: [
            { name: 'description', content: 'Welcome to the home page' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]
    });
</script>

<template>

    <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        
            <!-- Texto -->
            <div>
                <h1 class="text-4xl font-bold text-blue-600 mb-6">Home</h1>
                <p class="text-lg text-gray-600 mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eum soluta, illum fuga deserunt nobis voluptatem aut cum laudantium quidem.
                Earum, illum omnis quasi alias dolores rerum aut dolorem tempora amet?
                </p>

                <div class="flex flex-col sm:flex-row gap-4">
                <RouterLink 
                    to="/contact"
                    class="px-6 py-3 text-lg rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                    Contact
                </RouterLink>
                <RouterLink 
                    to="/projects"
                    class="px-6 py-3 text-lg rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
                >
                    Projects
                </RouterLink>
                </div>
            </div>

            <!-- Imagen -->
            <div>
                <img 
                src="/img/home.svg" 
                alt="Home illustration"
                class="w-full max-w-md mx-auto lg:max-w-full"
                />
            </div>

        </div>
  </div>
</template>
