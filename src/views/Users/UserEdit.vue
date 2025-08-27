<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { useUsersStore } from '../../stores/useUsersStore';
    import type { User } from '../../types/user';
    import UserForm from '../../components/users/UserForm.vue';
    import { ref } from 'vue';

    const route = useRoute()
    const user = ref(useUsersStore().users.find(u => u.id === Number(route.params.id)) || new Object as User)

    const formRef = ref()

    async function editUser() {
        const valid = formRef.value.validate()

        if(!valid) return

        try {
            await useUsersStore().editUser(user.value)
        } catch (error) {
            alert(useUsersStore().errors)
        }
    }

</script>

<template>
    <div>
        <form @submit.prevent="editUser">
            <UserForm v-model:user="user" ref="formRef" />
        </form>
    </div>
</template>