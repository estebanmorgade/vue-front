import type { RouteRecordRaw } from 'vue-router'
import Home from '../../views/Home.vue'
import About from '../../views/About.vue'
import Login from '../../views/Login.vue'
import Unauthorized from '../../views/errors/Unauthorized.vue'

export const publicRoutes: RouteRecordRaw[] = [
    { path: '/', component: Home },
    { path: '/about', component: About, meta: {breadcrumb: 'About'} },
    { path: '/login', component: Login, meta: {layout: 'AuthLayout', guestOnly: true}},
    { path: '/unauthorized', component: Unauthorized},
]