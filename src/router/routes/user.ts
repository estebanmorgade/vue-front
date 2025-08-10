import type { RouteRecordRaw } from 'vue-router'
import Dashboard from '../../views/Dashboard.vue'

export const userRoutes: RouteRecordRaw = 
    { 
        path: '/dashboard',
        component: Dashboard,
        meta: { layout: 'DefaultLayout', requiresAuth: true, requiresRole: 'user'}
    }