import { defineStore } from "pinia";
import type { User } from "../types/user"
import axios from "../services/axios";

export const useUsersStore = defineStore('users', {
    
    state: () => ({
        users: [] as User[],
        loading: false,
        error: null as string | null    
    }),

    actions: {

        async fetchUsers() {
            this.loading = true
            this.error = null
            try {
                const res = await axios.get('/users')
                this.users = res.data
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Error fetching users'
            } finally {
                this.loading = false
            }
        },

        async deleteUser(id: number) {
            try {
                await axios.delete(`/users/${id}`)
                this.users = this.users.filter(user => user.id !== id)
            } catch (err: any) {
                this.error = err || 'Error deleting user'
            }
        },

        async addUser(user: User) {
            this.loading = true
            this.error = null
            try {
                const response = await axios.post('/users', user)
                this.users.push(response.data)
            } catch (err: any) {
                this.error = err || 'Error adding user'
            } finally {
                this.loading = false
            }
        },

        async editUser(user: User) {
            try {
                const response = await axios.put(`/users/${user.id}`, user)
                this.users.push(response.data)
            } catch (err: any) {
                this.error = err || 'Error editing user'
            }
        }
    }


})