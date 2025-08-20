import type { RouteRecordRaw } from 'vue-router'

export const userRoutes: RouteRecordRaw = 
    { 
        path: '/dashboard',
        component: () => import('../../views/Dashboard.vue'),
        meta: { layout: 'DefaultLayout', requiresAuth: true, requiresRole: 'user'}
    }