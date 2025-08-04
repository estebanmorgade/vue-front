import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import NotFound from '../views/errors/NotFound.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import { useUserStore } from '../stores/useUserStore'
import Dashboard from '../views/Dashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import Unauthorized from '../views/errors/Unauthorized.vue'
import UserEdit from '../views/UserEdit.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/users', component: Users, meta: { layout: 'AdminLayout', requiresAuth: true, requiresRole: 'superadmin'}},
  { path: '/unauthorized', component: Unauthorized},
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  { path: '/login', component: Login, meta: {layout: 'AuthLayout', guestOnly: true}},
  { path: '/dashboard', component: Dashboard, meta: { layout: 'DefaultLayout', requiresAuth: true, requiresRole: 'user'}},
  { path: '/adminDashboard', component: AdminDashboard, meta: { layout: 'AdminLayout', requiresAuth: true, requiresRole: ['admin','superadmin']}},
  { path: '/users/:id/edit', component: UserEdit, meta: {layout: 'AdminLayout', requiresAuth: true, requiresRole: 'superadmin'}}
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore()
  await userStore.initAuth()
  const isProtected = to.meta.requiresAuth
  const requiredRole = to.meta.requiresRole

  const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]

  if(to.meta.guestOnly && userStore.isLoggedIn){
    if(userStore.user?.role === 'admin' || userStore.user?.role === 'superadmin')
      next('/adminDashboard')
    else
      next('/dashboard')
  }
  else{
    if(isProtected && !userStore.isLoggedIn){
      next('/login')
    } else {
      if(isProtected && (requiredRole && !allowedRoles.includes(userStore.user?.role)))
        next('/unauthorized')
      else
        next()
    }
  }
})

export default router
