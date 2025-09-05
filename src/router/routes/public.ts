import type { RouteRecordRaw } from 'vue-router'

export const publicRoutes: RouteRecordRaw[] = [
    { path: '/', component: () => import('../../views/Home.vue') },
    { path: '/about', component: () => import('../../views/About.vue'), meta: {breadcrumb: 'About'} },
    { path: '/login', component: () => import('../../views/Login.vue'), meta: {layout: 'AuthLayout', guestOnly: true}},
    { path: '/unauthorized', component: () => import('../../views/errors/Unauthorized.vue'), name: 'unauthorized', meta: {layout: 'AuthLayout'} },
    { path: '/projects', component: () => import('../../views/Projects/Projects.vue'), meta: {breadcrumb: 'Projects'} },
    { path: '/project/:id', component: () => import('../../views/Projects/ProjectView.vue'), meta: {breadcrumb: 'Project Details'} },
    { path: '/contact', component: () => import('../../views/Contact.vue'), meta: {breadcrumb: 'Contact'} }
]