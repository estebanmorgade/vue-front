import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw =
    { path: '/adminDashboard', component: () => import('../../components/layouts/AdminLayout.vue'),
        meta: {
            requiresAuth: true,
            requiresRole: ['admin','superadmin'],
            breadcrumb: 'Admin dashboard'
        },
        children: [
            { path: 'users', component: () => import('../../views/Users.vue'),
                meta: { 
                    requiresAuth: true,
                    requiresRole: 'superadmin',
                    breadcrumb: 'Users'
                }
            },
            { path: 'users/:id/edit', component: () => import('../../views/UserEdit.vue'),
                meta: {
                    requiresAuth: true,
                    requiresRole: 'superadmin',
                    breadcrumb: 'User Edit'
                }
            }
        ]
    }