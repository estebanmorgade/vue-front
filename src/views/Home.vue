<script setup lang="ts">
    import { useCounterStore } from '../stores/useCounterStore'

    const counter = useCounterStore()
</script>

<template>
    <div>
        <h1>Home</h1>
        <p>Count: {{ counter.count }}</p>
        <p>Double: {{ counter.double }}</p>
        <button @click="counter.increment">+1</button>
    </div>
</template>
