import { defineStore } from "pinia";
import type { User } from "../types/user"
import axios from "../services/axios";

export const useUserStore = defineStore('user', {
    
    state: () => ({
        user: null as User | null,
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
            try {
                const res = await axios.post('/login', { email, password })
                this.user = res.data.user
                this.token = res.data.token
                localStorage.setItem('token', this.token ?? '')
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Login failed'
            } finally {
                this.loading = false
            }
        },

        async fetchUser() {
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

            this.user = null
            this.token = null
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
        },

        async initAuth() {
            const savedToken = localStorage.getItem('token')
            if(savedToken) {
                this.token = savedToken
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                await this.fetchUser()
            }
        }
    }


})