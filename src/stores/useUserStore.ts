import { defineStore } from "pinia";
import type { User } from "../types/user"
import axios from "../services/axios";
import { useNotificationStore } from "./useNotificationStore";
import { useAuthStorage } from "../composables/useAuthStorage";

// src/stores/useUserStore.ts
export const useUserStore = defineStore('user', {
    
    state: () => ({
        user: null as User | null,
        users: null as User[] | null,
        token: null as string | null,
        loading: false,
        error: null as string | null    
    }),

    getters: {
        isLoggedIn: (state) => !!state.user
    },

    actions: {
        async login(email: string, password: string) {
            this.loading = true
            this.error = null
            const notificationStore = useNotificationStore()
            const { saveToken } = useAuthStorage()
            try {
                const res = await axios.post('/login', { email, password })
                this.user = res.data.user
                this.token = res.data.token
                saveToken(this.token as string)
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
            } catch (err: any) {
                notificationStore.show(this.error = err.response?.data?.message || 'Login failed', 'error')
            } finally {
                this.loading = false
            }
        },

        async fetchUser() { // get current user
            try {
                const res = await axios.get('/me')
                this.user = res.data
            } catch (error) {
                this.user = null
                this.token = null
            }
        },

        async logout() {
            try {
                await axios.post('/logout')
            } catch (_) {}

            const { clearToken } = useAuthStorage()
            this.user = null
            this.token = null
            clearToken()
            delete axios.defaults.headers.common['Authorization']
        },

        async initAuth() {
            const { getToken } = useAuthStorage()
            const savedToken = getToken()
            if(savedToken) {
                this.token = savedToken
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                await this.fetchUser()
            }
        }
    }


})