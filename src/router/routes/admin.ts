import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw =
    { path: '/adminDashboard', component: () => import('../../components/layouts/AdminLayout.vue'),
        meta: {
            requiresAuth: true,
            requiresRole: ['admin','superadmin'],
            breadcrumb: 'Admin dashboard'
        },
        children: [
            { path: 'users', component: () => import('../../views/Users/Users.vue'),
                meta: { 
                    requiresAuth: true,
                    requiresRole: ['admin','superadmin'],
                    breadcrumb: 'Users'
                }
            },
            { path: 'users/create', component: () => import('../../views/Users/UserCreate.vue'),
                meta: { 
                    requiresAuth: true,
                    requiresRole: ['admin','superadmin'],
                    breadcrumb: 'User Create'
                }
            },
            { path: 'users/:id/edit', component: () => import('../../views/Users/UserEdit.vue'),
                meta: {
                    requiresAuth: true,
                    requiresRole: ['admin','superadmin'],
                    breadcrumb: 'User Edit'
                }
            }
        ]
    }