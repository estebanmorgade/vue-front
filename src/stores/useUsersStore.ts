import { defineStore } from "pinia";
import type { User } from "../types/user"
import axios from "../services/axios";

export const useUsersStore = defineStore('users', {
    
    state: () => ({
        users: [] as User[],
        loading: false,
        errors: {} as Record<string, string[]>    
    }),

    actions: {

        async fetchUsers() {
            this.loading = true
            this.clearErrors()
            try {
                const res = await axios.get('/users')
                this.users = res.data
            } catch (err: any) {
                this.errors = err.response?.data?.errors || 'Error fetching users'
            } finally {
                this.loading = false
            }
        },

        async deleteUser(id: number) {
            this.loading = true
            this.clearErrors()
            try {
                await axios.delete(`/users/${id}`)
                this.users = this.users.filter(user => user.id !== id)
            } catch (err: any) {
                this.errors = err.response?.data?.errors || 'Error deleting user'
            } finally {
                this.loading = false
            }
        },

        async addUser(user: User) {
            this.loading = true
            this.clearErrors()
            try {
                const response = await axios.post('/users', user)
                this.users.push(response.data)
            } catch (err: any) {
                this.errors = err.response?.data?.errors || 'Error adding user'
            } finally {
                this.loading = false
            }
        },

        async editUser(user: User) {
            this.loading = true
            this.clearErrors()
            try {
                const response = await axios.put(`/users/${user.id}`, user)
                this.users.push(response.data)
            } catch (err: any) {
                this.errors = err.response?.data?.errors || 'Error editing user'
            } finally {
                this.loading = false
            }
        },

        clearErrors() {
            this.errors = {}
        }
    }


})