import { defineStore } from "pinia";
import type { Project } from "../types/project"
import axios from "../services/axios";
import { useNotificationStore } from "./useNotificationStore";

// src/stores/useProjectsStore.ts
export const useProjectsStore = defineStore('projects', {
    
    state: () => ({
        projects: [] as Project[],
        loading: false,
        errors: {} as Record<string, string[]>    
    }),

    actions: {

        async fetchProjects() {
            this.loading = true
            this.clearErrors()
            const notificationStore = useNotificationStore()
            try {
                const res = await axios.get('/projects')
                this.projects = res.data
            } catch (err: any) {
                notificationStore.show(this.errors = err.response?.data?.errors || 'Error fetching projects', 'error')
            } finally {
                this.loading = false
            }
        },

        async deleteProject(id: number) {
            this.loading = true
            this.clearErrors()
            const notificationStore = useNotificationStore()
            try {
                const res = await axios.delete(`/projects/${id}`)
                res.status === 200 && notificationStore.show(res.data.message, 'success')
                this.projects = this.projects.filter(project => project.id !== id)
            } catch (err: any) {
                notificationStore.show(this.errors = err.response?.data?.errors || 'Error deleting project', 'error')
            } finally {
                this.loading = false
            }
        },

        async addProject(project: Project) {
            this.loading = true
            this.clearErrors()
            const notificationStore = useNotificationStore()
            try {
                const res = await axios.post('/projects', project)
                res.status === 201 && notificationStore.show('Project created successfully', 'success')
                this.projects.push(res.data)
            } catch (err: any) {
                notificationStore.show(this.errors = err.response?.data?.errors || 'Error adding project', 'error')
            } finally {
                this.loading = false
            }
        },

        async editProject(project: Project) {
            this.loading = true
            this.clearErrors()
            const notificationStore = useNotificationStore()
            try {
                const res = await axios.put(`/projects/${project.id}`, project)
                res.status === 200 && notificationStore.show('Porject edited successfully', 'success')
                this.projects.push(res.data)
            } catch (err: any) {
                notificationStore.show(this.errors = err.response?.data?.errors || 'Error editing project', 'error')
            } finally {
                this.loading = false
            }
        },

        clearErrors() {
            this.errors = {}
        }
    }


})