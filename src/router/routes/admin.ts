import type { RouteRecordRaw } from 'vue-router'
import Users from '../../views/Users.vue'
import UserEdit from '../../views/UserEdit.vue'
import AdminLayout from '../../components/layouts/AdminLayout.vue'

export const adminRoutes: RouteRecordRaw =
    { path: '/adminDashboard', component: AdminLayout,
        meta: {
            requiresAuth: true,
            requiresRole: ['admin','superadmin'],
            breadcrumb: 'Admin dashboard'
        },
        children: [
            { path: 'users', component: Users,
                meta: { 
                    requiresAuth: true,
                    requiresRole: 'superadmin',
                    breadcrumb: 'Users'
                }
            },
            { path: 'users/:id/edit', component: UserEdit,
                meta: {
                    requiresAuth: true,
                    requiresRole: 'superadmin',
                    breadcrumb: 'User Edit'
                }
            }
        ]
    }