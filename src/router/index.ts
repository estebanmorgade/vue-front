import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '../stores/useUserStore'
import { publicRoutes } from './routes/public'
import { adminRoutes } from './routes/admin'
import { userRoutes } from './routes/user'



const routes: RouteRecordRaw[] = [
  ...publicRoutes,
  adminRoutes,
  userRoutes,
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/errors/NotFound.vue') }//avoid to load it unnecessary
]


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {top:0}
  }
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
