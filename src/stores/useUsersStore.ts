import { defineStore } from "pinia";
import type { User } from "../types/user"
import axios from "../services/axios";
import { useNotificationStore } from "./useNotificationStore";

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
            const notificationStore = useNotificationStore()
            try {
                const res = await axios.get('/users')
                this.users = res.data
            } catch (err: any) {
                notificationStore.show(this.errors = err.response?.data?.errors || 'Error fetching users', 'error')
            } finally {
                this.loading = false
            }
        },

        async deleteUser(id: number) {
            this.loading = true
            this.clearErrors()
            const notificationStore = useNotificationStore()
            try {
                const res = await axios.delete(`/users/${id}`)
                res.status === 200 && notificationStore.show(res.data.message, 'success')
                this.users = this.users.filter(user => user.id !== id)
            } catch (err: any) {
                notificationStore.show(this.errors = err.response?.data?.errors || 'Error deleting user', 'error')
            } finally {
                this.loading = false
            }
        },

        async addUser(user: User) {
            this.loading = true
            this.clearErrors()
            const notificationStore = useNotificationStore()
            try {
                const res = await axios.post('/users', user)
                res.status === 201 && notificationStore.show('User created successfully', 'success')
                this.users.push(res.data)
            } catch (err: any) {
                notificationStore.show(this.errors = err.response?.data?.errors || 'Error adding user', 'error')
            } finally {
                this.loading = false
            }
        },

        async editUser(user: User) {
            this.loading = true
            this.clearErrors()
            const notificationStore = useNotificationStore()
            try {
                const res = await axios.put(`/users/${user.id}`, user)
                res.status === 200 && notificationStore.show('User edited successfully', 'success')
                this.users.push(res.data)
            } catch (err: any) {
                notificationStore.show(this.errors = err.response?.data?.errors || 'Error editing user', 'error')
            } finally {
                this.loading = false
            }
        },

        clearErrors() {
            this.errors = {}
        }
    }


})