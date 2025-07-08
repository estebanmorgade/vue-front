import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {

    const isAuthenticated = ref(false)
    const name = ref('')
    const email = ref('')
    const token = ref('')

    function login(userData: { name:string, email:string, token:string}) {
        name.value = userData.name
        email.value = userData.email
        token.value = userData.token
        isAuthenticated.value = true
    }

    function logout() {
        name.value = ''
        email.value = ''
        token.value = ''
        isAuthenticated.value = false
    }

    return { isAuthenticated, name, email, token, login, logout }
})