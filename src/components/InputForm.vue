<script setup lang="ts">
import { computed } from 'vue';

interface InputFormProps {
    label: string;
    name: string;
    modelValue: string | number | null;
    type?: string;
    required?: boolean;
    error?: string;
    placeholder?: string;
}

const props = defineProps<InputFormProps>();
const emit = defineEmits(['update:modelValue']);

// El valor reactivo del input se gestiona con modelValue
const inputValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});
</script>

<template>
    <div class="mb-4">
        <label :for="name" class="block text-sm font-medium text-gray-600">
        {{ label }} <span v-if="!inputValue && required" class="text-red-500">*</span>
        </label>
        <input
        :id="name"
        :name="name"
        v-model="inputValue"
        :type="type || 'text'"
        :placeholder="placeholder"
        :required="required"
        class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
    </div>
</template>