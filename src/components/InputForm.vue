<script setup lang="ts">
import { computed } from 'vue';

interface InputFormProps {
    label: string;
    name: string;
    modelValue: string | number;
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
        <label :for="name" class="block text-sm font-medium text-gray-700 mb-1">
        {{ label }} <span v-if="!inputValue && required" class="text-red-500">*</span>
        </label>
        <input
        :id="name"
        :name="name"
        v-model="inputValue"
        :type="type || 'text'"
        :placeholder="placeholder"
        :required="required"
        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
    </div>
</template>