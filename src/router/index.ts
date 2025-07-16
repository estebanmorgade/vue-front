import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import { useUserStore } from '../stores/useUserStore'
import Dashboard from '../views/Dashboard.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/users', component: Users, meta: { requiresAuth: true }},
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  { path: '/login', component: Login, meta: { guestOnly: true}},
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true}}
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _from, next) => {
  const user = useUserStore()
  await user.initAuth()
  const isProtected = to.meta.requiresAuth

  if(to.meta.guestOnly && user.isLoggedIn){
    next('/dashboard')
  }
  else{
    if(isProtected && !user.isLoggedIn){
      next('/login')
    } else {
      next()
    }
  }
})

export default router
